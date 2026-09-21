import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// "01.02.2025" (GG.AA.YYYY), "July 2024 – August 2024" veya sade "2022" gibi
// formatları karşılaştırılabilir bir sayıya (timestamp) çevirir.
function parseStartDate(value: string): number {
  const trimmed = value.trim();

  // GG.AA.YYYY
  const ddmmyyyy = trimmed.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (ddmmyyyy) {
    const [, dd, mm, yyyy] = ddmmyyyy;
    return new Date(`${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`).getTime();
  }

  // "July 2024 – August 2024" gibi aralıkların ilk kısmı
  const firstPart = trimmed.split(/[–—-]/)[0].trim();
  const parsed = Date.parse(firstPart);
  if (!isNaN(parsed)) return parsed;

  // sade yıl: "2022"
  const year = parseInt(firstPart, 10);
  return isNaN(year) ? 0 : year;
}

export const getExperiences = query({
  handler: async (ctx) => {
    const experiences = await ctx.db.query("experiences").collect();

    // En yeni startDate en üstte olacak şekilde sırala (eklenme sırası değil)
    experiences.sort(
      (a, b) => parseStartDate(b.startDate) - parseStartDate(a.startDate)
    );

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

export const createExperience = mutation({
  args: {
    companyName: v.string(),
    position: v.string(),
    description: v.string(),
    startDate: v.string(),
    endDate: v.optional(v.string()),
    companyLogoStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("experiences", args);
  },
});