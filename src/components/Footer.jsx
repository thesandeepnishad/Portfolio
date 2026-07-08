import { useRef, memo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navItems, footerIconsList } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const TICKER_TEXT = "BUILD • CREATE • SHIP • REPEAT • ";
const TICKER_REPEAT = 6;
const TICKER_SEGMENTS = Array.from({ length: TICKER_REPEAT }, () => TICKER_TEXT);
const TICKER_LOOP = [...TICKER_SEGMENTS, ...TICKER_SEGMENTS];

/* Inline social icons to match test HTML design */
const SocialIcon = ({ name }) => {
  const size = 20;
  switch (name) {
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="var(--c-bg)" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="var(--c-bg)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "WhatsApp":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
    default:
      return null;
  }
};

/* Circuit board SVG – traces, L-paths, nodes */
const CircuitPattern = memo(() => (
  <svg
    className="footer-circuit-pattern"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1000 220"
    preserveAspectRatio="none"
    width="100%"
    height="100%"
  >
    <defs>
      <linearGradient id="footer-hg" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="var(--c-glow2)" stopOpacity="0" />
        <stop offset="30%"  stopColor="var(--c-glow2)" stopOpacity="0.7" />
        <stop offset="70%"  stopColor="var(--c-glow1)" stopOpacity="0.7" />
        <stop offset="100%" stopColor="var(--c-glow1)" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="footer-vg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="var(--c-glow2)" stopOpacity="0" />
        <stop offset="50%"  stopColor="var(--c-glow2)" stopOpacity="0.5" />
        <stop offset="100%" stopColor="var(--c-glow1)" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Horizontal traces */}
    <line className="circuit-trace circuit-trace-fwd" x1="0" y1="30"  x2="1000" y2="30"  stroke="url(#footer-hg)" strokeWidth="0.35" strokeDasharray="4 8" />
    <line className="circuit-trace circuit-trace-fwd" x1="0" y1="110" x2="1000" y2="110" stroke="url(#footer-hg)" strokeWidth="0.35" strokeDasharray="3 7" opacity="0.7" />
    <line className="circuit-trace circuit-trace-fwd" x1="0" y1="180" x2="1000" y2="180" stroke="url(#footer-hg)" strokeWidth="0.35" strokeDasharray="4 8" />

    {/* Vertical traces */}
    <line className="circuit-trace circuit-trace-rev" x1="60"  y1="0" x2="60"  y2="220" stroke="url(#footer-vg)" strokeWidth="0.35" strokeDasharray="3 7" />
    <line className="circuit-trace circuit-trace-rev" x1="200" y1="0" x2="200" y2="220" stroke="url(#footer-vg)" strokeWidth="0.35" strokeDasharray="3 7" opacity="0.6" />
    <line className="circuit-trace circuit-trace-rev" x1="480" y1="0" x2="480" y2="220" stroke="url(#footer-vg)" strokeWidth="0.35" strokeDasharray="3 7" opacity="0.5" />
    <line className="circuit-trace circuit-trace-rev" x1="820" y1="0" x2="820" y2="220" stroke="url(#footer-vg)" strokeWidth="0.35" strokeDasharray="3 7" opacity="0.6" />
    <line className="circuit-trace circuit-trace-rev" x1="940" y1="0" x2="940" y2="220" stroke="url(#footer-vg)" strokeWidth="0.35" strokeDasharray="3 7" />

    {/* L-shaped corner traces – left side */}
    <polyline className="circuit-trace" points="0,60 30,60 30,110"   stroke="var(--c-glow1)" strokeWidth="0.35" strokeDasharray="3 5" fill="none" opacity="0.6" />
    <polyline className="circuit-trace" points="0,150 50,150 50,180" stroke="var(--c-glow2)" strokeWidth="0.35" strokeDasharray="3 5" fill="none" opacity="0.5" />
    <polyline className="circuit-trace" points="60,0 60,30 120,30"   stroke="var(--c-glow1)" strokeWidth="0.35" strokeDasharray="3 5" fill="none" opacity="0.6" />
    <polyline className="circuit-trace" points="200,110 260,110 260,180" stroke="var(--c-glow2)" strokeWidth="0.35" strokeDasharray="3 5" fill="none" opacity="0.5" />

    {/* L-shaped corner traces – right side */}
    <polyline className="circuit-trace" points="1000,60 970,60 970,110"   stroke="var(--c-glow1)" strokeWidth="0.35" strokeDasharray="3 5" fill="none" opacity="0.6" />
    <polyline className="circuit-trace" points="1000,150 950,150 950,180" stroke="var(--c-glow2)" strokeWidth="0.35" strokeDasharray="3 5" fill="none" opacity="0.5" />
    <polyline className="circuit-trace" points="940,0 940,30 880,30"      stroke="var(--c-glow1)" strokeWidth="0.35" strokeDasharray="3 5" fill="none" opacity="0.6" />
    <polyline className="circuit-trace" points="820,110 760,110 760,180"  stroke="var(--c-glow2)" strokeWidth="0.35" strokeDasharray="3 5" fill="none" opacity="0.5" />

    {/* Circuit nodes */}
    <circle cx="60"  cy="30"  r="2.5" fill="var(--c-glow1)" opacity="0.9" />
    <circle cx="200" cy="30"  r="2"   fill="var(--c-glow2)" opacity="0.7" />
    <circle cx="480" cy="30"  r="2"   fill="var(--c-glow2)" opacity="0.7" />
    <circle cx="820" cy="30"  r="2"   fill="var(--c-glow2)" opacity="0.7" />
    <circle cx="940" cy="30"  r="2.5" fill="var(--c-glow1)" opacity="0.9" />
    <circle cx="60"  cy="110" r="2"   fill="var(--c-glow1)" opacity="0.8" />
    <circle cx="480" cy="110" r="2"   fill="var(--c-glow2)" opacity="0.7" />
    <circle cx="940" cy="110" r="2"   fill="var(--c-glow1)" opacity="0.8" />
    <circle cx="60"  cy="180" r="2.5" fill="var(--c-glow1)" opacity="0.9" />
    <circle cx="200" cy="180" r="2"   fill="var(--c-glow2)" opacity="0.7" />
    <circle cx="820" cy="180" r="2"   fill="var(--c-glow2)" opacity="0.7" />
    <circle cx="940" cy="180" r="2.5" fill="var(--c-glow1)" opacity="0.9" />
    {/* small terminal dots */}
    <circle cx="30"  cy="110" r="1.5" fill="var(--c-glow2)" opacity="0.7" />
    <circle cx="50"  cy="180" r="1.5" fill="var(--c-glow2)" opacity="0.7" />
    <circle cx="970" cy="110" r="1.5" fill="var(--c-glow2)" opacity="0.7" />
    <circle cx="950" cy="180" r="1.5" fill="var(--c-glow2)" opacity="0.7" />
    <circle cx="120" cy="30"  r="1.5" fill="var(--c-glow2)" opacity="0.6" />
    <circle cx="260" cy="180" r="1.5" fill="var(--c-glow2)" opacity="0.6" />
    <circle cx="880" cy="30"  r="1.5" fill="var(--c-glow2)" opacity="0.6" />
    <circle cx="760" cy="180" r="1.5" fill="var(--c-glow2)" opacity="0.6" />
  </svg>
));
CircuitPattern.displayName = "CircuitPattern";

