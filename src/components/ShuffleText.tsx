import { createSignal, onMount, onCleanup } from "solid-js";
import { Style } from "@solidjs/meta";

const ShuffleText = (props) => {
  const [displayText, setDisplayText] = createSignal("");
  let originalText = props.children || "";
  let observer = null;
  let elementRef;

  const animateText = () => {
    let currentText = "";
    let index = 0;

    const shuffleText = setInterval(() => {
      if (index < originalText.length) {
        let shuffledText = "";
        for (let i = 0; i <= index; i++) {
          shuffledText +=
            i < index ? originalText[i] : Math.random().toString(36)[2];
        }
        currentText = shuffledText + originalText.substring(index + 1);
        setDisplayText(currentText);
        index++;
      } else {
        clearInterval(shuffleText);
        setDisplayText(originalText);
      }
    }, 100); // Adjust interval duration for faster/slower effect
  };

  onMount(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateText();
          observer.disconnect(); // Stop observing after the animation is triggered
        }
      },
      { threshold: 0.25 } // Trigger animation when 50% of the component is visible
    );

    if (elementRef) observer.observe(elementRef);
  });

  onCleanup(() => {
    if (observer) observer.disconnect();
  });

  return (
    <>
      <Style>
        {`
          .shuffle-text {
            display: inline-block;
            overflow: hidden;

          }
        `}
      </Style>
      <span class="shuffle-text" ref={(el) => (elementRef = el)}>
        {displayText()}
      </span>
    </>
  );
};

export default ShuffleText;