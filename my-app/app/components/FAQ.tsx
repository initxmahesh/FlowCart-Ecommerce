"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day hassle-free return policy. If you're not completely satisfied with your purchase, simply contact our concierge team and we'll arrange a pickup at no extra cost.",
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 3-5 business days. Express shipping (1-2 business days) is available at checkout. We ship worldwide and provide real-time tracking for every order.",
  },
  {
    question: "Are the products authentic?",
    answer: "Every item in our catalog is 100% authentic. We work directly with brands and authorised distributors to guarantee genuineness - no grey-market or replica goods, ever.",
  },
  {
    question: "Can I change or cancel my order?",
    answer: "Orders can be modified or cancelled within 2 hours of placement. After that window closes, the order enters fulfilment. Reach out to our concierge and we'll do our best to help.",
  },
  {
    question: "Do you offer gift wrapping?",
    answer: "Yes! Select the gift-wrap option at checkout to have your order beautifully packaged with a personalised handwritten card. Perfect for any occasion.",
  },
];

function Item({
  question,
  answer,
  open,
  onToggle,
  i,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
  i: number;
}) {
  return (
    <div className="border-b border-foreground/10">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-8 py-3 text-left"
      >
        <span className="flex items-baseline gap-6">
          <span className="font-mono text-sm tabular-nums text-foreground/40">
            0{i + 1}
          </span>
          <span className="text-2xl font-medium leading-tight lg:text-2xl">
            {question}
          </span>
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-foreground/15 transition-transform duration-500 ${
            open ? "rotate-45 bg-foreground text-background border-transparent" : ""
          }`}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>

      <div
        className="grid transition-all duration-500 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-full pb-2 pl-12 text-base text-justify leading-relaxed text-foreground/55">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="bg-background py-5 lg:py-5">
      <div className="mx-auto grid max-w-350 grid-cols-1 gap-64 lg:grid-cols-[1fr_2fr] lg:gap-64">
        {/* Left label */}
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-foreground/50">
            — FAQ
          </p>
          <h2 className="mt-4 text-[clamp(2.5rem,4vw,3rem)] font-medium leading-[0.95] tracking-tight">
            Quietly{" "}
            <em className="not-italic text-foreground/40">Answered.</em>
          </h2>
          <p className="mt-5 max-w-full text-sm leading-relaxed text-foreground/55">
            Still curious? Reach out via mail or phone, or find us on social media.
          </p>
        </div>

        {/* Accordion */}
        <div>
          {faqs.map((f, i) => (
            <Item
              key={i}
              i={i}
              question={f.question}
              answer={f.answer}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
