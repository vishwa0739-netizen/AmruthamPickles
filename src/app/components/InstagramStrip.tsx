import { useState, useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { BRAND } from "../data";

import heroPicklesImg from "@/imports/hero_slide_pickles.jpg";
import heroPodiesImg from "@/imports/hero_slide_podies.jpg";
import heroPachadiesImg from "@/imports/hero_slide_pachadies.jpg";

const INSTAGRAM_VIDEOS = [
  {
    id: "1",
    embedUrl: "https://www.instagram.com/reel/C4SrlYMRgfT/embed/?hidecaption=true",
  },
  {
    id: "2",
    embedUrl: "https://www.instagram.com/reel/C6QyMr_yM0Z/embed/?hidecaption=true",
  },
  {
    id: "3",
    embedUrl: "https://www.instagram.com/reel/C5Ys8z5Ru6s/embed/?hidecaption=true",
  },
  {
    id: "4",
    embedUrl: "https://www.instagram.com/reel/C4R3UFyi6Hw/embed/?hidecaption=true",
  },
];

const STORY_HIGHLIGHTS = [
  {
    label: "Pickles Highlight",
    color: "linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
    poster: heroPicklesImg,
    url: "https://www.instagram.com/stories/highlights/18012384149326367/?__pwa=1",
  },
  {
    label: "Podies Highlight",
    color: "linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
    poster: heroPodiesImg,
    url: "https://www.instagram.com/stories/highlights/18012384149326367/?__pwa=1",
  },
  {
    label: "Pachadies Highlight",
    color: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
    poster: heroPachadiesImg,
    url: "https://www.instagram.com/stories/highlights/18012384149326367/?__pwa=1",
  },
];

export function InstagramStrip() {
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  function scrollTo(dir: 1 | -1) {
    const next = Math.max(0, Math.min(INSTAGRAM_VIDEOS.length - 1, currentVideo + dir));
    setCurrentVideo(next);
    const card = scrollRef.current?.children[next] as HTMLElement;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }

  function handleTouchStart(e: React.TouchEvent) { setTouchStart(e.touches[0].clientX); }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) scrollTo(diff > 0 ? 1 : -1);
    setTouchStart(null);
  }

  return (
    <section
      className="py-10 md:py-14"
      style={{ borderTop: "1px solid rgba(26,10,14,0.08)", backgroundColor: "var(--brand-base)" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p style={{ fontSize: "var(--text-xs)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,10,14,0.45)", marginBottom: 4 }}>
              Follow Us On
            </p>
            <h2
              className="underline-anim"
              style={{ fontFamily: "'Playfair Display', var(--font-display), serif", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(22px, 4vw, 34px)", letterSpacing: "0.18em", textTransform: "uppercase", color: "#1a0a0e", marginBottom: 8 }}
            >
              #{BRAND.name.replace(/\s/g, "").toUpperCase()} ON INSTAGRAM
            </h2>
            <a
              href="https://www.instagram.com/amruthampicklesandspices/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-75"
              style={{ color: "var(--brand-wine)", textDecoration: "none", fontSize: "var(--text-sm)", fontWeight: 600 }}
            >
              {BRAND.instagram}
              <ExternalLink size={13} />
            </a>
          </motion.div>
        </div>

        {/* Story Highlights Row */}
        <div className="flex gap-5 overflow-x-auto pb-4 mb-8 justify-start md:justify-center scrollbar-hide">
          {STORY_HIGHLIGHTS.map((story, i) => (
            <motion.a
              key={story.label}
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              className="flex flex-col items-center gap-1.5 shrink-0"
              style={{ textDecoration: "none", cursor: "pointer", padding: 0 }}
            >
              <div className="rounded-full p-0.5" style={{ background: story.color, width: 68, height: 68 }}>
                <div className="w-full h-full rounded-full overflow-hidden" style={{ border: "2.5px solid var(--brand-base)" }}>
                  <img src={story.poster} alt={story.label} className="w-full h-full object-cover" />
                </div>
              </div>
              <span style={{ fontSize: 10, color: "var(--foreground)", fontWeight: 500, maxWidth: 84, textAlign: "center", lineHeight: 1.3 }}>
                {story.label}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Video Slider — replaces static photo grid */}
        <div className="relative">
          {/* Arrow Prev */}
          <button
            onClick={() => scrollTo(-1)}
            disabled={currentVideo === 0}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full shadow-md transition-all -translate-x-1/2"
            style={{ backgroundColor: "var(--brand-base)", border: "1px solid rgba(0,48,73,0.15)", color: "var(--brand-wine)", opacity: currentVideo === 0 ? 0.3 : 1 }}
            aria-label="Previous video"
          >
            <ChevronLeft size={18} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollSnapType: "x mandatory" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {INSTAGRAM_VIDEOS.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative shrink-0"
                style={{
                  flex: "0 0 260px",
                  height: "460px",
                  scrollSnapAlign: "start",
                  borderRadius: 8,
                  boxShadow: "0 4px 12px rgba(26,10,14,0.06)",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Clip mask to hide Instagram header/footer */}
                <div
                  style={{
                    position: "absolute",
                    /* Push iframe so header (≈56px) and footer (≈68px) fall outside */
                    top: "-56px",
                    left: "-1px",
                    right: "-1px",
                    bottom: "-68px",
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    src={video.embedUrl}
                    title={`Instagram Reel ${video.id}`}
                    style={{
                      width: "100%",
                      height: "calc(100% + 124px)",   /* fills the expanded div */
                      border: "none",
                      display: "block",
                    }}
                    scrolling="no"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Arrow Next */}
          <button
            onClick={() => scrollTo(1)}
            disabled={currentVideo >= INSTAGRAM_VIDEOS.length - 1}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full shadow-md transition-all translate-x-1/2"
            style={{ backgroundColor: "var(--brand-base)", border: "1px solid rgba(0,48,73,0.15)", color: "var(--brand-wine)", opacity: currentVideo >= INSTAGRAM_VIDEOS.length - 1 ? 0.3 : 1 }}
            aria-label="Next video"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-5">
          {INSTAGRAM_VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentVideo(i);
                const card = scrollRef.current?.children[i] as HTMLElement;
                card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
              }}
              aria-label={`Go to video ${i + 1}`}
              style={{ width: i === currentVideo ? 20 : 6, height: 6, borderRadius: 3, backgroundColor: i === currentVideo ? "var(--brand-wine)" : "rgba(0,48,73,0.2)", border: "none", transition: "all 0.3s ease", cursor: "pointer", padding: 0 }}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-6">
          <a
            href="https://www.instagram.com/amruthampicklesandspices/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-all active:scale-95"
            style={{ border: "1.5px solid var(--foreground)", color: "var(--foreground)", padding: "10px 28px", textDecoration: "none", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "var(--text-xs)", letterSpacing: "0.12em", textTransform: "uppercase" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--foreground)"; (e.currentTarget as HTMLElement).style.color = "var(--brand-base)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--foreground)"; }}
          >
            Follow @{BRAND.instagram.replace("@", "")}
          </a>
        </div>
      </div>
    </section>
  );
}
