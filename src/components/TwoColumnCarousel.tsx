import { Component } from "solid-js";
import { Headshot1, LunarEclipseLandscape } from "../utils/images";
import { Col, Row } from "solid-bootstrap";
import { Style } from "@solidjs/meta";
import { useTheme } from "../context/ThemeContext";
import { dummySlide } from "../utils/dummyData";

interface Slide {
    title: string;
    description: string;
    tags: string[];
    image: string;
    author?: {
        name: string;
        image: string;
    }
}



interface CarouselProps {
    slides?: Slide[];
}

const Carousel: Component<CarouselProps> = (props) => {
    const {theme} = useTheme()
    return (
        <>
        <Style>{`
            .carousel-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 25px;
            }

            .carousel-author-image {
                width: 25px;
                height: 25px;
                object-fit: cover;
                border-radius: 50%;
            }
            .carousel-author-name {
                color: ${theme().textColor};
                line-height: 1rem;
                font-weight: 300;
            }

            .featured-article-content {
                padding-left: 2rem;
                padding-right: 2rem;
            }
        `}</Style>
        <Row>
            <Col class="col-12 col-md-5">
            <img class="carousel-image" src={dummySlide.image} />
            </Col>
            <Col class="col-12 col-md-7">
                <div class="featured-article-content">
                <div class="d-flex align-items-center">
                    <img class="carousel-author-image me-3" src={dummySlide.author.image}/>
                    <p class="carousel-author-name mb-0">{dummySlide.author.name}</p>
                </div>
                <h1>{dummySlide.title}</h1>
                <p>{dummySlide.description}</p>
                <div class="d-flex">
                    {dummySlide.tags.map(tag => (
                        <p class="me-3 article-tag">{tag}</p>
                    ))}

                </div>
                </div>
            </Col>
        </Row>
        </>
    )
}

export default Carousel