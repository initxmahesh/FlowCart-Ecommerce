"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Shop",         href: "#products"     },
  { label: "Sale",         href: "#campaign"     },
  { label: "FAQs",         href: "#faq"          },
  { label: "Testimonials", href: "#testimonials" },
];

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="7"  x2="20" y2="7"  />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [mounted,   setMounted]   = useState(false);

  const cartCount = 0;
  const wishCount = 0;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-[#e0dfd9] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-350 items-center justify-between px-4 sm:px-6 lg:px-10">
        <button
          aria-label="Open menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="-ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#0f0f0f] transition-colors hover:bg-black/5 lg:hidden"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Logo */}
        <a
          href="/"
          className="text-2xl font-bold tracking-tight text-[#0f0f0f] transition-opacity hover:opacity-80"
        >
          <span style={{ fontFamily: "var(--font-geist)" }}>flow</span>
          <em
            className="text-[#3B6FE8]"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            cart
          </em>
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex xl:gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={[
                "relative text-sm text-[#0f0f0f]/75 transition-colors duration-200 hover:text-[#0f0f0f]",
                /* animated underline */
                "after:absolute after:bottom-[-5px] after:left-0",
                "after:h-px after:w-0 after:bg-[#3B6FE8]",
                "after:transition-[width] after:duration-300 after:content-['']",
                "hover:after:w-full",
              ].join(" ")}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            aria-label="Search"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#0f0f0f] transition-colors hover:bg-black/5"
          >
            <SearchIcon />
          </button>

          <button
            aria-label="Wishlist"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-[#0f0f0f] transition-colors hover:bg-black/5"
          >
            <HeartIcon />
            {mounted && wishCount > 0 && (
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#3B6FE8]" />
            )}
          </button>

          <button
            aria-label="Open cart"
            className="relative inline-flex h-10 items-center gap-2 rounded-full bg-[#0f0f0f] px-3.5 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.03] hover:bg-[#2a2a2a] sm:px-4"
          >
            <BagIcon />
            <span className="hidden sm:inline">Cart</span>
            <span
              suppressHydrationWarning
              className="rounded-full bg-white/15 px-2 py-0.5 text-xs tabular-nums"
            >
              {mounted ? cartCount : 0}
            </span>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        } ${scrolled ? "glass" : "bg-[#f6f5f0]/95 backdrop-blur-md"} border-b border-[#e0dfd9]`}
      >
        <div className="mx-auto max-w-[1400px] px-4 pb-5 pt-1 sm:px-6">

          {/* Nav links */}
          <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-[#e8e6df]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-4 text-sm font-medium text-[#3a3a3a] transition-colors duration-200 hover:text-[#0f0f0f]"
              >
                {link.label}
              </a>
            ))}
          </nav>

        </div>
      </div>
    </header>
  );
}
