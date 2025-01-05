import { Style, Title } from "@solidjs/meta";
import { onMount, VoidComponent } from "solid-js";
import AboutRoute from "./about";
import LargeTextLanding from "~/components/LargeTextLanding";
import { useTheme } from "~/context/ThemeContext";
import { Container } from "solid-bootstrap";
import GradientText from "~/components/gradientText/GradientText";

const Projects: VoidComponent = (props) => {
    const { theme } = useTheme()

    return (
        <>
            <Title>Maerik - Projects</Title>
            <Style>{`
        .large-text-landing-container {
          background-color: ${theme()?.backgroundColor};
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;

          @media (max-width: 776px) {
            padding: 1rem;
          }
        }
      `}</Style>
            <section style={{
                "background-color": theme().backgroundColor,
                "color": theme().textColor
            }}>
                <Container class="large-text-landing-container">
                    {props.children}
                </Container>
            </section>
        </>
    )
}

export default Projects