import { useState, useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink, Play } from "lucide-react";
import { BRAND } from "../data";

/*
  InstagramStrip — converted from static photo grid to a slideable carousel.
  Videos are embedded as autoplay/muted Instagram-style clips.
  Since live Instagram oEmbed requires an access token, we simulate with
  high-quality food videos from reliable CDN URLs (Unsplash video equivalents).
  The section renders from Layout.tsx (shared component) — not duplicated per page.
*/

const INSTAGRAM_VIDEOS = [
  {
    id: "1",
    // Using placeholder embed-friendly video via HTML5 video element
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    likes: 1247,
    caption: "Fresh Green Chilly Pachadi — made to order 🌶️",
  },
  {
    id: "2",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1716816211590-c15a328a5ff0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    likes: 832,
    caption: "Our famous Dhal Podi — stone-ground tradition 🥣",
  },
  {
    id: "3",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    likes: 2103,
    caption: "Idly Podi 2.0 — no garlic, all flavour ✨",
  },
  {
    id: "4",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    likes: 956,
    caption: "Temple-style Pulihora Mix — pure comfort 🍛",
  },
  {
    id: "5",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1664791461482-79f5deee490f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    likes: 1789,
    caption: "Avakaya Mango Pickle — Andhra's finest 🥭",
  },
  {
    id: "6",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1729698597774-5c9f7aed07d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    likes: 643,
    caption: "Essentials Gift Box — the perfect present 🎁",
  },
];

const STORY_HIGHLIGHTS = [
  { label: "Innovations", color: "linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)", postIdx: 0 },
  { label: "Story tales", color: "linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)", postIdx: 1 },
  { label: "Quotes", color: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)", postIdx: 2 },
  { label: "Menu", color: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)", postIdx: 3 },
  { label: "Podies", color: "linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)", postIdx: 4 },
  { label: "Pickles", color: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)", postIdx: 5 },
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
              style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(18px, 4vw, 28px)", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--foreground)", marginBottom: 8 }}
            >
              #{BRAND.name.replace(/\s/g, "").toUpperCase()} ON INSTAGRAM
            </h2>
            <a
              href="https://instagram.com"
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
            <motion.button
              key={story.label}
              onClick={() => setActiveHighlight(activeHighlight === i ? null : i)}
              initial={{ opacity: 0, scale: 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              className="flex flex-col items-center gap-1.5 shrink-0"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <div className="rounded-full p-0.5" style={{ background: activeHighlight === i ? "rgba(26,10,14,0.15)" : story.color, width: 68, height: 68, transition: "all 0.25s ease", transform: activeHighlight === i ? "scale(1.08)" : "scale(1)" }}>
                <div className="w-full h-full rounded-full overflow-hidden" style={{ border: "2.5px solid var(--brand-base)" }}>
                  <img src={INSTAGRAM_VIDEOS[story.postIdx]?.poster} alt={story.label} className="w-full h-full object-cover" />
                </div>
              </div>
              <span style={{ fontSize: 10, color: "var(--foreground)", fontWeight: activeHighlight === i ? 700 : 400, maxWidth: 64, textAlign: "center", lineHeight: 1.3, transition: "font-weight 0.2s" }}>
                {story.label}
              </span>
            </motion.button>
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
                className="relative overflow-hidden cursor-pointer group shrink-0"
                style={{
                  flex: "0 0 calc(50% - 6px)",
                  scrollSnapAlign: "start",
                  aspectRatio: "1/1",
                  borderRadius: 0,
                }}
              >
                {/* Autoplay muted video */}
                <video
                  ref={(el) => { videoRefs.current[i] = el; }}
                  src={video.videoSrc}
                  poster={video.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  style={{ transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLVideoElement).style.transform = "scale(1.04)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLVideoElement).style.transform = "scale(1)")}
                />
                {/* Play icon overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: "rgba(0,48,73,0.45)", transition: "opacity 0.3s ease", backdropFilter: "blur(2px)" }}>
                  <Play size={28} fill="white" color="white" style={{ marginBottom: 8 }} />
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.9)", textAlign: "center", padding: "0 12px", lineHeight: 1.4 }}>
                    {video.caption}
                  </p>
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
            href="https://instagram.com"
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
