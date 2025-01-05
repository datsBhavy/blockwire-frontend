import { onMount } from "solid-js";
import { gsap } from "gsap";
import { Style } from "@solidjs/meta";
import { useTheme } from "../context/ThemeContext";
import { Dark } from "../constants/styles";

function PageTransition(props) {
  let blocks: HTMLElement[];

  // GSAP Transition Logic
  onMount(() => {
    const ease = "power4.inOut";

    const revealTransition = () =>
      new Promise((resolve) => {
        gsap.set(blocks, { scaleY: 1 });
        gsap.to(blocks, {
          scaleY: 0,
          duration: 1,
          stagger: {
            each: 0.1,
            from: "start",
            axis: "x",
          },
          ease: ease,
          onComplete: resolve,
        });
      });

    const animateTransition = () =>
      new Promise((resolve) => {
        gsap.set(blocks, { visibility: "visible", scaleY: 0 });
        gsap.to(blocks, {
          scaleY: 1,
          duration: 1,
          stagger: {
            each: 0.1,
            from: "start",
            axis: "x",
          },
          ease: ease,
          onComplete: resolve,
        });
      });

    // Initial Reveal Animation
    revealTransition().then(() => gsap.set(blocks, { visibility: "hidden" }));

    // Handle Link Clicks
    document.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const href = link.getAttribute("href");

        if (href && !href.startsWith("#") && href !== window.location.pathname) {
          animateTransition().then(() => {
            window.location.href = href;
          });
        }
      });
    });
  });

  const {theme} = useTheme()

  return (
    <>
      <Style>
        {`
          /* CSS for Page Transition */
          .transition {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            z-index: 2;
            pointer-events: none;
          }
          .transition-row {
            flex: 1;
            display: flex;
          }
          .transition-row.row-1 .block {
            transform-origin: top;
          }
          .transition-row.row-2 .block {
            transform-origin: bottom;
          }
          .block {
            flex: 1;
            background-color: ${Dark};
            transform: scaleY(1);
            will-change: transform;
            visibility: visible;
          }
        `}
      </Style>
      <div class="transition">
        <div class="transition-row row-1">
          <div class="block" ref={(el) => (blocks ||= []).push(el)}></div>
          <div class="block" ref={(el) => (blocks ||= []).push(el)}></div>
          <div class="block" ref={(el) => (blocks ||= []).push(el)}></div>
          <div class="block" ref={(el) => (blocks ||= []).push(el)}></div>
          <div class="block" ref={(el) => (blocks ||= []).push(el)}></div>
        </div>
        <div class="transition-row row-2">
          <div class="block" ref={(el) => (blocks ||= []).push(el)}></div>
          <div class="block" ref={(el) => (blocks ||= []).push(el)}></div>
          <div class="block" ref={(el) => (blocks ||= []).push(el)}></div>
          <div class="block" ref={(el) => (blocks ||= []).push(el)}></div>
          <div class="block" ref={(el) => (blocks ||= []).push(el)}></div>
        </div>
      </div>
    </>
  );
}

export default PageTransition;