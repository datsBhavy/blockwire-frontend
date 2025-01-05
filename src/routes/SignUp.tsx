import { createSignal, Show, VoidComponent } from "solid-js";
import SignUpForm from "../components/SignUpForm";
import { Col, Container, Row } from "solid-bootstrap";
import DetailBullet from "../components/DetailBullet";
import { Style } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { css } from "solid-styled-components";
import { Dark, DarkerPurple, DarkPurple, Turquoise, Violet } from "../constants/styles";
import LogInForm from "../components/LogInForm";
import CoinSection from "../components/CoinSection";
import { useTheme } from "../context/ThemeContext";

const SignUp: VoidComponent = () => {
    const {theme} = useTheme()
    const [showingForm, setShowingForm] = createSignal<'login' | 'signup'>('signup')
    return (
        <>
            <Style>{`
            .sign-up-container {
                padding-top: 1rem;                 
            }

            .sign-up-wrapper {
                background-color: ${theme()?.backgroundColor};
                border-radius: 0px;
            }
        `}</Style>
            {/* <CoinSection /> */}
            <Container fluid class="sign-up-container mb-3">
                <Container fluid class='sign-up-wrapper'>
                <Container class={css`padding-top: 100px;`}>
                <Row>
                    <Col class="col-12 col-md-2 pe-lg-5 content-column">
                        <DetailBullet text={showingForm() === 'login' ? 'Log In' : 'Sign Up'} />
                        <button classList={{
                            'tab-button': true,
                            [css`
                        border-bottom: 1px solid ${Turquoise}!important;
                        color: ${Turquoise}!important;
                    `]: showingForm() === 'login'
                        }} onClick={() => setShowingForm('login')}>LOGIN</button>
                        <button classList={{
                            'tab-button': true,
                            [css`
                        border-bottom: 1px solid ${Turquoise}!important;
                        color: ${Turquoise}!important;
                    `]: showingForm() === 'signup'
                        }} onClick={() => setShowingForm('signup')}>SIGNUP</button>
                    </Col>
                    <Col class="col-12 col-md-5 mb-lg-5">

                        <Show when={showingForm() === 'login'}>
                            <LogInForm onLogin={() => console.log('logged in')} />
                        </Show>
                        <Show when={showingForm() === 'signup'}>

                            <SignUpForm />
                        </Show>

                    </Col>
                    <Col class="col-12 col-md-5"></Col>

                </Row>
                </Container>
                </Container>
            </Container>

        </>

    )
}

export default SignUp