import { Component, createEffect, onMount } from "solid-js"
import CalendlyEmbed from "../components/CalendlyEmbed"
import { useTheme } from "../context/ThemeContext"

interface BookMeetingProps {
    admin?: boolean
}

const BookMeeting: Component<BookMeetingProps> = (props) => {
    const {theme, setNavbarState} = useTheme()
    onMount(() => {
        setNavbarState('light')
    })
    return (
        <>
            <div>
                <CalendlyEmbed />
            </div>
        </>
    )
}

export default BookMeeting