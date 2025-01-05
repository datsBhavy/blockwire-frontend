import { Component, onMount, For, onCleanup } from "solid-js";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Style } from "@solidjs/meta";

gsap.registerPlugin(ScrollTrigger);

interface AnimateHighlightedTextProps {
  text: string;
  highlightColor?: string; // Optional prop for the highlight color
  class?: string;
  style?: Record<string, string>;
}

const AnimateHighlightedText: Component<AnimateHighlightedTextProps> = (props) => {
  let textContainer: HTMLDivElement | undefined;

  const splitTextIntoSpans = (text: string) => {
    return text.split("").map((char, i) => (
      <span
        class="highlighted-char"
        style={{
          position: "relative",
          display: "inline-block",
          "white-space": char === " " ? "pre" : "normal", // Preserve spaces
        }}
        data-index={i}
      >
        {char}
        <span
          class="highlight-overlay"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "0%", // Initially zero width
            height: "100%",
            "background-color": props.highlightColor || "#f1c40f", // Use highlightColor or default
            "z-index": "-1",
          }}
        ></span>
      </span>
    ));
  };

  onMount(() => {
    if (!textContainer) return;

    const overlays = textContainer.querySelectorAll<HTMLElement>(".highlight-overlay");
    const animationDuration = 0.3; // Duration for each character's highlight

    const animation = gsap.fromTo(
      overlays,
      { width: "0%" }, // Start highlight at 0%
      {
        width: "100%", // Expand highlight to full width
        duration: animationDuration, // Set duration
        stagger: animationDuration, // Ensure no overlap
        ease: "power2.out",
        scrollTrigger: {
          trigger: textContainer,
          start: "top 80%",
          end: "bottom 10%",
          scrub: true,
        },
      }
    );

    onCleanup(() => {
      // Kill ScrollTrigger instance
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      
      // Kill the GSAP animation
      animation.kill();
    });
  });

  return (
    <>
      <Style>{`
        .highlighted-char {
          position: relative;
          display: inline-block;
          white-space: pre; /* Preserve spaces */
        }

        .highlight-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 0%; /* Initial width */
          height: 100%;
          z-index: -1;
        }
      `}</Style>
      <div
        ref={textContainer}
        class={`animate-highlighted-text ${props.class ?? ""}`}
        style={{
          display: "inline-block",
          color: "inherit",
          "font-weight": "bold",
          "line-height": "1.5",
          ...props.style,
        }}
      >
        <For each={splitTextIntoSpans(props.text)}>{(char) => char}</For>
      </div>
    </>
  );
};

export default AnimateHighlightedText;