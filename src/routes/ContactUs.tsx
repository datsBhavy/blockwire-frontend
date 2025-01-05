import CoinSection from "../components/CoinSection"
import ContactForm from "../components/ContactForm"
import DetailBullet from "../components/DetailBullet"

const Contact = () => {
    return (
        <CoinSection col1={<DetailBullet text="Contact Form" />}>
            <ContactForm />
        </CoinSection>
    )
}

export default Contact