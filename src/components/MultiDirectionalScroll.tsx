import { onMount } from "solid-js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MultiDirectionalScroll = () => {
  let sectionsRef = [];

  const directions = ["y", "x", "y", "x"]; // Alternating scroll directions

  onMount(() => {
    sectionsRef.forEach((section, index) => {
      const direction = directions[index % directions.length];
      const isVertical = direction === "y";

      gsap.fromTo(
        section,
        {
          [isVertical ? "y" : "x"]: isVertical ? "100%" : "100%",
        },
        {
          [isVertical ? "y" : "x"]: "0%",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=100vh`,
            pin: true,
            scrub: true,
          },
        }
      );
    });
  });

  return (
    <div style={{ overflow: "hidden" }}>
      {[...Array(4)].map((_, index) => (
        <section
          ref={(el) => (sectionsRef[index] = el)}
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#c0c0c0",
          }}
        >
          <h1>Section {index + 1}</h1>
        </section>
      ))}
    </div>
  );
};

export default MultiDirectionalScroll;