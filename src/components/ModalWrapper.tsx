import { Component, Show } from "solid-js"
import { useAppContext } from "../context/AppContext"
import { Modal } from "solid-bootstrap"
import InquiryForm from "./inquiryForm/InquiryForm"
import WebBuilderForm from "./webBuilder/WebBuilderForm"
import { css } from "solid-styled-components"
import { Style, Stylesheet } from "@solidjs/meta"
import LogInForm from "./LogInForm"
import { useTheme } from "../context/ThemeContext"
import { DarkerPurple, Light, primaryModalClass } from "../constants/styles"

const ModalWrapper: Component = (props) => {
    const {showing, setShowing} = useAppContext()
    const {theme} = useTheme()
    return (
        <>
        <Style>{`
            .custom-modal .modal-content {
  border: 2px solid transparent; /* Thin transparent border */
  border-radius: 0px; /* Remove rounded corners */
  background-clip: padding-box; /* Clip the background */
  background-origin: border-box;
  position: relative; /* Required for the pseudo-element */
}


.custom-modal .modal-content::before {
  content: ""; /* Create a pseudo-element for the gradient border */
  position: absolute;
  top: -2px; /* Offset to show the border */
  left: -2px;
  right: -2px;
  bottom: -2px;
  z-index: -1; /* Place it behind the modal content */
  border-radius: 0px; /* Match the border radius of the modal */
  background: linear-gradient(
    45deg,
    #8e44ad, /* Violet */
    #e74c3c, /* Red */
    #000000  /* Black */
  ); /* Updated gradient colors */
}
        `}</Style>
        {/* <SearchModal /> */}
             <Modal size="lg"  show={showing.inquiryForm} onHide={() => setShowing('inquiryForm', false)}>
                    <InquiryForm />
                </Modal>
                <Modal size="lg"  show={showing.webBuilder} onHide={() => setShowing('webBuilder', false)}>
                    <WebBuilderForm />
                </Modal>
                <Modal show={showing.contactForm} onHide={() => setShowing('contactForm', false)}>
                <InquiryForm variant="contact" />
                </Modal>
                <Modal class={primaryModalClass(theme)} show={showing.loginForm} onHide={() => setShowing('loginForm', false)}>
                <LogInForm onLogin={() => setShowing('loginForm', false)}/>
                </Modal>

    
           
        </>
    )
}

export default ModalWrapper
