import { Component, onMount } from "solid-js";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Style, Title } from "@solidjs/meta";
import AnimateHighlightedText from "~/components/AnimateHightedText";
import LargeTextLanding from "~/components/LargeTextLanding";
import HighlightedTextLanding from "~/components/HighlightedTextLanding";
import { SpaceShipVentsSquare } from "~/utils/images";
import SEOPackages from "~/components/Packages/SEO";
import { css } from "solid-styled-components";
import { useTheme } from "~/context/ThemeContext";

const Playground: Component = () => {
  const {theme} = useTheme()

  return (
    <>
      <Title>Playground</Title>
      <SEOPackages />
      {/* <LargeTextLanding />
    <HighlightedTextLanding text="SEO Services" img={SpaceShipVentsSquare}/> */}
    
    </>
  );
};

export default Playground;