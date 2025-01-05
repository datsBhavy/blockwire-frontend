import { Style } from "@solidjs/meta"
import { Component } from "solid-js"
import { useTheme } from "../context/ThemeContext"
import { Turquoise } from "../constants/styles"

interface DetailBulletProps {
    text?: string
}

const DetailBullet: Component<DetailBulletProps> = (props) => {
    const {theme} = useTheme()
    return (
        <>
        <Style>{`
        .bullet {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: ${theme()?.buttonBg};
        }
        .detail-bullet-text {
            color: ${theme().textColor};
            opacity: 1!important;
        }
        `}</Style>
        <div class="d-flex align-items-center mb-5">
            <div class="bullet me-3"></div>
            <p class="mb-0 detail-bullet-text">{props.text}</p>
        </div></>

    )
}

export default DetailBullet