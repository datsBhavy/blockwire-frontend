// src/routes/about.tsx

import { Title } from "@solidjs/meta";
import { Container } from "solid-bootstrap";
import AboutCarousel from "../../components/aboutSection/AboutCarousel";
import WebServices from "../../components/Services/WebServices";
import CoinSection from "../../components/CoinSection";


export default function Services() {
  return (
    <main>
      <Title>Maerik - Services</Title>

      {/* <WebServices />
      <AboutCarousel /> */}
    </main>
  );
}