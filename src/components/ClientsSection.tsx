import { Style } from "@solidjs/meta"
import { For } from "solid-js"
import ImageContainer from "./ImageContainer"
import { Dark } from "../constants/styles"
import { A } from "@solidjs/router"

const links = [
    {
        url: '',
        icon: 'https://block-wire.com/wp-content/uploads/2024/06/nasdaq-logo-0.png?w=1024'
    },
    {
        url: '',
        icon: 'https://block-wire.com/wp-content/uploads/2024/06/decryptofi-1.jpg?w=800'
    },
    {
        url: '',
        icon: 'https://block-wire.com/wp-content/uploads/2024/06/bc-1.webp?w=496'
    },
    {
        url: '',
        icon: 'https://block-wire.com/wp-content/uploads/2024/06/qtq_29.webp'
    },
    {
        url: '',
        icon: 'https://block-wire.com/wp-content/uploads/2024/06/moon2-logo.webp'
    },
    {
        url: '',
        icon: 'https://block-wire.com/wp-content/uploads/2024/06/bel2-logo-06.png?w=1024'
    },
    {
        url: '',
        icon: 'https://block-wire.com/wp-content/uploads/2024/06/elastos_logo.jpg'
    },
    {
        url: '',
        icon: 'https://block-wire.com/wp-content/uploads/2024/06/qtq_29-8.webp'
    },
    {
        url: '',
        icon: 'https://block-wire.com/wp-content/uploads/2024/06/formidium_logo.jpg'
    },
    {
        url: '',
        icon: 'https://block-wire.com/wp-content/uploads/2024/06/minotaur.jpg'
    },
    {
        url: '',
        icon: 'https://block-wire.com/wp-content/uploads/2024/06/Star_Atlas_Logo.jpg'
    },
    {
        url: '',
        icon: 'https://block-wire.com/wp-content/uploads/2024/06/BitGo_Full_Color_Black.jpg'
    },
    {
        url: '',
        icon: 'https://i0.wp.com/block-wire.com/wp-content/uploads/2024/06/meta-image-1.jpg?w=554&ssl=1 554w, https://i0.wp.com/block-wire.com/wp-content/uploads/2024/06/meta-image-1.jpg?resize=300%2C109&ssl=1 300w'
    },
]

const ClientsSection = () => {
    return (
        <>
        <Style>{`
            .client-section {
                position: relative;
                background-color: White;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                gap: 2rem;
                padding: 2rem;
            }

            .reusable-image-container {
                width: 100px!important;
                & img {
                    width: 100%;
                }
            }
        `}</Style>
            <div class="position-relative bg-white">
            <h1 class="mb-0 text-dark text-center py-5">Our Clients</h1>
            </div>
        <div class="client-section">
        <For each={links}>{link =>
            <A href={link.url}><ImageContainer src={link.icon} alt="Client Logo" />  </A>  
        }</For>
        </div>
        </>
    )
}

export default ClientsSection