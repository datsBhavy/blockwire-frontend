import { Style } from "@solidjs/meta";
import { Component, JSX, onMount } from "solid-js";
import { primaryGradient, useTheme } from "../../context/ThemeContext"; // Adjust the path to your theme context

type GradientTextProps = JSX.HTMLAttributes<HTMLHeadingElement> & {
  animationSpeed?: number; // Speed in seconds for the gradient animation
  variant?: "hollow"; // Variant for hollow text
  text?: string;
};

const GradientText: Component<GradientTextProps> = (props) => {
  const { theme } = useTheme(); // Access the theme context
  const animationSpeed = props.animationSpeed ?? 4; // Default speed is 4 seconds
  let textElement: HTMLHeadingElement | undefined;

  onMount(() => {
    if (textElement) {
      const textWidth = textElement.offsetWidth;
      const gradientSize = Math.max(400, textWidth * 2); // Ensure gradient is at least double the width
      textElement.style.setProperty("--gradient-size", `${gradientSize}px`);
    }
  });
  return (
    <>
 <Style>{`
        /* Base styles for the gradient text */
        .gradient-text-header {
          font-family: 'Your Header Font', sans-serif; /* Replace with your desired header font */
          font-size: 3rem; /* Adjust size as needed */
          font-weight: bold; /* Ensure the outline is bold */
          text-transform: uppercase; /* Optional for all caps */
          position: relative; /* Needed for pseudo-elements */
        }

        /* Default gradient fill animation (non-hollow variant) */
        .gradient-text-header:not(.hollow)::before {
          content: attr(data-text); /* Duplicate the text */
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${primaryGradient}; /* Gradient colors */
          background-size: 400% 100%; /* Ensure the gradient is wide enough */
          -webkit-background-clip: text; /* Clip the gradient to the text */
          background-clip: text; /* Clip the gradient to the text */
          color: transparent; /* Ensure text remains invisible */
          animation: gradient-animate ${animationSpeed}s linear infinite; /* Dynamic animation speed */
        }

        /* Gradient animation keyframes */
        @keyframes gradient-animate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .hollow-gradient-text {
          font-size: 4rem; /* Adjust size as needed */
          font-weight: bold;
          color: transparent; /* Make the text fill transparent */
          -webkit-text-stroke: 2px; /* Define the stroke width */
          text-align: center; /* Center the text */
          text-transform: uppercase; /* Optional: Uppercase for styling */

          /* Gradient Stroke */
          background: linear-gradient(90deg, #e74c3c, #3498db, #9b59b6, #e74c3c); /* Initial gradient */
          -webkit-text-stroke-color: transparent; /* Make the stroke initially transparent */
          -webkit-background-clip: text; /* Clip gradient to the stroke */
          background-clip: text; /* Standard version for modern browsers */
          background-size: 400% 100%; /* Increase size for longer text */
          animation: gradient-shift ${animationSpeed}s infinite; /* Apply animation */
        }

        /* Keyframes for Gradient Animation */
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</Style>
      <h1
        {...props}
        class={`${props.variant === 'hollow' ? 'hollow-gradient-text' : 'gradient-text-header'} ${props.class}`}
        data-text={props.text}
      >
        {props.text ?? props.children}
      </h1>
    </>
  );
};

export default GradientText;