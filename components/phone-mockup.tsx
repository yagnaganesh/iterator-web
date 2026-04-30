"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, MapPin, QrCode } from "lucide-react";
import { useTheme } from "next-themes";
import MapRouteScreen from "@/components/map-3d";

/* ── Category groups ─────────────────────────────────────── */
const GROUPS = [
  {
    heading: "🍽 Food & Drinks",
    chips: [
      { label: "South Indian", accent: "#f59e0b" },
      { label: "North Indian", accent: "#f97316" },
      { label: "Chinese",      accent: "#ef4444" },
      { label: "Cafes",        accent: "#06b6d4" },
      { label: "Street Food",  accent: "#fbbf24" },
      { label: "Desserts",     accent: "#e879f9" },
      { label: "Breweries",    accent: "#a78bfa" },
      { label: "Breakfast",    accent: "#f59e0b" },
    ],
  },
  {
    heading: "🎬 Entertainment",
    chips: [
      { label: "Movies",       accent: "#60a5fa" },
      { label: "Live Music",   accent: "#818cf8" },
      { label: "Stand-up",     accent: "#6366f1" },
      { label: "Arcades",      accent: "#a78bfa" },
      { label: "Bowling",      accent: "#38bdf8" },
      { label: "Escape Rooms", accent: "#34d399" },
      { label: "Karaoke",      accent: "#f472b6" },
      { label: "Board Games",  accent: "#fb923c" },
    ],
  },
  {
    heading: "⚡ Adventure",
    chips: [
      { label: "Go-karting",   accent: "#facc15" },
      { label: "Paintball",    accent: "#4ade80" },
      { label: "Laser Tag",    accent: "#f87171" },
      { label: "Trampoline",   accent: "#fb923c" },
      { label: "Rock Climbing",accent: "#a3e635" },
      { label: "Zip-lining",   accent: "#22d3ee" },
    ],
  },
  {
    heading: "💆 Self Care",
    chips: [
      { label: "Spa",           accent: "#f472b6" },
      { label: "Yoga",          accent: "#c084fc" },
      { label: "Salon",         accent: "#fb7185" },
      { label: "Meditation",    accent: "#a78bfa" },
      { label: "Sound Healing", accent: "#67e8f9" },
    ],
  },
  {
    heading: "🌿 Nature & Outdoors",
    chips: [
      { label: "Parks",    accent: "#34d399" },
      { label: "Gardens",  accent: "#4ade80" },
      { label: "Hiking",   accent: "#86efac" },
      { label: "Lakes",    accent: "#38bdf8" },
      { label: "Picnics",  accent: "#a3e635" },
      { label: "Forests",  accent: "#16a34a" },
    ],
  },
  {
    heading: "🏛 Culture",
    chips: [
      { label: "Museums",       accent: "#e2a84b" },
      { label: "Art Galleries", accent: "#f472b6" },
      { label: "Heritage Walks",accent: "#a78bfa" },
      { label: "Temples",       accent: "#fb923c" },
      { label: "Forts",         accent: "#94a3b8" },
    ],
  },
  {
    heading: "🛍 Shopping",
    chips: [
      { label: "Malls",          accent: "#60a5fa" },
      { label: "Street Markets", accent: "#fbbf24" },
      { label: "Flea Markets",   accent: "#fb923c" },
      { label: "Vintage Stores", accent: "#e879f9" },
    ],
  },
  {
    heading: "☕ Chill & Hangout",
    chips: [
      { label: "Lounges",        accent: "#a78bfa" },
      { label: "Rooftop Cafes",  accent: "#38bdf8" },
      { label: "Book Cafes",     accent: "#34d399" },
      { label: "Music Cafes",    accent: "#818cf8" },
      { label: "Coffee Corners", accent: "#fb923c" },
    ],
  },
];

// South Indian(0), Cafes(3), Movies(8), Spa(22), Parks(27)
const AUTO_IDX = [0, 3, 8, 22, 27];

