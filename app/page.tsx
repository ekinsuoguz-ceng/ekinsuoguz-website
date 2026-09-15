"use client";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import Header from "./header";

export default function Home() {
  // Convex'ten verileri çekiyoruz (Real-time çalışır)
  const posts = useQuery(api.posts.getPosts);
  const travel = useQuery(api.travel.getTravels);
  const experiences = useQuery(api.experiences.getExperiences);
  const educations = useQuery(api.educations.getEducations);

  return (
    <main className="h-screen overflow-hidden bg-slate-50 text-slate-800 bg-[url('/indir2.png')]  bg-center bg-cover">
      <Header />
            <div className="max-w-4xl mx-auto px-6 py-12 space-y-20">
        {/* Hero / About Section */}
        <section id="about" className="space-y-4">
          <h2 className="text-4xl font-extrabold text-slate-900">
            Merhaba, Ben Ekinsu 👋
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Yazılım geliştirme, gezi deneyimleri ve öğrenim hayatıma dair detayları paylaştığım kişisel alanıma hoş geldiniz.
          </p>
        </section>
      </div>
    </main>
  );
}