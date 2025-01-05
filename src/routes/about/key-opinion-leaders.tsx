import { Style } from "@solidjs/meta";
import { Col, Container, Row } from "solid-bootstrap";
import { Component, createSignal, For, onCleanup, onMount, Show, Suspense } from "solid-js";
import { Headshot1, Headshot2, Headshot3, Headshot4, Headshot5, Headshot6, Headshot7, Headshot8 } from "../../utils/images";
import { css } from "solid-styled-components";
import { useTheme } from "../../context/ThemeContext";
import Preloader from "../../components/preloader/Preloader";
import { A } from "@solidjs/router";

interface KeyOpinionLeader {
  name: string;
  image: string;
  description?: string;
}

const kops: KeyOpinionLeader[] = [
  { name: "Jonathan Reed", image: Headshot1, description: "This is an example description for this person, they are from Nashville and they have done all of these things" },
  { name: "Michael Carter", image: Headshot2 },
  { name: "Christopher Hayes", image: Headshot3 },
  { name: "Andrew Blake", image: Headshot4 },
  { name: "Thomas Sullivan", image: Headshot5 },
  { name: "Daniel Foster", image: Headshot6 },
  { name: "Nicholas Grant", image: Headshot7 },
  { name: "Michael Carter", image: Headshot2 },
  { name: "William Parker", image: Headshot8 },
  { name: "Jonathan Reed", image: Headshot1, description: "This is an example description for this person, they are from Nashville and they have done all of these things" },
  { name: "Michael Carter", image: Headshot2 },
  { name: "Christopher Hayes", image: Headshot3 },
  { name: "Andrew Blake", image: Headshot4 },
  { name: "Thomas Sullivan", image: Headshot5 },
  { name: "Daniel Foster", image: Headshot6 },
  { name: "Nicholas Grant", image: Headshot7 },
  { name: "William Parker", image: Headshot8 },
  { name: "Jonathan Reed", image: Headshot1, description: "This is an example description for this person, they are from Nashville and they have done all of these things" },
  { name: "Michael Carter", image: Headshot2 },
  { name: "Christopher Hayes", image: Headshot3 },
  { name: "Andrew Blake", image: Headshot4 },
  { name: "Thomas Sullivan", image: Headshot5 },
  { name: "Daniel Foster", image: Headshot6 },
  { name: "Nicholas Grant", image: Headshot7 },
  { name: "William Parker", image: Headshot8 },
  { name: "Andrew Blake", image: Headshot4 },
];

interface KeyOpinionLeadersProps {
  admin?: boolean
}

const KeyOpinionLeaders: Component<KeyOpinionLeadersProps> = (props) => {
  const { theme } = useTheme();
  const [imagesLoaded, setImagesLoaded] = createSignal(false);

  onMount(() => {
    const images = kops.map((leader) => new Image());
    let loadedImages = 0;

    images.forEach((img, index) => {
      img.src = kops[index].image;
      img.onload = () => {
        loadedImages++;
        if (loadedImages === images.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        console.error(`Error loading image: ${img.src}`);
        loadedImages++;
        if (loadedImages === images.length) {
          setImagesLoaded(true);
        }
      };
    });
  });

  return (
    <>
      <Style>{`
        .kop-container {
    }
  .headshot-card {
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
    position: relative;
    transition: transform 0.3s ease; /* For hover effect */
    will-change: transform, opacity; /* Hint to the browser for animation optimization */
    & img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    .headshot-overlay {
        position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 0.5rem;
      color: white;
      z-index: 1;
      height: 50px;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      justify-content: center;
      width: 100%;
      transition: height 0.3s ease;
      text-decoration: unset;

      margin: 0;}
    & h6 {
  
      font-weight: bolder;
      text-transform: uppercase;
      text-align: center;
    }

    & p {
    opacity: 0;
    display: none;
    width: 0px;
    transition: opacity 0.3s ease, width 1s ease;
    }

    &:hover {
        .headshot-overlay {
            height: 100%;
        }

        h6 {
            font-size: 2rem;
        }

        p {
            opacity: 1;
            display: block;
            width: 100%;
        }
        cursor: pointer;
    }
    }
    .view-more-button {
    background-color: transparent;
    font-weight: bold;
    font-size: 1.4rem;
        border: 1px solid ${theme().buttonBg};
        color: ${theme().buttonBg};
    }
      `}</Style>
        <Show when={imagesLoaded()} fallback={<Preloader isLoaded={() => false} />}>
          <Container fluid class="kop-container px-0">
            <Row class={css`padding-left: .75rem; padding-right: .75rem;`}>
              <For each={kops}>
                {(leader, i) => (
                  <Col class="col-6 col-md-2 px-0">
                    <div class="headshot-card">
                      <img src={leader.image} alt={leader.name} />
                      <A href={`/about/key-opinion-leaders/${leader.name?.toLowerCase()?.replaceAll(" ", "-")}?id=${i()}`} class="headshot-overlay">
                        <h6 class="mb-0">{leader.name}</h6>
                        <p>{leader.description}</p>
                      </A>
                    </div>
                  </Col>
                )}
              </For>
              <Col class="col-6 col-md-2 px-0 d-flex align-items-center justify-content-center">
                <button class="view-more-button">View More</button>
              </Col>
            </Row>
          </Container>
        </Show>
    </>
  );
};

export default KeyOpinionLeaders;