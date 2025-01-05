import { onMount } from "solid-js";
import { Style } from "@solidjs/meta";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const ColorChangeText = (props) => {
  const { theme } = useTheme();
  let textRef;

  onMount(() => {
    gsap.fromTo(
      textRef,
      {
        backgroundPosition: "0% 0%", // Starts with the gradient off-screen to the left
        backgroundSize: "200% 100%", // Allows smooth left-to-right animation
      },
      {
        backgroundPosition: "100% 0%", // Ends with the full gradient applied
        backgroundImage: `linear-gradient(90deg, ${
          props.currentColor || "black"
        }, ${props.targetColor || theme()?.buttonBg1}, ${
          props.targetColor || theme()?.buttonBg1
        })`,
        backgroundClip: "text",
        textFillColor: "transparent",
        webkitBackgroundClip: "text",
        ease: "none",
        scrollTrigger: {
          trigger: textRef,
          start: "top 75%", // Starts when the top of the text reaches 75% of the viewport
          end: "top 25%", // Completes when the top of the text reaches 25% of the viewport
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.kill();
    };
  });

  return (
    <>
      <Style>
        {`
          .gradient-text {
            display: inline-block;
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            background-size: 200% 100%; /* Ensures smooth left-to-right animation */
          }
        `}
      </Style>
      <span ref={(el) => (textRef = el)} class="gradient-text">
        {props.children}
      </span>
    </>
  );
};

export default ColorChangeText;