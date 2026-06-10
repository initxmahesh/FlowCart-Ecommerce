"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import MarqueeBanner from "./MarqueeBanner";

function StarIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#3B6FE8">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="#3B6FE8">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

const FEATURES = [
  {
    icon: "truck",
    title: "Carbon-neutral shipping",
    body: "Complimentary on orders over $75. Express delivery within 48h.",
  },
  {
    icon: "shield",
    title: "Lifetime repair program",
    body: "Bring it back forever. We'll mend, recondition, and restore.",
  },
  {
    icon: "leaf",
    title: "Traceable materials",
    body: "Every fibre and metal traced to a certified mill or foundry.",
  },
] as const;

const AVATARS = ["A", "M", "K", "S", "L"];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-eyebrow", {
        y: 14,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.05,
      });
      gsap.from(".hero-line", {
        y: 80,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.1,
      });
      gsap.from(".hero-sub", {
        y: 16,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.5,
      });
      gsap.from(".hero-cta > *", {
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.65,
      });
      gsap.from(".hero-trust", {
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.8,
      });
      gsap.fromTo(
        ".hero-frame",
        { scale: 1.06, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out", delay: 0.3 },
      );
      gsap.from(".hero-float", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.9,
      });
      gsap.from(".hero-orb", { opacity: 0, duration: 1.6, ease: "power2.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={ref} className="relative isolate pt-10 sm:pt-16.5 lg:pt-16.5">
      {/* Ambient orbs (self-contained overflow clip) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-orb animate-orb absolute -left-48 top-16 h-[500px] w-[500px] rounded-full bg-[#3B6FE8]/10 blur-[130px] sm:-left-52 sm:h-[600px] sm:w-[600px]" />
        <div
          className="hero-orb animate-orb absolute -right-48 top-36 h-[420px] w-[420px] rounded-full bg-[#d4a474]/18 blur-[120px] sm:-right-52 sm:h-[500px] sm:w-[500px]"
          style={{ animationDelay: "-7s" }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.65]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#f6f5f0] to-transparent sm:h-36" />

      <div className="relative mx-auto max-w-350 px-4 pb-6.5 pt-8 sm:pt-10 lg:pt-10">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div className="relative">
            <div className="hero-eyebrow inline-flex items-center gap-2.5 rounded-full border border-[#e0dfd9] bg-white px-4 py-2 shadow-sm">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span className="text-sm text-[#555]">
                Summer Collection · Latest Vol.
              </span>
            </div>
            <h1 className="mt-4 overflow-hidden text-[clamp(2rem,7.5vw,6.7rem)] font-black leading-[0.93] tracking-[-0.03em] text-[#0f0f0f] sm:mt-6">
              <span className="hero-line block">Objects made</span>
              <span className="hero-line block">
                <em
                  className="not-italic text-[#3B6FE8]"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontStyle: "italic",
                  }}
                >
                  to last,
                </em>
              </span>
              <span className="hero-line block">not to scroll.</span>
            </h1>

            {/* Subtext */}
            <p className="hero-sub mt-2 text-[15px] text-justify leading-relaxed text-[#666] md:text-base lg:max-w-full">
              FlowCart is a quiet edit of everyday essentials - clothing, carry
              and tools, made by people who care deeply about what they make.
            </p>
            
            <div className="hero-cta mt-2 flex gap-6">
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-full bg-[#0f0f0f] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2a2a2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B6FE8]"
              >
                Shop the collection
                <ArrowRight />
              </a>
              <a
                href="#faq"
                className="inline-flex items-center gap-2 rounded-full border border-[#e0dfd9] bg-white px-4 py-3 text-sm font-medium text-[#0f0f0f] transition-colors hover:bg-[#f6f5f0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B6FE8]"
              >
                Learn about our values
                <ArrowRight />
              </a>
            </div>

            <div className="hero-trust pt-4">
              <div className="flex flex-wrap items-center gap-4 sm:gap-4">
                {/* Avatar cluster */}
                <div className="flex -space-x-2">
                  {AVATARS.map((c, i) => (
                    <span
                      key={i}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f6f5f0] bg-[#e8e6df] text-[11px] font-medium tracking-wide text-[#555]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <div className="hidden h-8 w-px bg-[#e0dfd9] xs:block sm:block" />
                <div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} size={14} />
                    ))}
                    <span className="ml-1.5 text-sm font-bold text-[#0f0f0f]">
                      4.9
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-[#999]">
                    Trusted by 240,000+ collectors
                  </p>
                </div>
                <div className="hidden h-8 w-px bg-[#e0dfd9] sm:block" />
                <div>
                  <p className="text-2xl font-bold tracking-tight text-[#0f0f0f]">
                    48
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#999]">
                    Countries shipped
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative lg:pl-4 xl:pl-10 xl:pr-8">
            <div className="relative aspect-[4/3] w-full sm:aspect-[3/2] lg:aspect-[4/5]">
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-[#3B6FE8]/12 via-transparent to-[#d4a474]/15 blur-3xl"
              />
              <div className="hero-frame relative h-full w-full overflow-hidden rounded-[1.75rem] bg-[#f0e6d0] shadow-2xl lg:rounded-[2.25rem]">
                <Image
                  src="/hero.jpg"
                  alt="Atelier Backpack — Onyx"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain object-center p-6 pb-20 sm:p-8 sm:pb-24 lg:p-8 lg:pb-28"
                  priority
                />
                <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/85 px-3 py-1.5 text-[11px] font-medium text-[#0f0f0f] shadow-sm backdrop-blur-md">
                    <SparkIcon />
                    Imported from Italy
                  </span>
                </div>
                <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 rounded-xl bg-white/90 p-3 shadow-sm backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:rounded-2xl sm:p-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#aaa]">
                      Featured
                    </p>
                    <p
                      className="mt-0.5 text-lg font-black leading-tight text-[#0f0f0f] sm:text-[1.35rem]"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Atelier{" "}
                      <em
                        className="text-[#3B6FE8]"
                        style={{ fontStyle: "italic" }}
                      >
                        Backpack
                      </em>
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#999]">
                      Vegetable-tanned · Onyx
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p
                      className="text-lg font-black tabular-nums text-[#0f0f0f] sm:text-[1.35rem]"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      $345
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#aaa]">
                      USD
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="hero-float absolute -left-4 top-1/2 hidden w-48 -translate-y-1/2 -rotate-[4deg] lg:block xl:-left-6 xl:w-52"
                style={{
                  animation: "float-slow 9s ease-in-out infinite",
                  animationDelay: "-3s",
                  ["--card-rotate" as string]: "-4deg",
                }}
              >
                <div className="rounded-2xl border border-[#e8e6df] bg-white p-4 shadow-xl">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} size={12} />
                    ))}
                  </div>
                  <p
                    className="mt-2 text-[13px] font-semibold leading-snug text-[#0f0f0f]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    &ldquo;The best object I&apos;ve owned in a decade.&rdquo;
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0f0f0f] text-[9px] font-semibold text-white">
                      AC
                    </span>
                    <p className="text-[10px] text-[#999]">
                      Amelia C. · London
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="hero-float absolute -right-3 top-8 hidden w-36 rotate-[6deg] lg:block xl:-right-7 xl:w-40"
                style={{
                  animation: "float-slow 8s ease-in-out infinite",
                  ["--card-rotate" as string]: "6deg",
                }}
              >
                <div className="rounded-2xl border border-[#e8e6df] bg-white p-3.5 shadow-xl">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#bbb]">
                    Accessories
                  </p>
                  <p className="mt-1 text-[12px] font-semibold leading-tight text-[#0f0f0f]">
                    Field Watch 38
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} size={9} />
                      ))}
                    </div>
                    <p className="text-sm font-bold tabular-nums text-[#0f0f0f]">
                      $320
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MarqueeBanner />
    </section>
  );
}