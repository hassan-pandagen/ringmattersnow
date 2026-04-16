"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Real Stories", href: "/category/real-stories" },
  { label: "Society", href: "/category/society" },
  { label: "Hidden Truths", href: "/category/hidden-truths" },
  { label: "Brave Lives", href: "/category/brave-lives" },
  { label: "Human Moments", href: "/category/human-moments" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]">
      <div className="mx-auto max-w-[var(--width-content)] px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">
            Ring<span className="text-brand">Matters</span>Now
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Mobile Hamburger */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-0.5 bg-[var(--text)] transition-transform duration-200"
              style={mobileOpen ? { transform: "rotate(45deg) translateY(6px)" } : undefined}
            />
            <span
              className="block w-5 h-0.5 bg-[var(--text)] transition-opacity duration-200"
              style={mobileOpen ? { opacity: 0 } : undefined}
            />
            <span
              className="block w-5 h-0.5 bg-[var(--text)] transition-transform duration-200"
              style={mobileOpen ? { transform: "rotate(-45deg) translateY(-6px)" } : undefined}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-b border-[var(--border)]"
          >
            <nav className="flex flex-col px-4 py-4 gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium py-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
