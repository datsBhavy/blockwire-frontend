import { Component, onMount } from "solid-js";
import { gsap } from "gsap";

interface AnimatedTextProps {
  text: string;
  animation?: (letter: HTMLElement, index: number) => gsap.TweenVars;
}

const AnimatedText: Component<AnimatedTextProps> = (props) => {
  const defaultAnimations = [
    (letter: HTMLElement) => ({ y: 20, opacity: 0, scale: 0.8 }),
    (letter: HTMLElement) => ({ x: 20, opacity: 0, rotation: 15 }),
    (letter: HTMLElement) => ({ y: -20, opacity: 0, scale: 1.2 }),
    (letter: HTMLElement) => ({ x: -20, opacity: 0, rotation: -15 }),
  ];

  onMount(() => {
    const letters = document.querySelectorAll(".animated-letter");

    // Randomize animation if no specific animation prop is provided
    const animationFunc = props.animation
      ? props.animation
      : (letter: HTMLElement, index: number) =>
          defaultAnimations[index % defaultAnimations.length](letter);

    gsap.fromTo(
      letters,
      (i) => animationFunc(letters[i] as HTMLElement, i), // Start state
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1,
      }
    );
  });

  return (
    <div style={{ display: "inline-block", position: "relative" }}>
      {/* Wrap each letter */}
      {props.text.split("").map((letter, index) => (
        <span
          class="animated-letter"
          style={{
            display: "inline-block",
            "will-change": "transform, opacity",
          }}
          key={index}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;