import { onMount } from "solid-js";
import { Style } from "@solidjs/meta";
import gsap from "gsap";
import CubeComponent from "./cubeComponent/CubeComponent";
import { useTheme } from "../context/ThemeContext";

const FloatingButtons = (props) => {
  const buttonRefs = [];
  const buttons = props.buttons || ["Button 1", "Button 2", "Button 3", "Button 4"];
  const directions = []; // Tracks each button's direction as {x: 1 or -1, y: 1 or -1}

  const detectCollision = (button, index) => {
    const container = button.parentElement;
    const rect = button.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Check collision with container edges
    if (rect.left <= containerRect.left) {
      directions[index].x = 1; // Move right
    }
    if (rect.right >= containerRect.right) {
      directions[index].x = -1; // Move left
    }
    if (rect.top <= containerRect.top) {
      directions[index].y = 1; // Move down
    }
    if (rect.bottom >= containerRect.bottom) {
      directions[index].y = -1; // Move up
    }

    // Check collision with other buttons
    buttonRefs.forEach((otherButton, otherIndex) => {
      if (index !== otherIndex) {
        const otherRect = otherButton.getBoundingClientRect();

        const dx = rect.left + rect.width / 2 - (otherRect.left + otherRect.width / 2);
        const dy = rect.top + rect.height / 2 - (otherRect.top + otherRect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        const minDistance = (rect.width + otherRect.width) / 2;

        if (distance < minDistance) {
          // Adjust directions to repel the buttons
          directions[index].x = dx > 0 ? 1 : -1;
          directions[index].y = dy > 0 ? 1 : -1;
          directions[otherIndex].x = dx > 0 ? -1 : 1;
          directions[otherIndex].y = dy > 0 ? -1 : 1;

          // Move buttons slightly apart
          gsap.set(button, { x: `+=${directions[index].x * 5}`, y: `+=${directions[index].y * 5}` });
          gsap.set(otherButton, { x: `+=${directions[otherIndex].x * 5}`, y: `+=${directions[otherIndex].y * 5}` });
        }
      }
    });
  };

  const moveButton = (button, index) => {
    const speed = 0.5 + Math.random(); // Random speed between 0.5 and 1.5
    const move = () => {
      gsap.to(button, {
        x: `+=${directions[index].x * speed}`,
        y: `+=${directions[index].y * speed}`,
        duration: 0.02,
        onUpdate: () => detectCollision(button, index),
        onComplete: move,
      });
    };
    move();
  };

  const { theme } = useTheme();

  onMount(() => {
    buttonRefs.forEach((button, index) => {
      // Set initial random position
      gsap.set(button, {
        x: Math.random() * (button.parentElement.offsetWidth - button.offsetWidth),
        y: Math.random() * (button.parentElement.offsetHeight - button.offsetHeight),
        transform: "translate(-50%, -50%)",
      });

      // Assign initial random direction
      directions[index] = { x: Math.random() < 0.5 ? -1 : 1, y: Math.random() < 0.5 ? -1 : 1 };

      // Start movement
      moveButton(button, index);
    });
  });

  return (
    <>
      <Style>
        {`
          .floating-buttons-container {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .floating-button {
            position: absolute;
            z-index: 100;
            background-color: transparent;
            color: ${theme()?.buttonBg1};
            border: 1px solid ${theme()?.buttonBg1}!important;
            border-radius: 4px!important;
            cursor: pointer;
            transition: background-color 0.3s ease;
            white-space: nowrap;
            display: flex;
            align-items: center;
          }

          .floating-button:hover {
            background-color: ${theme()?.hoverColor};
          }
        `}
      </Style>
      <div class="floating-buttons-container">
        {buttons.map((buttonText, index) => (
          <button
            ref={(el) => (buttonRefs[index] = el)}
            class="floating-button"
          >
            <div class="me-3"><CubeComponent class="my-0" size={20} /></div> {buttonText}
          </button>
        ))}
      </div>
    </>
  );
};

export default FloatingButtons;