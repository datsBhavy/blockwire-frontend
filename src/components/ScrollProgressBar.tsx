import { createSignal, onCleanup, onMount } from "solid-js";
import { Style } from "@solidjs/meta";
import gsap from "gsap";

const ScrollProgressBar = (props) => {
  const [progress, setProgress] = createSignal(0);

  onMount(() => {
    if (props.scrollTrigger) {
      const updateProgress = () => {
        const currentProgress = props.scrollTrigger?.progress || 0;
        setProgress(currentProgress);
      };

      props.scrollTrigger?.eventCallback?.("onUpdate", updateProgress);

      return onCleanup(() => {
        props.scrollTrigger?.eventCallback?.("onUpdate", null);
      });
    }
  });

  return (
    <>
      <Style>
        {`
          .progress-bar {
            width: 100%;
            height: 5px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 5px;
            overflow: hidden;
            position: relative;
          }

          .progress-bar-fill {
            height: 100%;
            background: #75e1ff; /* Adjust as per theme */
            transition: width 0.1s ease-out;
          }
        `}
      </Style>
      <div class="progress-bar">
        <div
          class="progress-bar-fill"
          style={{ width: `${progress() * 100}%` }}
        ></div>
      </div>
    </>
  );
};

export default ScrollProgressBar;