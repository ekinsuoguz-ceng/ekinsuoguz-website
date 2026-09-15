"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Header from "../header";
   

export default function EducationsPage() {
  const educations = useQuery(api.educations.getEducations);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <section id="educations" className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 border-b pb-2">
            Eğitim
          </h3>
          {!educations ? (
            <p className="text-slate-500">Yükleniyor...</p>
          ) : educations.length === 0 ? (
            <p className="text-slate-400 text-sm">Henüz bir eğitim bilgisi eklenmedi.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {educations.map((edu) => (
                <div key={edu._id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
                  <h4 className="font-semibold text-slate-900">{edu.schoolName}</h4>
                  <p className="text-slate-600 text-sm">{edu.department}</p>
                  <p className="text-slate-500 text-xs font-medium">GPA: {edu.gpa}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
