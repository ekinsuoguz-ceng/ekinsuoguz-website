import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getExperiences = query({
  handler: async (ctx) => {
    const experiences = await ctx.db.query("experiences").order("desc").collect();

    return Promise.all(
      experiences.map(async (exp) => ({
        ...exp,
        companyLogoUrl: exp.companyLogoStorageId
          ? await ctx.storage.getUrl(exp.companyLogoStorageId)
          : null,
      }))
    );
  },
});

// Yeni bir iş/staj deneyimi ekleyen fonksiyon
export const createExperience = mutation({
  args: {
    companyName: v.string(),
    position: v.string(),
    experienceTitle: v.string(),
    description: v.string(),
    startDate: v.string(),
    endDate: v.optional(v.string()),
    companyLogoStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("experiences", args);
  },
});