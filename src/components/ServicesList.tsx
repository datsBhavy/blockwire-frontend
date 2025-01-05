import { Component, For, JSX, Show } from "solid-js";
import { Col, Row, Container } from "solid-bootstrap";
import { Style } from "@solidjs/meta";
import { css } from "solid-styled-components";
import { useTheme } from "../context/ThemeContext";

interface Service {
  title: string;
  content: string;
  element?: JSX.Element;
  onClick: () => void;
}

interface ServicesListProps {
  services: Service[];
}

const ServicesList: Component<ServicesListProps> = (props) => {
  const { theme } = useTheme();

  return (
    <>
      <Style>{`
        .service-card {
          border: none;
          color: #000;
          padding: 20px;
          text-align: center;
          border-radius: 0px;
          transition: transform 0.3s ease all;
          background-color: ${theme().backgroundColor};
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .service-card:hover {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .service-card h3 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 10px;
          color: ${theme().textColor};
        }

        .service-card p {
          font-size: 1rem;
          color: ${theme().textColor};
        }

        .cards-row {
          display: flex;
          justify-content: space-between;
          gap: 0; /* Space between columns */
          flex-wrap: wrap; /* Ensure cards stack on smaller screens */
        }
      `}</Style>
      <Container>
        <Row class="cards-row">
          <For each={props.services}>
            {(service) => (
              <Col class="col-12 col-md-4">
                <div class="gradient-border">
                  <button
                    class="service-card"
                    onClick={service.onClick}
                    classList={{
                      [css`background-color: ${theme().backgroundColor};`]: true,
                    }}
                  >
                    <Show when={service.element}>
                        {service.element}
                    </Show>
                    <h3>{service.title}</h3>
                    <p>{service.content}</p>
                  </button>
                </div>
              </Col>
            )}
          </For>
        </Row>
      </Container>
    </>
  );
};

export default ServicesList;