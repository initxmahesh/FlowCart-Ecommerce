"use client";

import {
  ArrowRight,
  Star,
  Truck,
  RotateCcw,
  Sparkles,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { PromoStrip } from "./PromoStrip";

const TRUST_ITEMS = [
  { Icon: Truck, label: "Free carbon‑neutral shipping" },
  { Icon: RotateCcw, label: "30‑day easy returns" },
  { Icon: Sparkles, label: "Traceable premium materials" },
] as const;

const STARS = Array.from({ length: 5 });

export function Banner() {
  return (
    <section
      id="campaign"
      className="relative overflow-hidden bg-surface py-24 lg:py-26"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-24 h-[520px] w-[520px] rounded-full bg-[#d4b896]/50 blur-3xl" />
        <div className="absolute top-1/3 right-[-10%] h-[640px] w-[640px] rounded-full bg-[#c8a07a]/30 blur-3xl" />
        <div className="absolute bottom-[-20%] left-1/3 h-[480px] w-[480px] rounded-full bg-[#b8c4b8]/35 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#1a1714_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      <div className="relative mx-auto grid max-w-350 grid-cols-1 gap-12 px-6 pb-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-10 xl:gap-24">
        <div className="flex min-h-[60vh] flex-col justify-center lg:min-h-[78vh]">
          <div className="mt-0 inline-flex w-fit items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Limited Drop - 25% Off
            </span>
          </div>

          <h2 className="mt-6 font-serif font-semibold leading-[0.86] tracking-tight text-foreground text-[clamp(3.25rem,9vw,8.25rem)]">
            <span className="block">Designed</span>
            <span className="block italic text-muted-foreground">for</span>
            <span className="block">Movement.</span>
          </h2>

          <p className="mt-8 max-full text-base text-justify leading-relaxed text-muted-foreground lg:text-lg">
            Minimal forms. Premium materials. A 24-piece capsule built for
            modern everyday living - sun, salt, motion and the long way home.
          </p>

          <div className="mt-20 flex flex-wrap gap-x-7 gap-y-3 text-xs text-muted-foreground">
            {TRUST_ITEMS.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon
                  className="h-3.5 w-3.5 text-foreground"
                  strokeWidth={1.75}
                />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[60vh] lg:min-h-[70vh]">
          <div className="relative h-full w-full">
            <div className="absolute right-0 top-0 hidden h-[48%] w-[65%] overflow-hidden rounded-2xl shadow-xl md:block">
              <Image
                src="/hero.jpg"
                alt="Model walking in flowing linen at golden hour"
                fill
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 0vw, 30vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-foreground/10 via-transparent to-transparent" />
            </div>

            <div className="absolute inset-0 top-auto bottom-0 h-[78%] w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#e8ddd0] to-[#d4c4b0] shadow-2xl md:left-0 md:right-auto md:h-[60%] md:w-[58%]">
              <Image
                src="/hero.jpg"
                alt="FlowCart signature low‑top sneaker, Summer 2026"
                fill
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_30%_15%,rgba(255,255,255,0.35),transparent_60%)]" />
            </div>
            <div className="absolute left-2 top-6 z-10 hidden rounded-full border border-foreground/10 bg-background/85 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground shadow-lg backdrop-blur-md md:flex md:items-center md:gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              New Drop · 24 Pieces
            </div>
            <div className="group absolute -left-18 bottom-2 z-10 w-[200px] cursor-default rounded-xl border border-foreground/10 bg-background/90 p-2 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center gap-0.5 text-accent">
                {STARS.map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-current"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <div className="mt-1 font-serif text-xl font-semibold leading-none text-foreground">
                4.9
              </div>
              <div className="mt-1 text-[10px] text-muted-foreground">
                From 2,847 verified reviews
              </div>
            </div>
            <div className="group absolute -right-10 top-1/2 z-10 hidden -translate-y-1/2 rounded-xl border border-foreground/10 bg-background/90 p-2 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 md:block">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Featured in
              </div>
              <div className="mt-1 font-serif text-lg font-semibold italic text-foreground">
                Monocle
              </div>
              <div className="text-[11px] text-muted-foreground">
                "Quietly excellent."
              </div>
            </div>
          </div>
        </div>
      </div>
      <PromoStrip />
    </section>
  );
}
