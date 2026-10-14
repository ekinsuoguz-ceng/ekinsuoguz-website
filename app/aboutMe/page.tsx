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
    year: "2019",
    title: "The Beginning",
    description:
      "Finished high school and started looking for a path where technology and curiosity could meet.",
  },
  {
    year: "2020–2025",
    title: "Into Tech",
    description:
      "Studied Computer Engineering, built things, broke things, learned, and slowly found my place in software.",
  },
  {
    year: "2023–2025",
    title: "Across Europe",
    description:
      "Traveled across Italy, Hungary, Czechia, Austria, Germany, Spain, Belgium, France and the Netherlands, collecting stories, people and moments along the way.",
  },
  {
    year: "2026",
    title: "Catfarm, France",
    description:
      "Lived in an ecological community near Poussan, surrounded by nature, creativity and people from everywhere.",
  },

];

export default function AboutMePage() {
  return (
    <main className="min-h-screen bg-[#F8F1DF]">
      <Header variant="about" />
      <section className="relative overflow-hidden bg-gradient-to-b from-[#D2A844] via-[#E8BD56] to-[#F8F1DF] px-6 pt-16 pb-24 text-center">
        <p className="mb-3 font-serif text-4xl italic text-[#9E4D2D] md:text-5xl">
          Meet the Dreamer
        </p>
        <h1 className="font-serif text-lg text-[#244337] md:text-xl">
          About Me & My Worlds
        </h1>
        <div className="mt-6 text-[#9E4D2D] text-xl">✳</div>

        <button
          type="button"
          onClick={() =>
            document
              .getElementById("intro")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="mt-10 mx-auto flex w-fit flex-col items-center gap-2 text-[#47604C] transition hover:text-[#18382D] animate-bounce"
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
      <section id="intro" className="mx-auto grid max-w-5xl scroll-mt-24 grid-cols-1 items-center gap-12 px-6 pb-24 md:grid-cols-2">
        <div>
          <p className="mb-4 font-serif text-2xl italic text-[#B45B35]">
            I&apos;m Ekinsu.
          </p>
          <p className="mb-6 font-serif text-xl leading-snug text-[#244337] md:text-2xl">
            &ldquo;I build elegant digital infrastructure by day, but my soul
            belongs to mountain ridges, dusty vans, and the raw expression of
            fire arts under open skies.&rdquo;
          </p>
          <p className="max-w-md text-sm leading-relaxed text-[#687366]">
            I believe that technology shouldn&apos;t alienate us from our
            natural elements — it should free us to explore them. My path as
            a developer isn&apos;t just about code; it&apos;s about building
            tools that allow humans to live dynamically. My work with flow
            arts is the physical anchor to my mental architecture.
          </p>
        </div>

        <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border-4 border-white/70 shadow-xl shadow-[#73572B]/15">
          <img
            src="/bg.png"
            alt="Ekinsu"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Journey Highlights */}
      <section className="bg-[#244337] px-6 py-20 text-[#F8F1DF]">
        <h2 className="mb-14 text-center font-serif text-3xl italic text-[#F2D98E]">
          Journey Highlights
        </h2>

        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {journey.map((j) => (
            <div
              key={`${j.year}-${j.title}`}
              className="rounded-lg border border-[#66806A] bg-[#2D5142] p-6 transition-colors hover:bg-[#365E4D]"
            >
              <p className="mb-2 font-serif text-lg italic text-[#E8BD56]">
                {j.year}
              </p>
              <h3 className="mb-2 font-semibold text-[#FFF8E8]">{j.title}</h3>
              <p className="text-sm leading-relaxed text-[#D6DFD0]">
                {j.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools & Mediums */}
      <section className="bg-gradient-to-b from-[#E8E5CC] via-[#F1EBD6] to-[#F3EDE3] px-6 py-20 text-center">
        <p className="mb-2 font-serif text-2xl italic text-[#9E4D2D]">
          Tools & Mediums
        </p>
        <h2 className="mb-14 font-serif text-xl text-[#244337]">
          Crafts I practice
        </h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 text-left">
          <div>
            <h3 className="mb-4 font-semibold text-[#244337]">
              Languages & Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[#D7A878] bg-[#FFF9EC] px-3 py-1.5 text-xs uppercase tracking-wide text-[#9E4D2D]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-[#244337]">
              Life & Flow Mediums
            </h3>
            <div className="flex flex-wrap gap-2">
              {flowMediums.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-[#91A987] bg-[#F5F7EB] px-3 py-1.5 text-xs uppercase tracking-wide text-[#365E4D]"
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
