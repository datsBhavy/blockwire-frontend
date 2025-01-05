import { Col, Container, Row } from "solid-bootstrap"
import HorizontalScrollSection from "../components/HorizontalScrollSection"
import { css } from "solid-styled-components"
import { useTheme } from "../context/ThemeContext"
import DetailBullet from "../components/DetailBullet"
import CoinSection from "../components/CoinSection"
import { industryEventsSection } from "../sectionData"
import ColorChangeText from "../components/ColorChangeText"
import TwoColumnSection from "../components/AnimatedTwoColumnSection"
import { Light } from "../constants/styles"
import BlogLanding from "../components/blog/BlogLanding"

const MarketAnalysis = (props) => {
    const {theme} = useTheme()
    return (
        <>
            {/* <Container>
                <h1>Market Analysis</h1>
            </Container> */}

            <Container fluid class={css`
        background-color: ${theme()?.backgroundColor};
        position: relative;
        `}>
   <CoinSection col1={<DetailBullet text='Market Analysis' />}>
        <h1 class={css`font-size: 5rem;`}><ColorChangeText targetColor={Light}>Target Market: Any digital asset company, with a focus on startups and midsize companies</ColorChangeText></h1>
      </CoinSection>
</Container>
            <HorizontalScrollSection sections={[
          
                {
                    content: (
                        <>
                        <CoinSection>
                        <h1 class={css`color: ${theme()?.buttonBg1};`}>Competetive Analysis</h1>
                        <ul class={css`
                                padding: 0;
                                li {
                                    p {}
                                    list-style: none;
                                    border: 1px solid ${theme()?.buttonBg1};
                                    padding: 1rem;
                                }
                            `}>
                            <li>
                                <p class="mb-0">Content Saturation: The crowded space requires innovative marketing to stand out, targeting both niche and mainstream audiences effectively.</p>
                            </li>
                            <li>
                                <p class="mb-0">Expanding Market: As blockchain becomes more integrated into daily life, the demand for specialized marketing will grow, especially for startups and mid-sized companies.</p>
                            </li>
                            <li>
                                <p class="mb-0">Untapped Global Audience: BlockWire's ability to connect with mainstream media and influencers positions it to bridge the gap between crypto-native and mainstream audiences, providing unmatched reach.</p>
                            </li>
                        </ul>
                        </CoinSection>
                            
                        </>
                    )
                },
         
                {
                    content: (
                        <>
                            
                            <Container class='h-100 w-100 d-flex justify-content-center align-items-center' fluid>
                                    <div class={css`
                                        h1 {
                                        font-size: 5rem;
                                        color: ${theme()?.buttonBg};
                                        }
                                    `}>
                                    <h1>Market Size and Growth Potential</h1>
                        <h2>
                        2023: 366 Billion</h2>
                                    </div>
                    

                                    
                            </Container>
                        </>
                    )
                },
                {
                    content: (
                        <>
                            
                            <Container class='h-100 w-100 d-flex justify-content-center align-items-center' fluid>
                        
                        <div  class={css`
                                        h1 {
                                        font-size: 5rem;
                                        color: ${theme()?.buttonBg1};
                                        }
                                    `}>
                        <h1>Key Trends</h1>
                        <h2>
                        Institutional Adoption, Regulatory Scrutiny, DeFi/NFT’s                       </h2>
                        </div>
                                    
                                    </Container>
                        </>
                    )
                },
            ]} />
            <Container fluid class={css`
        background-color: ${theme()?.backgroundColor};
        position: relative;
        `}>
   <CoinSection col1={<DetailBullet text={'Industry Overview'} />}>
        <h1 class={css`font-size: 5rem;`}><ColorChangeText>The digital asset space, including cryptocurrencies, blockchain, DeFi, and NFTs, has grown rapidly, with the global crypto market now valued over $1 trillion. Despite this growth, marketing infrastructure remains underdeveloped, especially compared to traditional industries.</ColorChangeText></h1>
      </CoinSection>
</Container>


        </>
    )
}

export default MarketAnalysis