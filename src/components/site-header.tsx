"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/content/site-content";
import { Container } from "@/components/container";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-slate-900" onClick={() => setIsOpen(false)}>
          Align Care
        </Link>

        <nav aria-label="Main navigation" className="hidden gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 md:inline-block"
        >
          Call Us
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          Menu
        </button>
      </Container>

      {isOpen ? (
        <div id="mobile-nav" className="border-t border-slate-200 bg-white md:hidden">
          <Container className="py-3">
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {navItems.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`rounded-md px-3 py-2 text-sm font-medium ${
                      active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
