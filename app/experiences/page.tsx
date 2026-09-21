"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Header from "../header";
import Footer from "../footer";

export default function ExperiencesPage() {
  const experiences = useQuery(api.experiences.getExperiences);
  const educations = useQuery(api.educations.getEducations);

  return (
    <main className="min-h-screen bg-[#f3ede3]">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <section id="experiences" className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-1">
            My Journey
          </p>
          <h3 className="font-serif italic text-3xl text-slate-900 mb-8">
            Experience
          </h3>

          {!experiences ? (
            <p className="text-slate-500">Yükleniyor...</p>
          ) : experiences.length === 0 ? (
            <p className="text-slate-400 text-sm">Henüz bir deneyim eklenmedi.</p>
          ) : (
            <div className="relative border-l-2 border-dashed border-slate-300 pl-8 space-y-8">
              {experiences.map((exp) => (
                <div key={exp._id} className="relative">
                  <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-orange-400 border-4 border-[#f3ede3]" />
                  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <div className="flex justify-between items-start gap-4 mb-1">
                      <h4 className="font-semibold text-slate-900">{exp.companyName}</h4>
                      <span className="text-xs text-orange-500 whitespace-nowrap">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </span>
                    </div>
                    <p className="italic font-serif text-orange-600 text-sm mb-2">
                      {exp.position}
                    </p>
                    <p className="text-slate-600 text-sm">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="education" className="mt-16">
          <div className="bg-[#2f3b2c] rounded-3xl p-8 md:p-12">
            <p className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-emerald-300 mb-1">
              <span>✻</span> Knowledge & Roots
            </p>
            <h3 className="font-serif italic text-3xl text-white mb-2">
              Education
            </h3>
            <p className="text-emerald-100/50 text-sm mb-8">
              A continuous quest for scaling systems and mindsets.
            </p>

            {!educations ? (
              <p className="text-slate-300">Yükleniyor...</p>
            ) : educations.length === 0 ? (
              <p className="text-slate-400 text-sm">Henüz bir eğitim bilgisi eklenmedi.</p>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {educations.map((edu) => (
                  <div
                    key={edu._id}
                    className="bg-white/5 rounded-xl border border-white/10 p-5"
                  >
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <span className="text-xs text-emerald-300/60">
                        {edu.startDate} - {edu.endDate || "Present"}
                      </span>
                      {edu.location && (
                        <span className="text-xs text-white/30 whitespace-nowrap">
                          {edu.location}
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-white mb-1">{edu.schoolName}</h4>
                    <p className="italic font-serif text-orange-300 text-sm">
                      🔖 {edu.department}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-end justify-between mt-10 pt-6 border-t border-white/10">
              <div>
                <p className="italic font-serif text-emerald-300 text-lg">
                  Always learning...
                </p>
                <p className="text-emerald-100/40 text-xs mt-1">
                  Whether through compilers or organic trails.
                </p>
              </div>
              <svg
                className="w-24 h-10 text-emerald-300/30 hidden sm:block"
                viewBox="0 0 100 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M0 35 L25 10 L38 22 L55 5 L75 28 L100 15" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
