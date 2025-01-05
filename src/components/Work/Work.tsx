import { createEffect, createResource, For, onMount, Show } from "solid-js";
import gsap from "gsap";
import WorkItem from "./WorkItem";

import { Style } from "@solidjs/meta";
import { Abstract, Andromeda, AstronautPortrait, DesertCreviceLandscape, LunarEclipseLandscape, NorthernLightsSquare, RedBlueGalaxy, RedMoodLandscape, RocketFlightPathLandscape, RocketSpacePortrait, RocketTakeoffLandscape, RocketTakeoffLandscape1, SpaceShipVentsSquare, SpinningLightsPortrait, SunsetRocketLanding, WeirdGalaxyPortrait, WideMoonLandscape } from "../../utils/images";
import { Col, Row } from "solid-bootstrap";
import { Dark, Grey, Light, LightGrey, PrimaryBg, SecondaryBg } from "../../constants/styles";
import PageTransition from "../PageTransition";
import { fetchBlogs } from "../../utils/fetcher";
import { getRandomImage, mapToColumns, mapToColumnsWithHeights } from "../../utils/utils";
import { useTheme } from "../../context/ThemeContext";
import { useAppContext } from "../../context/AppContext";

const Work = () => {
    const {theme} = useTheme()
    const {user} = useAppContext()
    const isAdmin = () => user()?.isAdmin

  let container;

  const randomImages = [
    RocketFlightPathLandscape,
    RocketSpacePortrait,
    RocketTakeoffLandscape,
    RocketTakeoffLandscape1,
    SpaceShipVentsSquare,
    SpinningLightsPortrait,
    SunsetRocketLanding,
    WeirdGalaxyPortrait,
    WideMoonLandscape,
    Abstract,
    Andromeda,
    AstronautPortrait,
    DesertCreviceLandscape,
    LunarEclipseLandscape,
    NorthernLightsSquare,
    RedBlueGalaxy,
    RedMoodLandscape,
  ]

  const [blogs] = createResource(fetchBlogs)
  const columnHeights = [
    ['300', '200', '500', '350', '250', '450'], // Column 1 heights
    ['200', '350', '300', '450', '200', '450', '200'], // Column 2 heights
    ['250', '350', '400', '200', '500', '450'], // Column 3 heights
  ];

  const [blogsByColumn] = createResource(() =>
    blogs(), (blogs) => mapToColumnsWithHeights(blogs, columnHeights)
  );

  return (
    <>
        <Style>{`
        
.page-work {
            background-color: ${Dark};
            padding-top: 1rem;
            padding-bottom: 1rem;

  .work-item {
  color: unset;
  position: relative;
  border: 1px solid ${LightGrey}; /* Added fallback */
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 0.25em;
  padding: 0.25em;
    display: inline-block; /* Prevent wrapping */
  white-space: nowrap; /* Prevent text wrapping */
  width: 100%;

  .work-item-cta {
  
            display: flex;
  button, a {
  text-decoration: none!important;
    border-radius: 8px;
    padding: .25rem;
    font-weight: 300;
    font-size: 1rem!important;
    width: 100%;
    background-color: ${Grey};
    color: ${Light}; /* Added fallback */
  }
  }
}

.work-item.type-img {
  padding: 0;
}

.work-item-img {
  position: relative;
    margin-bottom: .25em;

}

.work-item-info {
  position: absolute;
  bottom: 0;
  padding: 1em;
  width: 100%;
          left: calc(1rem - .25em);
}

p#work-name {
    font-weight: 700;
}

small#work-date {
color: ${theme()?.textColor};
}

small#work-author {
     font-weight: 600;
}

.work-item-img-wrapper {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.work-item-img-wrapper img {
  transform: scale(1.125);
}


.work-200 img {
  height: 200px;
    width: 100%;
  object-fit: cover;
}

.work-250 img {
  height: 250px;
    width: 100%;
  object-fit: cover;
}

.work-300 img {
  height: 300px;
    width: 100%;
  object-fit: cover;
}

.work-350 img {
  height: 350px;
    width: 100%;
  object-fit: cover;
}

.work-400 img {
  height: 400px;
    width: 100%;
  object-fit: cover;
}

.work-450 img {
  height: 450px;
    width: 100%;
  object-fit: cover;
}

.work-500 img {
  height: 500px;
  width: 100%;
  object-fit: cover;
}

.work-550 img {
  height: 550px;
    width: 100%;
  object-fit: cover;
}

@media (max-width: 900px) {
  .page-work {
    flex-direction: column;
  }
}


.work-author-img {
    border-radius: 50%;
    width: 40px!important;
    height: 40px!important;
    object-fit: cover!important;
    border: 1px solid ${Light};
}


}


`}</Style>
<PageTransition />
    <Row class="page-work px-3" ref={container}>
    <Show when={blogs()}>
    <For each={blogsByColumn() ?? []}>{(blogs, i) =>
            <Col class="col-12 col-md-4 px-1">
                <For each={blogs}>{(blog, i2) =>
                       <WorkItem
                       imgUrl={blog.image ?? getRandomImage()}
                       containerHeight={blog.containerHeight}
                       workName={blog.title}
                       workDate="April 2024"
                       type={'blog'}
                       isAdmin={isAdmin?.()}
                    //    type={articleType[i()]}
                       url={blog?.url ? `/blog/random/${blog.url}` : '/'}
                     />
                }</For>
            </Col>
        }</For>
    </Show>
    </Row>
    </>
  );
};

export default Work;