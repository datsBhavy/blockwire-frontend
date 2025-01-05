import { createSignal } from "solid-js";
import { Style } from "@solidjs/meta";

const ImageContainer = (props) => {
  return (
    <>
    <Style>{`
    .reusable-image-container {
  position: relative;
  width: 100%; /* Adjust as needed */
  height: 100%; /* Adjust as needed */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reusable-image-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  mix-blend-mode: var(--blend-mode); /* Apply blend mode dynamically */
  z-index: 1;
}

.reusable-image {
  position: relative;
  width: 100%;
  height: auto;
  z-index: 0; /* Ensure it is behind the pseudo-element */
}
    `}</Style>
    <div
      class="reusable-image-container"
      style={{

      }}
    >
      <img src={props.src} alt={props.alt || "Image"} class="reusable-image" />
    </div>
    </>
  );
};

export default ImageContainer;