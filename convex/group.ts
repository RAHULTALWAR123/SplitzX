
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const getUserGroups = query({
    handler:async(ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        }

        const user = await ctx.db.query("users")
        .withIndex("by_user_id")
        .filter((q) => q.eq(q.field("userId"), identity.subject))
        .first();

        if(!user){
            throw new Error("User not found");
        }

         const allGroups = await ctx.db.query("groups").collect();
         
        const groups = allGroups.filter(group => 
            group.members.includes(user._id)
        );

        return groups;
    }
})

export const getGroupMembers = query({
    args: {
        groupId: v.id("groups")
    },
    handler: async(ctx, args) => {
        const group = await ctx.db.get(args.groupId);
        if (!group) {
            throw new Error("Group not found");
        }
        
        const users = await ctx.db.query("users").collect();

        const memberNames = users.filter(user => group.members.includes(user._id))
        .map(member => ({
            _id: member._id,
            name: member.name
        }));

        return {...group, members: memberNames};

    }
})

export const createGroup = mutation({
    args:{
        name:v.string(),
        description:v.string(),
        members:v.array(v.id("users")),
    },
    handler: async(ctx,args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        }

        const user = await ctx.db.query("users")
        .withIndex("by_user_id")
        .filter((q) => q.eq(q.field("userId"), identity.subject))
        .first();

        if(!user){
            throw new Error("User not found");
        }

        return await ctx.db.insert("groups",{
            name:args.name,
            description:args.description,
            createdBy:user._id,
            members:args.members,
        })
    }
})