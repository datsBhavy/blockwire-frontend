import { createSignal, onMount } from "solid-js";
import { Style } from "@solidjs/meta";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import GradientText from "./gradientText/GradientText";
import { useTheme } from "../context/ThemeContext";
import { Dark, LighterDark, SecondaryBg } from "../constants/styles";
import ScrollProgressBar from "./ScrollProgressBar";
import ShuffleText from "./ShuffleText";
import PageTransition from "./PageTransition";

gsap.registerPlugin(ScrollTrigger);

const AnimatedScrollCarousel = (props) => {
  const [currentCardIndex, setCurrentCardIndex] = createSignal(0);
  onMount(() => {
    const stickySection = document.querySelector(".steps");
    const stickyHeight = window.innerHeight * 7;
    const cards = document.querySelectorAll(".card");
    const countContainer = document.querySelector(".count-container");
    const totalCards = props.slides.length;
    const progressBar = document.querySelector(".progress-bar-fill");
    const carouselContainer = document.querySelector(".animated-scroll-carousel-container");
    const titleElement = document.querySelector(".counter-title h1");


    ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${stickyHeight}px`,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        positionCards(self.progress);
        updateProgressBar(self.progress);

      },
    });

    const updateProgressBar = (progress) => {
      gsap.to(progressBar, { width: `${progress * 100}%!important;`, duration: 0.2 });
    };


    const getRadius = () => {
      return window.innerWidth < 900
        ? window.innerWidth * 8
        : window.innerWidth * 2.1;
    };

    const arcAngle = Math.PI * 0.4;
    const startAngle = Math.PI / 2 - arcAngle / 2;

    function positionCards(progress = 0) {
      const radius = getRadius();
      const totalTravel = 1 + totalCards / 7.5;
      const adjustedProgress = (progress * totalTravel - 1) * 0.75;

      cards.forEach((card, i) => {
        const normalizedProgress = (totalCards - 1 - i) / totalCards;
        const cardProgress = normalizedProgress + adjustedProgress;
        const angle = startAngle + arcAngle * cardProgress;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const rotation = (angle - Math.PI / 2) * (180 / Math.PI);

        gsap.set(card, {
          x: x,
          y: -y + radius,
          rotation: -rotation,
          transformOrigin: "center center",
        });
      });
    }



    const animateContainerBackground = () => {
      gsap.to(carouselContainer, {
        scrollTrigger: {
          trigger: carouselContainer,
          start: "top top",
          end: "center top",
          scrub: true, // Smooth scroll-based animation
          onUpdate: (self) => {
            const progress = self.progress * 100; // Calculate progress as a percentage
            const gradientPosition = `${progress}%`; // Dynamically set the gradient stop
      
            carouselContainer.style.background = `linear-gradient(
              45deg,
              ${Dark} ${gradientPosition},
              transparent ${gradientPosition}
            )`;
          },
        },
      });
      gsap.fromTo(
        titleElement,
        { color: theme()?.textColor }, // Start as black
        {
          color: theme()?.buttonBg1, // Transition to blue
          ease: "none",
          scrollTrigger: {
            trigger: carouselContainer,
            start: "top top",
            end: "center top",
            scrub: true, // Smooth scroll-based animation
            toggleActions: "play none none none",
          },
        }
      );
    };

    animateContainerBackground();

    positionCards(0);

    let currentCardIndex = 0;

    const options = {
      root: null,
      rootMargin: "0% 0%",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries, i) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let cardIndex = Array.from(cards).indexOf(entry.target);

          currentCardIndex = cardIndex;
          setCurrentCardIndex(cardIndex);

          const targetY = 150 - currentCardIndex * 150;
          if (currentCardIndex !== 0) {
            gsap.to(countContainer, {
              y: targetY,
              duration: 0.3,
              ease: "power1.out",
              overwrite: true,
            });
          }
        }
      });
    }, options);

    cards.forEach((card) => {
      observer.observe(card);
    });

    window.addEventListener("resize", () => positionCards(0));
  });

  const {theme} = useTheme()
  return (
    <>
      <Style>
        {`
          .animated-scroll-carousel-container {
          
          position: relative;
            * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html,
body {
  width: 100vw;
  height: 900vh;
  background: #000;
  color: #fff;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  padding: 1.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}

p#logo {
  text-transform: uppercase;
  font-family: "PP Monument Extended";
  font-weight: 900;
}

button {
  border: none;
  outline: none;
  font-weight: 500;
  color: #000;
  padding: 0.75em 1em;
  background-color: #fff;
  border-radius: 0.25em;
}

section {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.intro {
  background: url("./assets/hero.jpg") no-repeat 50% 50%;
  background-size: cover;
}

.outro {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #000000, #364549);
  background-size: 200% 200%;
}

.outro p {
  width: 75%;
  text-align: center;
  color: #fff;
  font-size: 52px;
  font-weight: 400;
  line-height: 1.125;
}

.outro p span {
  color: #75e1ff;
}

.cards {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150vw;
  height: 600px;
  will-change: transform;
}

.card {
  position: absolute;
  width: 500px;
  height: 550px;
  left: 50%;
  top: 50%;
  transform-origin: center center;
  margin-left: -250px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  will-change: transform;
}

.card-img {
  flex: 1;
  background-color: #fff;
  border-radius: 0.5em;
  overflow: hidden;
}

.card-content {
  width: 100%;
  height: 60px;
}

.card-content p {
  text-align: left;
  color: white;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.25;
}

.step-counter {
  position: absolute;
  display: flex;
  flex-direction: column;
  margin: 2em;
}

.counter-title,
.count {
  position: relative;
  width: 1200px;
  height: 150px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  overflow: hidden;
}

.count {
  position: relative;
  top: -10px;
}

.count-container {
  position: relative;
  transform: translateY(150px);
  will-change: transform;
  color: ${theme()?.buttonBg};
}

.step-counter h1 {
  width: 100%;
  position: relative;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 150px;
  line-height: 1;
  letter-spacing: -0.04em;
  will-change: transform;
}

.empty {
  opacity: 0;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: clip;
}

.lenis.lenis-smooth iframe {
  pointer-events: none;
}

.counter-title {
          color: ${theme()?.textColor}!important;
}

@media (max-width: 900px) {
  .counter-title {
    height: 30px;
  }

  .counter-title h1 {
    font-size: 30px;
  }

  .count {
    top: 0px;
    left: -10px;
  }

  .cards {
    top: 27.5%;
  }

  .card {
    width: 375px;
    height: 500px;
  }
}

          }
          .card {
            position: absolute;
            width: 500px;
            height: 550px;
            left: 50%;
            top: 50%;
            transform-origin: center center;
            margin-left: -250px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1em;
            background: unset;
            border-radius: 10px;
            padding: 20px;
            color: #fff;
            text-align: center;
            border: 1px solid ${SecondaryBg};
            will-change: transform;
            transition: background-color 0.8s ease;
          }

          .card-content {
            font-size: 16px;
            line-height: 1.5;
          }

          .card-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .active-card {
            border: 1px solid ${theme().buttonBg};
            color: ${theme()?.textColor};
          }


              .counter-title {
      display: flex;
      align-items: center;
      gap: 1rem; /* Adds space between title and progress bar */
      position: relative;
    }

    .counter-title h1 {
      margin: 0;
      white-space: nowrap; /* Prevents the title from wrapping */
    }

        `}
      </Style>
      <div class="animated-scroll-carousel-container">
        <section class="steps">
          <div class="step-counter">
            <div class="counter-title">
              <h1><ShuffleText>{props.title || "Carousel"}</ShuffleText></h1>
            </div>
            <div class="count">
              <div class="count-container">
                {props.slides.map((_, index) => (
                  <h1>{props.slides[currentCardIndex()]?.shortTitle}</h1>
                ))}
              </div>
            </div>
          </div>
          <div class="cards">
            {props.slides.map((slide, index) => (
              <div classList={{
                "card": true,
                "active-card": currentCardIndex() === index,
              }} key={index}>
                <h1 class="seconary-text">{slide.title}</h1>
                <div class="card-content">{slide.content}</div>
                <button class="primary-button">Learn More</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default AnimatedScrollCarousel;