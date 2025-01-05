import { onMount } from "solid-js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Col, Row } from "solid-bootstrap";
import { cryptoBg, cryptoBg2 } from "../utils/images";
import ShuffleText from "./ShuffleText";
import { css } from "solid-styled-components";
import { useTheme } from "../context/ThemeContext";
import { Dark } from "../constants/styles";
import { Style } from "@solidjs/meta";

gsap.registerPlugin(ScrollTrigger);

const InfluencerAmplificationSection = () => {
  onMount(() => {
    const elements = [
      { selector: ".influencer-img-left", animation: { x: -50, opacity: 0 } },
      { selector: ".influencer-h1", animation: { y: -30, opacity: 0 } },
      { selector: ".influencer-p", animation: { y: 30, opacity: 0 } },
      { selector: ".influencer-button", animation: { scale: 0.8, opacity: 0 } },
      { selector: ".influencer-img-right", animation: { x: 50, opacity: 0 } },
    ];

    elements.forEach(({ selector, animation }) => {
      gsap.fromTo(selector, animation, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: selector,
          start: "left center", // Trigger animation when element is in the center of the horizontal container
          scroller: ".horizontal-scroll-container", // Specify the container for horizontal scrolling
          horizontal: true, // Enable horizontal scrolling detection
          toggleActions: "play none none none", // Play animation only once
          once: true, // Ensure animation happens only once
        },
      });
    });
  });

  const { theme } = useTheme();

  return (
    <>
    <Style>{`
      .influencer-amplification-content p {
        color: ${theme()?.buttonBg1};
        font-weight: 500!important;
        font-size: 3rem!important;
        line-height: 3rem;
      }
    `}</Style>
      <Row class="influencer-amplification-content">
      <Col class="col-12 col-md-5">
        <h1
            classList={{
              "influencer-h1 fw-bold mb-5": true,
              [css`
                color: ${theme()?.buttonBg1};
              `]: true,
            }}
          >
            Influencer Amplification
          </h1>
          <button classList={{
            "secondary-color-button influencer-button": true,
            [css`
              color: ${Dark}!important;  
            `]: true
          }}>
            <ShuffleText>Learn More</ShuffleText>
          </button>
        </Col>
        <Col class="col-12 col-md-7 pt-6">
          
          <p
            classList={{
              "border-top-secondary pt-3 influencer-p": true,
              [css`
                color: ${theme()?.buttonBg1};
              `]: true,
            }}
          >
            We collaborate with some of the most influential voices in the
            digital asset space, from YouTube creators to Twitter personalities,
            whose combined reach extends to tens of millions. Instead of
            focusing solely on earned media, we connect clients with the right
            influencers who can amplify brand narratives, create authentic
            engagement, and generate buzz across multiple social platforms.
          </p>
          
        </Col>
        
      </Row>
    </>
  );
};

export default InfluencerAmplificationSection;
