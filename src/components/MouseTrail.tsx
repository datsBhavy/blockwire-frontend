import { onMount } from "solid-js";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";
import { Light } from "../constants/styles";

const MouseTrail = () => {
  const { theme } = useTheme();

  onMount(() => {
    const trails = document.querySelectorAll(".trail");
    const smoothPointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    const totalPointsArray = [25, 20, 15, 10, 8, 5, 3]; // Shorter trail lengths

    window.addEventListener("mousemove", (event) => {
      gsap.to(smoothPointer, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.3, // Shorter duration for snappier movement
        ease: "power2.out",
      });
    });

    function updatePath() {
      trails.forEach((path, index) => {
        let points = path.points || [];
        points.unshift({ ...smoothPointer });
        while (points.length > totalPointsArray[index]) {
          points.pop();
        }
        path.points = points;

        if (points.length > 1) {
          let d = `M ${points[0].x} ${points[0].y}`;
          for (let i = 1; i < points.length; i++) {
            d += ` L ${points[i].x} ${points[i].y}`;
          }
          path.setAttribute("d", d);
        }
      });

      requestAnimationFrame(updatePath);
    }

    updatePath();

    return () => {
      window.removeEventListener("mousemove", () => {});
    };
  });

  return (
    <>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            background: ${theme()?.backgroundColor || "#000"};
          }

          svg {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            pointer-events: none;
            z-index: 1000;
          }

          path {
            fill: none;
            stroke-width: 8; /* Adjusted thickness for a slimmer trail */
            stroke-linecap: round;
            stroke-linejoin: round;
          }
        `}
      </style>
      <svg>
        <path d="" class="trail" style={`stroke: ${theme()?.primaryColor}50;`} />
      </svg>
      <svg>
        <path d="" class="trail" style={`stroke: ${theme()?.primaryColor};`} />
      </svg>
      {/* <svg>
        <path d="" class="trail" style={`stroke: ${theme()?.accentColor};`} />
      </svg> */}
    </>
  );
};

export default MouseTrail;