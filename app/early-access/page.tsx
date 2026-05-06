import { EarlyAccess } from "@/components/early-access";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SmoothScroll } from "@/components/smooth-scroll";

export const metadata = {
  title: "Get Early Access | Iterator",
  description: "Join the waitlist for Iterator and be the first to experience premium curated lifestyle bookings.",
};

export default function EarlyAccessPage() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main className="pt-16">
        <EarlyAccess />
      </main>
      <Footer />
    </>
  );
}
