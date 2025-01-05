import { createSignal, onMount, createEffect } from "solid-js";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import MenuBtn from "./MenuBtn";
import { Style } from "@solidjs/meta";
import { Link } from "@solidjs/router";
import { useTheme } from "../../context/ThemeContext";
import SplineEmbed from "../SplineEmbed";
import { css } from "solid-styled-components";
import RobotSpline from "../RobotSpline";

const Nav = () => {
  const [isAnimating, setIsAnimating] = createSignal(false);
  const [isOpen, setIsOpen] = createSignal(false);
  let menuRef;

  // Initialize GSAP and CustomEase
  onMount(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );

    if (menuRef) {
      const menu = menuRef;
      const links = menu.querySelectorAll(".link");
      const socialLinks = menu.querySelectorAll(".socials p");

      gsap.set(menu, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });
      gsap.set(links, { y: 30, opacity: 0 });
      gsap.set(socialLinks, { y: 30, opacity: 0 });
      gsap.set(".header h1 span", {
        y: 500,
        rotateY: 90,
        scale: 0.8,
      });
    }
  });

  // GSAP animation logic
  const animateMenu = (open) => {
    if (!menuRef) return;

    const menu = menuRef;
    const links = menu.querySelectorAll(".link");
    const socialLinks = menu.querySelectorAll(".socials p");

    setIsAnimating(true);

    if (open) {
      gsap.to(menu, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "hop",
        duration: 1.5,
        onStart: () => (menu.style.pointerEvents = "all"),
        onComplete: () => setIsAnimating(false),
      });

      gsap.to(links, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        delay: 0.85,
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(socialLinks, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        delay: 0.85,
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(".video-wrapper", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "hop",
        duration: 1.5,
        delay: 0.5,
      });

      gsap.to(".header h1 span", {
        rotateY: 0,
        stagger: 0.05,
        delay: 0.75,
        duration: 1.5,
        ease: "power4.out",
      });

      gsap.to(".header h1 span", {
        y: 0,
        scale: 1,
        stagger: 0.05,
        delay: 0.5,
        duration: 1.5,
        ease: "power4.out",
      });
    } else {
      gsap.to(menu, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "hop",
        duration: 1.5,
        onComplete: () => {
          menu.style.pointerEvents = "none";

          gsap.set(menu, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          });

          gsap.set(links, { y: 30, opacity: 0 });
          gsap.set(socialLinks, { y: 30, opacity: 0 });
          gsap.set(".header h1 span", {
            y: 500,
            rotateY: 90,
            scale: 0.8,
          });

          setIsAnimating(false);
        },
      });
    }
  };

  // Effect to run animation when `isOpen` changes
  createEffect(() => {
    animateMenu(isOpen());
  });

  const {theme} = useTheme()

  const toggleMenu = () => {
    if (!isAnimating()) {
      setIsOpen((prev) => !prev);
    }
  };

  const splitTextIntoSpans = (text) =>
    text.split("").map((char, index) =>
      char === " " ? (
        <span key={index}>&nbsp;&nbsp;</span>
      ) : (
        <span key={index}>{char}</span>
      )
    );

  return (
    <>
    <Style>{`
        /* menu */
.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #0f0f0f;
  clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  pointer-events: none;
  transform-style: preserve-3d;
  perspective: 1000px;
  z-index: 200;
}

.col-1 {
  flex: 1;
}

.col-2 {
  flex: 2;
}

.column {
  position: relative;
  height: 100%;
  padding: 10em 2em 2em 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.link {
  position: relative;
  transform: translateY(30px);
  opacity: 0;
}

.link a:hover {
    color: ${theme()?.buttonBg};
}

.link a {
  text-decoration: none;
  color: #fff;
  font-size: 48px;
  font-weight: 300;
  letter-spacing: -1.5px;
  line-height: 125%;
}

.video-wrapper {
  width: 100%;
  aspect-ratio: 16/9;
  background-color: #1d1d1d;
  clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  overflow: hidden;
}

.video-wrapper video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.socials {
  width: 50%;
  display: flex;
  gap: 2em;
}

.socials .sub-col {
  flex: 1;
}

.socials .sub-col p {
  position: relative;
  color: #fff;
  transform: translateY(30px);
  opacity: 0;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
}

.header h1 {
  color: #fff;
  text-transform: uppercase;
  font-size: 500px;
  font-weight: lighter;
  line-height: 100%;
  height: 400px;
}

.header h1 span {
  position: relative;
  display: inline-block;
  transform: scale(0.75) translateY(500px) rotateY(90deg);
  transform-origin: bottom;
}

@media (max-width: 900px) {
  .col-1 {
    flex: 2;
    align-items: flex-start;
  }

  .link a {
    font-size: 30px;
  }

  .video-wrapper {
    padding: 0.4em;
  }

  .socials {
    width: 100%;
    flex-direction: column;
    gap: 8em;
  }

  .header h1 {
    font-size: 120px;
    height: 100px;
  }
}

    `}</Style>
    <div>
      <div classList={{
        "logo": true,
        [css`
            z-index: 500;
        `]: true
      }}>
        <Link href="/">    
        <img class={css`height: 50px; background-color: transparent;`} src="https://i0.wp.com/block-wire.com/wp-content/uploads/2024/07/white-bw-logo.png?fit=500%2C255&ssl=1" alt="Blockwire" />

        </Link>
      </div>

      <MenuBtn isOpen={isOpen()} toggleMenu={toggleMenu} />

      <div class="menu" ref={(el) => (menuRef = el)}>
        <div class="column col-1" onClick={() => {
            setIsOpen(false);
        }}>
          <div class="menu-logo">
            <Link href="#">
            <img class={css`height: 50px;`} src="https://i0.wp.com/block-wire.com/wp-content/uploads/2024/07/white-bw-logo.png?fit=500%2C255&ssl=1" alt="Blockwire" />
            </Link>
          </div>
          <div class="links">
            <div class="link">
              <Link href="/">About</Link>
            </div>
            <div class="link">
              <Link href="/blog">Blog</Link>
            </div>
            <div class="link">
              <Link href="/influencers">Influencers</Link>
            </div>
            <div class="link">
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div class="video-wrapper">
            {/* <video src={"/video.mp4"} muted autoplay loop /> */}
            {/* <SplineEmbed /> */}
            <RobotSpline />
          </div>
        </div>
        <div class="column col-2">
          <div class="socials">
            <div class="sub-col">
              <p>Blockwire</p>
              <p>600 Broadway</p>
              <p>37201 Tennessee</p>
              <p>United States</p>
              <br />
              <p>avery@blockwire.com</p>
            </div>
            <div class="sub-col">
              <p>Instagram</p>
              <p>LinkedIn</p>
              <p>Twitter</p>
              <p>Facebook</p>
              <br />
            </div>
          </div>

          <div class="header me-auto">
            <h1>PR</h1>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Nav;