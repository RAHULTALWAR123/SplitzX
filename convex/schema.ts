import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    users : defineTable({
        userId : v.string(),
        name : v.string(),
        email : v.string(),
        isPro: v.boolean(),
        lemonSqueezyCustomerId: v.optional(v.string()),
        lemonSqueezyOrderId: v.optional(v.string()),
    }).index("by_user_id", ["userId"]).index("by_email", ["email"]), 

    groups : defineTable({
        groupId : v.string(),
        name : v.string(),
        description : v.string(),
        createdBy : v.id("users"),
        members : v.array(v.id("users")),

    }).index("by_group_id", ["groupId"]).index("by_created_by", ["createdBy"]),

    expanses : defineTable({
        expenseId: v.string(),
        description: v.string(),
        amount: v.number(),
        category: v.optional(v.string()),
        date: v.number(),
        paidByUserId: v.id("users"), 
        splitType: v.string(), // "equal", "percentage", "exact"
       splits: v.array(
       v.object({
        userId: v.id("users"), // Reference to users table
        amount: v.number(), // amount owed by this user
        paid: v.boolean(),
      })
    ),
    groupId: v.optional(v.id("groups")), // null for one-on-one expense
    createdBy: v.id("users"), 
    }).index("by_expense_id", ["expenseId"]).index("by_paid_by", ["paidByUserId"]).index("by_group_id", ["groupId"])
    .index("by_created_by", ["createdBy"]).index("by_date", ["date"]),

    settlements : defineTable({
        settlementId: v.string(),
        amount: v.number(),
        note: v.optional(v.string()),
        date: v.number(), 
        paidByUserId: v.id("users"), 
        receivedByUserId: v.id("users"), 
        groupId: v.optional(v.id("groups")), // null for one-on-one settlements
        relatedExpenseIds: v.optional(v.array(v.id("expenses"))), // Which expenses this settlement covers
        createdBy: v.id("users"),
    }) .index("by_settlement_id", ["settlementId"]).index("by_group_id", ["groupId"]).index("by_paid_by", ["paidByUserId"])
    .index("by_received_by", ["receivedByUserId"]) .index("by_paid_by_and_group", ["paidByUserId", "groupId"])
    .index("by_received_by_and_group", ["receivedByUserId", "groupId"]).index("by_date", ["date"]), 
})