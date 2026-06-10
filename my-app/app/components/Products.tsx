"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  Component,
  type ReactNode,
  type ErrorInfo,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuery } from "@tanstack/react-query";
import {
  Heart,
  X,
  Minus,
  Plus,
  ShoppingCart,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

class ProductsErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[Products] render error:", error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-sm text-red-500">
            Failed to load products: {this.state.error.message}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

import { listProducts } from "@/lib/products";
import { useCart, useUI, useWishlist } from "@/lib/store";
import { ProductCard } from "@/app/components/ProductCard";

gsap.registerPlugin(ScrollTrigger);

const FILTERS = ["All", "Apparel", "Accessories", "Tech", "Essentials"] as const;
type Filter = (typeof FILTERS)[number];

const PAGE_SIZE = 8;

function QuickViewModal() {
  const quickViewId  = useUI((s) => s.quickViewId);
  const setQuickView = useUI((s) => s.setQuickView);
  const addToCart    = useCart((s) => s.add);
  const toggleWish   = useWishlist((s) => s.toggle);
  const liked        = useWishlist(
    (s) => quickViewId !== null && s.ids.includes(quickViewId),
  );

  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef    = useRef<HTMLDivElement>(null);

  const [qty, setQty]                     = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize]   = useState(0);
  const [added, setAdded]                 = useState(false);

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: listProducts,
  });

  const product = products.find((p) => p.id === quickViewId) ?? null;
  useEffect(() => {
    if (!product) return;
    setQty(1);
    setSelectedColor(0);
    setSelectedSize(0);
    setAdded(false);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.28, ease: "power2.out" },
      );
      gsap.fromTo(
        modalRef.current,
        { scale: 0.92, opacity: 0, y: 28 },
        { scale: 1, opacity: 1, y: 0, duration: 0.42, ease: "power3.out" },
      );
    });
    return () => ctx.revert();
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product?.id]);

  if (!product) return null;

  const handleClose = () => {
    gsap.to(backdropRef.current, {
      opacity: 0, duration: 0.2, ease: "power2.in",
    });
    gsap.to(modalRef.current, {
      scale: 0.94, opacity: 0, y: 16, duration: 0.26, ease: "power2.in",
      onComplete: () => setQuickView(null),
    });
  };

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      ref={backdropRef}
      onClick={(e) => { if (e.target === backdropRef.current) handleClose(); }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        background: "rgba(10,10,10,0.7)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${product.name}`}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-[#f9f7f3] shadow-2xl"
        style={{ maxHeight: "92dvh" }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          aria-label="Close quick view"
          className="absolute right-6 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#0f0f0f] shadow-sm backdrop-blur-sm transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B6FE8]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="overflow-y-auto" style={{ maxHeight: "92dvh" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:items-stretch">
            <div className="relative min-h-[320px] overflow-hidden bg-[#f0ede7] sm:h-full">
              <span className="absolute left-4 top-4 z-10 rounded-full bg-[#0f0f0f] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white">
                {product.tag}
              </span>
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col gap-5 p-5 sm:overflow-y-auto sm:p-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#3B6FE8]">
                  {product.category}
                </p>
                <h2
                  className="mt-1.5 text-2xl font-black leading-tight text-[#0f0f0f] sm:text-3xl"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {product.name}
                </h2>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="13" height="13" viewBox="0 0 24 24"
                        fill={i < Math.round(product.rating) ? "#f59e0b" : "none"}
                        stroke="#f59e0b" strokeWidth="1.5"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-[#0f0f0f]">{product.rating}</span>
                  <span className="text-sm text-[#999]">({product.reviews})</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2.5">
                <span
                  className="text-3xl font-black text-[#0f0f0f]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-[#bbb] line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-[13px] text-justify leading-relaxed text-[#666]">
                {product.description}
              </p>

              {/* Color */}
              <div>
                <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#999]">
                  Color
                </p>
                <div className="flex gap-2.5">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      aria-label={`Color option ${i + 1}`}
                      className={[
                        "h-5 w-5 rounded-full border-2 transition-transform hover:scale-110",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B6FE8]",
                        selectedColor === i
                          ? "scale-110 border-[#0f0f0f]"
                          : "border-transparent",
                      ].join(" ")}
                      style={{
                        background: color,
                        boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              {product.sizes && (
                <div>
                  <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#999]">
                    Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, i) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(i)}
                        className={[
                          "rounded-xl border px-2 py-1 text-xs font-medium transition-all",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B6FE8]",
                          selectedSize === i
                            ? "border-[#0f0f0f] bg-[#0f0f0f] text-white"
                            : "border-[#e0dfd9] bg-white text-[#3a3a3a] hover:border-[#0f0f0f]",
                        ].join(" ")}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#999]">
                  Quantity
                </p>
                <div className="inline-flex items-center rounded-2xl border border-[#e0dfd9] bg-white">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    aria-label="Decrease quantity"
                    className="flex h-10 w-10 items-center justify-center rounded-l-2xl text-[#3a3a3a] transition-colors hover:bg-[#f5f5f0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B6FE8]"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="min-w-[2.5rem] text-center text-sm font-semibold tabular-nums text-[#0f0f0f]">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    aria-label="Increase quantity"
                    className="flex h-10 w-10 items-center justify-center rounded-r-2xl text-[#3a3a3a] transition-colors hover:bg-[#f5f5f0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B6FE8]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <button
                  onClick={handleAddToCart}
                  className={[
                    "flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold",
                    "transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B6FE8]",
                    added
                      ? "scale-[0.98] bg-emerald-500 text-white"
                      : "bg-[#0f0f0f] text-white hover:scale-[1.02] hover:bg-[#2a2a2a]",
                  ].join(" ")}
                >
                  {added ? (
                    <><Check className="h-4 w-4" /> Added to cart</>
                  ) : (
                    <><ShoppingCart className="h-4 w-4" /> Add to cart</>
                  )}
                </button>

                <button
                  onClick={() => toggleWish(product.id)}
                  aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
                  className={[
                    "flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl border",
                    "transition-all duration-200 hover:scale-110",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B6FE8]",
                    liked
                      ? "border-red-200 bg-red-50 text-red-500"
                      : "border-[#e0dfd9] bg-white text-[#3a3a3a] hover:border-red-300",
                  ].join(" ")}
                >
                  <Heart
                    className={`h-[18px] w-[18px] transition-all ${liked ? "fill-red-500 text-red-500" : ""}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProductGridProps {
  active: Filter;
  expanded: boolean;
  onToggleExpand: () => void;
}

function ProductGrid({ active, expanded, onToggleExpand }: ProductGridProps) {
  const gridRef  = useRef<HTMLDivElement>(null);
  const btnRef   = useRef<HTMLDivElement>(null);

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: listProducts,
  });

  const filtered = active === "All" ? data : data.filter((p) => p.category === active);
  const visible  = filtered.slice(0, PAGE_SIZE);
  const extra    = filtered.slice(PAGE_SIZE);
  const hasMore  = extra.length > 0;

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".extra-card");
    if (!cards.length) return;

    if (expanded) {
      gsap.set(cards, { display: "block" });
      gsap.fromTo(
        cards,
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power3.out" },
      );
    } else {
      gsap.to(cards, {
        opacity: 0, y: 24, duration: 0.35, stagger: 0.04, ease: "power2.in",
        onComplete: () => gsap.set(cards, { display: "none", y: 0 }),
      });
    }
  }, [expanded, active]);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".extra-card");
    gsap.set(cards, { display: "none", opacity: 0, y: 0 });
  }, [active]);

  useEffect(() => {
    if (!gridRef.current) return;
    const grid  = gridRef.current;
    const ctx = gsap.context(() => {
      const cards = Array.from(grid.querySelectorAll<HTMLElement>(".product-card"));
      if (!cards.length) return;
      gsap.from(cards, {
        y: 60, opacity: 0, duration: 0.9, stagger: 0.08, ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 82%",
          scroller: "#scroll-root",
        },
      });
    });
    return () => ctx.revert();
  }, [active]);

  if (isLoading) return <SkeletonGrid />;
  if (isError) return (
    <div className="col-span-full py-12 text-center text-sm text-red-500">
      Failed to load products. Please refresh.
    </div>
  );

  const handleToggle = () => {
    const btn = btnRef.current?.querySelector<HTMLElement>(".see-more-btn");
    if (btn) {
      gsap.fromTo(
        btn,
        { scale: 0.94 },
        { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.5)" },
      );
    }
    onToggleExpand();
  };

  if (filtered.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#f0ede7]">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
            <path d="M8 11h6M11 8v6" />
          </svg>
        </div>
        <h3
          className="text-xl font-bold text-[#0f0f0f]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Nothing here yet
        </h3>
        <p className="mt-2 text-sm text-[#888]">
          Try a different category to discover more.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        ref={gridRef}
        className="product-grid grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4"
        role="list"
        aria-label="Products"
      >
        {visible.map((p, i) => (
          <div key={p.id} role="listitem">
            <ProductCard product={p} index={i} />
          </div>
        ))}

        {hasMore && extra.map((p, i) => (
          <div
            key={p.id}
            role="listitem"
            className="extra-card"
            style={{ display: "none", opacity: 0 }}
          >
            <ProductCard product={p} index={PAGE_SIZE + i} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div
          ref={btnRef}
          className="mt-5 flex items-center justify-center"
        >
          <button
            onClick={handleToggle}
            aria-expanded={expanded}
            aria-label={expanded ? "Show fewer products" : "See more products"}
            className={[
              "see-more-btn group relative inline-flex items-center gap-1 overflow-hidden rounded-2xl",
              "border border-[#e0dfd9] bg-white px-4 py-2 text-sm font-medium text-[#0f0f0f]",
              "shadow-sm transition-shadow duration-300 hover:shadow-md",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B6FE8]",
            ].join(" ")}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-[#0f0f0f] transition-transform duration-300 ease-out group-hover:scale-y-100"
            />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              {expanded ? "See less" : "See more"}
            </span>
            <span className="relative z-10 flex h-5 w-5 items-center justify-center transition-colors duration-300 group-hover:text-white">
              {expanded
                ? <ChevronUp  className="h-3.5 w-3.5" />
                : <ChevronDown className="h-3.5 w-3.5" />}
            </span>
          </button>
        </div>
      )}
    </>
  );
}

export function Products() {
  const sectionRef = useRef<HTMLElement>(null);

  const [active, setActive]     = useState<Filter>("All");
  const [expanded, setExpanded] = useState(false);
  const quickViewId             = useUI((s) => s.quickViewId);

  const handleFilter = useCallback((f: Filter) => {
    setActive(f);
    setExpanded(false);
    requestAnimationFrame(() => {
      gsap.fromTo(
        ".product-card",
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: "power3.out" },
      );
    });
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const scroller = "#scroll-root";
    const section  = sectionRef.current;

    const eyebrow = section.querySelector(".fp-eyebrow");
    const heading = section.querySelector(".fp-heading");
    const subtext = section.querySelector(".fp-subtext");
    const filters = section.querySelectorAll(".fp-filter");

    if (!eyebrow || !heading || !subtext) return;

    const ctx = gsap.context(() => {
      const triggerCfg = { trigger: section, start: "top 82%", scroller };

      gsap.from(eyebrow, {
        y: 16, opacity: 0, duration: 0.65, ease: "power3.out",
        scrollTrigger: triggerCfg,
      });
      gsap.from(heading, {
        y: 44, opacity: 0, duration: 0.9, ease: "power4.out", delay: 0.07,
        scrollTrigger: triggerCfg,
      });
      gsap.from(subtext, {
        y: 20, opacity: 0, duration: 0.65, ease: "power3.out", delay: 0.17,
        scrollTrigger: triggerCfg,
      });
      if (filters.length) {
        gsap.set(Array.from(filters), { opacity: 1, y: 0 });
        gsap.from(Array.from(filters), {
          y: 14, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power3.out", delay: 0.22,
          scrollTrigger: { trigger: section, start: "top 95%", scroller },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative bg-[#f6f5f0] pt-16 pb-5 lg:pt-20 lg:pb-8"
      aria-label="Featured Products"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-64 top-20 h-120 w-120 rounded-full bg-[#3B6FE8]/6 blur-[110px]" />
        <div className="absolute -right-48 bottom-24 h-95 w-95 rounded-full bg-[#d4a474]/10 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-350 px-6">
        <div className="flex flex-wrap items-end justify-between gap-8">

          <div className="max-w-xl">
            <div className="fp-eyebrow inline-flex items-center gap-2.5 rounded-full border border-[#e0dfd9] bg-white px-4 py-1.5 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3B6FE8]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#666]">
                Featured Collection
              </span>
            </div>

            <h2
              className="fp-heading mt-4 text-[clamp(2rem,5vw,5rem)] font-semibold leading-[0.95] tracking-tight text-[#0f0f0f]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Current{" "}
              <em className="text-[#3B6FE8]" style={{ fontStyle: "italic" }}>
                Edition.
              </em>
            </h2>

            <p className="fp-subtext mt-4 text-[15px] text-justify leading-relaxed text-[#666]">
              Thoughtfully selected pieces designed for modern living.
            </p>
          </div>

          {/* Category filters */}
          <div
            role="tablist"
            aria-label="Product category filters"
            className="flex flex-wrap gap-2"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={active === f}
                onClick={() => handleFilter(f)}
                className={[
                  "fp-filter rounded-full border px-4 py-2 text-sm transition-all duration-200",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B6FE8]",
                  active === f
                    ? "border-[#0f0f0f] bg-[#0f0f0f] text-white shadow-md"
                    : "border-[#e0dfd9] bg-white text-[#3a3a3a] hover:border-[#0f0f0f] hover:text-[#0f0f0f]",
                ].join(" ")}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1">
          <ProductsErrorBoundary>
            <ProductGrid
              active={active}
              expanded={expanded}
              onToggleExpand={() => setExpanded((e) => !e)}
            />
          </ProductsErrorBoundary>
        </div>
      </div>

      {quickViewId !== null && <QuickViewModal />}
    </section>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
      {Array.from({ length: PAGE_SIZE }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="aspect-[4/5] animate-pulse rounded-2xl bg-[#e8e4dc]" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-[#e8e4dc]" />
          <div className="h-3 w-1/3 animate-pulse rounded-full bg-[#e8e4dc]" />
        </div>
      ))}
    </div>
  );
}

export function ProductsSkeleton() {
  return (
    <section
      className="bg-[#f6f5f0] py-28 lg:py-36"
      aria-label="Loading products"
    >
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <div className="h-14 w-72 animate-pulse rounded-xl bg-[#e8e4dc]" />
        <div className="mt-12">
          <SkeletonGrid />
        </div>
      </div>
    </section>
  );
}
