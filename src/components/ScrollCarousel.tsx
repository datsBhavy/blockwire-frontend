import { onMount } from "solid-js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import SplitType from "split-type";
import { Style } from "@solidjs/meta";

export const servicesCopy = [
    ["We transform your ideas into tangible results..."],
    ["Our brand and event design services..."],
    ["Through expert videography and photography..."],
    ["Our motion design expertise brings static concepts to life..."],
    ["We push creative boundaries with cutting-edge 3D graphics..."],
    ["Our print and drukwerk solutions..."],
    ["Through intuitive UI/UX design, we create digital experiences..."],
    ["Our web development solutions leverage cutting-edge technologies..."],
  ];

const ScrollCarousel = () => {
  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    const stickySection = document.querySelector(".sticky");
    const services = document.querySelectorAll(".service");
    const indicator = document.querySelector(".indicator");
    const currentCount = document.querySelector("#current-count");
    const serviceImg = document.querySelector(".service-img");
    const serviceCopy = document.querySelector(".service-copy p");
    const serviceHeight = 38;
    const imgHeight = 250;

    let currentSplitText = new SplitType(serviceCopy, { types: "lines" });

    const serviceWidths = Array.from(services).map((service) => {
      const measure = document.createElement("span");
      measure.style.cssText = `
        position: absolute;
        visibility: hidden;
        white-space: nowrap;
        font-family: "PP NeueBit";
        font-size: 60px;
        font-weight: 600;
      `;
      measure.textContent = service.querySelector("p").textContent;
      document.body.appendChild(measure);
      const width = measure.offsetWidth + 8;
      document.body.removeChild(measure);
      return width;
    });

    gsap.set(indicator, {
      width: serviceWidths[0],
      xPercent: -50,
      left: "50%",
    });

    const scrollPerService = window.innerHeight;
    let currentIndex = 0;

    const animateTextChange = (index) => {
      return new Promise((resolve) => {
        gsap.to(currentSplitText.lines, {
          opacity: 0,
          y: -20,
          duration: 0.25,
          stagger: 0.025,
          ease: "power3.inOut",
          onComplete: () => {
            currentSplitText.revert();

            serviceCopy.textContent = servicesCopy[index][0];
            currentSplitText = new SplitType(serviceCopy, { types: "lines" });

            gsap.set(currentSplitText.lines, { opacity: 0, y: 20 });
            gsap.to(currentSplitText.lines, {
              opacity: 1,
              y: 0,
              duration: 0.25,
              stagger: 0.025,
              ease: "power3.out",
              onComplete: resolve,
            });
          },
        });
      });
    };

    ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `${window.innerHeight * 8}px`,
      pin: true,
      onUpdate: async (self) => {
        const scrollPosition = Math.max(0, self.scroll() - window.innerHeight);
        const activeIndex = Math.floor(scrollPosition / scrollPerService);

        if (activeIndex !== currentIndex) {
          currentIndex = activeIndex;

          services.forEach((service) => service.classList.remove("active"));
          services[activeIndex].classList.add("active");

          await Promise.all([
            gsap.to(indicator, {
              y: activeIndex * serviceHeight,
              width: serviceWidths[activeIndex],
              duration: 0.3,
              ease: "power3.inOut",
            }),
            gsap.to(serviceImg, {
              y: -(activeIndex * imgHeight),
              duration: 0.3,
              ease: "power3.inOut",
            }),
            gsap.to(currentCount, {
              innerText: activeIndex + 1,
              snap: { innerText: 1 },
              duration: 0.3,
              ease: "power3.out",
            }),
            animateTextChange(activeIndex),
          ]);
        }
      },
    });
  });

  return (
    <>
    <Style>{`
        .scroll-section-container {
        * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 1100vh;
  font-family: "TT Hoves Pro Trial";
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

section {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.hero,
.outro {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #d5d5d5;
}

.hero {
  align-items: flex-end;
  background: url(./assets/hero.jpg) no-repeat 50% 50%;
  padding-bottom: 4em;
  background-size: cover;
  color: #fff;
}

.outro {
  background-color: #ff00ff;
}

.outro p {
  text-transform: uppercase;
  font-family: "PP NeueBit";
  font-size: 30px;
  font-weight: 600;
  line-height: 18px;
  padding: 4px 2px 0 2px;
  background-color: #000;
  color: #fff;
}

.sticky {
  display: flex;
}

.col {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2em;
}

.services {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 38px;
  transform: translateY(0px);
  background-color: #000;
  z-index: -1;
}

.service {
  width: max-content;
  height: 38px;
}

.service p {
  text-transform: uppercase;
  font-family: "PP NeueBit";
  font-size: 60px;
  font-weight: 600;
  color: #d5d5d5;
  transition: color 0.3s;
}

.service.active p {
  color: #fff;
}

.service-img-wrapper {
  position: relative;
  width: 60%;
  height: 250px;
  overflow: hidden;
  clip-path: polygon(50% 0%, 100% 0, 100% 85%, 90% 100%, 50% 100%, 0 100%, 0 0);
}

.service-img {
  width: 100%;
  height: 2000px;
  transform: translateY(0px);
  will-change: transform;
}

.img {
  width: 100%;
  height: 250px;
}

.service-copy {
  width: 60%;
}

.line {
  position: relative;
  will-change: transform;
}

.service-copy p {
  font-family: "TT Hoves Pro Trial";
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
}

.progress-bar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2.5px;
  height: 60%;
  background-color: #e0e0e0;
}

.progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  transform-origin: top;
  transform: scaleY(0);
  will-change: transform;
}

.index {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  padding: 4px 2px 2px 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  color: #fff;
}

.index span {
  font-family: "PP NeueBit";
  font-size: 20px;
  font-weight: 600;
  line-height: 12px;
  width: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.index span.separator {
  position: relative;
  top: -1px;
  width: 20px;
  height: 2px;
  background-color: #ff00ff;
}

@media (max-width: 900px) {
  .sticky {
    flex-direction: column;
  }

  .col:nth-child(1) {
    padding-top: 25%;
    justify-content: flex-start;
  }

  .col:nth-child(2) {
    flex-direction: row;
    gap: 1.5em;
  }

  .service-img-wrapper {
    width: 25%;
  }

  .service-copy p {
    font-size: 14px;
  }

  .progress-bar {
    top: -15%;
    height: 50%;
    transform: rotate(-90deg);
  }

  .index {
    top: 5%;
    bottom: unset;
  }
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-smooth iframe {
  pointer-events: none;
}

}
    `}</Style>
    <div class="scroll-section-container">
      <section class="hero">
        <p>Scroll Down</p>
      </section>
      <section class="sticky">
        <div class="column">
          <div class="services">
            <div class="indicator"></div>
            {servicesCopy.map(([service], index) => (
              <div class={`service ${index === 0 ? "active" : ""}`}>
                <p>{service.split(" ")[0]}</p>
              </div>
            ))}
          </div>
        </div>
        <div class="column">
          <div class="service-img-wrapper">
            <div class="service-img">
              {servicesCopy.map((_, index) => (
                <div class="img">
                  <img src={`./assets/img${index + 1}.jpg`} alt="" />
                </div>
              ))}
            </div>
          </div>
          <div class="service-copy">
            <p>{servicesCopy[0][0]}</p>
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress"></div>
        </div>
        <div class="index">
          <span id="current-count">1</span>
          <span class="separator"></span>
          <span class="total-count">{servicesCopy.length}</span>
        </div>
      </section>
      <section class="outro">
        <p>Your next section goes here</p>
      </section>
    </div>
    </>
  );
};

export default ScrollCarousel;