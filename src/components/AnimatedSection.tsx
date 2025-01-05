import { Component, JSX, onMount, Show } from "solid-js";
import { Row, Col } from "solid-bootstrap";
import { Style } from "@solidjs/meta";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";
import { css } from "solid-styled-components";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  section: {
    title: string;
    text: string;
    image: string;
    content?: JSX.Element
  };
  variant?: 'dark' | 'light'
  index: number;
    textClass?: string;
}

const AnimatedSection: Component<AnimatedSectionProps> = (props) => {
    const {theme} = useTheme()
  onMount(() => {
    const row = document.querySelector(`#section-${props.index}`);

    // Randomize animation type
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
      const cols = row.querySelectorAll(".animated-col");

      cols.forEach((col, colIndex) => {
        const fromX = colIndex === 0 ? -100 : 100; // Slide in from left or right
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

  const { section, index } = props;

  return (
    <>
      <Style>{`
        .animated-section {
          margin-bottom: 5rem;
        }

        .animated-col {
          text-align: left;
        }

        .animated-col img {
          max-width: 100%;
          border-radius: 10px;
          box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .animated-col img:hover {
          transform: scale(1.05);
          box-shadow: 0px 12px 25px rgba(0, 0, 0, 0.3);
        }

        .animated-col h2 {
          font-size: 4rem;
          font-weight: 900;
          margin-bottom: 1rem;
                text-transform: uppercase;
        }

        .animated-col p {
          font-size: 1.2rem;
          line-height: 1.6;
          color: ${theme()?.textColor};
          font-weight: 300;
        }

        @media (max-width: 768px) {
          .animated-col h2 {
            font-size: 1.5rem;
      
            font-weight: bold;
          }

          .animated-col p {
            font-size: 1rem;
          }
        }
      `}</Style>
      <Row
        id={`section-${index}`}
        class="align-items-center animated-section"
      >
        {index % 2 === 1 ? (
          <>
            <Col md={6} class="animated-col">
              <Show when={section.title}>
              <h2 classList={{
                [css`color: ${theme()?.buttonBg}; padding-bottom: 0; border-bottom: 1px solid ${theme()?.buttonBg}; padding-bottom: 1rem;`]: props.variant === 'light',
                [css`color: ${theme()?.buttonBg1}; padding-bottom: 0; border-bottom: 1px solid ${theme()?.buttonBg1};`]: props.variant === 'dark',
              }}>{section.title}</h2>
              </Show>
              <Show when={section.text}>
              <p classList={{
                                [css`padding-top: 1rem; border-top: 1px solid ${theme()?.buttonBg}; padding-bottom: 1rem;`]: props.variant === 'light',
                                [css`padding-top: 1rem; border-top: 1px solid ${theme()?.buttonBg1};`]: props.variant === 'dark',
              }}>{section.text}</p>
              </Show>
              <Show when={section.content}>
                {section.content}
              </Show>
            </Col>
            <Col md={6} class="animated-col">
              <img src={section.image} alt={section.title} />
            </Col>
          </>
        ) : (
          <>
            <Col md={6} class="animated-col">
              <img src={section.image} alt={section.title} />
            </Col>
            <Col md={6} class="animated-col">
            <Show when={section.title}>
            <h2 classList={{
                [css`color: ${theme()?.buttonBg}; padding-bottom: 0; border-bottom: 1px solid ${theme()?.buttonBg}; padding-bottom: 1rem;`]: props.variant === 'light',
                [css`color: ${theme()?.buttonBg1}; padding-bottom: 0; border-bottom: 1px solid ${theme()?.buttonBg1};`]: props.variant === 'dark',
              }}>{section.title}</h2>
            </Show>
              <Show when={section.text}>
              <p classList={{
                                [css`padding-top: 1rem; border-top: 1px solid ${theme()?.buttonBg}; padding-bottom: 1rem;`]: props.variant === 'light',
                                [css`padding-top: 1rem; border-top: 1px solid ${theme()?.buttonBg1};`]: props.variant === 'dark',
              }}>{section.text}</p>
              </Show>
              <Show when={section.content}>
                {section.content}
              </Show>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default AnimatedSection;