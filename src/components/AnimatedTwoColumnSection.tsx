import { Col, Row } from "solid-bootstrap";
import { onMount } from "solid-js";
import { gsap } from "gsap";

const TwoColumnSection = (props) => {
    let leftColRef: HTMLDivElement, rightColRef: HTMLDivElement;
  
    onMount(() => {
      gsap.fromTo(
        leftColRef,
        {
          opacity: 0,
          x: -100, // Start position for left column (off-screen to the left)
        },
        {
          opacity: 1,
          x: 0, // End position (in place)
          duration: 1.2, // Adjust duration for smoother effect
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftColRef,
            start: "top 80%", // Starts when the top of the left column is 80% visible
            end: "top 50%", // Completes when the column reaches 50% of the viewport height
            scrub: true,
          },
        }
      );
  
      gsap.fromTo(
        rightColRef,
        {
          opacity: 0,
          x: 100, // Start position for right column (off-screen to the right)
        },
        {
          opacity: 1,
          x: 0, // End position (in place)
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightColRef,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    });
  
    return (
      <Row class="mb-5">
        <Col
          class="col-12 col-md-6 h-100 border-right-primary"
          ref={(el) => (leftColRef = el)} // Reference for the left column
        >
          {props.col1}
        </Col>
        <Col class="col-12 col-md-6 h-100" ref={(el) => (rightColRef = el)}> {/* Reference for the right column */}
          {props.col2}
  
  
        </Col>
      </Row>
    );
  };

  
  export default TwoColumnSection;