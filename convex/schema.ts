import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    posts: defineTable({
        title: v.string(),
        content: v.string(),
        updatedAt: v.optional(v.number()),
    }),

    travels: defineTable({
        title: v.string(),
        content: v.string(),
        photoStorageId: v.array(v.id("_storage")),
        updatedAt: v.optional(v.number()),
    }),

    educations: defineTable({
        schoolName: v.string(),
        department: v.string(),
        gpa: v.number(),
        startDate: v.number(),
        endDate: v.optional(v.number()),
        location: v.optional(v.string()),
        updatedAt: v.optional(v.number()),
    }),

    experiences: defineTable({
        companyName: v.string(),
        position: v.string(),
        description: v.string(),
        startDate: v.string(),
        endDate: v.optional(v.string()),
        companyLogoStorageId: v.optional(v.id("_storage")),
        updatedAt: v.optional(v.number()),
    }),
});