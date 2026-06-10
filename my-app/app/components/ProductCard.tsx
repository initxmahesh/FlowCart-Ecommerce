"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { Heart, Eye, Star, Plus, Check } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart, useUI, useWishlist } from "@/lib/store";


export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const add        = useCart((s) => s.add);
  const toggle     = useWishlist((s) => s.toggle);
  const liked      = useWishlist((s) => s.ids.includes(product.id));
  const setQuickView = useUI((s) => s.setQuickView);

  const heartRef = useRef<HTMLButtonElement>(null);
  const [added, setAdded] = useState(false);


  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggle(product.id);
    gsap.fromTo(
      heartRef.current,
      { scale: 1 },
      { scale: 1.5, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 },
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const fullStars = Math.round(product.rating);

  return (
    <div
      className="product-card group flex flex-col"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image wrapper */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f0ede7]">

        {/* Product image */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
        />

        <span className="absolute left-3 top-3 rounded-full bg-[#0f0f0f]/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white shadow-md backdrop-blur-sm">
          {product.tag}
        </span>

        <button
          ref={heartRef}
          onClick={handleWishlist}
          aria-label={liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={[
            "absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full shadow-md backdrop-blur-sm",
            "transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B6FE8]",
            liked
              ? "border border-red-200 bg-red-50 text-red-500"
              : "border border-white/40 bg-[#0f0f0f]/10 text-white hover:bg-white hover:text-[#0f0f0f]",
          ].join(" ")}
        >
          <Heart
            className={[
              "h-4 w-4 transition-all duration-200",
              liked ? "fill-red-500 text-red-500" : "",
            ].join(" ")}
          />
        </button>
        <div
          aria-hidden="true"
          className={[
            "absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0",
            "transition-all duration-500 ease-out",
            "group-hover:translate-y-0 group-hover:opacity-100",
          ].join(" ")}
        >
          {/* Quick view */}
          <button
            onClick={(e) => { e.stopPropagation(); setQuickView(product.id); }}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#f6f5f0]/95 py-3 text-xs font-medium text-[#0f0f0f] backdrop-blur-md transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B6FE8]"
          >
            <Eye className="h-3.5 w-3.5" />
            Quick view
          </button>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className={[
              "inline-flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B6FE8]",
              added
                ? "scale-95 bg-emerald-500 text-white"
                : "bg-[#0f0f0f] text-white hover:scale-110 hover:bg-[#2a2a2a]",
            ].join(" ")}
          >
            {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          {/* Name */}
          <h3
            className="truncate font-semibold text-[#0f0f0f]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {product.name}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-[#888]">
            <Star className="h-3 w-3 fill-[#0f0f0f] text-[#0f0f0f]" />
            <span className="font-medium text-[#0f0f0f]">{product.rating}</span>
            <span>· {product.variants.length} variants</span>
          </p>
        </div>

        {/* Price */}
        <div className="shrink-0 text-right">
          <p
            className="text-lg font-black tabular-nums text-[#0f0f0f]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            ${product.price}
          </p>
          {product.originalPrice && (
            <p className="text-xs text-[#bbb] line-through">${product.originalPrice}</p>
          )}
        </div>
      </div>
    </div>
  );
}
