import FullscreenCarousel from "../fullscreenCarousel/FullScreenCarousel"

const slides: CarouselSlide[] = [{
    title: 'About',
    content: 'This is the about section',
    image: RocketFlightPathLandscape
}, {
    title: 'Design',
    content: 'This is the design section',
    image: RocketTakeoffLandscape
}, {
    title: 'Products',
    content: 'This is the product section',
    image: RocketTakeoffLandscape1
}]

const LandingCarousel = (props: {slides?: CarouselSlide[]}) => {

  onMount(() => {
    ScrollTrigger.create({
        trigger: ".landing-container",
        start: "top top",
        end: `+=${(props.slides ?? slides).length - 1}00%`, // Extend scroll duration to 5 viewport heights
        scrub: true,
        pin: true, // Pin the container for the hyperspace effect
      });
    ScrollTrigger.create({
      trigger: ".landing-container",
      start: "top top",
      end: "bottom top",
    });
    onCleanup(() => {
      // Kill ScrollTrigger instance
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    })
  });

    return (
        <>
            <div class="landing-container">
            <FullscreenCarousel slides={slides} />
            </div>
        </>
    )
}
import { CarouselSlide } from "../carousel/Carousel";import { onCleanup, onMount } from "solid-js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RocketFlightPathLandscape, RocketTakeoffLandscape, RocketTakeoffLandscape1 } from "../../utils/images";

export default LandingCarousel