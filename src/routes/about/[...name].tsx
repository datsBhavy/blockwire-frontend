import { Style } from "@solidjs/meta"
import { useNavigate, useParams, useSearchParams } from "@solidjs/router"
import { Col, Container, Modal, Row } from "solid-bootstrap"
import { createEffect, createResource, onMount, Show } from "solid-js"
import { Headshot1 } from "../../utils/images"
import { useTheme } from "../../context/ThemeContext"
import { useAppContext } from "../../context/AppContext"
import { primaryModalClass } from "../../constants/styles"
import InfluencerForm from "../../components/InfluencerForm"
import { IoClipboardOutline, IoPersonAddOutline, IoReaderOutline, IoTrashBin } from "solid-icons/io"
import { deleteInfluencer, fetchInfluencerById } from "../../utils/fetcher"
import DOMPurify from "dompurify"; // For sanitizing HTML
import InstagramFeed from "../../components/InstagramFeed"


const InfluencerDetails = (props) => {
    const {theme, setNavbarState} = useTheme()
    const {user, showing, setShowing} = useAppContext()
    const params = useParams()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [leaderDetails, {refetch}] = createResource(() => ({
        name: params.name,
        id: String(searchParams.id)
    }), async ({name, id}) => {
        const influencer = await fetchInfluencerById(id)
        if (influencer) {
            return influencer
        }
        return {
            name: name?.replaceAll('-', ' '),
            image: Headshot1,
        }
    })

    createEffect(() => {
        console.log(user(), leaderDetails())
    })

    function handleDelete() {
        deleteInfluencer(leaderDetails()?._id).then((data) => {
            if (data) {
                setShowing('deleteInfluencerConfirmation', false)
                window.history.back()
                // navigate to previous screen
            }
        })
    }

    return(
        <>
        <Style>{`
        .leader-details-container {

            height: 100vh;

            .leader-details-img-wrapper {
                max-width: 400px;
                  aspect-ratio: 1 / 1;
                margin: 0 auto;
            }
            .modal-title {
                color: ${theme()?.textColor}!important;
            }
            .leader-details-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 8px;
                border: 1px solid ${theme()?.buttonBg1};
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }
        }
        `}</Style>
                 <Modal size="lg" class={primaryModalClass(theme)} show={showing.influencerForm} onHide={() => setShowing('influencerForm', false)}>
                  <InfluencerForm influencer={leaderDetails()} onSubmit={() => {
                    setShowing('influencerForm', false)
                    refetch()
                  }} />
                </Modal>
                 <Modal size="sm" class={primaryModalClass(theme)} show={showing.deleteInfluencerConfirmation} onHide={() => setShowing('deleteInfluencerConfirmation', false)}>
                    <Modal.Header>
                        <Modal.Title>Delete Influencer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete {leaderDetails()?.name}?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button class="secondary-button" onClick={() => setShowing('deleteInfluencerConfirmation', false)}>Cancel</button>
                        <button class="primary-button" onClick={handleDelete}>Delete</button>
                    </Modal.Footer>
                </Modal>
        <div class="leader-details-container">
            <Container class="pt-5">
                <Row>
                    <Col class="col-12 col-md-6">
                        <div class="leader-details-img-wrapper">
                        <img class="leader-details-img" src={leaderDetails()?.image ?? Headshot1} alt={leaderDetails()?.name} />
                        </div>
                    </Col>
                    <Col class="col-12 col-md-6">
                    <h1>{leaderDetails()?.name}</h1>
                        <div class="d-flex mb-3">
                        <Show when={user()?.isAdmin}>
                            <button class="secondary-color-button me-2" onClick={() => setShowing('influencerForm', true)}><IoReaderOutline class='me-2' />Edit</button>
                            <button class="secondary-color-button me-2" onClick={() => setShowing('deleteInfluencerConfirmation', true)}><IoTrashBin class="me-2"/> Delete</button>
                        </Show>
                        </div>
                        {/* <p>{leaderDetails()?.description}</p> */}
                        <div
            class="influencer-content"
            innerHTML={DOMPurify.sanitize(leaderDetails()?.description || "")}
          ></div>
                    </Col>
                  <Col class="col-12">
                    <InstagramFeed />
                    </Col>
                </Row>
                
            
            </Container>
        </div></>

    )
}

export default InfluencerDetails