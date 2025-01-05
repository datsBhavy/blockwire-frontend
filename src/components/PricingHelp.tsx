import { Component, JSX } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Style } from "@solidjs/meta";
import { useTheme } from "../context/ThemeContext";

interface PricingHelpProps {
  classList?: string; // Allow custom classes
}

const PricingHelp: Component<PricingHelpProps> = (props) => {
  const navigate = useNavigate();
  const {theme} = useTheme();

  return (
    <>
      <Style>{`
        .help-pricing-container {
          font-family: 'Inter', sans-serif; /* Replace with your preferred font */
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 4rem;
          font-size: 1.2rem;
          font-weight: 400;
          text-align: center;
          background: ${theme()?.backgroundColor};
          color: ${theme()?.textColor};
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease, box-shadow 0.3s ease;
        }

        .contact-link {
          cursor: pointer;
          transition: color 0.3s ease, transform 0.2s ease;
        }

        .contact-link:hover {
          color: #e67e22; /* Link hover color */
          transform: scale(1.05); /* Subtle hover effect */
        }
      `}</Style>

      <div class={`help-pricing-container ${props.classList ?? ""}`}>
        <span>Need help with pricing?</span>
        <a
          class="contact-link"
          onClick={(e) => {
            e.preventDefault();
            navigate("/contact"); // Navigate to the contact page
          }}
        >
          Contact Us
        </a>
      </div>
    </>
  );
};

export default PricingHelp;