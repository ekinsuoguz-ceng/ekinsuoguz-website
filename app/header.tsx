const navLinks = [
    { href: '/#about', label: 'Hakkımda' },
    { href: './experiences', label: 'Deneyimler' },
    { href: './educations', label: 'Eğitim' },
    { href: './posts', label: 'Yazılar' },
    { href: './travels', label: 'Geziler' }
];

export default function Header() {
    return (
    <header className="sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Ekinsu.
        </h1>
        <nav className="flex gap-6 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-slate-900 transition">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}