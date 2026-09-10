"use client";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Home() {
  // Convex'ten verileri çekiyoruz (Real-time çalışır)
  const posts = useQuery(api.posts.getPosts);
  const travel = useQuery(api.travel.getTravels);
  const experiences = useQuery(api.experiences.getExperiences);
  const educations = useQuery(api.educations.getEducations);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header / Nav */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Ekinsu Oğuz
          </h1>
          <nav className="flex gap-6 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-slate-900 transition">Hakkımda</a>
            <a href="#experiences" className="hover:text-slate-900 transition">Deneyimler</a>
            <a href="#educations" className="hover:text-slate-900 transition">Eğitim</a>
            <a href="#travels" className="hover:text-slate-900 transition">Geziler</a>
            <a href="#posts" className="hover:text-slate-900 transition">Yazılar</a>
          </nav>
        </div>
      </header>

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

        {/* Experiences Section */}
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

        {/* Educations Section */}
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

        {/* Travels Section */}
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
              {travel.map((travel) => (
                <div key={travel._id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  {travel.photoUrls && travel.photoUrls[0] && (
                    <img
                      src={travel.photoUrls[0]}
                      alt={travel.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-5 space-y-2">
                    <h4 className="font-semibold text-slate-900">{travel.title}</h4>
                    <p className="text-slate-600 text-sm line-clamp-3">{travel.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Posts Section */}
        <section id="posts" className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 border-b pb-2">
            Blog & Yazılar
          </h3>
          {!posts ? (
            <p className="text-slate-500">Yükleniyor...</p>
          ) : posts.length === 0 ? (
            <p className="text-slate-400 text-sm">Henüz paylaşılan bir yazı yok.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <article key={post._id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
                  <h4 className="font-semibold text-xl text-slate-900">{post.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{post.content}</p>
                  <p className="text-slate-400 text-xs pt-2">
                    {new Date(post._creationTime).toLocaleDateString("tr-TR")}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}