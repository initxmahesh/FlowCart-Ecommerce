"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const STARS = Array.from({ length: 5 });

const testimonials = [
  {
    quote: "FlowCart is the only place I shop now. Every piece feels considered — from the packaging to the stitching.",
    name: "Amelia Chen",
    role: "Designer, London",
    initials: "AC",
  },
  {
    quote: "The headphones replaced a pair three times the price. Quietly excellent, no marketing fluff.",
    name: "Marcus Adeyemi",
    role: "Architect, Lagos",
    initials: "MA",
  },
  {
    quote: "Their leather goods age like fine wine. Two years in and my wallet looks better than the day it arrived.",
    name: "Sara Lindqvist",
    role: "Founder, Stockholm",
    initials: "SL",
  },
  {
    quote: "I've bought from countless brands. This is the first time I've felt truly understood as a customer.",
    name: "James Ko",
    role: "Creative Director, Seoul",
    initials: "JK",
  },
  {
    quote: "The attention to detail is remarkable. Every product tells a story of craftsmanship and care.",
    name: "Isabella Martinez",
    role: "Photographer, Barcelona",
    initials: "IM",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setSlidesToShow(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - slidesToShow);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section id="testimonials" className="bg-[#ebe5dc] py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-12 flex items-end justify-between gap-8">
          <div className="max-w-4xl">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-foreground/40">
              — WORN BY
            </p>
            <h2 className="font-serif text-[clamp(2.75rem,5.5vw,5.5rem)] font-normal leading-[1.05] tracking-tight text-foreground">
              The people who keep us honest.
            </h2>
          </div>

          {/* Navigation Controls - Desktop */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:bg-foreground hover:border-foreground disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-foreground transition-colors group-hover:text-background" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:bg-foreground hover:border-foreground disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-foreground transition-colors group-hover:text-background" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
            }}
          >
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex min-w-full flex-col rounded-3xl bg-[#f5f1ea] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]"
              >
                <div className="flex gap-1">
                  {STARS.map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-foreground text-foreground" strokeWidth={0} />
                  ))}
                </div>

                <blockquote className="mt-6 font-serif text-[1.375rem] leading-[1.3] tracking-tight text-foreground">
                  "{t.quote}"
                </blockquote>

                <figcaption className="mt-auto flex items-center gap-3 pt-8">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-foreground">{t.name}</p>
                    <p className="text-[13px] text-foreground/60">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-foreground"
                  : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="mt-6 flex items-center justify-center gap-2 lg:hidden">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:bg-foreground hover:border-foreground disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-foreground transition-colors group-hover:text-background" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:bg-foreground hover:border-foreground disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-foreground transition-colors group-hover:text-background" />
          </button>
        </div>
      </div>
    </section>
  );
}
