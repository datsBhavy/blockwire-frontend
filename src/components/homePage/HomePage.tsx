import { createEffect, createSignal, Show } from "solid-js";
import { onMount } from "solid-js";
import { useTheme } from "../../context/ThemeContext";
import ThemeSwitch from "../themeSwitch/ThemeSwitch";
import { Style } from '@solidjs/meta';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

export default function HomePage() {

  const { theme, handleOnEnter } = useTheme();
  const [currentShape, setCurrentShape] = createSignal("circle");
  const [currentTitleIndex, setCurrentTitleIndex] = createSignal(0);
  const titles = ['Maerik Technologies.', "Innovate.", "Create.", "Transform.", "Inspire."]
  const cycleTitles = () => {
    let isFirstTitle = true; // Flag to track if it's the first title
    let lastDirectionIndex = null; // To store the last direction used
  
    const changeTitle = () => {
      const nextIndex = (currentTitleIndex() + 1) % titles.length;
      setCurrentTitleIndex(nextIndex);
  
      const currentTitleElement = document.querySelector(".title-current");
      const nextTitleElement = document.querySelector(".title-next");
  
      if (currentTitleElement && nextTitleElement) {
        // Set the next title's text with individual letter spans
        nextTitleElement.innerHTML = titles[nextIndex]
          .split("")
          .map((letter) => `<span class="letter">${letter}</span>`)
          .join("");
  
        const directions = [
          { x: "100%", y: "0%" },  // Slide in from right
          { x: "-100%", y: "0%" }, // Slide in from left
          { x: "0%", y: "100%" },  // Slide in from bottom
          { x: "0%", y: "-100%" }, // Slide in from top
        ];
  
        // Ensure a new random direction is chosen
        let directionIndex;
        do {
          directionIndex = Math.floor(Math.random() * directions.length);
        } while (directionIndex === lastDirectionIndex);
        lastDirectionIndex = directionIndex;
  
        const randomDirection = directions[directionIndex];
  
        // Set the starting position of the next title
        gsap.set(nextTitleElement, {
          x: randomDirection.x,
          y: randomDirection.y,
          opacity: 0,
          display: "block", // Ensure it's visible before sliding in
        });
  
        // Create a timeline for simultaneous animations
        const tl = gsap.timeline();
        tl.to(currentTitleElement, {
          x: -randomDirection.x, // Slide out in the opposite direction
          y: -randomDirection.y,
          opacity: 0,
          duration: 0.3, // Faster animation
          ease: "none", // Consistent speed
          onComplete: () => {
            // Hide the previous title after sliding out
            gsap.set(currentTitleElement, {
              display: "none",
            });
          },
        });
  
        tl.to(
          nextTitleElement,
          {
            x: "0%", // Slide into view
            y: "0%",
            opacity: 1,
            duration: 0.3, // Faster animation
            ease: "none", // Consistent speed
          },
          "<" // Start this animation at the same time as the first one
        );
  
        // Apply animations to letters
        const letters = nextTitleElement.querySelectorAll(".letter");
        const totalLetters = letters.length;
        const animatedLettersCount = Math.ceil(totalLetters * 0.7); // Up to 70%
  
        letters.forEach((letter, index) => {
          if (index < animatedLettersCount) {
            const isBounceAnimation = Math.random() > 0.5; // Randomly choose animation type
  
            if (isBounceAnimation || true) {
              // Bounce animation
              gsap.fromTo(
                letter,
                { y: -20 }, // Start slightly above
                {
                  y: 0, // Return to the original position
                  duration: 0.4 + Math.random(), // Slightly varied duration
                  ease: "bounce.out", // Bounce effect
                  delay: Math.random() * 0.5, // Staggered start
                }
              );
            } else {
              // Rotation animation
              gsap.to(letter, {
                rotationX: Math.random() > 0.5 ? 360 : -360, // Randomize direction
                duration: 1 + Math.random(), // Vary duration
                ease: "power2.inOut",
              });
            }
          }
        });
  
        // Swap class roles for the next cycle
        currentTitleElement.classList.remove("title-current");
        currentTitleElement.classList.add("title-next");
        nextTitleElement.classList.remove("title-next");
        nextTitleElement.classList.add("title-current");
      }
  
      // Set timeout duration based on whether it's the first title
      setTimeout(changeTitle, isFirstTitle ? 5000 : 2000);
      isFirstTitle = false; // After the first title, always use 2-second intervals
    };
  
    // Start the first title animation
    setTimeout(changeTitle, 5000); // Display the first title for 5 seconds
  };
  const [isDarkMode, setIsDarkMode] = createSignal(false); // Signal to track mode

  const setupScrollAnimation = () => {
    const header = document.querySelector(".animated-title");

    if (header) {
      gsap.fromTo(
        header,
        { x: "-100%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.to(header, {
        x: "100%",
        opacity: 0,
        scrollTrigger: {
          trigger: header,
          start: "top 20%",
          end: "top -20%",
          scrub: true,
        },
      });
    }
  };


  onMount(() => {
    setupScrollAnimation();
    cycleTitles();
  });

  onMount(() => {
    const circles = document.querySelectorAll(".circle");
    const header = document.querySelector(".abstract-text");
    const letterI = document.querySelector(".letter-i");
    const shapes = document.querySelectorAll(".shape");

    const totalShapes = shapes.length;
    const hollowCount = Math.floor(Math.random() * (totalShapes / 2 - totalShapes / 4) + totalShapes / 4); // 25%-50%
    const hollowShapes = [...shapes].sort(() => 0.5 - Math.random()).slice(0, hollowCount);
    hollowShapes.forEach((shape) => {
      shape.classList.add("hollow"); // Add hollow class
  
      // Randomly decide if it should also be yellow
      if (Math.random() > 0.5) {
        shape.classList.add("yellow");
      }
    });

    

    // Set initial positions for circles off-screen (right side)
    gsap.set(circles, { x: "100%", opacity: 0 });

    // Slide circles into position
    gsap.to(circles, {
      x: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.1,
      ease: "power2.out",
      onComplete: () => {
        // Continuous random movement after initial slide-in
        circles.forEach((circle) => {
          gsap.to(circle, {
            x: () => gsap.utils.random(-200, 200),
            y: () => gsap.utils.random(-200, 200),
            duration: () => gsap.utils.random(4, 8),
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          });
        });
      },
    });
  
    gsap.to(letterI, {
      rotationX: 360,
      duration: 1,
      repeat: -1,
      repeatDelay: 2.5,
      ease: "power2.inOut",
    });
  });

  onMount(() => {
    const shapes = document.querySelectorAll(".shape");
  
    // Continuous random movement
    const startRandomMovement = () => {
      shapes.forEach((shape) => {
        const randomX = gsap.utils.random(-200, 200);
        const randomY = gsap.utils.random(-200, 200);
  
        gsap.to(shape, {
          x: randomX,
          y: randomY,
          duration: gsap.utils.random(4, 8),
          repeat: -1, // Keep repeating
          yoyo: true, // Reverse direction after each cycle
          ease: "power1.inOut",
          overwrite: false, // Allow multiple animations
        });
      });
    };
    startRandomMovement();
  });



  onMount(() => {
    const header = document.querySelector(".header-text");

    // Header text slides out
    gsap.to(header, {
      y: "-100%", // Slide up and out
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".abstract-section",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  onMount(() => {
    ScrollTrigger.create({
      trigger: ".home-page",
      start: "top top",
      end: "bottom top",
      onEnter: handleOnEnter, // Apply current theme when entering
      onEnterBack: handleOnEnter, // Apply current theme when re-entering
      // No overriding theme changes for leaving events
    });
  });

  return (
    <>
    
    <HomePageStyles />
    <div
      class="home-page"
      style={{
        "background-color": theme().backgroundColor, // Sync with navbar
        // filter: `invert(${theme().backgroundColor === "#000000" ? 1 : 0})`,
        transition: "background-color 0.5s ease, filter 0.5s ease",
      }}
    >
      <section class="abstract-section">
        <div class="abstract-bg">
          <div class="shape circle solid-circle  blue"></div>
          <div class="shape circle solid-circle yellow"></div>
          <div class="shape circle hollow-circle"></div>
          <div class="shape circle hollow-circle yellow"></div>
          <div class="shape circle solid-circle  blue"></div>
          <div class="shape circle solid-circle yellow"></div>
          <div class="shape circle hollow-circle"></div>
          <div class="shape circle solid-circle blue"></div>
          <div class="shape circle solid-circle yellow"></div>
          <div class="shape circle hollow-circle"></div>
          <div class="shape circle hollow-circle yellow"></div>
          <div class="shape circle solid-circle  blue"></div>
        </div>
        <div class="title-container">
  <h1 class="abstract-text title-current" style={{color: theme()?.navbarTextColor}}>Maer<span class="letter-i">i</span>k Technologies</h1>
  <h1 class="abstract-text title-next" style={{color: theme()?.navbarTextColor}}></h1>
</div>
       

      </section>
<div class="theme-switch-container">
          <ThemeSwitch />
        </div>
    </div>
    </>

  );
}


const HomePageStyles = () => <Style>{`
  section {
    padding: 50px;
    text-align: center;
  }

  /* Abstract Section */
  .abstract-section {
    position: relative;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .abstract-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  /* Circles (Solid and Hollow) */
  .circle {
    position: absolute;
    border-radius: 50%;
    will-change: transform;
  }

  .solid-circle {
    background-color: rgba(233, 76, 60, 0.3); /* Red */
  }

  .solid-circle.blue {
    background-color: rgba(52, 152, 219, 0.3); /* Blue */
  }

  /* Hollow Circles */
  .hollow-circle {
    border: 3px solid rgba(233, 76, 60, 0.6); /* Red */
  }

  .hollow-circle.blue {
    border-color: rgba(52, 152, 219, 0.6); /* Blue */
  }

  /* Circle Sizes and Positions */
  .circle:nth-child(1) {
    width: 200px;
    height: 200px;
    top: 10%;
    left: 15%;
  }

  .circle:nth-child(2) {
    width: 250px;
    height: 250px;
    bottom: 20%;
    right: 20%;
  }

  .circle:nth-child(3) {
    width: 150px;
    height: 150px;
    top: 60%;
    left: 50%;
  }

  .circle:nth-child(4) {
    width: 100px;
    height: 100px;
    top: 30%;
    left: 10%;
  }

  .circle:nth-child(5) {
    width: 120px;
    height: 120px;
    bottom: 15%;
    right: 10%;
  }

  .circle:nth-child(6) {
    width: 140px;
    height: 140px;
    top: 40%;
    left: 40%;
  }

  .circle:nth-child(7) {
    width: 170px;
    height: 170px;
    bottom: 10%;
    left: 30%;
  }

  .circle:nth-child(8) {
    width: 110px;
    height: 110px;
    top: 20%;
    right: 15%;
  }

  .circle:nth-child(9) {
    width: 160px;
    height: 160px;
    top: 50%;
    right: 30%;
  }

  .circle:nth-child(10) {
    width: 130px;
    height: 130px;
    bottom: 25%;
    left: 35%;
  }

  .circle:nth-child(11) {
    width: 190px;
    height: 190px;
    top: 70%;
    left: 25%;
  }

  .circle:nth-child(12) {
    width: 150px;
    height: 150px;
    bottom: 40%;
    right: 20%;
  }

  /* Abstract Text */
  .title-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .abstract-text {
    font-family: "Poppins", sans-serif;
    font-size: 6rem;
    font-weight: bold;
    color: inherit;
    margin: 0;
    text-transform: uppercase;
    transition: opacity 0.3s ease, transform 0.3s ease;
    position: absolute;
    transform: translateY(0);
    z-index: 1;
  }

  .title-current {
    opacity: 1;
  }

  .title-next {
    opacity: 0;
  }

  .abstract-text .erik {
    display: inline-block;
  }

  .text-container {
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .header-text {
    position: absolute;
    font-size: 6rem;
    font-weight: bold;
    color: #e74c3c;
    text-align: center;
    white-space: nowrap;
  }

  .slider-container {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
  }

  input[type="range"] {
    width: 300px;
    background: linear-gradient(to right, #e74c3c, #3498db);
    height: 5px;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
  }

  input[type="range"]::-webkit-slider-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #3498db;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .shape-selector button {
    background: #000;
    color: #fff;
    border: 2px solid #e74c3c;
  }

  .shape-selector button:hover {
    background: #e74c3c;
    border-color: #3498db;
  }

  .shape {
    background-color: rgba(233, 76, 60, 0.3);
  }

  .shape.hollow {
    border: 3px solid rgba(233, 76, 60, 0.6);
  }

  .shape.hollow.blue {
    border-color: rgba(52, 152, 219, 1);
  }
`}</Style>;
