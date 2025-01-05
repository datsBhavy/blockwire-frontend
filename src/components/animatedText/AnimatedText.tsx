import { Component, For, onMount, createSignal, onCleanup } from "solid-js";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  titles: string[]; // Array of title strings to animate
}

const AnimatedText: Component<AnimatedTextProps> = (props) => {
  const [currentTitleIndex, setCurrentTitleIndex] = createSignal(0);

  onMount(() => {
    const container = document.querySelector(".animated-text-container");
    const titles = document.querySelectorAll(".animated-title");
    const totalTitles = props.titles.length;
    // Create ScrollTrigger
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${totalTitles * 100}%`, // Extend scroll based on the number of titles
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        const progressPerTitle = 1 / totalTitles;
        const index = Math.floor(self.progress / progressPerTitle);
        setCurrentTitleIndex(Math.min(index, totalTitles - 1)); // Update the current title index
      },
    });

    // GSAP Animation for each title
    titles.forEach((title, i) => {
      gsap.fromTo(
        title,
        { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 50 }, // First title starts visible
        {
          opacity: i === 0 ? 1 : 0,
          y: 0,
          scrollTrigger: {
            trigger: container,
            start: `${i * 100}vh top`,
            end: `${(i + 1) * 100}vh top`,
            scrub: true,
            onEnter: () => (title.style.opacity = "1"),
            onLeave: () => (title.style.opacity = "0"),
            onEnterBack: () => (title.style.opacity = "1"),
            onLeaveBack: () => (title.style.opacity = "0"),
          },
        }
      );
    });
    onCleanup(() => {
      // Kill ScrollTrigger instance
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      
      // Kill the GSAP animation
    });
  });

  return (
    <div class="animated-text-container" style="height: 100vh; position: relative;">
      <For each={props.titles}>
        {(title, index) => (
          <div
            class="animated-title"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "4rem",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              opacity: index() === 0 ? 1 : 0, // Only the first title starts visible
              transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
            }}
          >
            {title}
          </div>
        )}
      </For>
    </div>
  );
};

export default AnimatedText;