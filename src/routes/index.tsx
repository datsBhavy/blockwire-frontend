import { A } from "@solidjs/router";
// import { useAuth } from "@solid-mediakit/auth/client";
import { type VoidComponent, createEffect, createResource, Match, onMount, Switch } from "solid-js";
import HomePage from "../components/homePage/HomePage";
import Hyperspace from "../components/hyperSpace/HyperSpace";
import WebServices from "../components/Services/WebServices";
import LargeTextLanding from "../components/LargeTextLanding";
import Services from "./services";
import PRPackages from "../components/Packages/PR";
import { Title } from "@solidjs/meta";
import { useTheme } from "../context/ThemeContext";
import CalendlyEmbed from "../components/CalendlyEmbed";
import CoinSection from "../components/CoinSection";
import MultiDirectionalScroll from "../components/MultiDirectionalScroll";
import Landing1 from "../components/LandingPages/Landing1";
import ExecutiveSummary from "../components/ExecutiveSummary";
import AnimatedSection from "../components/AnimatedSection";
import { cryptoBg, cryptoBg2 } from "../utils/images";
import { Col, Container, Row } from "solid-bootstrap";
import DetailBullet from "../components/DetailBullet";
import { IoGitCompare, IoHome, IoLockClosed, IoRefreshCircle } from "solid-icons/io";
import AboutCarousel from "../components/aboutSection/AboutCarousel";
import { Dark, Grey, Light, LighterDark } from "../constants/styles";
import { css } from "solid-styled-components";
import AnimatedScrollCarousel from "../components/AnimatedScrollCarousel";
import HorizontalScrollSection from "../components/HorizontalScrollSection";
import { blockwirePackages, ecosystemUnderstandingSection, establishedRelationshipsSection, industryEventsSection, influencerPackageData, marketStrategySection, missionStatementSection, packageData, productsServicesSection, professionalNetworkingSection, salesExpertiseSection } from "../sectionData";
import StickyCards from "../components/StickyCards";
import ScrollAnimatedCards from "../components/ScrollAnimatedCards";
import ShuffleText from "../components/ShuffleText";
import ColorChangeText from "../components/ColorChangeText";
import gsap from "gsap";
import PageTransition from "../components/PageTransition";
import MainstreamMediaSection from "../components/MainstreamMediaSection";
import InfluencerAmplificationSection from "../components/InfluencerAmplificationSection";
import ClientsSection from "../components/ClientsSection";
import TwoColumnSection from "../components/AnimatedTwoColumnSection";
import MarketAnalysis from "./MarketAnalysis";
import Contact from "./ContactUs";
import Packages from "../components/Packages";
// import { Title } from "@solidjs/meta";