const Footer = () => {
  const footerRef = useRef(null);
  const topLineRef = useRef(null);
  const frameRef = useRef(null);
  const brandRef = useRef(null);
  const linksRef = useRef(null);
  const socialsRef = useRef(null);
  const copyrightRef = useRef(null);

  useGSAP(
    () => {
      const st = (trigger, start, vars) =>
        ({ scrollTrigger: { trigger, start, toggleActions: "play none none reverse" }, ...vars });

      gsap.fromTo(topLineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.inOut", ...st(footerRef.current, "top 95%") });
      gsap.fromTo(frameRef.current, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 1, ease: "power2.out", ...st(footerRef.current, "top 90%") });
      gsap.fromTo(brandRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", ...st(footerRef.current, "top 88%") });

      const linkEls = linksRef.current?.querySelectorAll(".footer-link");
      if (linkEls?.length) {
        gsap.fromTo(linkEls, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power2.out", ...st(footerRef.current, "top 85%") });
      }

      const socialEls = socialsRef.current?.querySelectorAll(".footer-social");
      if (socialEls?.length) {
        gsap.fromTo(socialEls, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(2)", ...st(footerRef.current, "top 85%") });
      }

      gsap.fromTo(copyrightRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", ...st(footerRef.current, "top 80%") });
    },
    { scope: footerRef, dependencies: [] }
  );

  return (
    <footer ref={footerRef} className="footer">

      {/* Animated top line */}
      <div ref={topLineRef} className="footer-top-line" style={{ transformOrigin: "left center" }} />

      {/* Scrolling ticker */}
      <div className="footer-ticker">
        <div className="footer-ticker-track">
          {TICKER_LOOP.map((text, i) => <span key={i}>{text}</span>)}
        </div>
      </div>

      {/* Main neon frame */}
      <div ref={frameRef} className="footer-frame">

        {/* Circuit board pattern */}
        <CircuitPattern />

        {/* Glow layers */}
        <div className="footer-center-glow" />
        <div className="footer-bottom-bloom" />
        <div className="footer-bottom-glow-line" />

        {/* Scanline overlay */}
        <div className="footer-scanline" />

        {/* Corner accents */}
        <div className="footer-corner footer-corner-tl" />
        <div className="footer-corner footer-corner-tr" />
        <div className="footer-corner footer-corner-bl" />
        <div className="footer-corner footer-corner-br" />

        {/* Content */}
        <div className="footer-content">
          {/* Brand – left */}
          <div ref={brandRef} className="footer-brand-col">
            <a href="#home" className="footer-brand-link">
              <span className="footer-brand-name">Sandeep Nishad</span>
              <span className="footer-brand-tag">Shopify Developer</span>
            </a>
            <div className="footer-brand-line" />
          </div>

          {/* Quick Links + Connect – right */}
          <div className="footer-right-col">
            <div ref={linksRef} className="footer-links-col">
              <p className="footer-section-label">QUICK LINKS</p>
              <nav className="footer-nav-grid">
                {navItems.map((item) => (
                  <a key={item.name} href={item.href} className="footer-link footer-nav-link">
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>

            <div ref={socialsRef} className="footer-connect-col">
              <p className="footer-section-label">CONNECT</p>
              <div className="footer-socials-row">
                {footerIconsList.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social footer-social-btn"
                    aria-label={item.name}
                  >
                    <SocialIcon name={item.name} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div ref={copyrightRef} className="footer-copyright">
          © {new Date().getFullYear()} Sandeep Nishad. Built with passion.
        </div>

      </div>{/* /footer-frame */}

    </footer>
  );
};

export default Footer;
