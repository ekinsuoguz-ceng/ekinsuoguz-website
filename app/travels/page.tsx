"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Header from "../header";

export default function TravelsPage() {
  const travel = useQuery(api.travel.getTravels);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <section id="travel" className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 border-b pb-2">
            Geziler & Seyahatler
          </h3>
          {!travel ? (
            <p className="text-slate-500">Yükleniyor...</p>
          ) : travel.length === 0 ? (
            <p className="text-slate-400 text-sm">Henüz bir seyahat notu eklenmedi.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {travel.map((t) => (
                <div key={t._id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  {t.photoUrls && t.photoUrls[0] && (
                    <img
                      src={t.photoUrls[0]}
                      alt={t.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-5 space-y-2">
                    <h4 className="font-semibold text-slate-900">{t.title}</h4>
                    <p className="text-slate-600 text-sm line-clamp-3">{t.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
