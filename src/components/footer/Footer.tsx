import { Container, Row, Col } from "solid-bootstrap";
import { IoLogoFacebook, IoLogoTwitter, IoLogoInstagram } from "solid-icons/io";
import { useTheme } from "../../context/ThemeContext";
import { Style } from "@solidjs/meta";
import CubeComponent from "../cubeComponent/CubeComponent";
import { css } from "solid-styled-components";
import { Link } from "@solidjs/router";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <>
    <Style>{`
    /* Footer Container */
.site-footer {
  background: ${theme().navbarBg}; /* Dark background */
  color: white; /* Text color */
  padding: 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}
  
  /* Footer Branding */
  .footer-brand h4 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .footer-brand p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  /* Footer Links */
  .footer-links h5 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  .footer-links ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-links li {
    margin-bottom: 0.5rem;
  }
  
  .footer-links a {
    text-decoration: none;
    transition: color 0.3s ease;
    color: ${theme()?.textColor};
  }

  .footer-links a:hover {
    color: ${theme()?.buttonBg}; /* Hover color for footer links */
  }
  
  
  /* Social Media Section */
  .footer-social h5 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  .social-icons {
    display: flex;
    gap: 10px;
  }
  
  .social-icons a {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.8);
    transition: color 0.3s ease;
  }
  
  .social-icons a:hover {
    color: #3498db; /* Hover color for social icons */
  }
  
  /* Bottom Text */
  .footer-bottom {
    font-size: 0.875rem;
    margin-top: 1rem;
  }
  `}</Style>
    <footer
      class="site-footer"
      style={{
        "background-color": theme().navbarBg,
        transition: "background-color 0.5s ease, color 0.5s ease",
      }}
    >
      <Container>
        <Row>
          {/* Branding Section */}
          <Col class="col-12 col-md-4">
          {/* <CubeComponent /> */}

            <div class="footer-brand">
            <Link href="/">
            <img class={css`width: 200px; background-color: black;`} src="https://i0.wp.com/block-wire.com/wp-content/uploads/2024/07/white-bw-logo.png?fit=500%2C255&ssl=1" alt="Blockwire" />
            </Link>

              <p>Designing your digital future.</p>
            </div>
          </Col>

          {/* Navigation Links */}
          <Col class="col-12 col-md-4">
            <div class="footer-links">
              <h5>Quick Links</h5>
              <ul>
                <li>
                  <a href="#services">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#portfolio">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#about" >
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </Col>

          {/* Social Media Section */}
          <Col class="col-12 col-md-4">
            <div class="footer-social">
              <h5>Follow Us</h5>
              <div class="social-icons">
                <a href="https://facebook.com" target="_blank">
                  <IoLogoFacebook />
                </a>
                <a href="https://twitter.com" target="_blank">
                  <IoLogoTwitter />
                </a>
                <a href="https://instagram.com" target="_blank">
                  <IoLogoInstagram />
                </a>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col class="col-12 text-center">
            <p class="footer-bottom">
              © {new Date().getFullYear()} Blockwire All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
    </>
  );
};

export default Footer;