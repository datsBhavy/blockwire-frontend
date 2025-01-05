import { Style } from "@solidjs/meta";
import { useParams, useSearchParams } from "@solidjs/router";
import { Container, Modal } from "solid-bootstrap";
import { createEffect, createResource, onMount, Show } from "solid-js";
import { fetchBlogById } from "../../utils/fetcher";
import DOMPurify from "dompurify"; // For sanitizing HTML
import { Dark, Light, primaryModalClass } from "../../constants/styles";
import { RocketFlightPathLandscape, SpaceShipVentsSquare } from "../../utils/images";
import { getRandomImage } from "../../utils/utils";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import CreateBlogForm from "../CreateBlogForm";

const Blog = () => {
  const params = useParams();
  const {theme, setNavbarState} = useTheme()
  const {user, showing, setShowing} = useAppContext()
  const [searchParams, setSearchParams] = useSearchParams();
  const [blog, {refetch}] = createResource(() => searchParams.id, fetchBlogById);


  return (
    <>
      <Style>{`
        .blog-container {
          margin-bottom: 100px;
          color: ${Light};
        }
        .blog-content {
          font-family: Arial, sans-serif;
          line-height: 1.6;
        }
          
        .blog-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          object-position: center;
          margin-bottom: 2rem;
          border-radius: 8px;
        }
      `}</Style>
            <Modal
        class={primaryModalClass(theme)}
        size="lg"
        show={showing.blogForm}
        onHide={() => setShowing("blogForm", false)}
      >
        <CreateBlogForm
          blog={blog()}
          onSubmit={() => {
            setShowing("blogForm", false);
            refetch()
          }}
        />
      </Modal>
      <Container class="blog-container">
        <div>
          <img class="blog-image" src={blog()?.image ?? getRandomImage()} alt={blog()?.title} />
          <h1>{blog()?.title}</h1>
          <p class="mb-5">By: <b>{blog()?.author?.firstName} {blog()?.author?.lastName}</b></p>
          <div
            class="blog-content"
            innerHTML={DOMPurify.sanitize(blog()?.content || "")}
          ></div>
            <Show when={user()?.isAdmin}>
            <button onClick={() => setShowing('blogForm', true)} class="secondary-color-button">Edit</button>
          </Show>
        </div>
      </Container>
    </>
  );
};

export default Blog;