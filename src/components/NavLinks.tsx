import { Style } from "@solidjs/meta";
import { Dark, Light } from "../constants/styles";
import { useTheme } from "../context/ThemeContext";
import { A } from "@solidjs/router";

const NavLinks = (props) => {
    const {theme} = useTheme()
    const links = props.links || ["Blog", "Influencers", "Contact"];
  
    return (
      <>
        <Style>
          {`
            .nav-links-container {
              position: absolute;
              top: 0;
              left: 50%;
              transform: translateX(-50%);
              display: flex;
              justify-content: center;
              gap: 2rem;
              padding: 1rem 2rem;
              border-radius: 0 0 10px 10px;
              z-index: 200; /* Ensure it stays on top */
              pointer-events: none;
            }
  
            .nav-link {
              font-size: .9rem;
              color: ${Light};
              text-decoration: none;
              font-weight: 400;
              text-transform: uppercase;
              transition: color 0.3s ease;
              pointer-events: auto;
            }
  
            .nav-link:hover {
              color: ${theme()?.buttonBg};
            }
          `}
        </Style>
        <div class="nav-links-container">
          {links.map((link) => (
            <A href={`/${link.toLowerCase()}`} class="nav-link">
              {link}
            </A>
          ))}
        </div>
      </>
    );
  };

  export default NavLinks