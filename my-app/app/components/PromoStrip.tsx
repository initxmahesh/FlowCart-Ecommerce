"use client";

import { ArrowRight, Timer } from "lucide-react";

export function PromoStrip() {
  return (
    <div className="relative overflow-hidden bg-foreground py-2.5">
      {/* subtle texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,1) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative mx-auto flex max-w-[1480px] flex-col items-center justify-between gap-6 px-6 md:flex-row md:gap-10 lg:px-10">
        {/* Left: Offer copy */}
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-6">
          <div className="flex items-center gap-2 rounded-full border border-background/15 bg-background/10 px-4 py-1.5">
            <Timer className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
              Ends Sunday
            </span>
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl font-semibold leading-tight text-background md:text-xl">
              Summer Launch Offer
            </h3>
            <p className="mt-1 text-sm text-background/60">
              25% off the full Summer Collection — plus free carbon‑neutral shipping on all orders.
            </p>
          </div>
        </div>

        {/* Right: CTA + code */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <div className="flex items-center gap-3 rounded-full border border-dashed border-background/25 bg-background/5 px-5 py-2.5">
            <span className="text-[10px] uppercase tracking-[0.14em] text-background/50">Code</span>
            <span className="font-mono text-sm font-semibold tracking-wider text-background">SUMMER25</span>
          </div>
          <a
            href="#products"
            className="group inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Shop the Sale
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
