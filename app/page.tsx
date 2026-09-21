"use client";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import Header from "./header";

export default function Home() {
  // Convex'ten verileri çekiyoruz (Real-time çalışır)
  const posts = useQuery(api.posts.getPosts);
  const travel = useQuery(api.travel.getTravels);
  const experiences = useQuery(api.experiences.getExperiences);


  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-800 bg-[url('/dance.jpg')]  bg-center bg-cover">
      <Header />
      <div className="flex-1 max-w-4xl w-full px-16 pt-60 pb-4 flex flex-col space-y-4">
        <div className="w-full max-w-7xl mx-auto z-10 flex flex-col justify-center">
          <div className="max-w-3xl relative z-10 flex flex-col justify-center">
            <div className="mb-7">
              <span className="font-cursive text-2xl sm:text-3xl md:text-4xl text-amber-200/90 tracking-wide font-normal">
                Same sky / different places / same soul
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.05] mb-6">
              Ekinsu <span className="italic font-serif text-amber-400 font-normal">in flow</span>
            </h1>
            <div className="flex items-center gap-2 mb-6 font-mono text-xs sm:text-sm tracking-wider text-emerald-400/90 uppercase">
              <span>SOFTWARE ENGINEER</span>
              <span className="text-gray-500">•</span>
              <span>TRAVELER</span>
              <span className="text-gray-500">•</span>
              <span>FLOW ARTIST</span>
            </div>
            <p className=" text-base sm:text-lg leading-relaxed font-sans max-w-xl font-light mb-10">
              A little bit of chaos, a lot of curiosity. Solving technical logic puzzles by day, dancing with lights and exploring mountain horizons by night.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2">

              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-gray-400 bg-black/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Currently based in: <strong className="text-gray-200 font-medium">İzmir</strong></span>
              </div>

              <a href="#journal" className="group flex items-center gap-2 text-xs sm:text-sm font-sans text-amber-200/80 hover:text-amber-200 transition-colors py-1">
                <span className="underline underline-offset-4 decoration-amber-500/40 group-hover:decoration-amber-400">Read Journal</span>
                <i className="fa-solid fa-arrow-right text-xs transform group-hover:translate-x-1 transition-transform duration-200"></i>
              </a>

            </div>
            <div className="absolute right-8 md:right-24 top-1/3 text-amber-400/40 animate-glow pointer-events-none hidden sm:block">
              <svg className="w-8 h-8 md:w-12 md:h-12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>

            <div className="absolute left-8 bottom-12 text-purple-400/30 pointer-events-none hidden sm:block">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
            </div>

            <footer className="w-full mx-auto z-10 pt-4 flex justify-between items-center text-xs text-gray-500 border-t border-white/5">
              <div>© Ekinsu — Portfolio</div>
              <div className="flex gap-4">
                <a href="#" className="hover:text-gray-300 transition-colors"><i className="fa-brands fa-github text-sm"></i></a>
                <a href="#" className="hover:text-gray-300 transition-colors"><i className="fa-brands fa-linkedin text-sm"></i></a>
                <a href="#" className="hover:text-gray-300 transition-colors"><i className="fa-brands fa-instagram text-sm"></i></a>
              </div>
            </footer>

          </div>
        </div>
      </div>
    </main>
  );
}