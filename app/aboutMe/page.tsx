"use client";

import Header from "../header";
import Footer from "../footer";

const techStack = [
  "TypeScript",
  "JavaScript",
  "HTML/CSS",
  "React",
  "Node.js",
  "PostgreSQL",
];

const flowMediums = [
  "Fire Poi Spinning",
  "Flow Wand",
  "Van Life Rigging",
  "Permaculture",
  "Campfire Foraging",
  "Open-Air Cooking",
];

const journey = [
  {
    year: "2018",
    title: "The Spark",
    description:
      "Started Computer Engineering degree, unraveling the mysteries behind computation and discrete logic.",
  },
  {
    year: "2021",
    title: "Open Skies",
    description:
      "First exchange trip to Eskişehir. Picked up fire spinning and fell in deep with movement culture.",
  },
  {
    year: "2022",
    title: "Catfarm Refuge",
    description:
      "Lived off-grid in an ecological community, bridging green technology and wild survival.",
  },
  {
    year: "2024",
    title: "Amsterdam Chapters",
    description:
      "Relocated to the canal hub. Designing core platforms while seeking nearby coastlines.",
  },
];

export default function AboutMePage() {
  return (
    <main className="min-h-screen bg-[#f3ede3]">
      <Header />
      <section className="text-center px-6 pt-16 pb-20">
        <p className="italic font-serif text-4xl md:text-5xl text-orange-500 mb-3">
          Meet the Dreamer
        </p>
        <h1 className="font-serif text-lg md:text-xl text-slate-800">
          About Me & My Worlds
        </h1>
        <div className="mt-6 text-slate-400 text-xl">✳</div>

        <button
          type="button"
          onClick={() =>
            document
              .getElementById("intro")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="mt-10 mx-auto w-fit flex flex-col items-center gap-2 text-slate-400 hover:text-slate-600 transition animate-bounce"
        >
          <span className="text-xs uppercase tracking-widest">
            Scroll to explore
          </span>
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </section>

      {/* Intro: text + photo */}
      <section id="intro" className="max-w-5xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-12 items-center scroll-mt-24">
        <div>
          <p className="italic font-serif text-2xl text-orange-500 mb-4">
            I&apos;m Ekinsu.
          </p>
          <p className="font-serif text-xl md:text-2xl text-slate-900 leading-snug mb-6">
            &ldquo;I build elegant digital infrastructure by day, but my soul
            belongs to mountain ridges, dusty vans, and the raw expression of
            fire arts under open skies.&rdquo;
          </p>
          <p className="text-slate-500 text-sm leading-relaxed max-w-md">
            I believe that technology shouldn&apos;t alienate us from our
            natural elements — it should free us to explore them. My path as
            a developer isn&apos;t just about code; it&apos;s about building
            tools that allow humans to live dynamically. My work with flow
            arts is the physical anchor to my mental architecture.
          </p>
        </div>

        <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-sm">
          <img
            src="/bg.png"
            alt="Ekinsu"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Journey Highlights */}
      <section className="bg-[#faf6ee] px-6 py-20">
        <h2 className="text-center italic font-serif text-3xl text-slate-800 mb-14">
          Journey Highlights
        </h2>

        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {journey.map((j) => (
            <div
              key={j.year}
              className="rounded-2xl border border-slate-200 p-6"
            >
              <p className="font-serif italic text-orange-500 text-lg mb-2">
                {j.year}
              </p>
              <h3 className="font-semibold text-slate-900 mb-2">{j.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {j.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools & Mediums */}
      <section className="bg-[#f3ede3] px-6 py-20 text-center">
        <p className="italic font-serif text-2xl text-orange-500 mb-2">
          Tools & Mediums
        </p>
        <h2 className="font-serif text-xl text-slate-800 mb-14">
          Crafts I practice
        </h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 text-left">
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">
              Languages & Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-orange-200 bg-orange-50 text-orange-700 text-xs uppercase tracking-wide px-3 py-1.5"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">
              Life & Flow Mediums
            </h3>
            <div className="flex flex-wrap gap-2">
              {flowMediums.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs uppercase tracking-wide px-3 py-1.5"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
