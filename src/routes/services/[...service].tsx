import { Style } from "@solidjs/meta"
import { useLocation, useParams } from "@solidjs/router"
import { Container } from "solid-bootstrap"
import { createEffect } from "solid-js"
import { css } from "solid-styled-components"
import Breadcrumb from "~/components/Breadcrumb"
import { useTheme } from "~/context/ThemeContext"

const ServiceDetails = () => {
    const location = useLocation()
    const params = useParams()
    const {theme} = useTheme()

    createEffect(() => {
        console.log(location.pathname, params.service)
    })
    return (
        <>
        <ServiceDetailsStyles />
        <main classList={{
            "service-detail-container": true,
            [css`
                background-color: ${theme()?.backgroundColor};    
            `]: true
        }}>
        <Container>
        <Breadcrumb />
        </Container>
        </main>
        </>
    )
}

export default ServiceDetails

const ServiceDetailsStyles = () => {
    
    return (
        <Style>{`
            .service-detail-container {
                min-height: 100vh;
            }    
        `}</Style>
    )
}