const Home: VoidComponent = () => {
  const { theme } = useTheme()

  const section2 = {
    title: "Products/Services",
    text: 'BlockWire offers public relations, conference support, mass distribution, press release creation, strategic advisory, content creation, and influencer connection/distribution tailored for the digital asset industry',
    image: cryptoBg2
  }
  const section3 = {
    title: "Market Analysis",
    text: 'Industry Overview: The digital asset space, including cryptocurrencies, blockchain, DeFi, and NFTs, has grown rapidly, with the global crypto market now valued over $1 trillion. Despite this growth, marketing infrastructure remains underdeveloped, especially compared to traditional industries.',
    image: cryptoBg2,
    content: (
      <>
        <A href={'/market-analysis'}><button class="secondary-color-button">Learn More</button></A>
      </>
    )
  }

  const industryExpertiseSection = {
    title: "Industry Expertise",
    text: "BlockWire’s team brings a collective 15 years of experience in the digital asset space, providing a deep understanding of the industry's complexities.",
    image: cryptoBg2
  }

  const expertiseSections = [
    industryEventsSection,
    salesExpertiseSection,
    professionalNetworkingSection,
    marketStrategySection,
    ecosystemUnderstandingSection,
  ]

  return (
    <main>
      <Title>Maerik - Home</Title>
      {/* <PageTransition /> */}
      <Landing1 />

      <AnimatedScrollCarousel title="Experts In" slides={expertiseSections} />
      <Container class={css`background-color: ${Dark};`}>
   
      </Container>
      <Container fluid class={css`
          background-color: ${Dark};
          position: relative;`}>
        <Container fluid class="p-0 p-md-5">
          <div class="py-5"></div>
          <Container></Container>
          <AnimatedSection variant="dark" section={section3} index={2} />
          <div class={css`.text-class {font-style: italic;}`}>
            <AnimatedSection variant="dark" section={missionStatementSection} index={1} />
          </div>
          <AnimatedSection variant="dark" section={section2} index={2} />
        </Container>
      </Container>

<Container fluid class={css`
        background-color: ${Dark};
        position: relative;
        `}>
 <CoinSection>
        <DetailBullet text="OUR MARKETING" />
        <h1 class="fw-bold larger-text secondary-text">
          <ColorChangeText currentColor={`${Light}50`} targetColor={Light}>
            Marketing Techniques
          </ColorChangeText>
        </h1>

        <p class="fw-bold">
          <ColorChangeText currentColor={`${Light}50`} targetColor={Light}>
            At BlockWire, we take an unconventional approach to marketing, tailored specifically to the fast-evolving digital asset space. Our strategies are designed to bypass the slow, traditional media-building process and deliver immediate results by leveraging mainstream media access and powerful influencer partnerships. This allows us to place our clients' messaging directly in front of millions of highly engaged and relevant audiences.
          </ColorChangeText>
        </p>
      </CoinSection>
        </Container>
     


      <HorizontalScrollSection sections={[
        {
          class: css`
          h1 {
            font-weight: 900;
            font-size: 5rem!important;
          }
      background-color: ${Dark};
      color: ${theme()?.buttonBg};
      p {
          color: ${theme()?.buttonBg}!important;
          font-weight: 500!important;
          line-height: 1.1rem;
          opacity: 1;
      }
    `,
          content: 
              <MainstreamMediaSection />
        },
        {
          class: css`
      background-color: ${Dark};
      p {
             line-height: 1.1rem;
      }
    `,
          content: <InfluencerAmplificationSection />,
        },
        {
          class: css`
          .text-primary {
            color: ${theme()?.buttonBg1}!important;
          }
          background-color: ${Dark};
          color: ${theme()?.buttonBg};
          li {
            list-style: none;
          }
          p {
          color: ${theme()?.buttonBg}!important;
          font-weight: 500!important;
             line-height: 1.1rem;
          }
          b {
            color: ${theme()?.buttonBg}!important;
          }
          h1 {
            font-weight: 900!important;
            text-transform: uppercase;
          }
  `,
          content: (
            <>
            <CoinSection>
            <h1 class="fw-bold">{establishedRelationshipsSection.title}</h1>
            <li class="border-bottom-primary border-top-primary border-right-primary border-left-primary p-3">
                      <p><b>C-Suite Executives</b></p>
                      <p class="text-light mb-0">High-level decision-makers across leading blockchain and crypto organizations including funds, miners, traders, and more.</p>
                    </li>
                    <li class="border-bottom-primary border-top-primary border-right-primary border-left-primary p-3">
                      <p><b>Investors</b></p>
                      <p class="text-light mb-0">Direct access to key investors and venture capitalists looking to support innovative projects in the digital asset sector</p>
                    </li>
                    <li class="border-bottom-primary border-top-primary border-right-primary border-left-primary p-3">
                      <p><b>Top-Tier Influencers</b></p>
                      <p class="text-light mb-0">We collaborate with the largest influencers in the space, collectively reaching tens of millions of engaged followers, ensuring maximum exposure for our clients</p>
                    </li>
            </CoinSection>
          
            </>
          ),
        },
  //       {
  //         class: css`
  //   background-color: ${LighterDark};
  //   p {
  //      line-height: 1.1rem;}
  // `,
  //         content: (
  //           <>
  //             <CoinSection>
          
  //                 <h1 >
  //                   High Impact Event Marketing
  //                 </h1>

  //                 <p>
  //                   BlockWire’s expertise in event planning, marketing, and execution helps companies maximize their presence at industry events. We ensure that clients don’t just attend conferences; they dominate them. From securing speaking slots for leadership to arranging influencer meet-and-greets and private investor gatherings, we help turn events into critical marketing moments that generate meaningful connections and visibility.
  //                 </p>

        
  //             </CoinSection>
  //           </>
  //         ),
  //       },

  
      ]} />


<Container fluid class={css`
        background-color: ${theme()?.backgroundColor};
        position: relative;
        `}>
   <CoinSection col1={<DetailBullet text={industryExpertiseSection.title} />}>
        <h1 class={css`font-size: 5rem;`}><ColorChangeText>{industryExpertiseSection.text}</ColorChangeText></h1>
      </CoinSection>
</Container>

{/* <Hyperspace text="Industry Overview" /> */}

<Container fluid class={css`
        background-color: ${theme()?.backgroundColor};
        position: relative;
        `}>
        <Container fluid class="p-0 p-md-5" style={{ background: Dark }}>
          <div class="py-5"></div>
          <TwoColumnSection col1={<><h1>Blockwire Packages
            </h1>
          <p class="text-light mb-5"><b>BlockWire PR</b>: We harness the power of our extensive network in the crypto media landscape to deliver unmatched results. With two advisors who previously held executive roles at Bitcoin Magazine, our team has the strongest connections in the industry.</p></>}
          col2={<>
          {/* <h1>Blockwire Packages</h1> */}
          <p class="text-light">What sets BlockWire apart is our unconventional approach to public relations. We prioritize securing top-tier mainstream media coverage right from the start, flipping the traditional model on its head. By establishing your presence at the top of the media hierarchy, we create a ripple effect, making it significantly easier for mid-tier and niche outlets to pick up your story. This strategic method ensures maximum visibility and credibility for your brand in the crypto space and beyond.</p></>} />
          <Container></Container>

      <Packages packages={blockwirePackages}/>
      <Contact />
        </Container>
      </Container>
   
{/* 
      <Container fluid class={css`
        background-color: ${theme()?.backgroundColor};
        position: relative;
        `}>
        <Container fluid class="p-0 p-md-5" style={{ background: Dark }}>
          <div class="py-5"></div>
          <TwoColumnSection col1={<><h1>Influencer Intros to Industry KOL’s
            </h1>
          <p class="text-light mb-5"><b>BlockWire PR</b>: We harness the power of our extensive network in the crypto media landscape to deliver unmatched results. With two advisors who previously held executive roles at Bitcoin Magazine, our team has the strongest connections in the industry.</p></>}
          col2={<>
          <p class="text-light">What sets BlockWire apart is our unconventional approach to public relations. We prioritize securing top-tier mainstream media coverage right from the start, flipping the traditional model on its head. By establishing your presence at the top of the media hierarchy, we create a ripple effect, making it significantly easier for mid-tier and niche outlets to pick up your story. This strategic method ensures maximum visibility and credibility for your brand in the crypto space and beyond.</p></>} />
          <Container></Container>

      <Packages packages={influencerPackageData}/>
      <Contact />
        </Container>
      </Container> */}



      {/* <ClientsSection /> */}
     {/* <MarketAnalysis /> */}
    </main>
  );
};

export default Home;

// gsap.registerPlugin(ScrollTrigger);

