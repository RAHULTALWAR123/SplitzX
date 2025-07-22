import { v } from "convex/values";
import { mutation, query } from "./_generated/server";




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



export const getTotalPay = query({
    handler: async(ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not authenticated");
        }

        const user = await ctx.db.query("users").
        withIndex("by_user_id").
        filter((q) => q.eq(q.field("userId"), identity.subject)).
        first();

        if(!user){
            throw new Error("User not found");
        }

       const userPaidExpenses = await ctx.db.query("expanses")
            .withIndex("by_paid_by")
            .filter((q) => q.eq(q.field("paidByUserId"), user._id))
            .collect();

            let expAmount = 0;
            let userShare = 0;

       userPaidExpenses.forEach((e) => {
            const userSplit = e.splits.find((s) => s.userId === user._id);
            
            if (userSplit) {
                if (!userSplit.paid) {
                    // User's own split is unpaid - normal calculation
                    expAmount += e.amount;
                    userShare += userSplit.amount;
                } else {
                    // User's own split is paid - add unpaid splits from others
                    let unpaidAmount = 0;
                    for (const s of e.splits) {
                        if (!s.paid && s.userId !== user._id) {
                            unpaidAmount += s.amount;
                        }
                    }
                    if (unpaidAmount > 0) {
                        expAmount += unpaidAmount;
                        userShare += 0;
                    }
                }
            }
        });
        
        return expAmount - userShare;
    }
})


export const ToPay = query({
    handler: async(ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not authenticated");
        }

        const user = await ctx.db.query("users").
        withIndex("by_user_id").
        filter((q) => q.eq(q.field("userId"), identity.subject)).
        first();

        if(!user){
            throw new Error("User not found");
        }

        const allExpenses = await ctx.db.query("expanses").collect();

        let total = 0;

        allExpenses.forEach((e) => {
            const userSplit = e.splits.find((s) => s.userId === user._id && e.paidByUserId !== user._id && !s.paid);
            if(userSplit){
                total += userSplit.amount;
            }
        })

        return total


    }
})

export const getUserExp = query({
    args:{
        _id: v.id("users")
    },
    handler: async(ctx,args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not authenticated");
        }

        const user = await ctx.db.query("users").
        withIndex("by_user_id").
        filter((q) => q.eq(q.field("userId"), identity.subject)).
        first();

        if(!user){
            throw new Error("User not found");
        }
        
        const expanses = await ctx.db.query("expanses").collect();

         const oneOnOneExpenses = expanses.filter(e => 
            e.groupId === undefined &&
            e.splits.length === 2 && 
            e.splits.some(s => s.userId === user._id && !s.paid)  && 
            e.splits.some(s => s.userId === args._id && !s.paid) 
        );


         let balance = 0;

         for(const e of oneOnOneExpenses){
            const userSplit = e.splits.find(s => s.userId === user._id);
            const otherSplit = e.splits.find(s => s.userId === args._id);

            if(!userSplit || !otherSplit){
                continue;
            }



            if(e.paidByUserId === user._id){
                balance += otherSplit?.amount;
            }
            else if (e.paidByUserId === args._id){
                balance -= userSplit?.amount;
            }
         }
         return balance;


    }
})


export const getGrpExp = query({
    args:{
        _id: v.id("groups")
    },
    handler: async(ctx , args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not authenticated");
        }

        const user = await ctx.db.query("users").
        withIndex("by_user_id").
        filter((q) => q.eq(q.field("userId"), identity.subject)).
        first();

        if(!user){
            throw new Error("User not found");
        }

        const expanses = await ctx.db.query("expanses").collect();

        const grpExp = expanses.filter((e) => 
            e.groupId === args._id && 
            e.splits.some(s => s.userId === user._id)
        )

        let total = 0;

       for (const e of grpExp) {
            const userSplit = e.splits.find(s => s.userId === user._id);
            
            if (userSplit) {
                if (e.paidByUserId === user._id) {
                    if (userSplit.paid) {
                        // User's own split is settled, show sum of all unpaid splits (amount owed to them)
                        let unpaidAmount = 0;
                        for (const s of e.splits) {
                            if (!s.paid && s.userId !== user._id) {
                                unpaidAmount += s.amount;
                            }
                        }
                        total += unpaidAmount;
                    } else {

                        total += e.amount - userSplit.amount;
                    }
                } else {

                    if (!userSplit.paid) {

                        total -= userSplit.amount;
                    }

                }
            }
        }

        return total;
    }
})


export const getUserExpHistory = query({
    args:{
        _id: v.id("users")
    },
    handler: async(ctx,args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not authenticated");
        }

        const user = await ctx.db.query("users").
        withIndex("by_user_id").
        filter((q) => q.eq(q.field("userId"), identity.subject)).
        first();

        if(!user){
            throw new Error("User not found");
        }

        const expanses = await ctx.db.query("expanses").collect();

        const oneOnOneExpenses = expanses.filter(e => 
            e.groupId === undefined &&
            e.splits.length === 2 && 
            e.splits.some(s => s.userId === user._id) && 
            e.splits.some(s => s.userId === args._id) 
        );

        return oneOnOneExpenses;
    }
})

export const getGrpExpHistory = query({
    args:{
        _id: v.id("groups")
    },
    handler: async(ctx,args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not authenticated");
        }

        const user = await ctx.db.query("users").
        withIndex("by_user_id").
        filter((q) => q.eq(q.field("userId"), identity.subject)).    
        first();

        if(!user){
            throw new Error("User not found");
        }

        const expanses = await ctx.db.query("expanses").collect();

        const grpExp = expanses.filter((e) => 
            e.groupId === args._id && 
            e.splits.some(s => s.userId === user._id)
        )

        return grpExp;
    }
})


export const getExpByGrpId = query({
    args:{
        _id: v.id("groups")
    },
    handler: async(ctx,args) => {

        const expanses = await ctx.db.query("expanses").withIndex("by_group_id").filter((q) => q.eq(q.field("groupId"), args._id)).collect();

        return expanses;
    }
})

export const getExpByExpId = query({
    args:{
        _id: v.optional(v.id("expanses"))
    },
    handler: async(ctx,args) => {
        if(!args._id){
            return null;
        }

        const expanses = await ctx.db.get(args._id);
        if(!expanses){
            throw new Error("Expense not found");
        }

        return expanses;
    }
})