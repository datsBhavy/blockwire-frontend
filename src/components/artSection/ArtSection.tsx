import { onMount } from "solid-js";
import { gsap } from "gsap";
import AnimatedText from "../animatedText/AnimatedText";

export default function ArtPage() {

  const titles = [
    'Performance.', 'Ingenuity.', 'Glory.'
  ]


  return (
    <div>
      {/* Abstract Section */}
      <section class="abstract-section">
       <AnimatedText titles={titles}/>
      </section>
    </div>
  );
}