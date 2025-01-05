import './LoadingScreen.css'

import { createSignal, onMount } from "solid-js";
import { gsap } from "gsap";

export default function FlowerBlossomLoader() {
  const [isLoaded, setIsLoaded] = createSignal(false); // Track loading state

  onMount(() => {
    // Simulate loading process
    setTimeout(() => {
      setIsLoaded(true); // Mark loading as complete after a delay
    }, 4000); // Adjust timing as needed

    const circles = document.querySelectorAll(".circle");

    gsap.set(circles, { transformOrigin: "center" });

    // Animate circles to grow outward symmetrically
    gsap.to(circles, {
      scale: 5, // Large scale expansion
      opacity: 0, // Gradual fade out
      duration: 4, // Slow animation duration
      stagger: 0.2, // Delay between animations for flower-like effect
      repeat: -1, // Infinite loop
      ease: "power1.inOut",
    });

    // Add a rotation effect to make it more dynamic
    gsap.to(circles, {
      rotation: 360, // Spin the circles
      duration: 10, // Slower rotation
      repeat: -1,
      ease: "linear",
    });
  });

  return (
    <>
      {!isLoaded() && (
        <div class="loading-screen">
          <div class="circles-container">
            {[...Array(8)].map((_, i) => (
              <div class="circle" key={i}></div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}