import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import schema from "./schema";

const travelPlaceWithPhotoUrls = schema.doc("travels").extend({
  photoUrls: v.array(v.union(v.string(), v.null())),
  resolvedCoverImageUrl: v.union(v.string(), v.null()),
});

const travelCountryWithImageUrl = schema.doc("travelCountries").extend({
  resolvedImageUrl: v.union(v.string(), v.null()),
});

export const getTravels = query({
  args: {},
  returns: v.array(travelPlaceWithPhotoUrls),
  handler: async (ctx) => {
    const travels = await ctx.db.query("travels").order("desc").take(100);
    
    // Fotoğraf ID'lerini doğrudan erişilebilir URL'lere dönüştürüyoruz
    return Promise.all(
      travels.map(async (travel) => ({
        ...travel,
        resolvedCoverImageUrl: travel.coverImageStorageId
          ? await ctx.storage.getUrl(travel.coverImageStorageId)
          : travel.coverImageUrl ?? null,
        photoUrls: await Promise.all(
          travel.photoStorageId.map((id) => ctx.storage.getUrl(id))
        ),
      }))
    );
  },
});

export const getCountries = query({
  args: {},
  returns: v.array(travelCountryWithImageUrl),
  handler: async (ctx) => {
    const countries = await ctx.db
      .query("travelCountries")
      .withIndex("by_sortOrder")
      .order("asc")
      .take(100);

    return await Promise.all(
      countries.map(async (country) => ({
        ...country,
        resolvedImageUrl: country.imageStorageId
          ? await ctx.storage.getUrl(country.imageStorageId)
          : country.imageUrl ?? null,
      })),
    );
  },
});

export const getPlacesByCountry = query({
  args: { countryId: v.id("travelCountries") },
  returns: v.array(travelPlaceWithPhotoUrls),
  handler: async (ctx, args) => {
    const places = await ctx.db
      .query("travels")
      .withIndex("by_countryId", (q) => q.eq("countryId", args.countryId))
      .order("desc")
      .take(100);

    return await Promise.all(
      places.map(async (place) => ({
        ...place,
        resolvedCoverImageUrl: place.coverImageStorageId
          ? await ctx.storage.getUrl(place.coverImageStorageId)
          : place.coverImageUrl ?? null,
        photoUrls: await Promise.all(
          place.photoStorageId.map((id) => ctx.storage.getUrl(id)),
        ),
      })),
    );
  },
});

export const createCountry = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    sortOrder: v.number(),
  },
  returns: v.id("travelCountries"),
  handler: async (ctx, args) => {
    const imageUrl = args.imageUrl?.trim();
    return await ctx.db.insert("travelCountries", {
      name: args.name.trim(),
      description: args.description.trim(),
      ...(imageUrl ? { imageUrl } : {}),
      ...(args.imageStorageId ? { imageStorageId: args.imageStorageId } : {}),
      sortOrder: args.sortOrder,
    });
  },
});

export const updateCountryImage = mutation({
  args: {
    countryId: v.id("travelCountries"),
    imageStorageId: v.id("_storage"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const country = await ctx.db.get(args.countryId);
    if (!country) {
      throw new Error("Country not found");
    }

    if (country.imageStorageId) {
      await ctx.storage.delete(country.imageStorageId);
    }

    await ctx.db.patch(args.countryId, {
      imageStorageId: args.imageStorageId,
      imageUrl: undefined,
    });
    return null;
  },
});

export const createTravelPlace = mutation({
  args: {
    countryId: v.id("travelCountries"),
    title: v.string(),
    content: v.string(),
    coverImageUrl: v.optional(v.string()),
    coverImageStorageId: v.optional(v.id("_storage")),
  },
  returns: v.id("travels"),
  handler: async (ctx, args) => {
    const coverImageUrl = args.coverImageUrl?.trim();
    return await ctx.db.insert("travels", {
      countryId: args.countryId,
      title: args.title.trim(),
      content: args.content.trim(),
      photoStorageId: [],
      ...(coverImageUrl ? { coverImageUrl } : {}),
      ...(args.coverImageStorageId
        ? { coverImageStorageId: args.coverImageStorageId }
        : {}),
      updatedAt: Date.now(),
    });
  },
});

export const generateUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});