/* ── Screens ─────────────────────────────────────────────── */
function SelectScreen({
  selected,
  btnTap,
  isDark,
  onPlan,
}: {
  selected: number[];
  btnTap: boolean;
  isDark: boolean;
  onPlan: () => void;
}) {
  const txt   = isDark ? "#ffffff" : "#0f172a";
  const muted = isDark ? "rgba(224, 242, 254, 0.8)" : "rgba(71, 85, 105, 0.8)";
  const inact = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)";
  let gi = 0;
  return (
    <motion.div className="flex h-full flex-col overflow-y-auto px-3 pt-1 pb-2 no-scrollbar"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.08 }}>
      <p style={{ color: muted, fontSize: 10 }}>Good morning ✨</p>
      <p style={{ color: txt, fontSize: 16, fontWeight: 800, marginBottom: 10, letterSpacing: "-0.01em" }}>What&apos;s your vibe?</p>
      {GROUPS.map(g => (
        <div key={g.heading} className="mb-4">
          <p style={{ color: muted, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6, opacity: 0.8 }}>
            {g.heading}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {g.chips.map(c => {
              const idx = gi++;
              const on  = selected.includes(idx);
              return (
                <motion.span key={c.label}
                  className="rounded-full border px-2.5 py-0.5 text-[10px] font-medium"
                  animate={{
                    borderColor: on ? `${c.accent}80` : (isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"),
                    background:  on ? `${c.accent}22`  : inact,
                    color:       on ? c.accent          : (isDark ? muted : "rgba(15, 23, 42, 0.6)"),
                    scale:       on ? 1.05             : 1,
                  }}
                  transition={{ duration: 0.2 }}>
                  {c.label}
                </motion.span>
              );
            })}
          </div>
        </div>
      ))}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.button key="plan-my-day-btn" type="button" onClick={onPlan}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, scale: btnTap ? 0.93 : 1 }} exit={{ opacity: 0 }}
            className="sticky bottom-0 mx-3 mb-2 rounded-full py-2.5 text-center text-[11px] font-bold text-white cursor-pointer"
            style={{
              background: "linear-gradient(135deg, rgba(30,111,217,0.4) 0%, rgba(30,111,217,0.2) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(30,111,217,0.45)",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.25), 0 8px 20px -8px rgba(30,111,217,0.4)",
              color: "#fff",
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
            }}>
            Plan My Day →
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Apple-Wallet-style ticket ───────────────────────────── */
function WalletTicket({
  item, index, isDark,
}: {
  item: { time: string; venue: string; cat: string; accent: string; emoji: string; loc: string; dur: string };
  index: number;
  isDark: boolean;
}) {
  // transparent glass — lets the phone screen bg show through, matching select + map screens
  const glass  = isDark ? "rgba(255,255,255,0.06)" : "rgba(0, 0, 0, 0.02)";
  const txt    = isDark ? "#ffffff" : "#0f172a";
  const muted  = isDark ? "rgba(224, 242, 254, 0.8)" : "rgba(71, 85, 105, 0.8)";
  const border = isDark ? `${item.accent}30` : `${item.accent}25`;

  /* barcode stripes */
  const bars = Array.from({ length: 22 }, (_, k) => ({
    w: [3, 1, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2][k % 12],
    op: k % 3 === 0 ? 1 : k % 2 === 0 ? 0.55 : 0.28,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.06 + index * 0.1, type: "spring", bounce: 0.28, duration: 0.45 }}
      style={{
        borderRadius: 11,
        overflow: "hidden",
        border: `1px solid ${border}`,
        boxShadow: `0 2px 12px ${item.accent}18`,
        marginBottom: 5,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Gradient header */}
      <div style={{
        background: `linear-gradient(135deg, ${item.accent}cc 0%, ${item.accent}70 100%)`,
        padding: "4px 9px",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <span style={{ fontSize: 12 }}>{item.emoji}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: "rgba(0,0,0,0.45)", fontSize: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>{item.cat}</p>
          <p style={{ color: "#fff", fontSize: 10, fontWeight: 800, lineHeight: 1.2, textShadow: "0 1px 2px rgba(0,0,0,0.2)" }} className="truncate">{item.venue}</p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(6px)", borderRadius: 20, padding: "1px 5px", display: "flex", alignItems: "center", gap: 2, border: "1px solid rgba(255,255,255,0.3)" }}>
          <CheckCircle2 size={7} color="#fff" />
          <span style={{ color: "#fff", fontSize: 6.5, fontWeight: 700 }}>OK</span>
        </div>
      </div>

      {/* Separator — accent-tinted dashed */}
      <div style={{ height: 1, background: `linear-gradient(90deg, ${item.accent}40, ${item.accent}15)` }} />

      {/* Glass body */}
      <div style={{ background: glass, padding: "5px 9px", display: "flex", alignItems: "center", gap: 7 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: item.accent, fontSize: 11, fontWeight: 800 }}>{item.time}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 2, marginTop: 1 }}>
            <MapPin size={6} color={muted} />
            <p style={{ color: muted, fontSize: 7, fontWeight: 500 }} className="truncate">{item.loc}</p>
          </div>
        </div>
        <div style={{ background: `${item.accent}18`, border: `1px solid ${item.accent}35`, borderRadius: 6, padding: "2px 5px", flexShrink: 0 }}>
          <p style={{ color: item.accent, fontSize: 7.5, fontWeight: 700 }}>{item.dur}</p>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 1, height: 20, paddingLeft: 4, flexShrink: 0 }}>
          {bars.slice(0, 14).map((b, k) => (
            <div key={k} style={{ width: b.w, height: `${50 + ((k * 19) % 50)}%`, background: item.accent, opacity: b.op, borderRadius: 1 }} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function BookedScreen({ isDark }: { isDark: boolean }) {
  const txt   = isDark ? "#ffffff" : "#0f172a";
  const muted = isDark ? "rgba(224, 242, 254, 0.8)" : "rgba(71, 85, 105, 0.8)";
  const items = [
    { time: "10:00 AM", venue: "Saravana Bhavan",   cat: "South Indian", accent: "#f59e0b", emoji: "🍽", loc: "MG Road, Bengaluru",       dur: "1 hr"   },
    { time: "12:00 PM", venue: "Third Wave Coffee", cat: "Cafes",        accent: "#06b6d4", emoji: "☕",  loc: "Indiranagar, Bengaluru",  dur: "45 min" },
    { time: "3:00 PM",  venue: "INOX Garuda Mall",  cat: "Movies",       accent: "#60a5fa", emoji: "🎬", loc: "Magrath Rd, Bengaluru",   dur: "2.5 hr" },
    { time: "6:00 PM",  venue: "Tattva Spa",        cat: "Spa",          accent: "#f472b6", emoji: "💆", loc: "Koramangala, Bengaluru",  dur: "1 hr"   },
    { time: "8:00 PM",  venue: "Cubbon Park Walk",  cat: "Parks",        accent: "#34d399", emoji: "🌿", loc: "Raj Bhavan Rd, Bengaluru",dur: "1 hr"   },
  ];

  return (
    <motion.div
      className="flex h-full flex-col"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* header — same style as SelectScreen top bar */}
      <motion.div
        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 }}
        style={{ padding: "6px 10px 3px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}
      >
        <div>
          <p style={{ color: muted, fontSize: 8 }}>All set ✓ — Today’s plan</p>
          <p style={{ color: txt, fontSize: 12, fontWeight: 800 }}>Your Tickets 🎟️</p>
        </div>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.12, type: "spring", bounce: 0.5 }}
          style={{
            background: "linear-gradient(135deg, rgba(52,211,153,0.22), rgba(5,150,105,0.22))",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(52,211,153,0.3)",
            borderRadius: 20, padding: "2px 7px",
            display: "flex", alignItems: "center", gap: 2,
          }}>
          <CheckCircle2 size={7} color="#34d399" />
          <span style={{ color: "#34d399", fontSize: 7, fontWeight: 700 }}>5 Confirmed</span>
        </motion.div>
      </motion.div>

      {/* ticket stack — no scroll, all fit */}
      <div className="no-scrollbar px-2 pb-2 pt-0.5" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {items.map((it, i) => (
          <WalletTicket key={it.venue} item={it} index={i} isDark={isDark} />
        ))}

        {/* Iterator pass strip */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
            marginTop: 2,
            padding: "4px 8px",
            borderRadius: 8,
            background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
          }}
        >
          <QrCode size={16} color={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)"} strokeWidth={1.5} />
          <p style={{ color: muted, fontSize: 7, letterSpacing: "0.07em" }}>Iterator Pass · ITR-2025-BLR-00419</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── Phone shell ─────────────────────────────────────────── */
export function PhoneMockup() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark   = mounted ? resolvedTheme === "dark" : true;
  const screenBg = isDark ? "#000" : "#ffffff";

  const [phase, setPhase]       = useState<"select"|"map"|"booked">("select");
  const [selected, setSelected] = useState<number[]>([]);
  const [btnTap, setBtnTap]     = useState(false);

  function planNow() {
    setBtnTap(true);
    window.setTimeout(() => setBtnTap(false), 90);
    setPhase("map");
  }

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearAll() { timers.current.forEach(clearTimeout); timers.current = []; }

  const push = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  useEffect(() => {
    function cycle() {
      clearAll();
      setPhase("select"); setSelected([]); setBtnTap(false);

      // chips appear slowly — 500 ms apart so viewers can follow
      AUTO_IDX.forEach((idx, i) =>
        push(() => setSelected(p => p.includes(idx) ? p : [...p, idx]), 600 + i * 500)
      );
      // after last chip (t≈3100): 600ms pause, then tap animation
      push(() => setBtnTap(true),  3700);
      push(() => setBtnTap(false), 3850);
      // 2.5 s after tap → map screen
      push(() => setPhase("map"),  6350);
      // map has 5 pins × 700 ms each + 700 lead + 800 book-btn = ~5100 ms
      push(() => setPhase("booked"), 12000);
      // show tickets for 4 s then restart
      push(cycle, 16500);
    }
    cycle();
    return clearAll;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative mx-auto" style={{ width: 270, height: 560 }}>
      {/* shell */}
      <div className="absolute inset-0 rounded-[44px]" style={{
        background: isDark
          ? "linear-gradient(145deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05))"
          : "linear-gradient(145deg,rgba(0,0,0,0.08),rgba(0,0,0,0.03))",
        border: isDark ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(0,0,0,0.12)",
        boxShadow: isDark
          ? "inset 0 1px 0 rgba(255,255,255,0.12),0 60px 120px rgba(0,0,0,0.45)"
          : "inset 0 1px 0 rgba(255,255,255,0.8),0 40px 80px rgba(0,0,0,0.18)",
        backdropFilter: "blur(24px)",
      }} />
      {[100,144].map(t => (
        <div key={t} className="absolute -left-[3px] h-8 w-[3px] rounded-full"
          style={{ top: t, background: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)" }} />
      ))}
      <div className="absolute -right-[3px] h-14 w-[3px] rounded-full"
        style={{ top: 120, background: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)" }} />

      {/* screen */}
      <div className="absolute inset-[6px] overflow-hidden rounded-[38px]" style={{ background: screenBg }}>
        <div className="absolute left-1/2 top-3 z-10 h-6 w-20 -translate-x-1/2 rounded-full"
          style={{ background: isDark ? "#000" : "#111" }} />
        <div className="absolute left-5 right-5 top-2 z-10 flex justify-between text-[9px] font-bold"
          style={{ color: isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)" }}>
          <span>9:41</span><span>▮▮▮</span>
        </div>

        <div className="absolute inset-0 pt-11">
          <AnimatePresence>
            {phase === "select"  && <SelectScreen  key="sel"    selected={selected} btnTap={btnTap}  isDark={isDark} onPlan={planNow} />}
            {phase === "map"     && <MapRouteScreen key="map" isDark={isDark} onBook={() => setPhase("booked")} />}
            {phase === "booked"  && <BookedScreen   key="booked" isDark={isDark} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
