import { Col, Row, Container } from "solid-bootstrap";
import CubeComponent from "../cubeComponent/CubeComponent";
import { onCleanup, onMount } from "solid-js";
import { Style } from "@solidjs/meta";
import { useTheme } from "~/context/ThemeContext";
import { useAppContext } from "~/context/AppContext";
import { css } from "solid-styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServicesList from "../ServicesList";
import { useLocation, useNavigate } from "@solidjs/router";

const SEOServices = () => {
  const { theme } = useTheme();
  const { showing, setShowing } = useAppContext();
  const navigate = useNavigate()
  const location = useLocation()

  const services = [
    {
      title: "Keyword Research",
      content: "Discover high-performing keywords to improve your search rankings.",
      element: <CubeComponent />,
      onClick: () => {
        console.log(location.pathname)
        navigate(`${location.pathname}/keyword-research`)
      },
    },
    {
      title: "On-Page Optimization",
      content: "Enhance your site's structure, tags, and content for better visibility.",
      element: <CubeComponent />,
      onClick: () => {
        navigate(`${location.pathname}/on-page-optimization`)
      },
    },
    {
      title: "Content Strategy",
      content: "Develop a comprehensive content strategy to attract and retain audiences.",
      element: <CubeComponent />,
      onClick: () => {
        navigate(`${location.pathname}/content-strategy`)
      }
    },
  ];

  onMount(() => {
    const section = document.querySelector(".seo-services");
    const cards = document.querySelectorAll(".service-card");

    if (!section || cards.length === 0) return;

    const rect = section.getBoundingClientRect();
    const isAtTop = Math.abs(rect.top) < 1;

    if (isAtTop) {
      gsap.set(cards, {
        y: 0,
        opacity: 1,
      });
    } else {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        onLeaveBack: () => {
          gsap.set(cards, {
            y: "100vh",
            opacity: 0,
          });
        },
      });

      gsap.fromTo(
        cards,
        {
          y: "100vh",
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.3,
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: true,
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
        .seo-services {
          position: relative;
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
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
          "seo-services": true,
          [css`background-color: ${theme().backgroundColor};`]: true,
        }}
      >
          <h2
            classList={{
              "section-title": true,
              [css`color: ${theme()?.navbarTextColor}!important;`]: true,
            }}
          >
            SEO Services
          </h2>
          <ServicesList services={services} />
      </section>
    </>
  );
};

export default SEOServices;