import { Style, Title } from "@solidjs/meta"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Container } from "solid-bootstrap"
import { createEffect, onMount } from "solid-js"
import Carousel, { CarouselSlide } from "~/components/carousel/Carousel"
import GradientText from "~/components/gradientText/GradientText"
import LargeTextLanding from "~/components/LargeTextLanding"
import SEOPackages from "~/components/Packages/SEO"
import SEOServices from "~/components/Services/SEOServices"
import WebServices from "~/components/Services/WebServices"
import { useTheme } from "~/context/ThemeContext"
import { NorthernLightsSquare, RocketSpacePortrait, SpaceShipVentsSquare, SpinningLightsPortrait } from "~/utils/images"

const SearchEngineOptimization = () => {
    return (
        <>
            <Title>Maerik - Search Engine Optimization</Title>
            <SEOLanding />
            <SEOPackages />
        </>
    )
}

const slides: CarouselSlide[] = [{
    title: 'About',
    content: 'This is the about section',
    image: NorthernLightsSquare
  }, {
    title: 'Design',
    content: 'This is the design section',
    image: RocketSpacePortrait
  }, {
    title: 'Products',
    content: 'This is the product section',
    image: SpinningLightsPortrait
  }, {
    title: 'Projects',
    content: 'This is the project section',
    image: SpaceShipVentsSquare
  }]

export default SearchEngineOptimization

const SEOLanding = () => {
    const {theme} = useTheme()

    onMount(() => {
        ScrollTrigger.create({
          trigger: ".seo-container",
          start: "top top",
          end: `+=${(((slides).length - 1) * 100)}%`, // Extend scroll duration to 5 viewport heights
          scrub: true,
          pin: true, // Pin the container for the hyperspace effect
        });
        ScrollTrigger.create({
          trigger: ".about-container",
          start: "top top",
          end: "bottom top",
        });
      });

    return (
        <>
        <Style>{`
        .large-text-landing-container {
          background-color: ${theme()?.backgroundColor};
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;

          @media (max-width: 776px) {
            padding: 1rem;
          }

          h1 {
            width: unset!important;
            text-align: start;
            margin-bottom: 0;
            line-height: 9.5rem;
          }
        }
      `}</Style>
      <section style={{
        "background-color": theme().backgroundColor,
        "color": theme().textColor
      }}>
      <Container class="large-text-landing-container">
        <GradientText
          variant="hollow"
          style={{ color: theme().backgroundColor, "font-size": "9rem" }}
        >
          SEO Driven.
        </GradientText>
      </Container>
      </section>
        <SEOServices />
      </>
    )
}