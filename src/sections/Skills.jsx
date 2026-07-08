import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GradientSphares from "../components/GradientSphares";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".skill-card");

      gsap.fromTo(
        ".skill-section-title",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        cards,
        {
          y: 50,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen relative overflow-hidden"
      id="skills"
    >
      {/* <GradientSphares
        sphare1Class="skills-gradient-sphere skills-sphere-1"
        sphare2Class="skills-gradient-sphere skills-sphere-2"
      /> */}

      <div className="container mx-auto md:py-40 py-20 relative z-10">
        <div className="skill-section-title">
          <TitleHeader
            title="MY SKILLS"
            number="02"
            subtext="Technologies and tools I work with"
          />
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-card group relative">
              <div className="skill-card-glow" />
              <div className="skill-card-inner">
                <div className="skill-card-corner skill-card-corner-tl" />
                <div className="skill-card-corner skill-card-corner-tr" />
                <div className="skill-card-corner skill-card-corner-bl" />
                <div className="skill-card-corner skill-card-corner-br" />
                <div className="skill-card-scanline" />
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="skill-card-icon"
                />
                <p className="skill-card-name">{skill.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
