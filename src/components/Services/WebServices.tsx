import { Col, Row, Container } from "solid-bootstrap";
import CubeComponent from "../cubeComponent/CubeComponent";
import { onCleanup, onMount } from "solid-js";
import { Style } from "@solidjs/meta";

import { css } from "solid-styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServicesList from "../ServicesList";
import { useTheme } from "../../context/ThemeContext";
import { useAppContext } from "../../context/AppContext";

const WebServices = () => {
  const { theme } = useTheme();
  const { showing, setShowing } = useAppContext();

  const services = [
    {
      title: "Web Development",
      content: "Build robust, scalable, and modern websites tailored to your business needs.",
      element: <CubeComponent />,
      onClick: () => setShowing("inquiryForm", true),
    },
    {
      title: "Web Builder",
      content: "Empower your creativity with user-friendly tools to create stunning websites effortlessly.",
      element: <CubeComponent />,
      onClick: () => setShowing("webBuilder", true),
    },
    {
      title: "Consulting",
      content: "Get expert advice on web strategies, best practices, and optimization techniques.",
      element: <CubeComponent />,
      onClick: () => console.log("Consulting clicked"),
    },
  ];


  onMount(() => {
    const section = document.querySelector(".web-services");
    const cards = document.querySelectorAll(".service-card");

    if (!section || cards.length === 0) return;

    // Check if the section is at the top of the viewport
    const rect = section.getBoundingClientRect();
    const isAtTop = Math.abs(rect.top) < 1; // Consider near-zero top as "at top"

    if (isAtTop) {
      // If the section is at the top, set the cards to their final state
      gsap.set(cards, {
        y: 0, // Cards are already in their final position
        opacity: 1, // Fully visible
      });
    } else {
      // Pin the section and prevent adjacent component overlap
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=100%", // Adjust based on desired pin duration
        pin: true,
        pinSpacing: true,
        onLeaveBack: () => {
          // Reset cards when scrolling back up
          gsap.set(cards, {
            y: "100vh",
            opacity: 0,
          });
        },
      });

      // Animate cards sequentially as they scroll into view
      gsap.fromTo(
        cards,
        {
          y: "100vh", // Start below the viewport
          opacity: 0, // Fully transparent
        },
        {
          y: 0, // Slide to their original position
          opacity: 1, // Fully visible
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.3, // Stagger each card's animation
          scrollTrigger: {
            trigger: section,
            start: "top center", // Start animation when the top of the section reaches the center
            end: "bottom center", // End animation when the bottom of the section reaches the center
            scrub: true, // Sync with scroll
            toggleActions: "play none none reverse",
          },
        }
      );
    }
    
    onCleanup(() => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      gsap.globalTimeline.clear();
    })
  });

  return (
    <>
      <Style>{`
        .web-services {
          position: relative; /* Required for ScrollTrigger pinning */
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column; /* Stack header and content vertically */
          justify-content: center; /* Vertically center content */
        }

        .section-title {
          text-align: center;
          font-size: 2rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 40px;
          transition: .3s ease-in-out all;
        }
      
      `}</Style>
      <section
        classList={{
          "web-services": true,
          [css`background-color: ${theme().backgroundColor};`]: true,
        }}
      >
        <Container>
          <h2
            classList={{
              "section-title": true,
              [css`color: ${theme()?.navbarTextColor}!important;`]: true,
            }}
          >
            Web Services
          </h2>
          <ServicesList services={services}/>
        </Container>
      </section>
    </>
  );
};

export default WebServices;