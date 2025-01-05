import { Style } from "@solidjs/meta";
import { Col, Container, Row } from "solid-bootstrap";
import { useTheme } from "../context/ThemeContext";
import { createEffect, onMount, JSX, ParentComponent } from "solid-js";
import { css } from "solid-styled-components";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { A } from "@solidjs/router";

gsap.registerPlugin(TextPlugin);

interface CoinSectionProps {
  coins?: boolean;
  class?: string;
  col1?: JSX.Element;
  col2?: JSX.Element;
  variant?: "dark";
}

const CoinSection: ParentComponent<CoinSectionProps> = (props) => {
  const { theme } = useTheme();

  const content = () => {
    if (props.children) return <>{props.children}</>;
    return (
      <>
        <h1 class="afacad-flux-font" id="typewriter-text">
          Use your crypto as collateral and get up to 100% mortgage financing.
        </h1>
        <div class="d-flex mb-5">
          <p class="w-50 me-4 fw-bold">
            Crypto mortgages work just like old-fashioned mortgages. The only
            difference is that the collateral is your digital assets.
          </p>
          <p class="w-50 fw-bold">
            Crypto mortgages work just like old-fashioned mortgages. The only
            difference is that the collateral is your digital assets.
          </p>
        </div>
        <div class="d-inline-flex">
          <A href="/sign-up" class="afacad-flux-font primary-button">
            Sign Up
          </A>
        </div>
      </>
    );
  };

  onMount(() => {
    const typewriterText = document.querySelector("#typewriter-text");

    if (typewriterText) {
      gsap.to(typewriterText, {
        text: {
          value: typewriterText.textContent, // Keep the original text
        },
        duration: 4, // Duration of the typewriter effect
        ease: "power2.inOut",
        delay: 0.5,
      });
    }
  });

  return (
    <>
      <Style>{`
        .coin-section-container {
          padding-top: 1rem;    
         
        }

        .content-container {
          padding: 100px;
          p {
          color: ${theme().textColor}!important;
          }

          @media (max-width: 768px) {
            padding: 1rem;
          }

          h1 {
            font-size: 4rem;
            margin-bottom: 1rem;
            overflow: hidden; /* Prevent text overflow during animation */
          }
        }
        .content-column {
          padding-top: 100px;
        }
        .coin-section-wrapper {
          border-radius: 0px;
        }

        .primary-button {
          background-color: ${theme().buttonBg};
          color: ${theme().textColor};
          padding: 1rem 2rem!important;
        }
      `}</Style>
      <Container
        fluid
        classList={{
          "coin-section-container": true,
          [props.class ?? ""]: true,
        }}
      >
        <Container
          fluid
    
        >
          <Container>
            <Row>
              <Col class="col-12 col-md-2 pe-lg-5 content-column">
                {props.col1}
              </Col>
              <Col class="col-12 col-md-8 content-container">{content()}</Col>
              <Col class="col-12 col-md-2 content-column"></Col>
            </Row>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default CoinSection;