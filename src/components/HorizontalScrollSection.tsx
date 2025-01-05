import { onCleanup, onMount } from "solid-js";
import { Style } from "@solidjs/meta";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollSection = (props) => {
  let horizontalScrollTrigger: ScrollTrigger
  let spacer: HTMLDivElement
    onMount(() => {
        const container = document.querySelector(".horizontal-scroll-container");
        const sections = document.querySelectorAll(".horizontal-scroll-section");
        const viewportWidth = window.innerWidth;
        const totalWidth = sections.length * viewportWidth;
      
        // Set the container width to accommodate all sections
        gsap.set(container, { width: totalWidth });
      
        horizontalScrollTrigger = ScrollTrigger.create({
          trigger: ".horizontal-scroll-wrapper",
          start: "top top", // Pin when the top of the component is mostly visible
          end: () => `+=${totalWidth}`, // Correctly set the scrollable distance
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress * (totalWidth - viewportWidth);
            gsap.set(container, { x: -progress });
          },
        })
      
        // Add extra space after the horizontal scroll to prevent jumping
        spacer = document.createElement("div");
        spacer.style.height = "100vh"; // Set height for smooth scrolling
        document.querySelector(".horizontal-scroll-wrapper")?.appendChild(spacer);
      
        window.addEventListener("resize", () => {
          const newViewportWidth = window.innerWidth;
          const newTotalWidth = sections.length * newViewportWidth;
          gsap.set(container, { width: newTotalWidth });
          ScrollTrigger.refresh();
        });
      
        return () => {
          // Clean up the created spacer and ScrollTrigger instance
          
          
        };
      });

      onCleanup(() => {
        spacer.remove();
        horizontalScrollTrigger?.kill();
      })

  const {theme} = useTheme()

  return (
    <>
      <Style>
        {`

          .horizontal-scroll-wrapper {
            position: relative;
            height: 100vh;
            width: 100vw;
            overflow: hidden;
            p {
                color: ${theme()?.textColor};
            }
          }
          .horizontal-scroll-container {
            display: flex;
            height: 100vh;
            width: 100%;
          }
          .horizontal-scroll-section {
            flex-shrink: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;

            & .col {
                padding-left: 3rem;
                padding-right: 3rem;
                height: 100%;
                & img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 8px;
                }

                & h1 {
                    font-size: 6rem;
                    margin-bottom: 1rem;
                }

                & p {
                    font-size: 1.2rem;
                    font-weight: 300;
                }
            }
          }
          .horizontal-scroll-section:nth-child(even) {
          }
        `}
      </Style>
      <div class="horizontal-scroll-wrapper">
        <div class="horizontal-scroll-container">
          {props.sections.map((section, index) => (
            <div classList={{
                "horizontal-scroll-section": true,
                [section.class ?? '']: true
            }} key={index}>
              <div>
              {section.content}

              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HorizontalScrollSection;