import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GradientSphares from "../components/GradientSphares";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const timelineTrackRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".exp-card");
      const dots = gsap.utils.toArray(".exp-dot");

      gsap.fromTo(
        ".exp-timeline-track",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.8,
          },
        }
      );

      dots.forEach((dot, i) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: dot,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          dot.querySelector(".exp-dot-ping"),
          { scale: 0.8, opacity: 0.6 },
          {
            scale: 2.5,
            opacity: 0,
            duration: 1.5,
            repeat: -1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: dot,
              start: "top 80%",
              toggleActions: "play pause resume pause",
            },
          }
        );
      });

      cards.forEach((card, i) => {
        const isLeft = i % 2 === 0;

        gsap.fromTo(
          card,
          {
            x: isLeft ? -60 : 60,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        const tags = card.querySelectorAll(".exp-tag");
        gsap.fromTo(
          tags,
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen relative overflow-hidden"
      id="experience"
    >
      <GradientSphares
        sphare1Class="exp-gradient-sphere exp-sphere-1"
        sphare2Class="exp-gradient-sphere exp-sphere-2"
      />

      <div className="container mx-auto md:py-40 py-20 relative z-10">
        <TitleHeader
          title="My EXPERIENCE"
          number="04"
          subtext="A timeline of my professional journey"
        />

        <div className="exp-timeline relative mt-20 md:mt-28">
          {/* Center line */}
          <div className="exp-timeline-line">
            <div
              ref={timelineTrackRef}
              className="exp-timeline-track"
            />
          </div>

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={exp.id}
                className={`exp-row relative flex items-start md:items-center mb-16 md:mb-24 ${
                  isLeft
                    ? "md:flex-row flex-row"
                    : "md:flex-row-reverse flex-row"
                }`}
              >
                {/* Card */}
                <div
                  className={`exp-card exp-card-glass relative md:w-[calc(50%-40px)] w-[calc(100%-50px)] ${
                    isLeft ? "md:pr-0 md:text-right" : "md:pl-0 md:text-left"
                  } ml-12 md:ml-0`}
                >
                  {/* Corner accents */}
                  <div className="exp-corner exp-corner-tl" />
                  <div className="exp-corner exp-corner-tr" />
                  <div className="exp-corner exp-corner-bl" />
                  <div className="exp-corner exp-corner-br" />

                  {/* Scanline */}
                  <div className="exp-card-scanline" />

                  <div className="relative z-10 p-6 md:p-8">
                    <p className="exp-duration">{exp.duration}</p>
                    <h3 className="exp-role">{exp.role}</h3>
                    <p className="exp-company">{exp.company}</p>

                    <div className="exp-card-divider" />

                    <p className="exp-description">{exp.description}</p>

                    <div
                      className={`flex flex-wrap gap-2 mt-5 ${
                        isLeft ? "md:justify-end" : "md:justify-start"
                      }`}
                    >
                      {exp.techStack.map((tech) => (
                        <span key={tech} className="exp-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="exp-dot absolute left-0 md:left-1/2 md:-translate-x-1/2 z-20">
                  <div className="exp-dot-ping" />
                  <div className="exp-dot-core">
                    <span className="exp-dot-number">
                      {String(exp.id).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-[calc(50%-40px)]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
