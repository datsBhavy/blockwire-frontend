import { onMount } from "solid-js";
import { gsap } from "gsap";
import { Style } from "@solidjs/meta";

const CubeComponent = (props: { size?: number; class?: string }) => {
  let cubeRef: HTMLDivElement | null = null;

  const size = props.size || 200; // Default size is 200px

  onMount(() => {
    if (!cubeRef) return;

    // GSAP Animation scoped to this specific cube instance
    gsap.to(cubeRef, {
      rotationY: 360, // Rotate around Y-axis
      rotationX: 360, // Rotate diagonally
      duration: 10, // Animation duration
      ease: "linear", // Smooth continuous motion
      repeat: -1, // Infinite repeat
    });
  });

  return (
    <>
      <Style>{`
        .cube-container {
          perspective: 1000px; /* Perspective for 3D effect */
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 50px auto; /* Center the cube on the screen */
        }

        .cube {
          position: relative;
          transform-style: preserve-3d; /* Enable 3D transformations */
        }

        .face {
          position: absolute;
          background: transparent; /* Transparent background */
          border: 2px solid; /* Outline edges */
          border-image-source: linear-gradient(90deg, #e74c3c, #3498db); /* Gradient border */
          border-image-slice: 1; /* Ensure gradient is applied */
        }

        /* Position each face */
        .front { transform: translateZ(var(--depth)); } /* Move forward */
        .back { transform: rotateY(180deg) translateZ(var(--depth)); } /* Move backward */
        .left { transform: rotateY(-90deg) translateZ(var(--depth)); } /* Move left */
        .right { transform: rotateY(90deg) translateZ(var(--depth)); } /* Move right */
        .top { transform: rotateX(90deg) translateZ(var(--depth)); } /* Move top */
        .bottom { transform: rotateX(-90deg) translateZ(var(--depth)); } /* Move bottom */
      `}</Style>
      <div
        classList={{
          "cube-container": true,
          [props.class || ""]: true
        }}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <div
          ref={(el) => (cubeRef = el)}
          class="cube"
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        >
          {["front", "back", "left", "right", "top", "bottom"].map((face) => (
            <div
              class={`face ${face}`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                "--depth": `${size / 2}px`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CubeComponent;