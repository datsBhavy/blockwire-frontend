import { Style } from "@solidjs/meta";
import { Col, Container, Row } from "solid-bootstrap";
import AboutCarousel from "../aboutSection/AboutCarousel";
import FullscreenCarousel from "../fullscreenCarousel/FullScreenCarousel";
import LandingCarousel from "../landing/LandingCarousel";
import { createResource, onMount } from "solid-js";
import { useTheme } from "../../context/ThemeContext";
import { Dark, Violet } from "../../constants/styles";
import { dummyBlogCategory, dummySlide, dummySlide1, dummySlides } from "../../utils/dummyData";
import Carousel from "../TwoColumnCarousel";
import Blogs from "./blogs";
import FeaturedAuthors from "./FeaturedAuthors";
import FeaturedArticle from "./FeaturedArticle";
import PageTransition from "../PageTransition";

export interface Blog {
    title: string;
    description: string;
    tags: string[];
    image: string;
    author?: {
        name: string;
        image: string;
    }
}

const BlogLanding = () => {
    const {theme, setNavbarState} = useTheme()
    const [featuredArticles] = createResource(() => [dummySlide])


    return (
        <>
        <PageTransition />
        <Style>{`
            .blog-landing-container {
            }
            .blog-landing-text-box {
                padding: 75px 100px;
                background-color: ${Dark};
                border-radius: 25px;

                .colored-text {
                    color: ${theme()?.buttonBg};
                    font-weight: bold;
                }
            }

            .subscribe-input {
                input {
                    border: none;
                    border: 1px solid ${theme()?.buttonBg};
                    border-radius: 10px;
                    padding: .5rem 1rem;
                    width: 100%;
                }

                button {
                    border: 1px solid ${theme()?.buttonBg};
                    border-radius: 10px;
                    padding: .5rem 1rem;
                    background-color: ${theme()?.buttonBg};
                    color: white;
                    margin-left: 1rem;
                    font-size: 300!important;
                    font-size: 1rem!important;
                }
            }
        `}</Style>
        <Container class="blog-landing-text-box mb-3">
            <h3>Welcome to Blockwire's blog, write stories that ignite <span class="colored-text">inspiration</span>, <span class="colored-text">knowledge</span>, and <span class="colored-text">entertainment</span></h3>
        </Container>
        <Container class='blog-landing-container px-0'>
            <h5>Featured Articles ({featuredArticles()?.length})</h5>
            <Carousel slides={featuredArticles()} />
        </Container>
        <Container class='blog-landing-container px-0 pt-5'>
            <FeaturedAuthors />
        </Container>

        <Container class='blog-landing-container px-0 pt-5'>
            <Blogs category={dummyBlogCategory} />
        </Container>

        <Container class='blog-landing-container px-0 pt-5'>
            <FeaturedArticle article={dummySlide1 as Blog} />
        </Container>

        <Container class="blog-landing-text-box mb-3">
            <Row class="d-flex align-items-center">
                <Col class="col-12 col-md-6">
                <p>GET FIRST UPDATE</p>
                    <h3>Get the news first by <span class="colored-text">subscribing</span> to our newsletter</h3>
                </Col>
                <Col class="col-12 col-md-6 h-100 ps-lg-5">
                    <div class="d-flex align-items-center subscribe-input">
                    <input type="email" placeholder="Your Email" />
                    <button class="subscribe-button">Subscribe</button>
                    </div>
                </Col>
            </Row>
          
        </Container>

        </>

    );
}
export default BlogLanding