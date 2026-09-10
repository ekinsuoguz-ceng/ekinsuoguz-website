import { query } from "./_generated/server";

export const getTravels = query({
  handler: async (ctx) => {
    const travels = await ctx.db.query("travels").order("desc").collect();
    
    // Fotoğraf ID'lerini doğrudan erişilebilir URL'lere dönüştürüyoruz
    return Promise.all(
      travels.map(async (travel) => ({
        ...travel,
        photoUrls: await Promise.all(
          travel.photoStorageId.map((id) => ctx.storage.getUrl(id))
        ),
      }))
    );
  },
});