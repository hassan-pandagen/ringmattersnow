import Link from "next/link";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto max-w-[var(--width-content)] px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-lg font-bold tracking-tight">
            Ring<span className="text-brand">Matters</span>Now
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
          &copy; {new Date().getFullYear()} Ring Matters Now. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
