import { onMount } from "solid-js";
import { gsap } from "gsap";
import "./TetrahedronComponent.css";

const TetrahedronComponent = () => {
  onMount(() => {
    // GSAP Animation
    gsap.to(".tetrahedron", {
      rotationY: 360, // Rotate around Y-axis
      rotationX: 360, // Rotate diagonally
      duration: 10, // Animation duration
      ease: "linear", // Smooth continuous motion
      repeat: -1, // Infinite repeat
    });
  });

  return (
    <div class="tetrahedron-container">
      <div class="tetrahedron">
        <div class="face face-1"></div>
        <div class="face face-2"></div>
        <div class="face face-3"></div>
        <div class="face face-4"></div>
      </div>
    </div>
  );
};

export default TetrahedronComponent;