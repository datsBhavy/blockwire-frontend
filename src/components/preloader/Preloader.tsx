import { createEffect, createSignal, onMount } from "solid-js";
import { useTheme } from "../../context/ThemeContext";
import './Preloader.css'
export default function Preloader({ isLoaded }) {
  const { theme } = useTheme(); // Access theme for dynamic background and text colors

  createEffect(()  => {
    console.log(isLoaded)
  })
  return (
    <div
      class={`preloader-container ${isLoaded() ? "preloader-hide" : ""}`}
      style={{
        'background-color': theme()?.backgroundColor || "#000",
        color: theme()?.navbarTextColor || "#fff",
      }}
    >
      <div class="preloader">
        <div class="spinner-outer"></div>
        <div class="spinner-inner"></div>
        <h1 style={{ color: theme()?.navbarTextColor || "#fff" }}>
          Loading...
        </h1>
      </div>
    </div>
  );
}