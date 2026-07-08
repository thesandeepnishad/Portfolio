import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const ProjectPopup = ({ project, isOpen, onClose }) => {
  const wrapperRef = useRef(null);
  const overlayRef = useRef(null);
  const popupRef = useRef(null);
  const imageRef = useRef(null);
  const scanlineRef = useRef(null);
  const borderGlowRef = useRef(null);
  const techRefs = useRef([]);
  const closeBtnRef = useRef(null);
  const tlRef = useRef(null);
  const loopTlRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    if (isOpen && project) {
      const wrapper = wrapperRef.current;
      wrapper.style.visibility = "visible";
      wrapper.style.pointerEvents = "auto";

      techRefs.current = techRefs.current.filter(Boolean);

      tlRef.current?.kill();
      loopTlRef.current?.kill();

      const tl = gsap.timeline();
      tlRef.current = tl;

      document.body.style.overflow = "hidden";

      gsap.set(popupRef.current, { willChange: "transform, opacity" });
      gsap.set(overlayRef.current, { willChange: "opacity" });

      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      )
        .fromTo(
          popupRef.current,
          { scale: 0.85, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "back.out(1.2)",
          },
          0.05
        )
        .fromTo(
          closeBtnRef.current,
          { scale: 0 },
          { scale: 1, duration: 0.3, ease: "back.out(2)" },
          0.15
        )
        .fromTo(
          imageRef.current,
          { scale: 1.15, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
          0.1
        )
        .fromTo(
          ".popup-title",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" },
          0.25
        )
        .fromTo(
          ".popup-desc",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" },
          0.32
        )
        .fromTo(
          techRefs.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.25,
            stagger: 0.05,
            ease: "back.out(2)",
          },
          0.38
        )
        .fromTo(
          ".popup-link-btn",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" },
          0.45
        )
        .call(() => {
          gsap.set(popupRef.current, { willChange: "auto" });
          gsap.set(overlayRef.current, { willChange: "auto" });
        });

      const loopTl = gsap.timeline();
      loopTlRef.current = loopTl;

      loopTl
        .fromTo(
          scanlineRef.current,
          { y: "-100%" },
          { y: "200%", duration: 2, ease: "none", repeat: -1 }
        )
        .fromTo(
          borderGlowRef.current,
          { opacity: 0.4 },
          {
            opacity: 1,
            duration: 1.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          },
          0
        );
    } else {
      const wrapper = wrapperRef.current;
      if (wrapper) {
        wrapper.style.visibility = "hidden";
        wrapper.style.pointerEvents = "none";
      }
      tlRef.current?.kill();
      loopTlRef.current?.kill();
    }

    return () => {
      tlRef.current?.kill();
      loopTlRef.current?.kill();
    };
  }, [isOpen, project]);

  const handleClose = useCallback(() => {
    tlRef.current?.kill();
    loopTlRef.current?.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        if (wrapperRef.current) {
          wrapperRef.current.style.visibility = "hidden";
          wrapperRef.current.style.pointerEvents = "none";
        }
        onClose();
      },
    });

    gsap.set(popupRef.current, { willChange: "transform, opacity" });

    tl.to(popupRef.current, {
      scale: 0.9,
      opacity: 0,
      y: 20,
      duration: 0.25,
      ease: "power2.in",
    }).to(
      overlayRef.current,
      { opacity: 0, duration: 0.2 },
      0.05
    );
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, handleClose]);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-999 flex-center"
      style={{ visibility: "hidden", pointerEvents: "none" }}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 popup-overlay cursor-pointer"
        onClick={handleClose}
      />

      <div
        ref={popupRef}
        className="popup-container relative w-[92vw] max-w-[900px] max-h-[90vh] overflow-y-auto rounded-2xl z-10"
      >
        <div ref={borderGlowRef} className="popup-border-glow" />
        <div ref={scanlineRef} className="popup-scanline" />

        <div className="popup-corner popup-corner-tl" />
        <div className="popup-corner popup-corner-tr" />
        <div className="popup-corner popup-corner-bl" />
        <div className="popup-corner popup-corner-br" />

        <button
          ref={closeBtnRef}
          onClick={handleClose}
          className="popup-close-btn"
          aria-label="Close popup"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M2 2L18 18M18 2L2 18"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {project && (
          <>
            <div className="popup-image-wrapper">
              <div className="popup-image-inner" ref={imageRef}>
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="popup-image-overlay" />
              <div className="popup-number-badge">
                <span>{String(project.id).padStart(2, "0")}</span>
              </div>
            </div>

            <div className="popup-content">
              <h2 className="popup-title">{project.title}</h2>
              <div className="popup-divider" />
              <p className="popup-desc">{project.description}</p>

              <div className="mt-6">
                <p className="popup-tech-label">TECH STACK</p>
                <div className="flex flex-wrap gap-3 mt-3">
                  {project.techStack?.map((tech, i) => (
                    <span
                      key={tech}
                      ref={(el) => (techRefs.current[i] = el)}
                      className="popup-tech-tag"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="popup-link-btn"
                >
                  <span>View Live Project</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectPopup;
