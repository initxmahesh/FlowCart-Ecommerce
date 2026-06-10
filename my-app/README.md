# FlowCart E-commerce

A modern, premium e-commerce landing page built with Next.js 16, featuring smooth GSAP animations, efficient data fetching with TanStack Query, and robust state management with Zustand.

## Setup Instructions

### Prerequisites
- Node.js 20+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/initxmahesh/FlowCart-Ecommerce.git
cd FlowCart-Ecommerce/my-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

## Tech Stack

- **Framework:** Next.js 16.2.7 (App Router)
- **React:** 19.2.4
- **TypeScript:** 5.x
- **Styling:** Tailwind CSS 4
- **Animations:** GSAP 3.15.0 with ScrollTrigger
- **Data Fetching:** TanStack Query 5.101.0
- **State Management:** Zustand 5.0.5
- **Icons:** Lucide React

## GSAP Usage

GSAP powers smooth scroll-triggered animations throughout the application:

### Components with GSAP Animations

1. **Hero Component** (`app/components/Hero.tsx`)
   - Staggered entrance animations for headline, subtext, and CTA buttons
   - Floating product image animation with parallax effect
   - Decorative orb fade-in effects

2. **Products Component** (`app/components/Products.tsx`)
   - Scroll-triggered product card reveals with stagger
   - Quick View modal entrance/exit animations (scale + opacity + slide)
   - Dynamic "See more" expansion animations for product grid
   - Category filter transition animations

3. **ProductCard Component** (`app/components/ProductCard.tsx`)
   - Hover interactions and card entrance animations

All animations use GSAP's `ScrollTrigger` plugin with `#scroll-root` as the custom scroller for smooth scroll-snapping behavior.

## TanStack Query Usage

TanStack Query handles all server state management for product data:

### Implementation Details

- **Location:** `app/components/Products.tsx`
- **Query Key:** `["products"]`
- **Query Function:** `listProducts()` from `lib/products.ts`
- **Configuration:** 
  - `staleTime: Infinity` (products are static)
  - `gcTime: Infinity` (cache indefinitely)
- **Features Used:**
  - Automatic caching and deduplication
  - Loading states with skeleton UI
  - Error boundary for failed requests
  - Shared cache between QuickViewModal and ProductGrid

The QueryClient is configured in `app/providers.tsx` and wraps the entire application.

## State Management

Zustand provides three lightweight stores in `lib/store.ts`:

### 1. Cart Store (`useCart`)
Manages shopping cart with items and quantities:
- `add(product)` - Add or increment product
- `remove(id)` - Remove product entirely
- `setQty(id, qty)` - Set exact quantity
- `clear()` - Empty cart
- `count()` - Total items

### 2. Wishlist Store (`useWishlist`)
Tracks favorited products:
- `toggle(id)` - Add/remove from wishlist
- `has(id)` - Check if product is wishlisted

### 3. UI Store (`useUI`)
Controls modal visibility:
- `quickViewId` - Currently open product modal ID
- `setQuickView(id)` - Open/close Quick View modal

All stores are client-only and use optimistic updates for instant UI feedback.

## Design Decision I'm Proud Of

**Custom Scroll Container with GSAP ScrollTrigger Integration**

Instead of using browser-native scroll for animations, I implemented a custom scroll container (`#scroll-root`) with CSS scroll-snap. This approach:
- Provides buttery-smooth section transitions
- Allows precise control over animation timing and triggers
- Creates a premium, app-like feel with snap points
- Maintains accessibility and native scroll behavior
- Integrates seamlessly with GSAP's ScrollTrigger for performant animations

The combination of scroll-snap CSS and GSAP ScrollTrigger creates a professional, cohesive experience that feels both polished and responsive.

## Future Improvements

**Server-Side Product Search & Filtering**

Currently, all products load client-side and filters apply in-browser. With more time, I'd implement:
- Server-side pagination and filtering via API routes
- URL-based filter state (shareable links)
- Optimized initial page load with SSR for above-the-fold products
- Real-time inventory updates via WebSocket or polling
- Fuzzy search with Algolia or Elasticsearch integration

This would significantly improve performance at scale while maintaining the smooth UX.

## Project Structure

```
my-app/
├── app/
│   ├── components/       # React components
│   │   ├── Hero.tsx
│   │   ├── Products.tsx
│   │   ├── ProductCard.tsx
│   │   ├── Navbar.tsx
│   │   ├── Banner.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   └── Footer.tsx
│   ├── page.tsx         # Home page
│   ├── layout.tsx       # Root layout
│   └── providers.tsx    # Query client provider
├── lib/
│   ├── store.ts         # Zustand stores
│   └── products.ts      # Product data & utilities
└── public/              # Static assets
```

## Links

- **GitHub Repository:** [https://github.com/initxmahesh/FlowCart-Ecommerce](https://github.com/initxmahesh/FlowCart-Ecommerce)
- **Live Demo:** https://flow-cart-ecommerce.vercel.app

## License

MIT
