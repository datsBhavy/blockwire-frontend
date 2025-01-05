import { createSignal, onMount } from "solid-js";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useTheme } from "../../context/ThemeContext";
import { Style } from "@solidjs/meta";
import GradientText from "../gradientText/GradientText";

gsap.registerPlugin(ScrollTrigger);

interface HyperspaceProps {
  text: string;
}

export default function Hyperspace(props: HyperspaceProps) {
  const [isPlaying, setIsPlaying] = createSignal(false); // Tracks play/pause state
  const [currentWordIndex, setCurrentWordIndex] = createSignal(0);
  const words = ["Key Opinion Leaders", "Innovation", "Maerik"]; // Words to cycle through
  const word = "Design.".split("");

  const {setNavbarState, updateTheme, theme} = useTheme()
  let playTimeline = null; // GSAP timeline for play mode
  let scrollTrigger = null; // ScrollTrigger instance

  onMount(() => {
    if (props.text) {
      words[0] = props.text;
    }
  })

  onMount(() => {
    const stars = document.querySelectorAll(".star");
    const boldText = document.querySelector(".bold-text");
    const letters = boldText?.textContent?.split("");
  
    if (boldText && letters) {
      boldText.innerHTML = letters
        .map((letter) => {
          // If the character is a space, preserve it with a non-breaking space or a class
          return letter === " "
            ? `<span class="letter space">&nbsp;</span>`
            : `<span class="letter">${letter}</span>`;
        })
        .join("");
  
      const letterElements = document.querySelectorAll(".letter");
  
      // Pin the section and extend scroll duration
      ScrollTrigger.create({
        trigger: ".hyperspace-container",
        start: "top top",
        end: "+=550%", // Extend scroll duration to 5 viewport heights
        scrub: true,
        pin: true, // Pin the container for the hyperspace effect
      });
    }
  
    gsap.fromTo(
      boldText,
      { x: "100vw", opacity: 0 }, // Start off-screen right
      {
        x: "-100vw", // End off-screen left
        opacity: 1, // Fully visible at center
        scrollTrigger: {
          trigger: ".hyperspace-container",
          start: "top top", // Start animation when the component enters the viewport
          end: "+=500%", // Match the extended scroll duration of the star animation
          scrub: true, // Synchronize with scroll
        },
      }
    );
  
    // Animate stars flying towards the user
    stars.forEach((star) => {
      const randomX = gsap.utils.random(-50, 50); // Random horizontal trajectory
      const randomY = gsap.utils.random(-50, 50); // Random vertical trajectory
      const randomZ = gsap.utils.random(-1000, -500); // Start far away
  
      gsap.fromTo(
        star,
        {
          x: `${randomX}vw`,
          y: `${randomY}vh`,
          z: randomZ,
          opacity: 1,
        },
        {
          x: `${randomX * 5}vw`, // Exaggerate outward motion
          y: `${randomY * 5}vh`,
          z: 0, // Fly toward the user
          opacity: 0, // Fade out as it gets close
          duration: 3,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".hyperspace-container",
            start: "top top",
            end: "+=500%", // Extend animation over the longer scroll duration
            scrub: true,
          },
        }
      );
    });
  
    playTimeline = gsap.timeline({ paused: true });
    stars.forEach((star) => {
      const randomX = gsap.utils.random(-50, 50);
      const randomY = gsap.utils.random(-50, 50);
      const randomZ = gsap.utils.random(-1000, -500);
  
      playTimeline.fromTo(
        star,
        {
          x: `${randomX}vw`,
          y: `${randomY}vh`,
          z: randomZ,
          opacity: 1,
        },
        {
          x: `${randomX * 5}vw`,
          y: `${randomY * 5}vh`,
          z: 0,
          opacity: 0,
          duration: 3,
          ease: "power1.inOut",
          repeat: -1,
        },
        0
      );
    });

    ScrollTrigger.create({
      trigger: ".hyperspace-container",
      start: "top top",
      end: "bottom top",
      onEnter: () => {
    
      },
      onLeave: () => {
        // Do nothing when leaving
        updateTheme({
          ...theme()
        })
      },
      onEnterBack: () => {
      },
      onLeaveBack: () => {
        updateTheme({
          ...theme()
        })
        // Do nothing when scrolling back out
      },
    });
  });

return (
  
  
  <>
<Style>{`
/* Hyperspace Container */
.hyperspace-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: ${theme().backgroundColor};
  overflow: hidden;
  perspective: 1000px;
}

/* Stars Wrapper */
.stars-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

/* Individual Stars */
.star {
  position: absolute;
  width: 3px;
  height: 3px;
  background-color: ${theme().textColor};
  border-radius: 50%;
  top: var(--top);
  left: var(--left);
  transform-origin: center;
  transform: translateZ(-1000px);
  opacity: 1;
}

/* Bold Text */
.bold-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10rem!important;
  font-weight: 900;
  color: ${theme().textColor};
  z-index: 10;
  white-space: nowrap;
}

/* Play/Pause Button */
.play-pause-btn {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${theme().buttonText};
  background: ${theme().buttonBg};
  border-radius: 5px;
  border: none;
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s ease, transform 0.2s ease;
}

.play-pause-btn:hover {
  background: ${theme().buttonHoverBg || theme().textColor};
  color: ${theme().buttonHoverText || theme().backgroundColor};
  transform: translateX(-50%) scale(1.05);
}

.play-pause-btn:active {
  transform: translateX(-50%) scale(0.95);
}
`}</Style>
  <div class="hyperspace-container">
    <div class="stars-wrapper">
      {[...Array(250)].map((_, i) => (
        <div
          class="star"
          style={{
            "--top": `${Math.random() * 100}%`,
            "--left": `${Math.random() * 100}%`,
          }}
          key={i}
        ></div>
      ))}
    </div>
    {/* <GradientText class="bold-text" text={words[currentWordIndex()]}></GradientText> */}
    <h1 class="bold-text">{props.text ?? words[currentWordIndex()]}</h1>
    <button class="play-pause-btn" onClick={(e) => {
      e.preventDefault()
    }}>Learn More</button>
  </div>
  </>
);
}

