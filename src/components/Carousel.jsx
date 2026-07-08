import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { slides } from "../constants";
import ProjectPopup from "./ProjectPopup";

const SPACING = 63; // slide width (60vw) + gap (3vw)
const LOOP_WIDTH = slides.length * SPACING;
const wrap = gsap.utils.wrap(-LOOP_WIDTH / 2, LOOP_WIDTH / 2);

const Carousel = () => {
  const containerRef = useRef(null);
  const stateRef = useRef({
    pos: 0, // rendered position (fractional slide index)
    target: 0, // where the drag wants the position to be
    dragging: false,
    startX: 0,
    startTarget: 0,
    moved: false,
    velocity: 0,
    lastPos: 0,
  });
  const snapTween = useRef(null);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const items = gsap.utils.toArray(".slider-item", container);
    const s = stateRef.current;

    // Pre-created GSAP setters: GPU-accelerated transforms, no string parsing per frame
    const setters = items.map((el) => {
      gsap.set(el, { x: 0, force3D: true });
      return gsap.quickSetter(el, "x", "vw");
    });

    const render = () => {
      for (let i = 0; i < items.length; i++) {
        setters[i](wrap((i - s.pos) * SPACING));
      }
    };

    // Single rAF loop drives everything, so updates never outpace the display
    const tick = () => {
      if (s.dragging) {
        // Smoothed follow makes the drag feel fluid instead of 1:1 jittery
        s.pos += (s.target - s.pos) * 0.22;
        s.velocity = s.pos - s.lastPos;
        s.lastPos = s.pos;
        render();
      }
    };
    gsap.ticker.add(tick);

    const snapTo = (target, duration = 1.2) => {
      snapTween.current?.kill();
      snapTween.current = gsap.to(s, {
        pos: target,
        duration,
        ease: "expo.out",
        onUpdate: render,
      });
    };
    s.snapTo = snapTo;

    const onPointerDown = (e) => {
      snapTween.current?.kill();
      s.dragging = true;
      s.moved = false;
      s.startX = e.clientX;
      s.startTarget = s.pos;
      s.target = s.pos;
      s.lastPos = s.pos;
      s.velocity = 0;
    };

    const onPointerMove = (e) => {
      if (!s.dragging) return;
      const deltaPx = e.clientX - s.startX;
      if (Math.abs(deltaPx) > 6) s.moved = true;
      const deltaVw = (deltaPx / window.innerWidth) * 100;
      s.target = s.startTarget - deltaVw / SPACING;
    };

    const onPointerUp = () => {
      if (!s.dragging) return;
      s.dragging = false;

      // Project momentum forward, then snap to the nearest slide
      const projected = s.pos + s.velocity * 14;
      let target = Math.round(projected);
      const diff = s.target - s.startTarget;
      // A small flick still advances one slide in the drag direction
      if (target === Math.round(s.startTarget) && Math.abs(diff) > 0.06) {
        target = Math.round(s.startTarget) + (diff > 0 ? 1 : -1);
      }
      // Never jump more than one slide past where the drag ended
      target = gsap.utils.clamp(
        Math.floor(s.pos) - 1,
        Math.ceil(s.pos) + 1,
        target
      );
      snapTo(target, 1);
      setTimeout(() => (s.moved = false), 0);
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    render();

    return () => {
      gsap.ticker.remove(tick);
      snapTween.current?.kill();
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  const nextSlide = () => {
    const s = stateRef.current;
    s.snapTo?.(Math.round(s.pos) + 1);
  };

  const prevSlide = () => {
    const s = stateRef.current;
    s.snapTo?.(Math.round(s.pos) - 1);
  };

  const handleProjectClick = (slide) => {
    if (stateRef.current.moved) return;
    setSelectedProject(slide);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="relative">
      <div className="w-full relative lg:h-[60vh] md:h-[40vh] h-[60vh]">
        <div className="carousel-gradient-left-box md:w-52 w-16 h-full absolute bottom-0 left-0 z-20 pointer-events-none"></div>
        <div className="carousel-gradient-right-box md:w-52 w-16 h-full absolute bottom-0 right-0 z-20 pointer-events-none"></div>
        <div
          ref={containerRef}
          className="absolute w-full h-full top-0 left-0 overflow-hidden cursor-grab active:cursor-grabbing select-none"
          style={{ touchAction: "pan-y" }}
        >
          {slides.map((slide, index) => (
            <div
              className="slider-item absolute top-0 left-[20vw] w-[60vw] h-full overflow-hidden cursor-pointer group will-change-transform"
              key={slide.id}
              onClick={() => handleProjectClick(slide)}
            >
              <img
                src={slide.img}
                alt="slide"
                draggable={false}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover glow overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none slider-hover-glow" />
              <div className="absolute w-full h-20 bottom-0 left-0 bg-black-300 bg-opacity-90 px-5">
                <div className="w-full h-full flex justify-between items-center">
                  <div className="flex-center gap-2">
                    <p className="md:text-2xl text-white-50 opacity-80">
                      {index + 1}.
                    </p>
                    <p className="md:text-2xl text-white-50 opacity-80">
                      {slide.title}
                    </p>
                  </div>
                  <div className="flex-center gap-5">
                    <p className="text-2xl hidden md:block text-white-50 opacity-80 group-hover:opacity-100 transition-opacity">
                      Preview Project
                    </p>
                    <img
                      src="/images/arrowupright.svg"
                      alt="arrow"
                      className="md:size-10 size-7 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 text-white-50 flex justify-end gap-5 md:-translate-x-32 -translate-x-5">
        <div
          onClick={prevSlide}
          className="rounded-full cursor-pointer bg-blue-50 hover:bg-pink-100 active:scale-90 transition-all w-12 h-12 flex-center"
        >
          <img src="/images/CaretLeft.svg" alt="left" className="w-5 h-5" />
        </div>
        <div
          onClick={nextSlide}
          className="rounded-full cursor-pointer bg-blue-50 hover:bg-pink-100 active:scale-90 transition-all w-12 h-12 flex-center"
        >
          <img src="/images/CaretRight.svg" alt="Right" className="w-5 h-5" />
        </div>
      </div>

      <ProjectPopup
        project={selectedProject}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
    </div>
  );
};

export default Carousel;
