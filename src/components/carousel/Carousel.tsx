import { Col, Row } from "solid-bootstrap";
import { Component, createSignal, onMount, For, createEffect, onCleanup } from "solid-js";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useTheme } from "../../context/ThemeContext";
import { Style } from "@solidjs/meta";
import GradientText from "../gradientText/GradientText";
import { css } from "solid-styled-components";

export interface CarouselSlide {
  title?: string;
  image?: string;
  content?: string;
}

export interface CarouselProps {
  slides?: CarouselSlide[];
}

const Carousel: Component<CarouselProps> = (props) => {
  const { theme } = useTheme();
  const [currentSlideIndex, setCurrentSlideIndex] = createSignal(0);
  const [animationsActive, setAnimationsActive] = createSignal(true);

  const animateImageTransition = (newIndex: number, oldIndex: number, direction: number) => {
    const imageContainer = document.querySelector(".carousel-image-container");
    const images = document.querySelectorAll(".carousel-image");
  
    if (imageContainer && images[newIndex] && images[oldIndex]) {
      gsap.timeline()
        .set(images[newIndex], {
          display: "block",
          y: direction === 1 ? "100%" : "-100%", // Adjust the starting position based on direction (vertical)
        })
        .to(images[oldIndex], {
          y: direction === 1 ? "-100%" : "100%", // Slide out based on direction (vertical)
          duration: 0.5,
          ease: "power2.out",
        })
        .to(images[newIndex], {
          y: "0%", // Slide the new image into place
          duration: 0.5,
          ease: "power2.out",
        }, "<") // Start at the same time as the old image slides out
        .set(images[oldIndex], { display: "none" }); // Hide the old image after the animation
    }
  };

  const animateText = (index: number) => {
    if (!animationsActive()) return;

    const textContainer = document.querySelectorAll(".carousel-text")[index];
    const titleContainer = document.querySelectorAll(".carousel-title-text h1")[index];

    if (textContainer) {
      gsap.fromTo(
        textContainer,
        { y: 20, opacity: 1 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          // ease: "power2.out",
        }
      );
    }

    if (titleContainer) {
      gsap.fromTo(
        titleContainer,
        { scale: 1, opacity: 1 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          // ease: "back.out(1.7)",
        }
      );
    }
  };

  onMount(() => {
    const totalSlides = props.slides?.length || 1;
    const containerHeight = totalSlides * 100; // 100% height per slide
  
    // Set the exact height for the container to prevent extra scrolling
    const carouselContainer = document.querySelector(".carousel-container") as HTMLElement;
    if (carouselContainer) {
      carouselContainer.style.height = `${containerHeight}vh`;
    }
  
    ScrollTrigger.create({
      trigger: ".carousel-container",
      start: "top top",
      end: `+=${(totalSlides) * 100}%`, // Ensure the scrolling ends exactly at the last slide
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const slideIndex = Math.floor(self.progress * totalSlides);
        if (animationsActive() && slideIndex !== currentSlideIndex()) {
          const oldIndex = currentSlideIndex();
          const direction = self.direction; // Capture scroll direction (1 for forward, -1 for backward)
          setCurrentSlideIndex(slideIndex);
          animateText(slideIndex);
          animateImageTransition(slideIndex, oldIndex, direction); // Pass direction
        }
      },
      pinSpacing: false,
      onLeave: () => setAnimationsActive(false),
      onEnterBack: () => setAnimationsActive(true),
    });

    onCleanup(() => {
      // Kill ScrollTrigger instance
      gsap.globalTimeline.clear();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      
      // Kill the GSAP animation
    });
  });

  return (
    <>
      <Style>{`
        .carousel-container {
          max-height: 100vh;
          height: 100vh;
          overflow: hidden;
          position: relative;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .carousel-row {
          height: 100%;
          display: flex;
          align-items: center;
          margin: 0;
        }

        .carousel-title-column,
        .carousel-text-column,
        .carousel-image-column {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .carousel-title-text h1 {
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .carousel-text {
          margin-top: 1rem;
        }

      .carousel-image-container {
    position: relative;
    width: 300px;
    height: 300px;
    overflow: hidden; /* Ensure images stay within bounds */
    clip-path: inset(0); /* Clipping for the images */
  }

  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    display: none; /* Initially hidden */
  }

       .carousel-image:first-of-type {
    display: block; /* Show the first image initially */
  }
      `}</Style>
      <div
        class="carousel-container"
        style={{
          "background-color": theme().backgroundColor,
          color: theme().textColor,
        }}
      >
        <Row class="carousel-row">
          {/* Title Column */}
          <Col class="col-12 col-md-4 carousel-title-column">
            <div class="carousel-title-text">
              <For each={props.slides}>
                {(slide, i) => (
                  <h1
                    onClick={() => setCurrentSlideIndex(i())}
                    class="hollow-gradient-text"
                    style={
                      currentSlideIndex() === i()
                        ? undefined
                        : `color: ${theme()?.backgroundColor}!important;`
                    }
                  >
                    {slide.title}
                  </h1>
                )}
              </For>
            </div>
          </Col>

          {/* Image Column */}
          <Col class="col-12 col-md-4 carousel-image-column">
            <div classList={{
              "gradient-border": true,
              // [css`background: &:before {background: unset!important;}`]: true
            }}>
            <div class="carousel-image-container gradient-border">
              <For each={props.slides}>
                {(slide, i) => (
                  <img
                    src={slide.image || ""}
                    alt={slide.title || "Image"}
                    class="carousel-image"
                    loading="lazy"
                  />
                )}
              </For>
            </div>
            </div>
          </Col>

          {/* Text Column */}
          <Col class="col-12 col-md-4 carousel-text-column">
            <div class="carousel-text">
              <GradientText
                class="h-6"
                text={props.slides?.[currentSlideIndex() ?? 0]?.title as string}
              />
              <small>{props.slides?.[currentSlideIndex() ?? 0]?.content}</small>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Carousel;