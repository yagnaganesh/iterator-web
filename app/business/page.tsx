import { BusinessContact } from "@/components/business-contact";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SmoothScroll } from "@/components/smooth-scroll";

export const metadata = {
  title: "For Businesses | Iterator",
  description: "List your business on Iterator and get discovered by thousands of users.",
};

export default function BusinessPage() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main className="pt-16">
        <BusinessContact />
      </main>
      <Footer />
    </>
  );
}
