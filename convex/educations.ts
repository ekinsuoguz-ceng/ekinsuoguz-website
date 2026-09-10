import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getEducations = query({
  handler: async (ctx) => {
    return await ctx.db.query("educations").order("desc").collect();
  },
});

// Yeni bir eğitim bilgisi ekleyen fonksiyon
export const createEducation = mutation({
  args: {
    schoolName: v.string(),
    department: v.string(),
    gpa: v.number(),
    startDate: v.number(),
    endDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("educations", args);
  },
});