import { CalendarCheck, Compass, HeartHandshake, MapPinned, Martini, Sparkles } from "lucide-react";

export const navItems = [
  { label: "Explore", href: "/#features" },
  { label: "For Businesses", href: "/business" },
  { label: "Early Access", href: "/early-access" },
  { label: "Contact", href: "/contact" },
];

export const features = [
  {
    title: "Dine Out",
    description: "Reserve tables at top restaurants, cafes, lounges, and fine-dining spots in your city.",
    icon: Martini,
  },
  {
    title: "Saloon & Spa",
    description: "Book beauty appointments, haircuts, massages, and wellness rituals with ease.",
    icon: HeartHandshake,
  },
  {
    title: "Movies & Shows",
    description: "Find showtimes and secure tickets for the latest blockbusters and theater performances.",
    icon: Sparkles,
  },
  {
    title: "Games & Activities",
    description: "Discover bowling alleys, arcades, escape rooms, and engaging local activities.",
    icon: Compass,
  },
  {
    title: "Parks & Outings",
    description: "Plan your weekend with curated lists of beautiful parks, nature trails, and city escapes.",
    icon: MapPinned,
  },
  {
    title: "All in One Place",
    description: "Stop juggling apps. Iterator manages all your lifestyle bookings through one modern interface.",
    icon: CalendarCheck,
  },
];

export const showcases = [
  {
    label: "Top Dine Out",
    title: "Golden Hour Rooftop Lounge with city views.",
    metric: "4.9",
    caption: "guest rating",
  },
  {
    title: "Weekend City Escape to Blue Ridge Park.",
    label: "Nature Outing",
    metric: "1h",
    caption: "from city center",
  },
  {
    label: "Live Shows",
    title: "VIP access to downtown theater performances.",
    metric: "Fast",
    caption: "instant booking",
  },
];
