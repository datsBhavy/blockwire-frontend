// src/routes/about.tsx

import { Style, Title } from "@solidjs/meta";
import { Col, Container, Row } from "solid-bootstrap";
import WebServices from "../../components/Services/WebServices";
import AboutCarousel from "../../components/aboutSection/AboutCarousel";
import CoinSection from "../../components/CoinSection";
import { css } from "solid-styled-components";
import { useTheme } from "../../context/ThemeContext";
import { IoAccessibility, IoGitCompare, IoHome, IoLockClosed, IoRefreshCircle } from "solid-icons/io";
import DetailBullet from "../../components/DetailBullet";
import { DarkPurple } from "../../constants/styles";
import Packages from "../../components/Packages";
import { packageData } from "../../sectionData";


export default function Services() {
  const { theme } = useTheme()
  return (
    <main>
      <Style>{`
        h2 {
          font-size: 2.8rem;
        }

        hr {
          margin-top: 3rem;
          background-color: white;
        }

        .larger-text {
          font-size: 5.4rem!important;
          font-weight: 600;
        }


      `}</Style>
      <Title>Maerik - Services</Title>
  
      <CoinSection col1={<DetailBullet text="HOW IT WORKS" />}>
        <h1>Individual Influencers</h1>
        <Row>
          <Col class="col-12 col-md-6">
            <p class="fw-bold">Influencer Intros to Industry KOL’s</p>
            <small></small>
          </Col>
          <Col class="col-12 col-md-6">
          <p class="fw-bold">
          KOL X Blast
          </p></Col>
        </Row>
      </CoinSection>
      <Container>
        <h1 class="text-center">Services</h1>
        <Row>
          <Col class="col-12 col-md-4 border-right-primary"><h2 class="text-center">One Offs</h2><p></p></Col>
          <Col class="col-12 col-md-4 border-right-primary"> <h2 class="text-center">Individuals</h2></Col>
          <Col class="col-12 col-md-4"> <h2 class="text-center">Blockwire Packages</h2></Col>
          
         
         
        </Row>
      </Container>

      <CoinSection variant="dark">
        <DetailBullet text="FULL SERVICE PR AGENCY" />
        <h1 class="fw-bold larger-text">Our Mission</h1>
        <p class="fw-bold">
          BlockWire is a full-service PR agency that provides Press Relations, Marketing, Event Services and Strategic Advisory.

          Through our distribution network, our clients have had stories published in Bloomberg, Yahoo Finance, The Street, Coindesk, Bitcoin Magazine, Cointelegraph, CNBC, CNN, New York Times, Tech Crunch, and more. Together we’ve placed 1000+ organic articles and mentions as a direct result of our work.

          We have also assembled one of the largest Web3 influencer databases in the world. We leverage our robust media and influencer network to provide maximum distribution for your announcements and news.</p>
      </CoinSection>
      
      <CoinSection variant="dark">
        <DetailBullet text="FOR HOME BUYERS" />
        <h1 class="fw-bold larger-text">Blockwire Packages
        </h1>
        <p class="fw-bold"><b>BlockWire PR</b>: We harness the power of our extensive network in the crypto media landscape to deliver unmatched results. With two advisors who previously held executive roles at Bitcoin Magazine, our team has the strongest connections in the industry.</p>
        <p class="fw-bold">Our mission is to provide a cost-effective alternative to building an in-house marketing team. By leveraging our deep relationships rather than relying on costly paid media, we offer a more affordable solution compared to traditional PR agencies or hiring full-time marketing professionals.</p>
        <p class="fw-bold">What sets BlockWire apart is our unconventional approach to public relations. We prioritize securing top-tier mainstream media coverage right from the start, flipping the traditional model on its head. By establishing your presence at the top of the media hierarchy, we create a ripple effect, making it significantly easier for mid-tier and niche outlets to pick up your story. This strategic method ensures maximum visibility and credibility for your brand in the crypto space and beyond.</p>
      </CoinSection>
      <Container class="">
        <Packages packages={packageData} />
      </Container>
      <CoinSection col1={<DetailBullet text="BENEFITS" />}>
        <h1 class="fw-bold mb-5 text-secondary">Marketing Techniques</h1>
        <hr></hr>
        <div class="d-flex align-items-center">
          <IoLockClosed size={60} fill={theme().buttonBg} class="fs-1 me-3" />
          <div class="d-flex flex-column">
            <h2>Avoid taxable events</h2>
            <p class="fw-bold">We help you HODL and avoid the need to sell your crypto to buy property.</p>
          </div>
        </div>
        <hr></hr>
        <div class="d-flex align-items-center">
          <IoHome size={60} fill={theme().buttonBg} class="fs-1 me-3" />
          <div class="d-flex flex-column">
            <h2>Maintain your upside</h2>
            <p class="fw-bold">When you post your crypto as collateral, you still maintain ownership and full exposure to the markets.</p>
          </div>
        </div>
        <hr></hr>
        <div class="d-flex align-items-center">
          <IoRefreshCircle size={60} fill={theme().buttonBg} class="fs-1 me-3" />
          <div class="f-lex flex-column">
            <h2>Borrow. Sleep. Trade. Repeat.        </h2>
            <p class="fw-bold">You can borrow against your trading account and still trade your assets.</p>
          </div>
        </div>
        <hr></hr>
        <div class="d-flex align-items-center">
          <IoGitCompare size={60} fill={theme().buttonBg} class="fs-1 me-3" />
          <div class="d-flex flex-column">
            <h2>Ultra competitive rates
            </h2>
            <p class="fw-bold">We take a traditional lien against the property and provide competitive rates.

            </p>
          </div>
        </div>
      </CoinSection>
    </main>
  );
}