import { Container } from "solid-bootstrap"
import Packages from "../Packages"
import { Style } from "@solidjs/meta"
import PricingHelp from "../PricingHelp";
import GradientText from "../gradientText/GradientText";
import { packageData } from "../../sectionData";

const PRPackages = () => {
  
    return (
        <>
                <Container class="d-flex justify-content-center">
                {/* <GradientText text="PR Packages" class="mb-4" /> */}
                <h1 class="mb-5">PR Packages</h1>
                </Container>
                <Packages packages={packageData} />
            {/* <PricingHelp /> */}
        </>
    )
}

export default PRPackages