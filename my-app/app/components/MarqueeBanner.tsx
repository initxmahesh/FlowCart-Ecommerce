const items = [
  "Free Returns",
  "Lifetime Repair Program",
  "Designed in Copenhagen",
  "Made in Small Batches",
  "Carbon-Neutral Shipping",
  "Sale",
  "Made in Nepal",
  "Premium Designs",
  "Your Own Choices",
  "Affordable",
  "Branded Clothes",
  "Imported Products",
  "Your Own Choice"
];

export default function MarqueeBanner() {
  const doubled = [...items, ...items];

  return (
    <div className="border-t border-[#e0dfd9] overflow-hidden py-3 bg-transparent">
      <div className="animate-marquee">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 text-[11px] font-medium tracking-[0.14em] text-[#888] uppercase px-4"
          >
            {item}
            <span className="text-[#c5c4be]">&middot;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
