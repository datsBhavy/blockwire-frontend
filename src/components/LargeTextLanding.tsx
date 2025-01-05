import { Style } from "@solidjs/meta";
import { Component, onCleanup, onMount, Show } from "solid-js";
import { gsap } from "gsap";
import { Container } from "solid-bootstrap";
import { useTheme } from "../context/ThemeContext";
import { A } from "@solidjs/router";
import { useAppContext } from "../context/AppContext";
import PageTransition from "./PageTransition";

interface LargeTextLanding {
  classModule?: Record<string, string>;
}

const LargeTextLanding: Component<LargeTextLanding> = (props) => {
  const { theme } = useTheme();
  const {user} = useAppContext()
  onMount(() => {
    const elements = document.querySelectorAll(".large-text-landing-container h1");
    const signUpButton = document.querySelector(".sign-up-button");
    const learnMoreButton = document.querySelector(".learn-more-button");

    // Create a timeline and start all animations concurrently
    gsap.timeline()
      .fromTo(
        elements[0],
        { x: "-100vw", opacity: 0 }, // Start off-screen to the left
        {
          x: "0%",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      )
      .fromTo(
        signUpButton,
        { x: "-100vw", opacity: 0 }, // Start off-screen to the left
        {
          x: "0%", // Slide into its position
          opacity: 1, // Fade in
          duration: 0.5,
          ease: "power2.out", // Smooth easing
        },
        0 // Start concurrently with the previous animation
      )
      .fromTo(
        learnMoreButton,
        { y: 50, opacity: 0 }, // Start below the viewport and invisible
        {
          y: 0, // Slide up to its position
          opacity: 1, // Fade in
          delay: 0.3, // Wait for the previous animations to finish
          duration: 0.5,
          ease: "power2.out", // Smooth easing
        },
        0 // Start concurrently with the previous animations
      );
  });

  onCleanup(() => {
    gsap.timeline().clear();
  })

  return (
    <>
    {/* <PageTransition /> */}
      <Style>{`
        .large-text-landing-container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;

          @media (max-width: 776px) {
            padding: 1rem;
          }

          h1 {
            width: unset!important;
            text-align: start;
            margin-bottom: 0;
            line-height: 9.5rem;
          }
        }

        .sign-up-button, .learn-more-button {
          padding: 1rem 2rem;
          font-size: 1.5rem;
          font-weight: bold;
          text-transform: uppercase;
          border: none;
          border-radius: 5px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: inline-block;
          text-decoration: none;
        }

        .sign-up-button {
          color: ${theme().buttonText || "#fff"};
        }

        .learn-more-button {
          color: ${theme().buttonText || "#fff"};
        }

        .sign-up-button:hover, .learn-more-button:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .sign-up-button:active, .learn-more-button:active {
          transform: scale(0.95);
        }
      `}</Style>
      <section>
        <Container class="large-text-landing-container">
          <h1 style={{ "font-size": "9rem" }}>Blockwire.</h1>
          <p>Bridging the Gap Between Crypto & Marketing</p>
          <div class="d-inline-flex">
            <Show when={!user()}>
            <A href="/sign-up" class="afacad-flux-font primary-button sign-up-button me-2">
              Sign Up
            </A>
            </Show>
            <A href="/sign-up" class="afacad-flux-font secondary-button learn-more-button">
              Learn More
            </A>
          </div>
        </Container>
      </section>
    </>
  );
};

export default LargeTextLanding;