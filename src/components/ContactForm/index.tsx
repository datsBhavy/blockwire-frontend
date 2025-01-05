import { Style } from "@solidjs/meta";
import { Component, createSignal } from "solid-js";
import { Light, Violet } from "../../constants/styles";
import CustomInput from "../CustomInput";

const ContactForm = () => {
  return (
    <>
    <Style>{`
        .contact-form {
            width: 80%;
          @media(max-width: 768px) {
            width: 100%;
          }
         
        }
    `}</Style>
        <div class="contact-form">
            <h1>Need Help?</h1>
            <h1 class="mb-5">Get in touch</h1>
        <CustomInput label="First Name" />
        <CustomInput label="Last Name" />
        <CustomInput label="E-mail" type="email" />
        <CustomInput label="Message" type="textarea" />
        <button class="submit-button primary-button justify-content-center w-100 py-3">Submit</button>
        </div>
    </>
  );
};

export default ContactForm;

