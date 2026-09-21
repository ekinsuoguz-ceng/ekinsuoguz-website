const navLinks = [
    { href: './aboutMe', label: 'About Me' },
    { href: './experiences', label: 'Experiences' },
    { href: './posts', label: 'Posts' },
    { href: './travels', label: 'Travels' }
];

export default function Header() {
    return (
    <header className="pt-5 z-50 ">
      <div className="max-w-7xl mx-auto py-4 flex items-center gap-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          <a href="/">Ekinsu.</a>
        </h1>
        <nav className="flex-1 flex justify-center gap-10 text-lg font-medium text-slate-600 whitespace-nowrap">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-slate-900 transition">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex justify-end">
          <a
            href="mailto:ekinsuoguz.dev@gmail.com"
            className="rounded-full border border-slate-300 px-5 py-2 font-mono text-md text-slate-700 hover:border-slate-400 hover:text-slate-900 transition"
          >
            get in touch
          </a>
        </div>
      </div>
    </header>
  );
}