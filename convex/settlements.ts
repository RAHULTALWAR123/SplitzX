import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


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

        // if(args.receivedByUserId === args.paidByUserId){
        //     throw new Error("You cannot settle with yourself");
        // }

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


export const createGrpSettlement = mutation({
    args:{
        amount: v.number(),
        note: v.optional(v.string()),
        date: v.number(), 
        paidByUserId: v.id("users"), 
        groupId: v.optional(v.id("groups")),
        receivedByUserId: v.id("users"),
        relatedExpenseId: v.optional(v.id("expanses")),
    },

    handler: async(ctx,args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        }

        const user = await ctx.db.query("users").withIndex("by_user_id").filter((q) => q.eq(q.field("userId"), identity.subject)).first();

        if(!user){
            throw new Error("User not found");
        }


        
if (args.relatedExpenseId) {
            const expense = await ctx.db.get(args.relatedExpenseId);
            
            if (!expense) {
                throw new Error("Related expense not found");
            }

            // Validate that the expense belongs to the correct group
            if (expense.groupId !== args.groupId) {
                throw new Error("Expense does not belong to the specified group");
            }

            // Validate that both users are involved in the expense
            const hasReceiver = expense.splits.some(s => s.userId === args.receivedByUserId);
            const hasPayer = expense.splits.some(s => s.userId === args.paidByUserId);
            
            if (!hasReceiver || !hasPayer) {
                throw new Error("Both users must be involved in the related expense");
            }

            // Mark relevant splits as paid
            let needsUpdate = false;
            const updatedSplits = expense.splits.map(split => {
                // Only mark as paid if it's unpaid and involves one of the settlement participants
                if (!split.paid && 
                    (split.userId === args.receivedByUserId || split.userId === args.paidByUserId)) {
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
            createdBy: user._id,
            groupId: args.groupId,
            relatedExpenseId: args.relatedExpenseId
        });
    }

})


export const getUserSettlements = query({
    args:{
        _id: v.id("users")
    },
    handler: async(ctx,args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        }

        const user = await ctx.db.query("users").withIndex("by_user_id").filter((q) => q.eq(q.field("userId"), identity.subject)).first();

        if(!user){
            throw new Error("User not found");
        }

        const settlements = await ctx.db.query("settlements").collect();

        return settlements.filter((s) => (s.groupId === undefined && s.paidByUserId === args._id && s.receivedByUserId === user._id) || (s.receivedByUserId === args._id && s.paidByUserId === user._id));
    }
})

export const getGrpSettlements = query({
    args:{
        _id: v.id("groups")
    },
    handler: async(ctx,args) => {

        const grpSettlements = await ctx.db.query("settlements").withIndex("by_group_id").filter((q) => q.eq(q.field("groupId"), args._id)).collect();
        return grpSettlements;
    }
})