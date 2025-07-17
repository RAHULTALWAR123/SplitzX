import { v } from "convex/values";
import { mutation } from "./_generated/server";



export const CreateIndivisualExpanse = mutation({
    args:{
        amount: v.number(),
        description: v.string(),
        date: v.number(),
        category: v.optional(v.string()),
        paidByUserId: v.id("users"), 
        splitType: v.string(),
        splits: v.array(
            v.object({
                userId: v.id("users"), // Reference to users table
                amount: v.number(),
                paid: v.boolean(),
            })
        ),
        groupId: v.optional(v.id("groups")),
    },


    handler: async(ctx,args)=>{

        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not authenticated");
        }

        const user =  await ctx.db.query("users").withIndex("by_user_id").filter((q) => q.eq(q.field("userId"), identity.subject)).first();

        if(!user){
            throw new Error("User not found");
        }

        if (args.groupId) {
            const group = await ctx.db.get(args.groupId);
            if (!group) {
                throw new Error("Group not found");
            }
        }

        const totalSplit = args.splits.reduce((total, split) => total + split.amount, 0);

        if(Math.abs(totalSplit - args.amount) > 0.001){
            throw new Error("Total split percentage does not add up to the total amount.");
        }

    const invalidSplits = args.splits.filter(split => split.amount <= 0);
    if (invalidSplits.length > 0) {
      throw new Error("All split amounts must be positive");
    }

    const paidByUser = await ctx.db.get(args.paidByUserId);
    if (!paidByUser) {
      throw new Error("Paid by user not found");
    }

        const expenseId = await ctx.db.insert("expanses",{
            amount: args.amount,
            description: args.description,
            date: args.date,
            category: args.category,
            paidByUserId: args.paidByUserId,
            splitType: args.splitType,
            splits: args.splits.map((split) => ({
                userId: split.userId,
                amount: split.amount,
                paid: split.paid,
            })),
            createdBy: user._id,
            groupId: args.groupId
        });

        return expenseId

    }
})


