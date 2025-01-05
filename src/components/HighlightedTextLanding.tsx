import { Style } from "@solidjs/meta";
import { Component, onCleanup, onMount, Show } from "solid-js";
import AnimateHighlightedText from "./AnimateHightedText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useTheme } from "~/context/ThemeContext";
import { Col, Container, Row } from "solid-bootstrap";

interface HighlightedTextLandingProps {
  text?: string;
  highlightColor?: string;
  img?: string;
}

const HighlightedTextLanding: Component<HighlightedTextLandingProps> = (props) => {
  let textContainer: HTMLDivElement | undefined;
  let imgContainer: HTMLDivElement | undefined;

  const { theme } = useTheme();

  onMount(() => {
    if (!textContainer) return;

    // Register ScrollTrigger if not already registered
    gsap.registerPlugin(ScrollTrigger);

    // Create ScrollTrigger for pinning the container
    ScrollTrigger.create({
      trigger: textContainer,
      start: "top top",
      end: "bottom top", // Adjust the duration as needed
      pin: true,
      scrub: true,
    });

    // Animate the image sliding in from the left
    gsap.fromTo(
      imgContainer as HTMLDivElement,
      { x: "-100%", opacity: 0 }, // Start offscreen to the left
      {
        x: "0%",
        opacity: 1, // Slide to its original position and fade in
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textContainer,
          start: "top center", // Start animation when top of container reaches the center of the viewport
          end: "bottom center", // Animation ends when bottom of container is in the center
          scrub: true,
        },
      }
    );

    // Cleanup on unmount
    onCleanup(() => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.globalTimeline.clear(); // Clear GSAP animations
    });
  });

  return (
    <>
      <Style>{`
        .playground-container {
          height: 100vh; /* Full viewport height */
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: ${theme()?.backgroundColor}; /* Optional background */
          padding: 2rem;
          text-align: center;
        }

        .highlighted-landing-img-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%; /* Match the height of the container */
        }

        .highlighted-landing-img-container img {
          width: 100%;
          height: auto;
          max-width: 400px; /* Limit the image size */
        }
      `}</Style>

      <div ref={textContainer} class="playground-container">
        <Container>
          <Row>
            <Col class="col-12 col-md-6">
              <div class="d-flex flex-column h-100 justify-content-center">
              <h1>
                <AnimateHighlightedText
                  text={props.text ?? "Highlight this text as you scroll past it."}
                  highlightColor="#3498db"
                  style={{ "font-size": "6rem", color: theme().textColor }}
                />
              </h1>
              </div>
            </Col>
            <Col class="col-12 col-md-6">
              <Show when={props.img}>
                <div ref={imgContainer} class="highlighted-landing-img-container">
                  {/* <div class="gradient-border"> */}
                  <img src={props.img} />
                  {/* </div> */}
                </div>
              </Show>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default HighlightedTextLanding;