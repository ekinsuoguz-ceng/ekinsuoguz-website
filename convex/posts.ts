import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Tüm blog yazılarını getiren sorgu
export const getPosts = query({
  handler: async (ctx) => {
    return await ctx.db.query("posts").order("desc").collect();
  },
});

// Yeni bir blog yazısı ekleyen fonksiyon
export const createPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const postId = await ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
    });
    return postId;
  },
});