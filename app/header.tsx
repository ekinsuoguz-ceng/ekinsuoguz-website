import Link from "next/link";

const navLinks = [
    { href: './aboutMe', label: 'About Me' },
    { href: './experiences', label: 'Experiences' },
    { href: './posts', label: 'Posts' },
    { href: './travels', label: 'Travels' }
];

export default function Header({ variant = "default" }: { variant?: "default" | "about" }) {
    const isAbout = variant === "about";

    return (
    <header className={`relative z-50 px-6 pt-4 ${isAbout ? "bg-[#D2A844]" : ""}`}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 py-4">
        <h1 className={`text-2xl font-bold tracking-tight ${isAbout ? "text-[#244337]" : "text-slate-900"}`}>
          <Link href="/">Ekinsu.</Link>
        </h1>
        <nav className={`order-3 flex basis-full flex-1 justify-start gap-5 overflow-x-auto whitespace-nowrap text-sm font-medium md:order-none md:basis-auto md:justify-center md:gap-10 md:text-lg ${isAbout ? "text-[#47604C]" : "text-slate-600"}`}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={`transition ${isAbout ? "hover:text-[#18382D]" : "hover:text-slate-900"}`}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="order-2 ml-auto flex justify-end md:order-none md:ml-0">
          <a
            href="mailto:ekinsuoguz.dev@gmail.com"
            className={`rounded-full border px-5 py-2 font-mono text-md transition ${isAbout ? "border-[#59704B] text-[#244337] hover:border-[#244337] hover:bg-[#E8BD56]" : "border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-900"}`}
          >
            get in touch
          </a>
        </div>
      </div>
    </header>
  );
}