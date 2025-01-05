import { onMount } from "solid-js";
import { Style } from "@solidjs/meta";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StickyCards = (props) => {
  onMount(() => {
    const footer = document.querySelector(".footer");
    const lastCard = document.querySelector(".card.scroll");
    const pinnedSections = document.querySelectorAll(".pinned");

    pinnedSections.forEach((section, index, sections) => {
      let img = section.querySelector(".img");

      let nextSection = sections[index + 1] || lastCard;
      let endScalePoint = `top+=${nextSection.offsetTop - section.offsetTop} top`;

      // Pin the sections
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end:
            index === sections.length
              ? `+=${lastCard.offsetHeight / 2}`
              : footer.offsetTop - window.innerHeight,
          pin: true,
          pinSpacing: false,
          scrub: 1,
        },
      });

      // Animate the scale of images
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1 },
          {
            scale: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: endScalePoint,
              scrub: 1,
            },
          }
        );
      }
    });

    // Animate the hero section's opacity
    const heroH1 = document.querySelector(".hero h1");
    ScrollTrigger.create({
      trigger: '.sticky-cards-container',
      start: "top top",
      end: "+=400vh",
      scrub: 1,
      onUpdate: (self) => {
        let opacityProgress = self.progress;
        heroH1.style.opacity = 1 - opacityProgress;
      },
    });

    ScrollTrigger.defaults({
        scroller: ".sticky-cards-wrapper",
      });
  });

  return (
    <>
      <Style>
        {`
          .sticky-cards-container {
          * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  font-family: "PP Acma";
  background: #000;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.container {
  width: 100%;
  height: 100%;
}

.logo {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 2em;
  z-index: 2;
}

.logo a {
  text-decoration: none;
  font-size: 24px;
  font-weight: 400;
  color: #fff;
}

section {
  width: 100vw;
  height: 100vh;
}

.hero h1 {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-weight: 400;
  font-size: 200px;
  color: #fff;
  letter-spacing: -8px;
  line-height: 90%;
}

.card.scroll {
  position: relative;
}

.img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 1000px;
  height: 700px;
}

.footer {
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.footer h1 {
  font-size: 48px;
  font-weight: 400;
  letter-spacing: -2px;
}

          }
        `}
      </Style>
      <div class="sticky-cards-container">


        {props.cards.map((card, index) => (
          <section class={`card ${index === props.cards.length - 1 ? "scroll" : "pinned"}`}>
            <div class="img">
              <img src={card.imgSrc} alt={card.altText || `Image ${index + 1}`} />
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default StickyCards;