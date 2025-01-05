import { createContext, useContext, createSignal, JSX, Accessor, onMount, createEffect } from "solid-js";
import { Blue, Dark, DarkPurple, DarkYellow, Grey, GreyishBlue, HoverColor, Light, LightBlue, LighterDark, PrimaryBg, SecondaryBg, Turquoise, Violet } from "../constants/styles";
import MouseTrail from "../components/MouseTrail";

export interface Theme {
  navbarBg: string;
  textColor: string;
  hoverTextColor: string;
  buttonBg: string;
  buttonBg1: string;
  buttonText: string;
  backgroundColor: string;
  navbarTextColor: string;
  primaryColor?: string;
  secondaryColor?: string;
}

interface ThemeContextValue {
  theme: Accessor<Theme>;
  updateTheme: (newColors: Partial<Theme>) => void;
  setTransparentNavbar: (isTransparent: boolean) => void;
  setNavbarState: (state: "dark" | "light" | undefined) => void;
  isDarkMode: () => boolean;
  handleOnEnter: () => void;
}

const ThemeContext = createContext<ThemeContextValue>();

export const primaryGradient = 'linear-gradient(90deg, #e74c3c, #8e44ad, #3498db, #e67e22, #f1c40f)'

interface ThemeProviderProps {
  children: JSX.Element;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const [theme, setTheme] = createSignal<Theme>({
    navbarBg: Dark,
    hoverTextColor: HoverColor,
    textColor: Light,
    buttonBg: PrimaryBg,
    buttonBg1: SecondaryBg,
    buttonText: Dark,
    backgroundColor: LighterDark,
    navbarTextColor: PrimaryBg,
    primaryColor: PrimaryBg,
    secondaryColor: SecondaryBg
  });

  const updateTheme = (newColors: Partial<Theme>) => {
    setTheme({ ...theme(), ...newColors });
  };

  const isDarkMode = (): boolean =>
    theme().backgroundColor === Blue || theme().backgroundColor !== Light;

  const handleOnEnter = () => {
    updateTheme({
      navbarBg: theme().navbarBg,
      textColor: theme().textColor,
      navbarTextColor: theme().navbarTextColor,
      backgroundColor: theme().backgroundColor,
    });
  };

  const setTransparentNavbar = (isTransparent: boolean): void => {
    setTheme({
      ...theme(),
      navbarBg: isTransparent ? "#000000" : "#ffffff",
      textColor: isTransparent ? "#ffffff" : "#000000",
    });
  };

  createEffect(() => {
    console.log(theme())
  })

  const setNavbarState = (state?: "dark" | "light"): void => {
    if (state === 'light') {
      setTheme({
        navbarBg: Dark,
        hoverTextColor: HoverColor,
        textColor: Light,
        buttonBg: PrimaryBg,
        buttonBg1: DarkYellow,
        buttonText: Light,
        backgroundColor: 'white',
        navbarTextColor: Light,
      });
    } else if (state === 'dark' || !state) {
      setTheme({
        navbarBg: Dark,
        hoverTextColor: HoverColor,
        textColor: Light,
        buttonBg: PrimaryBg,
        buttonBg1: DarkYellow,
        buttonText: Light,
        backgroundColor: LighterDark,
        navbarTextColor: PrimaryBg,
      });
      return
    }

  };


  return (
    <ThemeContext.Provider
      value={{
        theme,
        updateTheme,
        setTransparentNavbar,
        setNavbarState,
        isDarkMode,
        handleOnEnter,
      }}
    >
      {/* <MouseTrail /> */}
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}