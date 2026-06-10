import { Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeBanner from "./components/MarqueeBanner";
import { Products, ProductsSkeleton } from "./components/Products";
import { FAQ } from "./components/FAQ";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="scroll-root" className="snap-container bg-gradient-to-br from-[#f5f5f0] via-[#f2ede5] to-[#ede4d6]">
        <section className="snap-section flex flex-col">
          <Hero />
        </section>
        <section className="snap-section-tall flex flex-col">
          <Suspense fallback={<ProductsSkeleton />}>
            <Products />
          </Suspense>
        </section>
        <section className="snap-section-tall flex flex-col">
          <FAQ />
        </section>
        <section className="snap-section-tall flex flex-col">
          <Footer />
        </section>
      </main>
    </>
  );
}
