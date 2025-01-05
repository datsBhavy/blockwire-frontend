import { css } from "solid-styled-components"
import WebBuilder from "./WebBuilder"

const WebBuilderForm = () => {

    return (
        <div classList={{
            [WebBuilderFormClass]: true
        }}>
            <WebBuilder />
        </div>
    )
}

export default WebBuilderForm

const WebBuilderFormClass = css`
    height: 80vh;
`