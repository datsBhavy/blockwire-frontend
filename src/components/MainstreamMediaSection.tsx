import { onMount } from "solid-js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Col, Row } from "solid-bootstrap";
import ShuffleText from "./ShuffleText";
import { cryptoBg } from "../utils/images";

gsap.registerPlugin(ScrollTrigger);

const MainstreamMediaSection = () => {
  onMount(() => {
    const elements = [
      { selector: ".mainstream-media-h1", animation: { x: -50, opacity: 0 } },
      { selector: ".mainstream-media-img", animation: { x: 50, opacity: 0 } },
      { selector: ".mainstream-media-p", animation: { y: 30, opacity: 0 } },
      { selector: ".mainstream-media-button", animation: { scale: 0.8, opacity: 0 } },
    ];

    elements.forEach(({ selector, animation }) => {
      gsap.fromTo(
        selector,
        animation,
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: selector,
            start: "top 80%", // Trigger animation when 80% of the viewport is reached
            toggleActions: "play none none none", // Play animation only once
          },
        }
      );
    });
  });

  return (
    <Row class="mainstream-media-content">
      <Col class="col-12 col-md-6 pt-6">
        <div class="border-top-primary border-bottom-primary py-3 mb-5">
          <h1 class="fw-bold text-uppercase secondary-text mb-0 mainstream-media-h1">
            Mainstream Media
          </h1>
        </div>
        <button class="primary-button mainstream-media-button">
          <ShuffleText>Learn More</ShuffleText>
        </button>
      </Col>
      <Col class="col-12 col-md-6">
        <img
          class="h-50 mb-5 mainstream-media-img"
          src={cryptoBg}
          alt="Mainstream Media Integration"
        />
        <p class="border-top-primary border-right-primary border-left-primary border-bottom-primary p-3 mainstream-media-p">
          BlockWire has cultivated strong relationships with top-tier media
          outlets, allowing us to provide our clients with direct access to
          mainstream platforms that most crypto and blockchain projects struggle
          to reach. By circumventing traditional PR bottlenecks, we expedite
          coverage in high-traffic crypto-centric publications, ensuring your
          message breaks through faster and with greater impact.
        </p>
      </Col>
    </Row>
  );
};

export default MainstreamMediaSection;