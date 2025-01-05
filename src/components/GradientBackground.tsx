import { Style } from "@solidjs/meta";
import { Component } from "solid-js";

interface GradientBackgroundProps {
  variant?: "blue" | "red" | "green" | "purple" | "orange"; // Supported variants
  children?: any; // Allow nesting content inside the component
}

const GradientBackground: Component<GradientBackgroundProps> = (props) => {
  const gradients = {
    blue: "linear-gradient(135deg, #1e3a8a, #60a5fa)",
    red: "linear-gradient(135deg, #b91c1c, #f87171)",
    green: "linear-gradient(135deg, #065f46, #34d399)",
    purple: "linear-gradient(135deg, #6d28d9, #a78bfa)",
    orange: "linear-gradient(135deg, #c2410c, #fbbf24)",
  };

  const selectedGradient = gradients[props.variant ?? "blue"]; // Default to "blue"

  return (
    <>
      <Style>{`
        .gradient-background {
          background: ${selectedGradient};
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white; /* Ensure text is readable */
          overflow: hidden;
          transition: background 0.5s ease; /* Smooth transition for switching gradients */
        }
      `}</Style>
      <div class="gradient-background">
        {props.children}
      </div>
    </>
  );
};

export default GradientBackground;