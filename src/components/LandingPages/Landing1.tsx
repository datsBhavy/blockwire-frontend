import { onMount, createSignal } from "solid-js";
import gsap from "gsap";
import { Style } from "@solidjs/meta";
import { useTheme } from "../../context/ThemeContext";
import SplineEmbed from "../SplineEmbed";
import NavLinks from "../NavLinks";
import { Dark, Light } from "../../constants/styles";
import { css } from "solid-styled-components";
import RotatingDisplay from "../RotatingDisplay";
import { Col, Row } from "solid-bootstrap";
import { A } from "@solidjs/router";
import { useAppContext } from "../../context/AppContext";

const words = ["Blockwire.", "Creation.", "Distribution.", "Research."]; // Array of words to rotate

const LandingPage = () => {
  const { theme } = useTheme();
  const {user} = useAppContext()
  const [currentWordIndex, setCurrentWordIndex] = createSignal(0);

  onMount(() => {
    const typewriterEffect = () => {
      const currentWord = words[currentWordIndex()];
      const nextWordIndex = (currentWordIndex() + 1) % words.length;
      const nextWord = words[nextWordIndex];

      const target = document.querySelector(".landing-page-header h1");

      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            setCurrentWordIndex(nextWordIndex); // Update to the next word
            typewriterEffect(); // Start the animation for the next word
          }, 4000); // Wait 4 seconds before starting the next word
        },
      });

      // Backspace the current word
      tl.to(target, {
        duration: currentWord.length * 0.05, // Faster backspacing
        onUpdate: () => {
          const progress = Math.floor(currentWord.length * (1 - tl.progress()));
          target.textContent = currentWord.slice(0, progress);
        },
        ease: "none",
      })
        // Pause after clearing the word
        .to({}, { duration: 0.1 }) // Small pause before typing starts
        // Type the next word
        .to(target, {
          duration: nextWord.length * 0.05, // Faster typing
          onUpdate: () => {
            const progress = Math.floor(nextWord.length * tl.progress());
            target.textContent = nextWord.slice(0, progress);
          },
          ease: "none",
        });
    };

    const revealLandingPage = () => {
      const tl = gsap.timeline();

      // Animate the top and bottom overlays outward from the center
      tl.to(".top-overlay", {
        height: "0%",
        duration: 1,
        ease: "power3.inOut",
      })
        .to(
          ".bottom-overlay",
          {
            height: "0%",
            duration: 1,
            ease: "power3.inOut",
          },
          "<"
        )
        .to(
          ".landing-page-header h1",
          {
            color: Light, // Set the color to blue
            duration: 0.5,
            ease: "power3.inOut",
          },
          "<"
        )
        // enable this to start the typewriter effect
        // .call(() => {
        //   setTimeout(() => {
        //     typewriterEffect(); // Delay the first word change by 3 seconds
        //   }, 3000);
        // });
    };

    revealLandingPage();
  });


