import { createContext, useContext, ParentComponent, createEffect } from "solid-js";
import { onMount } from "solid-js";

// Define the GSAP context type
interface GsapContextValue {
  gsap: typeof import("gsap") | null;
  ScrollTrigger: typeof import("gsap/ScrollTrigger") | null;
}

// Initialize the context with an undefined type
const GsapContext = createContext<GsapContextValue | undefined>(undefined);

// Define the provider
export const GsapProvider: ParentComponent = (props) => {
  let gsapInstance: typeof import("gsap") | null = null;
  let ScrollTriggerInstance: typeof import("gsap/ScrollTrigger") | null = null;

  onMount(async () => {
    if (!gsapInstance) {
      const { gsap } = await import("gsap");
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;

      gsap.registerPlugin(ScrollTrigger);
      gsapInstance = gsap;
      ScrollTriggerInstance = ScrollTrigger;
    }
  });

  createEffect(() => {
    console.log(gsapInstance, ScrollTriggerInstance)
  })

  return (
    <GsapContext.Provider
      value={{
        gsap: gsapInstance,
        ScrollTrigger: ScrollTriggerInstance,
      }}
    >
      {props.children}
    </GsapContext.Provider>
  );
};

// Custom hook for consuming the context
export const useGsap = (): GsapContextValue => {
  const context = useContext(GsapContext);
  if (!context) {
    throw new Error("useGsap must be used within a GsapProvider");
  }
  return context;
};