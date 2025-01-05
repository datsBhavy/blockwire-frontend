import { Component } from "solid-js"
import Blogs, { ICategory } from "./blogs"
import FeaturedArticle from "./FeaturedArticle"
import { dummySlide } from "../../utils/dummyData"

interface BlogCategoryProps {
    category: ICategory
}

const BlogCategory: Component<BlogCategoryProps> = (props) => {
    return (
        <div>
            <h1>{props.category.name}</h1>
            <Blogs category={props.category} />
            <FeaturedArticle article={dummySlide} />
        </div>
    )
}

export default BlogCategory