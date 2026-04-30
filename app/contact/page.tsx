import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SmoothScroll } from "@/components/smooth-scroll";

export const metadata = {
  title: "Contact Us | Iterator",
  description: "Get in touch with the Iterator team for curated lifestyle bookings.",
};

export default function ContactPage() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main className="pt-24 min-h-[80vh] flex flex-col justify-center">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
