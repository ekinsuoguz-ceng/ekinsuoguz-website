"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Header from "../header";

export default function ExperiencesPage() {
  const experiences = useQuery(api.experiences.getExperiences);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <section id="experiences" className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 border-b pb-2">
            İş ve Staj Deneyimleri
          </h3>
          {!experiences ? (
            <p className="text-slate-500">Yükleniyor...</p>
          ) : experiences.length === 0 ? (
            <p className="text-slate-400 text-sm">Henüz bir deneyim eklenmedi.</p>
          ) : (
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp._id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex gap-4 items-start">
                  {exp.companyLogoUrl && (
                    <img
                      src={exp.companyLogoUrl}
                      alt={exp.companyName}
                      className="w-12 h-12 object-contain rounded-md"
                    />
                  )}
                  <div className="space-y-1">
                    <h4 className="font-semibold text-lg text-slate-900">{exp.experienceTitle}</h4>
                    <p className="text-slate-600 font-medium text-sm">{exp.companyName}</p>
                    <p className="text-slate-400 text-xs">
                      {exp.startDate} - {exp.endDate || "Devam Ediyor"}
                    </p>
                    <p className="text-slate-600 text-sm mt-2">{exp.description}</p>
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
