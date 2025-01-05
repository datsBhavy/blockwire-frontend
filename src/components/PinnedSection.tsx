import { onMount } from "solid-js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PinnedSection = (props) => {
  let sectionRef: HTMLDivElement;

  onMount(() => {
    ScrollTrigger.create({
      trigger: sectionRef,
      start: "top top",
      end: () => `+=${sectionRef.scrollHeight}`,
      pin: true,
      scrub: true,
    });
  });

  return (
    <div ref={(el) => (sectionRef = el)} style={{ overflow: "hidden" }}>
      {props.children}
    </div>
  );
};

export default PinnedSection;