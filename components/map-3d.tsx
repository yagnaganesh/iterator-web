"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Marker } from "pigeon-maps";

/* ── stops ───────────────────────────────────────────────── */
const STOPS = [
  { label: "Saravana Bhavan",   sub: "South Indian", accent: "#f59e0b", lat: 12.9716, lng: 77.5946 },
  { label: "Third Wave Coffee", sub: "Cafes",        accent: "#06b6d4", lat: 12.9770, lng: 77.6050 },
  { label: "INOX Garuda",       sub: "Movies",       accent: "#3b82f6", lat: 12.9706, lng: 77.6099 },
  { label: "Tattva Spa",        sub: "Spa",          accent: "#ec4899", lat: 12.9660, lng: 77.6010 },
  { label: "Cubbon Park",       sub: "Parks",        accent: "#10b981", lat: 12.9763, lng: 77.5929 },
];

export default function MapRouteScreen({ isDark, onBook }: { isDark: boolean; onBook: () => void }) {
  const [revealedPins, setRevealedPins] = useState(0);
  const [showBook, setShowBook] = useState(false);

  const provider = (x: number, y: number, z: number) => {
    const style = isDark ? "dark_all" : "light_all";
    const s = ["a", "b", "c", "d"][Math.abs(x + y) % 4];
    return `https://${s}.basemaps.cartocdn.com/${style}/${z}/${x}/${y}@2x.png`;
  };

  const lats = STOPS.map(s => s.lat);
  const lngs = STOPS.map(s => s.lng);
  const cLat = ((Math.min(...lats) + Math.max(...lats)) / 2) + 0.002;
  const cLng = ((Math.min(...lngs) + Math.max(...lngs)) / 2) + 0.004;
  const ZOOM = 13.5;

  const LEAD = 700; // pause before first pin drops

  useEffect(() => {
    const T: ReturnType<typeof setTimeout>[] = [];
    // First pin after lead-in
    T.push(setTimeout(() => setRevealedPins(1), LEAD));
    // Each subsequent pin 700 ms apart
    STOPS.slice(1).forEach((_, i) => {
      T.push(setTimeout(() => setRevealedPins(i + 2), LEAD + 700 + i * 700));
    });
    // Book Now appears 1 s after the last pin
    const lastPin = LEAD + 700 + (STOPS.length - 2) * 700;
    T.push(setTimeout(() => setShowBook(true), lastPin + 1000));
    return () => T.forEach(clearTimeout);
  }, []);

  const muted = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";
  const txt = isDark ? "#fff" : "#111";

  return (
    <motion.div
      className="relative h-full w-full overflow-hidden"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}
    >
      {/* ── Full-screen map ── */}
      <Map
        provider={provider}
        center={[cLat, cLng]}
        zoom={ZOOM}
        height={560}
        attribution={false}
        mouseEvents={false}
        touchEvents={false}
      >
        {STOPS.map((s, i) => i < revealedPins && (
          <Marker key={s.label} anchor={[s.lat, s.lng]} width={0} height={0}>
            <motion.div
              initial={i === 0 ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              style={{ transform: "translate(-50%, -100%)", pointerEvents: "none", display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <div className="mb-0.5 rounded-md border px-1.5 py-0.5 backdrop-blur-md whitespace-nowrap"
                style={{ background: `${s.accent}30`, borderColor: `${s.accent}70` }}>
                <p style={{ color: s.accent, fontSize: 7, fontWeight: 700 }}>{s.label}</p>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 6 }}>{s.sub}</p>
              </div>
              <div className="mx-auto flex items-center justify-center rounded-full"
                style={{ width: 18, height: 18, background: s.accent, boxShadow: `0 0 10px ${s.accent}, 0 2px 6px rgba(0,0,0,0.3)`, color: "#fff", fontSize: 9, fontWeight: 800 }}>
                {i + 1}
              </div>
              <div className="mx-auto" style={{ width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: `6px solid ${s.accent}` }} />
            </motion.div>
          </Marker>
        ))}
      </Map>

      {/* ── Top overlay: route title + stop dots ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="absolute top-3 left-3 right-3 flex items-center justify-between rounded-2xl px-3 py-2"
        style={{
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 7.5 }}>Your plan is ready</p>
          <p style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>Today&apos;s Route</p>
        </div>
        <div className="flex gap-1">
          {STOPS.map((s, i) => (
            <div key={i} className="flex h-4 w-4 items-center justify-center rounded-full text-[7px] font-bold"
              style={{
                background: i < revealedPins ? s.accent : "rgba(255,255,255,0.12)",
                color: i < revealedPins ? "#fff" : "rgba(255,255,255,0.35)",
                transition: "background 0.3s",
              }}>
              {i + 1}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Bottom overlay: Book Now ── */}
      <AnimatePresence>
        {showBook && (
          <motion.button key="book-btn-bottom" onClick={onBook}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.95 }} transition={{ type: "spring", bounce: 0.5 }}
            className="absolute bottom-3 left-3 right-3 rounded-full py-2.5 text-center text-[11px] font-bold text-white cursor-pointer"
            style={{
              background: "linear-gradient(135deg, rgba(30,111,217,0.5) 0%, rgba(30,111,217,0.3) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(30,111,217,0.5)",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.3), 0 10px 25px -10px rgba(30,111,217,0.5)",
              color: "#fff",
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
            }}>
            Book Now ✓
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
