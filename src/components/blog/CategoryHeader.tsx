import { css } from "solid-styled-components"
import { Violet } from "../../constants/styles"
import { Show } from "solid-js"
import { ICategory } from "./blogs"
import { IoAdd, IoArrowForward } from "solid-icons/io"
import { A } from "@solidjs/router"
import { useAppContext } from "../../context/AppContext"

const CategoryHeader = (props: { admin?: boolean; category: ICategory, url?: string; onClick?: (category: ICategory | 'post-blog') => void }) => {
    const {showing, setShowing}= useAppContext()
    return (
        <div class="d-flex w-100 justify-content-between align-items-center mb-4">
            <h1 class="mb-0">{props.admin ? 'Your Blogs (56)' : props.category?.name}</h1>
            <Show when={props.url && !props.admin}>
                <A href={props.url as string} class="primary-link-button" onClick={() => props.onClick?.(props.category)}>See All <IoArrowForward /></A>
            </Show>
            <Show when={props.admin}>
                <button  onClick={(e) => {
                    e.preventDefault()
                    props.onClick?.('post-blog')
                }} class="secondary-button"><IoAdd class="me-2" /> Post Blog</button>
            </Show>
        </div>
    )
}

export default CategoryHeader