"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CloseIcon, MenuBarIcon, UserIcon } from "@/components/icons/UserIcon";

const NAV_LINKS = [
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-primary text-white">
        <div className="flex items-center justify-between px-4 py-3 md:py-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="SkyShip"
              width={140}
              height={40}
              priority
              className="h-8 w-auto md:h-10"
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-sky-100"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-white/80 px-4 py-1.5 text-sm font-semibold transition hover:bg-white hover:text-primary"
            >
              <UserIcon className="h-4 w-4" />
              <span>Login</span>
            </Link>
          </nav>

          {/* Mobile actions */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-white/80 px-3 py-1 text-xs font-semibold transition hover:bg-white hover:text-primary"
            >
              <UserIcon className="h-4 w-4" />
              <span>Login</span>
            </Link>

            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/70 text-white transition hover:bg-white/10"
            >
              <MenuBarIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {menuOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Mobile drawer panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-full transform bg-white shadow-xl transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/images/logo.png"
              alt="SkyShip"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </Link>

          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-2 py-4 text-[15px] text-slate-900">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between rounded-md px-3 py-2.5 hover:bg-slate-50"
            >
              <span>{item.label}</span>
              <span className="text-sm text-slate-400">&rsaquo;</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}

