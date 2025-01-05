import { A, useParams } from "@solidjs/router";
import { Component, createEffect, createResource, For, Show } from "solid-js";
import { Blog } from "./BlogLanding";
import { IoArrowForward } from "solid-icons/io";
import { Col, Modal, Row } from "solid-bootstrap";
import { Style } from "@solidjs/meta";
import { Dark, Light, primaryModalClass, Violet } from "../../constants/styles";
import { useTheme } from "../../context/ThemeContext";
import CategoryHeader from "./CategoryHeader";
import { useAppContext } from "../../context/AppContext";
import { fetchBlogs } from "../../utils/fetcher";
import { Headshot2, RocketFlightPathLandscape } from "../../utils/images";
import CreateBlogForm from "../CreateBlogForm";
import DOMPurify from "dompurify"; // For sanitizing HTML
import PageTransition from "../PageTransition";
import { getRandomHeadshot, getRandomImage } from "../../utils/utils";

export interface ICategory {
  name: string;
  articles: Blog[];
}
interface BlogProps {
  category?: ICategory;
  admin?: boolean;
}

const Blogs: Component<BlogProps> = (props) => {
  const params = useParams();
  const { theme } = useTheme();
  const { showing, setShowing } = useAppContext();

  const [blogs, { refetch }] = createResource(() => fetchBlogs());

  return (
    <>
      {/* <PageTransition /> */}
      
      <Style>{`
        .blog-card {
          border-radius: 10px;
          margin-bottom: 1rem;
          text-decoration: unset;
          color: ${Light};
          height: 100%;

          img {
            width: 100%;
            aspect-ratio: 1/1;
            object-fit: cover;
            border-radius: 10px;
          }

          &:hover {
            text-decoration: underline;
            color: ${Light};
          }
        }

        .article-title {
          display: -webkit-box;
          -webkit-line-clamp: 2; /* Limits to 2 lines for the title */
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 1.5rem;
          font-weight: bold;
          line-height: 1.4;
        }

        .blog-author {
          padding-top: 1rem;
          padding-bottom: 1rem;
          display: flex;
          align-items: center;

          img {
            width: 25px;
            height: 25px;
            object-fit: cover;
            border-radius: 50%;
            margin-right: 1rem;
          }
        }

        .article-tag {
          color: ${theme()?.buttonBg};
        }

        .blog-preview {
          display: -webkit-box;
          -webkit-line-clamp: 3; /* Limits to 3 lines */
          -webkit-box-orient: vertical;
          overflow: hidden; /* Hides overflowing text */
          text-overflow: ellipsis; /* Adds ellipsis (...) for overflow */
          font-size: 1rem;
          line-height: 1.5;
          margin-top: 0.5rem;
        }
      `}</Style>
      <Modal
        class={primaryModalClass(theme)}
        size="lg"
        show={showing.blogForm}
        onHide={() => setShowing("blogForm", false)}
      >
        <CreateBlogForm
          onSubmit={() => {
            setShowing("blogForm", false);
            refetch();
          }}
        />
      </Modal>

      <CategoryHeader
        admin={props.admin}
        category={props.category as ICategory}
        url={`/blog/${props.category?.name
          ?.toLowerCase()
          ?.replaceAll(" ", "-")}/`}
        onClick={(params) => {
          console.log("post blog");
          if (params === "post-blog") {
            setShowing("blogForm", true);
          }
        }}
      />

      <Row>
        <For each={blogs()}>
          {(article) => (
            <Col class="col-12 col-md-4 col-lg-3">
              <A
                href={`/blog/random/${article.url}`}
                class="blog-card"
              >
                <img
                  src={article.image ?? getRandomImage()}
                  alt="Blog Thumbnail"
                />
                <div class="blog-author">
                  <img
                    src={article.author?.image ?? getRandomHeadshot()}
                    alt="Author Thumbnail"
                  />
                  <p class="mb-0">{article.author?.name ?? "Erik Lew"}</p>
                </div>
                <h2 class="article-title">{article.title}</h2>

                <p class="blog-preview">
                  {DOMPurify.sanitize(article?.content || "")
                    .replace(/<\/?[^>]+(>|$)/g, "") // Strip HTML tags
                    .slice(0, 200)}{" "}
                  {/* Adjust character count as needed */}
                </p>

                <div class="d-flex">
                  {article.tags.map((tag) => (
                    <p class="me-3 article-tag">{tag}</p>
                  ))}
                </div>
              </A>
            </Col>
          )}
        </For>
      </Row>
    </>
  );
};

export default Blogs;