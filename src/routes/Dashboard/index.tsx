import { createEffect, Match, Show, Switch } from "solid-js"
import ProtectedRoute from "../../components/ProtectedRoute"
import { useAppContext } from "../../context/AppContext"
import { useTheme } from "../../context/ThemeContext"
import { Container, Nav } from "solid-bootstrap"
import { Style } from "@solidjs/meta"
import { Abstract, Headshot3 } from "../../utils/images"
import { useLocation, useNavigate } from "@solidjs/router"
import { Violet } from "../../constants/styles"
import Blogs from "../../components/blog/blogs"
import { dummyBlogCategory } from "../../utils/dummyData"
import Influencers from "../influencers"
import { css } from "solid-styled-components"
import KeyOpinionLeaders from "../about/key-opinion-leaders"
import TagInput from "../../components/TagInput"
import { getRandomHeadshot } from "../../utils/utils"

const Dashboard = () => {
    const { user, showing, setShowing } = useAppContext()
    const { theme } = useTheme()
    const location = useLocation()
    const navigate = useNavigate()

    createEffect(() => {
        console.log(user(), location.pathname)
    })

    return (
        <>
            <Style>{`
            .dashboard-container {
                padding-top: 100px;
            }
            .dashboard-cover-section {
                position: relative;
            }
            .dashboard-cover-photo {
                width: 100%;
                height: 150px;
                object-fit: cover;
                background-size: cover;
                margin-top: 1rem;
                box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
                border-radius: 10px;
                background-image: url(${user()?.coverPhoto ?? Abstract});
            }
                .dashboard-profile-content {
                position: relative;
                top: -75px;
                display: flex;
                }
            .dashboard-profile-photo {
                height: 300px;
                width: 300px;
                aspect-ratio: 1/1;
                object-fit: cover;
                border-radius: 10px;
                border: 2px solid ${theme()?.textColor};
                box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
              
            }
                .nav-link {
                    color: ${theme()?.buttonBg};
                     &:hover {
                    color: ${theme()?.buttonBg};
                    }
                }
                .nav-link:active {
                    &:hover {
                    color: ${theme()?.buttonBg};
                    }
                    
                }
                h1 {
                    line-height: 1.2;
                }
                .colored-text {
                    color: ${Violet};
                }
          

                .dashboard-content {
                    position: relative;
                    top: -50px;
                }
        `}</Style>
            <Show when={user()}>
                <Container fluid class="position-relative">
                    <Container fluid class="dashboard-cover-section">
                        <div class="dashboard-cover-photo">
                        </div>
                        <Container class="dashboard-profile-content">
                            <div class="d-flex position-relative w-100">
                                <img class="dashboard-profile-photo" src={user()?.coverPhoto ?? getRandomHeadshot()} alt="cover photo" />
                                <div class="p-3 w-100 h-100 d-flex align-items-end justify-content-between">
                                    <div class="d-flex flex-column">
                                        <h1 class="mb-0">{user()?.firstName} {user()?.lastName}</h1>
                                        <div class="d-flex">
                                            <p class=" me-3">Key Opinion Leader</p>
                                            <Show when={user()?.isBlogger}>
                                                <p class="me-3">Blogger</p>
                                            </Show>
                                            <Show when={user()?.isAdmin}>
                                                <p class=" me-3">Admin</p>
                                            </Show>
                                        </div>
                                        <div class="d-flex">
                                            <button class="primary-button edit-profile-button">Edit Profile</button>
                                        </div>
                                    </div>

                                    <div class="d-flex">
                                        <div class="d-flex flex-column">
                                            <small>Blog Posts</small>
                                            <h2 class="fw-bold mb-0">56</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </Container>

                    <Container class="dashboard-content">

                        <Nav variant="tabs" defaultActiveKey="#">
                            <Nav.Item class="ms-3" onClick={(e) => {
                                e.preventDefault()
                                navigate('/dashboard/')
                            }}>
                                <Nav.Link href="#">Profile</Nav.Link>
                            </Nav.Item>
                            <Show when={user()?.isBlogger}>
                                <Nav.Item onClick={(e) => {
                                    e.preventDefault()
                                    navigate('/dashboard/blogs')
                                }}>
                                    <Nav.Link eventKey="/dashboard/blogs">Blogs</Nav.Link>
                                </Nav.Item>
                            </Show>
                            <Show when={user()?.isAdmin}>
                                <Nav.Item onClick={(e) => {
                                    e.preventDefault()
                                    navigate('/dashboard/influencers')
                                }}>
                                    <Nav.Link eventKey="/dashboard/influencers">Influencers</Nav.Link>
                                </Nav.Item>
                                {/* <Nav.Item onClick={(e) => {
                                    e.preventDefault()
                                    navigate('/dashboard/key-opinion-leaders')
                                }}>
                                    <Nav.Link eventKey="/dashboard/key-opinion-leaders">KOLs</Nav.Link>
                                </Nav.Item> */}
                            </Show>
                            <Nav.Item>
                                <Nav.Link eventKey="disabled" disabled>Followers</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Container>
                    <Switch>
                        {/* <Match when={location.pathname === '/dashboard'}>
                        
                        </Match> */}
                        <Match when={location.pathname === '/dashboard/blogs'}>
                            <Container>
                                <Blogs category={dummyBlogCategory} admin={true} />
                            </Container>
                        </Match>
                        <Match when={location.pathname === '/dashboard/influencers'}>
                            <Container class={css`
                            padding-left: 2rem;
                            padding-right: 2rem;
                                                        margin-bottom: 2rem;

                            `}>
                                <Influencers admin={true} />
                            </Container>
                        </Match>
                        <Match when={location.pathname === '/dashboard/key-opinion-leaders'}>
                            <Container class={css`
                            padding-left: 2rem;
                            padding-right: 2rem;
                                                        margin-bottom: 2rem;

                            `}>
                                <KeyOpinionLeaders admin={true} />
                            </Container>
                        </Match>
                        {/* <Match when={location.pathname === '/dashboard'}>

</Match> */}
                    </Switch>
                </Container>
            </Show>
        </>
    )
}

export default Dashboard