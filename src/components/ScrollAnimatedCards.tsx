import { onMount } from "solid-js";
import { Style } from "@solidjs/meta";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimatedCards = (props) => {
  const imageSources = props.images || [];

  onMount(() => {
    const container = document.querySelector(".scroll-animated-cards-container");
    if (!container) return;

    const menuItems = container.querySelectorAll(".menu-item");

    menuItems.forEach((item, index) => {
      const copyElements = item.querySelectorAll(".info, .name, .tag");
      copyElements.forEach((div) => {
        const copy = div.querySelector("p");
        if (copy) {
          const duplicateCopy = document.createElement("p");
          duplicateCopy.textContent = copy.textContent;
          div.appendChild(duplicateCopy);
        }
      });

      ScrollTrigger.create({
        trigger: item,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => animateCardIn(item, imageSources[index]),
        onLeaveBack: () => animateCardOut(item),
      });
    });

    const animateCardIn = (item, src) => {
      const preview1 = container.querySelector(".preview-img-1");
      const preview2 = container.querySelector(".preview-img-2");

      const img1 = document.createElement("img");
      const img2 = document.createElement("img");

      img1.src = src;
      img1.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
      img2.src = src;
      img2.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";

      preview1.appendChild(img1);
      preview2.appendChild(img2);

      gsap.to([img1, img2], {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1,
        ease: "power3.out",
        onComplete: () => {
          while (preview1.children.length > 10) preview1.removeChild(preview1.firstChild);
          while (preview2.children.length > 10) preview2.removeChild(preview2.firstChild);
        },
      });

      gsap.to(item.querySelectorAll("p:nth-child(1)"), { top: "-100%", duration: 0.3 });
      gsap.to(item.querySelectorAll("p:nth-child(2)"), { top: "0%", duration: 0.3 });
    };

    const animateCardOut = (item) => {
      gsap.to(item.querySelectorAll("p:nth-child(1)"), { top: "0%", duration: 0.3 });
      gsap.to(item.querySelectorAll("p:nth-child(2)"), { top: "100%", duration: 0.3 });
    };

    // Refresh ScrollTrigger after all components are mounted
    ScrollTrigger.refresh();
  });

  return (
    <>
      <Style>
        {`
          .scroll-animated-cards-container {
            position: relative;
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            .menu {
              width: 100%;
              margin: 17.5em 0;
            }

            .menu-item {
              width: 100%;
              padding: 0 2em;
              display: flex;
              cursor: pointer;
            }

            p {
              position: absolute;
              top: 0%;
              width: 100%;
              font-family: "PP Neue Montreal";
              font-weight: 500;
              text-transform: uppercase;
              line-height: 100%;
              letter-spacing: -0.025em;
              transition: color 0.25s;
            }

            .info,
            .tag,
            .name {
              position: relative;
              overflow: hidden;
            }

            .info,
            .tag {
              flex: 1;
              height: 14px;
              font-size: 14px;
            }

            .tag {
              text-align: right;
            }

            .name {
              flex: 4;
              height: 55px;
              font-size: 60px;
              text-align: center;
            }

            .info p:nth-child(2),
            .name p:nth-child(2),
            .tag p:nth-child(2) {
              top: 100%;
              color: #000;
            }

            .menu:hover .info p:nth-child(1),
            .menu:hover .name p:nth-child(1),
            .menu:hover .tag p:nth-child(1) {
              color: rgb(165, 165, 165);
            }

            .preview {
              position: absolute;
              top: 0;
              left: 0;
              width: 225px;
              height: 275px;
              z-index: 2;
              pointer-events: none;
            }

            .preview-img {
              position: absolute;
              width: 100%;
              height: 100%;
            }

            .preview-img-2 {
              top: 20px;
              left: 20px;
            }

            .preview-img img {
              position: absolute;
              top: 0;
              left: 0;
            }
          }
        `}
      </Style>
      <div class="scroll-animated-cards-container">
        <div class="preview">
          <div class="preview-img preview-img-1"></div>
          <div class="preview-img preview-img-2"></div>
        </div>
        <div class="menu">
          {props.cards.map((card, index) => (
            <div class="menu-item" key={index}>
              <div class="info">
                <p>{card.info}</p>
              </div>
              <div class="name">
                <p>{card.name}</p>
              </div>
              <div class="tag">
                <p>{card.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ScrollAnimatedCards;