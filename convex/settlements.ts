import { v } from "convex/values";
import { mutation } from "./_generated/server";


export const createSettlement = mutation({
    args:{
        amount: v.number(),
        note: v.optional(v.string()),
        date: v.number(), 
        paidByUserId: v.id("users"), 
        receivedByUserId: v.id("users"), 
    },
    handler: async(ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        }

        const user = await ctx.db.query("users").withIndex("by_user_id").filter((q) => q.eq(q.field("userId"), identity.subject)).first();

        if(!user){
            throw new Error("User not found");
        }

        const expanses = await ctx.db.query("expanses").collect();

        const oneOnOneExpenses = expanses.filter(e => 
            e.groupId === undefined &&
            e.splits.length === 2 && 
            e.splits.some(s => s.userId === args.receivedByUserId) && 
            e.splits.some(s => s.userId === args.paidByUserId) 
        );

         for (const expense of oneOnOneExpenses) {
            let needsUpdate = false;
            const updatedSplits = expense.splits.map(split => {
                if (!split.paid) {
                    needsUpdate = true;
                    return { ...split, paid: true };
                }
                return split;
            });

            if (needsUpdate) {
                await ctx.db.patch(expense._id, { splits: updatedSplits });
            }
        }


        return await ctx.db.insert("settlements",{
            amount: args.amount,
            note: args.note,
            date: args.date,
            paidByUserId: args.paidByUserId,
            receivedByUserId: args.receivedByUserId,
            createdBy: user._id
        });

    }
})