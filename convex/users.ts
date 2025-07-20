import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!existingUser) {
      await ctx.db.insert("users", {
        userId: args.userId,
        email: args.email,
        name: args.name,
        isPro: false,
      });
    }
  },

});

export const getAllUsers = query({
  handler: async(ctx) => {
    return await ctx.db.query("users").collect();
  }
})


export const getExpanseUsers = query({
  handler: async(ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if(!identity){
        throw new Error("Not authenticated");
    }

    const user =  await ctx.db.query("users").withIndex("by_user_id").filter((q) => q.eq(q.field("userId"), identity.subject)).first();

    if(!user){
        throw new Error("User not found");
    }

    const expanses = await ctx.db.query("expanses").collect();

    const oneToone = expanses.filter((e) => {
      return (
        e.splits.length === 2 && e.splits.some((s) => s.userId === user._id)
      )
    })

    const userId = new Set<string>();

    for(const expanse of oneToone){
      for(const split of expanse.splits){
        if(split.userId !== user._id){
          userId.add(split.userId);
        }
      }

      if (expanse.paidByUserId !== user._id) {
        userId.add(expanse.paidByUserId);
      }
    }

    const users = [];
    for(const uid of userId){
      const user = await ctx.db.query("users").filter((q) => q.eq(q.field("_id"), uid)).first();
      if(user){
        users.push(user);
      }
    }

    return users;
  }
})


export const getUserById = query({
  args:{
    _id: v.id("users")
  },
  handler: async(ctx,args) =>{
    const user = await ctx.db.query("users").filter((q) => q.eq(q.field("_id"), args._id)).first();

    if(!user){
        throw new Error("User not found");
    }

    return user;
  }
})

export const getCurrUser = query({
  handler: async(ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if(!identity){
        throw new Error("Not authenticated");
    }

    const user =  await ctx.db.query("users").withIndex("by_user_id").filter((q) => q.eq(q.field("userId"), identity.subject)).first();

    if(!user){
        throw new Error("User not found");
    }

    return user;
  }
})