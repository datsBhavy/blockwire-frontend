import { createSignal, onMount, onCleanup } from "solid-js";
import { gsap } from "gsap";
import { css } from "solid-styled-components";
import { Dark } from "../constants/styles";
import { useTheme } from "../context/ThemeContext";

const RotatingDisplay = (props) => {
  const {theme} = useTheme()
  const [currentIndex, setCurrentIndex] = createSignal(0);
  let container;

  const showNext = () => {
    gsap.timeline()
      .to(container, { opacity: 0, duration: 0.5 }) // Fade out
      .call(() => {
        setCurrentIndex((prev) => (prev + 1) % props.data.length); // Update the current index
      })
      .to(container, { opacity: 1, duration: 0.5 }); // Fade in
  };

  let interval;
  onMount(() => {
    interval = setInterval(showNext, 8000); // Change every 3 seconds
  });

  onCleanup(() => {
    clearInterval(interval); // Cleanup interval on unmount
  });

  return (
    <div
      ref={container}
      style={{
        display: "flex",
        "flex-direction": "column",
        "align-items": "flex-end",
        height: "100%",
        "text-align": "right",
      }}
      classList={{
        [props.class ?? '']: true,
        'rotating-display-container': true
      }}
    >
      <small
        class={css`
          font-size: 14px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3; /* Limit to 3 lines */
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          line-height: 1.5em; /* Adjust based on desired line spacing */
          max-height: calc(1.5em * 3); /* 3 lines of text */
        `}
      >
        <b>{props.data[currentIndex()].title}</b>
      </small>
      <small
        class={css`
          font-size: 12px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3; /* Limit to 3 lines */
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          line-height: 1.5em; /* Adjust based on desired line spacing */
          max-height: calc(1.5em * 3); /* 3 lines of text */
        `}
      >
        {props.data[currentIndex()].description}
      </small>
      {props.data[currentIndex()].button && (
              <button
            classList={props.data[currentIndex()].button.classList ?? {
              "secondary-color-button": true,
              [css`
                border: 1px solid ${Dark}!important;
                color: ${Dark}!important;
                border-radius: 8px!important;
            
              `]: true,
            }}
          >
            {props.data[currentIndex()].button.text}
          </button>
      )}
    </div>
  );
};

export default RotatingDisplay;