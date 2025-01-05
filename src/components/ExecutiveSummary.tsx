import { Style } from "@solidjs/meta";
import { Component, onMount } from "solid-js";
import { useTheme } from "../context/ThemeContext";
import { Container, Row, Col } from "solid-bootstrap";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { cryptoBg, cryptoBg2 } from "../utils/images";

const ExecutiveSummary: Component = () => {
  const { theme } = useTheme();

  const sections = [
    {
      title: "Mission Statement:",
      text: `At BlockWire, we are committed to transforming the digital asset
      landscape through integrity, transparency, and results-driven
      strategies. Our unconventional approach leverages mainstream media
      access and influential connections, enabling our clients to achieve
      a broad reach and ensure their messages resonate with millions. We
      forge long-term partnerships with our clients, integrating deeply
      with their management teams to act as an extension of their vision.
      Our goal is to establish BlockWire as a titan in the media and
      marketing sectors of the digital asset space, empowering our clients
      to thrive in a rapidly evolving industry.`,
      image: cryptoBg,
    },
  ];

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const rows = document.querySelectorAll(".executive-summary-row");

    rows.forEach((row, index) => {
      const animationType = Math.random() > 0.5 ? "fade" : "slide";

      if (animationType === "fade") {
        gsap.fromTo(
          row,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 75%",
              end: "top -8%", // Adjust exit trigger
              toggleActions: "play reverse play reverse",
            },
          }
        );
      } else if (animationType === "slide") {
        const cols = row.querySelectorAll(".executive-summary-col");

        cols.forEach((col, colIndex) => {
          const fromX = colIndex === 0 ? -100 : 100;
          gsap.fromTo(
            col,
            { opacity: 0, x: fromX },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: col,
                start: "top 80%",
                end: "top -8%", // Adjust exit trigger
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });
      }
    });
  });

  return (
    <>
      <Style>{`
        .executive-summary {
          background-color: ${theme()?.backgroundColor};
          padding: 4rem 2rem;
        }

        .executive-summary h2 {
          font-size: 2rem;
          font-weight: bold;
          color: ${theme()?.buttonBg};
        }

        .executive-summary p {
          font-size: 1.25rem;
          line-height: 1.75rem;
          color: ${theme()?.textColor};
        }

        .executive-summary img {
          width: 100%;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .executive-summary h2 {
            font-size: 1.75rem;
          }

          .executive-summary p {
            font-size: 1rem;
            line-height: 1.5rem;
          }
        }
      `}</Style>
      <section class="executive-summary">
        <Container>
          {sections.map((section, index) => (
            <Row
              class="executive-summary-row align-items-center mb-5"
              key={index}
            >
              {index % 2 === 0 ? (
                <>
                  <Col md={6} class="executive-summary-col">
                    <h2>{section.title}</h2>
                    <p>{section.text}</p>
                  </Col>
                  <Col md={6} class="executive-summary-col">
                    <img src={section.image} alt={section.title} />
                  </Col>
                </>
              ) : (
                <>
                  <Col md={6} class="executive-summary-col">
                    <img src={section.image} alt={section.title} />
                  </Col>
                  <Col md={6} class="executive-summary-col">
                    <h2>{section.title}</h2>
                    <p>{section.text}</p>
                  </Col>
                </>
              )}
            </Row>
          ))}
        </Container>
      </section>
    </>
  );
};

export default ExecutiveSummary;