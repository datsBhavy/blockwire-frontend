import { VoidComponent } from "solid-js";
import { Col, Container, Row } from "solid-bootstrap";
import DetailBullet from "../components/DetailBullet";
import { Style } from "@solidjs/meta";
import LogInForm from "../components/LogInForm";
import { useAppContext } from "../context/AppContext";

const LogIn: VoidComponent = () => {
    const {setShowing} = useAppContext()
    return (
        <>
        <Style>{`
            .sign-up-container {
                padding-top: 100px;
            }
        `}</Style>
        <Container class="sign-up-container">
        <Row>
            <Col class="col-12 col-md-2">
                <DetailBullet text="Log In" />
            </Col>
            <Col class="col-12 col-md-5">
            <LogInForm  onLogin={() => setShowing('loginForm', false)}/></Col>
            <Col class="col-12 col-md-5"></Col>
    
        </Row>
        </Container>
        
        </>

    )
}

export default LogIn