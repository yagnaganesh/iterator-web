

import { CategoryShowcase } from "@/components/category-showcase";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SmoothScroll } from "@/components/smooth-scroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <CategoryShowcase />



      </main>
      <Footer />
    </>
  );
}

