import { Container } from "solid-bootstrap"
import UserProfile from "../../components/profile/Profile"
import { Style } from "@solidjs/meta"
import { onMount } from "solid-js"
import { useTheme } from "../../context/ThemeContext"

const Profile = () => {
    const {setNavbarState} = useTheme()

    return (
        <>
        <Style>{`
            padding-top: 100px;
        `}</Style>
        <Container>
            <UserProfile />
        </Container>
        </>
    )
}
export default Profile