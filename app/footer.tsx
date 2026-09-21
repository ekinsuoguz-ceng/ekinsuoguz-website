const socialLinks = [
  { href: "https://www.linkedin.com/in/ekinsu-o%C4%9Fuz-0b546322a/", label: "LinkedIn" },
  { href: "https://github.com/ekinsuoguz-ceng", label: "GitHub" },
  { href: "https://www.youtube.com/@sadeceekinsu", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-[#f3ede3] border-t border-slate-300 px-6 py-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <div>
          <p className="italic font-serif text-xl text-orange-500">
            ekinsu.
          </p>
          <p className="text-slate-500 text-sm mt-1">
            Same sky, different places, same soul.
          </p>
          <p className="text-slate-400 text-xs mt-6">
            © 2026 Ekinsu. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3">
          <nav className="flex gap-5 text-sm text-slate-600">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="italic font-serif text-sm text-emerald-600">
            Designed with nature & light 🌿
          </p>
        </div>
      </div>
    </footer>
  );
}
