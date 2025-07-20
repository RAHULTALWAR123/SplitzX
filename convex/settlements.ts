import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { useQuery } from "convex/react";
import { api } from "./_generated/api";

export const createSettlement = mutation({
    args:{
        amount: v.number(),
        note: v.optional(v.string()),
        date: v.number(), 
        paidByUserId: v.id("users"), 
        receivedByUserId: v.id("users"), 
        groupId: v.optional(v.id("groups")), // null for one-on-one settlements
        relatedExpenseIds: v.optional(v.array(v.id("expenses"))), // Which expenses this settlement covers
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

    }
})