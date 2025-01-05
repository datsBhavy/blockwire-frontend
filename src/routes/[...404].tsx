import { A } from "@solidjs/router";
import { Style } from "@solidjs/meta";
import { Container } from "solid-bootstrap";
import { useTheme } from "../context/ThemeContext";
import Breadcrumb from "../components/Breadcrumb";
import CubeComponent from "../components/cubeComponent/CubeComponent";

export default function NotFound() {
  const { theme } = useTheme();

  return (
    <>
      <Style>{`
        .not-found-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100vh;
          background-color: ${theme().backgroundColor};
          color: ${theme().textColor};
          text-align: center;
        }

        .not-found-heading {
          font-size: 6rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: ${theme().textColor}; /* Use a theme color for emphasis */
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        }

        .not-found-message {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          color: ${theme().textColor};
        }

        .home-link {
          padding: 0.8rem 1.5rem;
          font-size: 1.2rem;
          font-weight: bold;
          color: ${theme().buttonText};
          background-color: ${theme().buttonBg};
          text-decoration: none;
          border: 2px solid ${theme().buttonText};
          border-radius: 5px;
          transition: all 0.3s ease;
        }

        .home-link:hover {
          background-color: ${theme().buttonText};
          color: ${theme().buttonBg};
          text-decoration: none;
        }

        .not-found-illustration {
          max-width: 400px;
          margin-bottom: 2rem;
        }
          .random-test-class {
            color: red;
          }
      `}</Style>

      <div class="not-found-container">
       <Container>
        <Breadcrumb />
         {/* Illustration */}
         <CubeComponent />

{/* Error Message */}
<h1 class="not-found-heading">Oops! 404</h1>
<p class="not-found-message">
  We can't seem to find the page you're looking for.
</p>

{/* Return Home Button */}
<A href="/" class="home-link">
  Return Home
</A>
       </Container>
      </div>
    </>
  );
}