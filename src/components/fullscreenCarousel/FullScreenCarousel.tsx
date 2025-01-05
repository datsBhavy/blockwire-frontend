import { Component, createSignal, onMount, For, onCleanup } from "solid-js";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useTheme } from "../../context/ThemeContext";
import { Style } from "@solidjs/meta";

export interface CarouselSlide {
    title?: string;
    image?: string;
    content?: string;
    classModule?: Record<string, string>
}

export interface CarouselProps {
    slides?: CarouselSlide[];
    classModule?: Record<string, string>
}

const FullscreenCarousel: Component<CarouselProps> = (props) => {
    const { theme } = useTheme();
    const [currentSlideIndex, setCurrentSlideIndex] = createSignal(0);

    const animateSlideTransition = (newIndex: number, oldIndex: number, direction: number) => {
        const slides = document.querySelectorAll(".carousel-slide");
      
        if (slides[newIndex] && slides[oldIndex]) {
          gsap.timeline()
            .set(slides[newIndex], {
              display: "block",
              y: direction === 1 ? "100%" : "-100%", // Position off-screen vertically
            })
            .to(slides[oldIndex], {
              y: direction === 1 ? "-100%" : "100%", // Slide the old slide out
              duration: 0.7,
              ease: "power2.out",
            })
            .to(slides[newIndex], {
              y: "0%", // Slide the new slide into view
              duration: 0.7,
              ease: "power2.out",
            }, "<") // Overlap the animations
            .set(slides[oldIndex], { display: "none" }); // Hide the old slide after transition
        }
      };

      const handleNavClick = (newIndex: number) => {
        const oldIndex = currentSlideIndex();
        if (newIndex !== oldIndex) {
            const direction = newIndex > oldIndex ? 1 : -1; // Determine direction
            setCurrentSlideIndex(newIndex); // Update the index
            animateSlideTransition(newIndex, oldIndex, direction); // Trigger animation
        }
    };


      onMount(() => {
        const totalSlides = props.slides?.length || 1;
      
        ScrollTrigger.create({
          trigger: ".fullscreen-carousel",
          start: "top top",
          end: `+=${totalSlides * 100}%`, // Reduce scroll length to make slides more sensitive
          pin: true,
          scrub: false, // Keep the release-to-trigger behavior
          snap: {
            snapTo: (progress) => {
              const slideIndex = Math.round(progress * totalSlides); // Snap to the nearest slide
              return slideIndex / totalSlides; // Calculate normalized progress for snapping
            },
            duration: { min: 0.3, max: 0.5 }, // Adjust animation duration to make snapping quicker
            delay: 0.05, // Shorten delay to make transitions feel more responsive
            ease: "power1.out", // Slightly faster easing for a snappier effect
          },
          onUpdate: (self) => {
            const slideIndex = Math.round(self.progress * totalSlides); // Calculate the current slide index
      
            if (slideIndex !== currentSlideIndex()) {
              const oldIndex = currentSlideIndex();
              const direction = self.direction; // Determine scroll direction
              setCurrentSlideIndex(slideIndex);
              animateSlideTransition(slideIndex, oldIndex, direction); // Handle slide animation
            }
          },
        });
        
        onCleanup(() => {
          ScrollTrigger.getAll().forEach((trigger) => trigger)
        })
      });

    return (
        <>
            <Style>{`
.fullscreen-carousel {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${theme().backgroundColor}; /* Fallback background */
}

        .carousel-slides {
          position: relative;
          width: 100%;
          height: 100%;
        }

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: none;
  will-change: transform; /* Optimize for GPU-accelerated animations */
}

.carousel-slide:first-of-type {
  display: block; /* Show the first slide initially */
}

        .carousel-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: ${theme().textColor};
          text-align: center;
          z-index: 1;
          padding: 20px;
        }

        .carousel-title {
          font-size: 3rem;
          font-weight: bold;
          text-transform: uppercase;
        }

        .carousel-content {
          font-size: 1.5rem;
        }

        .carousel-title, .carousel-content {
  will-change: transform, opacity;
}

        .carousel-nav {
          position: absolute;
          top: 70px;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 20px;
          z-index: 2;
        }

        .carousel-nav button {
          background: none;
          border: none;
          color: ${theme().textColor};
          font-size: 1rem;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .carousel-nav button.active {
          font-weight: bold;
          text-decoration: underline;
        }

        .carousel-nav button:hover {
          color: ${theme().buttonText};
        }
  .carousel-gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${theme().backgroundColor}60;
    z-index: 0; /* Keep it below other content */
    pointer-events: none; /* Ensure it doesn't interfere with user interaction */
  }

  .carousel-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${theme().textColor};
    text-align: center;
    z-index: 1; /* Keep it above the gradient overlay */
    padding: 20px;
  }

      `}</Style>
            <div class="fullscreen-carousel">
                {/* Navigation */}
                <div classList={{
                  "carousel-nav": true,
                  [props.classModule?.['carousel-nav'] ?? '']: true
                }}>
                    <For each={props.slides}>
                        {(slide, i) => (
                            <button
                                classList={{ active: currentSlideIndex() === i() }}
                                onClick={() => handleNavClick(i())}
                            >
                                {slide.title}
                            </button>
                        )}
                    </For>
                </div>

                {/* Slides */}
                <div classList={{
                  "carousel-slides": true,
                  [props.classModule?.['carousel-slides'] ?? '']: true
                }}>
                    <For each={props.slides}>
                        {(slide, i) => (
                            <div
                                classList={{
                                  "carousel-slide": true,
                                  [slide.classModule?.['carousel-slide'] ?? '']: true
                                }}
                                style={{
                                    "background-image": `url(${slide.image})`,
                                }}
                            >
                                {/* Gradient Overlay */}
                                <div classList={{
                                  "carousel-gradient-overlay": true,
                                  [slide.classModule?.['carousel-gradient-overlay'] ?? '']: true
                                }}></div>

                                {/* Overlay for Title and Content */}
                                <div classList={{
                                  "carousel-overlay": true,
                                  [slide.classModule?.['carousel-overlay'] ?? '']: true
                                }}>
                                    <div classList={{
                                  "carousel-title": true,
                                  [slide.classModule?.['carousel-title'] ?? '']: true
                                }}>
                                        <h1 classList={{
                                          "mb-0": true,
                                          [slide.classModule?.['hollow-gradient-text'] ?? '']: true
                                        }} style={{ color: theme()?.textColor, 'font-size': '6rem', 'font-weight': 'bolder' }}>
                                            {slide.title}
                                        </h1>
                                    </div>
                                    <div classList={{
                                      "carousel-content": true,
                                      [slide.classModule?.['carousel-content'] ?? '']: true
                                    }}>{slide.content}</div>
                                </div>
                            </div>
                        )}
                    </For>
                </div>
            </div>
        </>
    );
};

export default FullscreenCarousel;