import { Container } from "solid-bootstrap"
import BlogCategory from "../../components/blog/BlogCategory"
import { dummyBlogCategory } from "../../utils/dummyData"

const Category = () => {
    const category = dummyBlogCategory
    return (
        <Container>
            <BlogCategory category={dummyBlogCategory} />
        </Container>
    )
}

export default Category