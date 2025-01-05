import Carousel, { CarouselSlide } from "../carousel/Carousel"

// gsap.registerPlugin(ScrollTrigger);


const AboutCarousel = (props: { slides?: CarouselSlide[] }) => {

  const slides: CarouselSlide[] = [{
    title: 'Mainstream Media',
    content: 'BlockWire has cultivated strong relationships with top-tier media outlets, allowing us to provide our clients with direct access to mainstream platforms that most crypto and blockchain projects struggle to reach. By circumventing traditional PR bottlenecks, we expedite coverage in high-traffic crypto centric publications, ensuring your message breaks through faster and with greater impact.',
    image: Slide2
  }, {
    title: 'Influencer Amplification',
    content: 'We collaborate with some of the most influential voices in the digital asset space, from YouTube creators to Twitter personalities, whose combined reach extends to tens of millions. Instead of focusing solely on earned media, we connect clients with the right influencers who can amplify brand narratives, create authentic engagement, and generate buzz across multiple social platforms.',
    image: Slide1
  }, {
    title: 'Event Marketing',
    content: 'BlockWire’s expertise in event planning, marketing, and execution helps companies maximize their presence at industry events. We ensure that clients don’t just attend conferences; they dominate them. From securing speaking slots for leadership to arranging influencer meet-and-greets and private investor gatherings, we help turn events into critical marketing moments that generate meaningful connections and visibility.',
    image: Slide3
  }, {
    title: 'Content Distribution',
    content: 'Our content distribution strategies are tailored to ensure that every press release, blog post, or announcement reaches its intended audience—whether that’s through established media channels, social media, or niche blockchain forums. By targeting the digital asset community where they are most active, we position our clients’ brands at the heart of the conversation.',
    image: Slide4
  },
   {
    title: 'Data-Driven Customization',
    content: 'We continuously monitor market trends, social sentiment, and competitor activity to craft messaging that resonates. Using data to drive decisions, we optimize campaigns in real-time, adjusting strategies to increase engagement, impressions, and ROI.',
    image: Slide4
  }, {
    title: 'Client Conversions',
    content: 'We focus on detailed messages to drive conversions to the targeted audiences for maximized conversions for B2B revenue generated.',
    image: Slide4
  }, {
    title: 'Crypto Media Distribution',
    content: 'With the most vast crypto media network, we can reach all sectors of the niche Crypto media ecosystem supported by Mainstream coverage for credibility',
    image: Slide4
  }
]

  onMount(() => {
    ScrollTrigger.create({
      trigger: ".about-container",
      start: "top top",
      end: `+=${(((props.slides ?? slides).length - 1) * 100)}%`, // Extend scroll duration to 5 viewport heights
      scrub: true,
      pin: true, // Pin the container for the hyperspace effect
    });
    ScrollTrigger.create({
      trigger: ".about-container",
      start: "top top",
      end: "bottom top",
    });

    onCleanup(() => {
      // Kill ScrollTrigger instance
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      
      // Kill the GSAP animation
    });
  });

  return (
    <>
    <Style>{`
      .about-container {
      }
    `}</Style>
      <div class="about-container">
        <Carousel slides={slides} />
      </ div>

    </>

  )
}

export default AboutCarousel

// Alternatively, for local images:
import Slide1 from "../../../public/images/astronaut_portrait.webp";
import Slide2 from "../../../public/images/rocket_space_portrait.webp";
import Slide3 from "../../../public/images/spinning_lights_portrait.webp";
import Slide4 from '../../../public/images/hyperspeed_portrait.webp'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onCleanup, onMount } from "solid-js";
import { useTheme } from "../../context/ThemeContext";import { Style } from "@solidjs/meta";