const services = [
    {
      title: "Press Release Creation & Distribution with Media Outreach",
      description: "In addition to creating press releases, BlockWire will handle direct outreach to targeted media outlets and journalists in both the crypto niche and mainstream sectors, securing placements in higher-visibility publications.",
      button: {
        text: "Sign Up",
        classList: {
            "secondary-color-button mt-3": true,
            [css`
              border: 1px solid ${Dark}!important;
              color: ${Dark}!important;
              border-radius: 8px!important;
              padding: .8rem 2rem!important;
              background-color: ${theme()?.buttonBg}!important;
              &:hover {
                background-color: transparent!important;
              }
            `]: true,
          }
    }
    },
    {
      title: "Advanced Content Creation",
      description: "Comprehensive content strategy and creation, including blogs, thought leadership pieces, or white papers, tailored to elevate brand positioning."
    },
    {
      title: "Influencer Outreach & Coordination",
      description: "Direct outreach to mid-level influencers in the crypto and blockchain space, coordinating one or two influencer campaigns to promote brand awareness and audience engagement.",
      button: {
        text: "Learn More",
        classList: {
            "secondary-button mt-3": true,
            [css`
              border: 1px solid ${Dark}!important;
              color: ${Dark}!important;
              border-radius: 8px!important;
              &:hover {
                background-color: ${theme()?.buttonBg}!important;
              }
            `]: true,
          }
    }
    },
    {
      title: "Conference & Event Support",
      description: "Assistance in promoting client participation in digital asset conferences or events, including speaking engagements and networking support.",
      button: {
        text: "Learn More",
        classList: {
            "secondary-button mt-3": true,
            [css`
              border: 1px solid ${Dark}!important;
              color: ${Dark}!important;
              border-radius: 8px!important;
                 &:hover {
                background-color: ${theme()?.buttonBg}!important;
              }
            `]: true,
          }
    }
    },
    {
      title: "Targeted Email Campaigns",
      description: "Development of targeted email marketing campaigns designed to engage specific audiences, promote new products/services, or share industry insights, helping to nurture leads and drive conversions."
    }
  ];

  const expertiseArray = [
    {
      title: "Industry Events",
      description:
        "Extensive experience in event planning, marketing, and execution for blockchain and crypto conferences.",

    },
    {
      title: "Sales Expertise",
      description:
        "Proven track record in closing deals and expanding client reach within the digital asset ecosystem.",
        button: {
            text: "Learn More",
            classList: {
                "secondary-button mt-3": true,
                [css`
                  border: 1px solid ${Dark}!important;
                  color: ${Dark}!important;
                  border-radius: 8px!important;
                     &:hover {
                background-color: ${theme()?.buttonBg}!important;
              }
                `]: true,
              }
        }
    },
    {
      title: "Professional Networking",
      description:
        "Strong connections that enable us to match businesses with the right partners and influencers.",
    },
    {
      title: "Market Strategy",
      description:
        "In-depth knowledge of market trends, giving us the insight to create effective marketing campaigns tailored to client needs.",
    },
    {
      title: "Ecosystem Understanding",
      description:
        "A comprehensive view of the blockchain and crypto landscape, enabling us to position our clients for success.",
        button: {
            text: "Learn More",
            classList: {
                "secondary-button mt-3": true,
                [css`
                  border: 1px solid ${Dark}!important;
                  color: ${Dark}!important;
                  border-radius: 8px!important;
                     &:hover {
                background-color: ${theme()?.buttonBg}!important;
              }
                `]: true,
              }
        }
    },
  ];

  
  return (
    <>
      <Style>
        {`
          .landing-page-container {
            width: 100vw;
            height: calc(100vh - 100px);
            overflow: hidden;
            position: relative; /* Ensure proper stacking context */
      
          }

          .fixed-spline-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
          }

          .top-overlay,
          .bottom-overlay {
            position: fixed;
            left: 0;
            width: 100%;
            height: 50%;
            background-color: ${Dark};
            z-index: 1000;
            pointer-events: none; /* Allow events to pass through */
          }

          .top-overlay {
            top: 0;
          }

          .bottom-overlay {
            bottom: 0;
          }

          .landing-page-hero {
            position: relative; /* Keep content relative to the section */
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            z-index: 1;
            overflow: hidden;
            pointer-events: none;
          }

          .landing-page-header {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            z-index: 10;
            pointer-events: none; /* Disable pointer events for the header */
          }

          .landing-page-header h1 {
            font-size: 14.5vw;
            color: ${Dark}; /* Set initial color to blue */
            margin: 0;
            transition: color 0.5s ease-in-out;
             font-weight: 800;
              text-transform: uppercase;
          }

          .landing-page-header button, .landing-page-header a {
            margin-top: 1rem;
            pointer-events: auto; /* Enable pointer events for buttons */
          }
        `}
      </Style>

      <div class="landing-page-container">
        <div class="fixed-spline-background">
          <SplineEmbed /> {/* Fixed background */}
        </div>

        <div class="top-overlay"></div>
        <div class="bottom-overlay"></div>

        <NavLinks />

        <section class="landing-page-hero">
          <div class="landing-page-header w-100">
            <h1>{words[0]}</h1>
            <div class="d-inline-flex mx-auto">
            <A href={user() ? '/dashboard/blogs' : "/sign-up"} class="primary-button mx-auto">{user() ? 'Go To Profile' : 'Sign Up'}</A>
            </div>
            {/* <div class="w-100">
            <Row class={css`align-items: stretch; border-top: 1px solid ${Dark};border-bottom: 1px solid ${Dark};`}>
              <Col class={`col-12 col-md-6 mb-5 mb-md-0 ${css`
                 border-right: 1px solid ${Dark}; padding: 1rem; color: ${Dark};
                `}`}>
              <RotatingDisplay class={css`height:100% max-height: 150px;`} data={services} />
              </Col>
              <Col class={`col-12 col-md-6 ${css`
                 padding: 1rem; color: ${Dark};
                      `}`}>
              <RotatingDisplay class={css`text-align:left!important;align-items: flex-start!important; height:100% max-height: 150px;`} data={expertiseArray} />
 
             
              </Col>
            </Row>
            </div> */}
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;