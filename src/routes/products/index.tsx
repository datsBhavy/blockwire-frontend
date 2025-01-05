import { Container } from "solid-bootstrap"
import CoinSection from "../../components/CoinSection"
import PRPackages from "../../components/Packages/PR"
import { DarkerPurple, DarkPurple } from "../../constants/styles"
import Services from "../services"

interface ProductsProps {

}

const Products = (props) => {
    return (
        <>
            <Services />
            <Container fluid>

            <Container fluid style={{
                'padding-top': '100px',
                'padding-bottom': '100px',
                'background-color': DarkerPurple
            }}>
            <PRPackages />
            </Container>
            </Container>
        </>
    )
}

export default Products