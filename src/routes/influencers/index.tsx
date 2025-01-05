import { Style } from "@solidjs/meta";
import { Col, Container, Modal, Row } from "solid-bootstrap";
import { Component, createEffect, createResource, createSignal, For, onCleanup, onMount, Show, Suspense } from "solid-js";
import { Headshot1, Headshot2, Headshot3, Headshot4, Headshot5, Headshot6, Headshot7, Headshot8 } from "../../utils/images";
import { css } from "solid-styled-components";
import { useTheme } from "../../context/ThemeContext";
import Preloader from "../../components/preloader/Preloader";
import { A, useLocation } from "@solidjs/router";
import { createInfluencer, fetchAllInfluencers } from "../../utils/fetcher";
import { useAppContext } from "../../context/AppContext";
import InfluencerForm from "../../components/InfluencerForm";
import { primaryModalClass } from "../../constants/styles";
import DOMPurify from "dompurify"; // For sanitizing HTML
import { getRandomHeadshot } from "../../utils/utils";


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

interface InfluencersProps {
    admin?: boolean
}

const Influencers: Component<InfluencersProps> = (props) => {
    const { theme } = useTheme();
    const location = useLocation()
    const [imagesLoaded, setImagesLoaded] = createSignal(false);
    const [loading, setLoading] = createSignal<boolean>(true)

    const [influencers, { refetch }] = createResource(async () => {
        setLoading(true)
        const influencers = await fetchAllInfluencers()
        setLoading(false)
        return influencers
    })
    const { user, showing, setShowing } = useAppContext()

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
            <Modal size="lg" class={primaryModalClass(theme)} show={showing.influencerForm} onHide={() => setShowing('influencerForm', false)}>
                <InfluencerForm onSubmit={() => {
                    refetch()
                    setShowing('influencerForm', false)
                }} />
            </Modal>

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

    & .influencer-description {
      max-width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 3; /* Limit to 3 lines */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      opacity: 0;
      display: none;
      transition: opacity 0.3s ease;
    }

    &:hover {
        .headshot-overlay {
            height: 100%;
        }

        h6 {
            font-size: 2rem;
        }

        .influencer-description {
            opacity: 1;
            display: block;
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
                    <Row classList={{
                        [css`padding-left: .75rem; padding-right: .75rem;`]: true,
                    }}>
                        <Col class="col-12">
                            <Show when={props.admin}>
                                <div classList={{
                                    'd-flex justify-content-between w-100 mb-5': true
                                }}>
                                    <div>
                                        <h2 class="mb-0 fw-bold">
                                            Influencers ({influencers()?.length ?? 0} results)
                                        </h2>
                                    </div>
                                    <button class="secondary-button" onClick={() => setShowing('influencerForm', true)}>
                                        Create Influencer
                                    </button>
                                </div>
                            </Show>
                        </Col>
                        <For each={influencers() ?? []}>
                            {(leader, i) => (
                                <Col class="col-6 col-md-2 px-0 headshot-card-col">
                                    <div classList={{
                                        "headshot-card": true,

                                    }}>
                                        <img src={(leader.profileImage?.length ?? 0) > 0 ? leader.profileImage : getRandomHeadshot()} alt={leader.name} />
                                        <A href={`${location.pathname}/${leader.name?.toLowerCase()?.replaceAll(" ", "-")}?id=${leader?._id}`} class="headshot-overlay">
                                            <h6 class="mb-0">{leader.name}</h6>

                                            <div
                                                class="influencer-description"
                                                innerHTML={DOMPurify.sanitize(leader.description || "")}
                                            ></div>
                                            
                                        </A>
                                    </div>
                                </Col>
                            )}
                        </For>
                    </Row>


                </Container>
            </Show>
        </>
    );
};

export default Influencers;