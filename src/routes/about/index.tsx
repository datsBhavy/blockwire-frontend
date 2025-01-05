// src/routes/about.tsx

import { Title } from "@solidjs/meta";
import { Container } from "solid-bootstrap";
import { onMount } from "solid-js";
import LandingCarousel from "../../components/landing/LandingCarousel";
import AboutCarousel from "../../components/aboutSection/AboutCarousel";


export default function AboutRoute() {

  return (
    <main>
      <Title>About Us</Title>
        <LandingCarousel />
      {/* <Hyperspace />
      <WebServices /> */}
      <AboutCarousel />
    </main>
  );
}