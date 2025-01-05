import { Style } from "@solidjs/meta";
import CategoryHeader from "./CategoryHeader";
import { createResource, For } from "solid-js";
import { dummySlides } from "../../utils/dummyData";
import { Col, Row } from "solid-bootstrap";
import { Light, Violet } from "../../constants/styles";
import { A } from "@solidjs/router";
import { useTheme } from "../../context/ThemeContext";

const FeaturedAuthors = () => {
    const [featuredAuthors] = createResource(() => dummySlides.map(x => ({
        name: x.author.name,
        image: x.author.image
    })))
    const {theme} = useTheme()
    return (
        <>
            <Style>{`
                .author-profile-card {
                text-decoration: unset;
                    color: ${Light};
                    img {
                        width: 100px;
                        aspect-ratio: 1/1;
                        object-fit: cover;
                        border-radius: 50%;
                        border: 1px solid ${Light};
                        margin-bottom: .5rem;
                    }

                    &:hover {
                        color: ${theme()?.buttonBg};
                        text-decoration: underline;
                    }
                }
            `}</Style>
            <CategoryHeader category={{ name: "Featured Authors", articles: [] }} url="/about/key-opinion-leaders/" />

            <Row class="px-0">
            <For each={featuredAuthors()}>{(author, i) =>
                <Col class="px-0">
                    <A href={`/about/key-opinion-leaders/${author.name?.toLowerCase()?.replaceAll(' ', '-')}?id=${i()}`} class="d-flex flex-column align-items-center author-profile-card">
                        <img src={author.image} alt={author.name} />
                        <h6>{author.name}</h6>
                    </A>
                </Col>    
            }</For>
            </Row>
        </>
    );
}

export default FeaturedAuthors