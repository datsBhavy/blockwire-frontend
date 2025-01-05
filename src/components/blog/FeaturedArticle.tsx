import { Component } from "solid-js";
import { Blog } from "./BlogLanding";
import { Style } from "@solidjs/meta";
import CategoryHeader from "./CategoryHeader";
import { dummyBlogCategory, dummyEditorCategory } from "../../utils/dummyData";

interface FeaturedArticleProps {
    article: Blog
}


const FeaturedArticle: Component<FeaturedArticleProps> = (props) => {
    return (
        <>
            <Style>{`
            .featured-article-wrapper {
            height: 60vh;
            position: relative;
            overflow: hidden;
            border-radius: 25px;
                & .article-background-image {
                    width: 100%;
                    object-fit: cover;
                }

                & .featured-article-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.5);
                    display: flex;
                    justify-content: end;
                    align-items: start;
                    flex-direction: column;
                    color: white;
                    font-size: 2rem;
                    font-weight: bold;
                    z-index: 50;
                    padding: 2rem;

                    & .author-name {
                        font-size: 1.5rem;
                        font-weight: normal;
                    }
                    
                    & .article-profile-icon {
                        width: 25px;
                        height: 25px;
                        border-radius: 50%;
                        object-fit: cover;
                        margin-right: 1rem;
                    }

                    & .article-description, .article-tag {
                        font-size: 1rem;
                        font-weight: 300;
                    }
                        
                }
            }

        `}</Style>
            <CategoryHeader category={dummyBlogCategory} url={`/blog/${dummyEditorCategory.name?.toLowerCase()?.replaceAll(' ', '-')}/${dummyBlogCategory.articles[0]?.title?.toLowerCase()?.replaceAll(' ', '-')}/`} />
            <div class="featured-article-wrapper mb-5">
                <img class="article-background-image" src={props.article.image} />
                <div class="featured-article-overlay">
                    <div class="d-flex align-items-center">
                        <img src={props.article.author?.image} class="article-profile-icon" />
                        <p class="author-name mb-0">{props.article.author?.name}</p>
                    </div>
                    <h1>{props.article.title}</h1>
                    <p class="article-description">{props.article.description}</p>
                    <div class="d-flex">
                    {
                        props.article.tags.map(tag => (
                            <p class="article-tag me-3 mb-0">{tag}</p>
                        ))
                    }
                    </div>
                </div>
            </div>
        </>
    );
}
export default FeaturedArticle