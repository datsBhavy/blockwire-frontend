import { onMount } from "solid-js";

const CalendlyEmbed = () => {
  onMount(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
  });

  return (
    <div
      class="calendly-inline-widget"
      data-url="https://calendly.com/max-maerik"
      style={{ 'min-width': "320px", height: "630px" }}
    ></div>
  );
};

export default CalendlyEmbed;