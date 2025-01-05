
import { IoMoon, IoSunny } from "solid-icons/io";
import { useTheme } from "../../context/ThemeContext";
import { useSearchParams } from "@solidjs/router";
import { Style } from "@solidjs/meta";

const ThemeSwitch = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { theme } = useTheme(); // Access theme context
  const isDarkMode = () => theme()?.backgroundColor === "#000000"; // Determine dark mode based on theme

  return (
    <>
    <Style>{`
      /* Switch Container */
.theme-switch-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

/* Switch Button */
.theme-switch {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  border: 2px solid #ccc;
  border-radius: 25px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-switch:hover {
  border-color: #e74c3c; /* Change border color on hover */
}

/* Icon Styling */
.theme-switch .icon {
  font-size: 1.5rem;
  color: #3498db;
  transition: color 0.3s ease;
}

/* Text Styling */
.theme-switch span {
  font-size: 1rem;
  color: #333;
  transition: color 0.3s ease;
}

/* Dark Mode Active */
.theme-switch-container .theme-switch.dark {
  border-color: #3498db;
}

.theme-switch-container .theme-switch.dark .icon {
  color: #3498db;
}

.theme-switch-container .theme-switch.dark span {
  color: #3498db;
}

.theme-switch {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent; /* Transparent background for seamless integration */
  border: 2px solid currentColor; /* Border matches text color */
  border-radius: 20px; /* Rounded edges for modern look */
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s ease, border-color 0.3s ease, background 0.3s ease;
}

.theme-switch .icon {
  width: 20px;
  height: 20px;
}

.theme-switch:hover {
  background: rgba(255, 255, 255, 0.1); /* Subtle background on hover */
}
  
  
  .theme-switch span {
    font-size: 1rem;
    transition: color 0.3s ease;
  }
  
  /* Dark Mode Active */
  .theme-switch.dark {
    border-color: #e74c3c;
  }
  
  .theme-switch.dark .icon {
    color: #e74c3c;
  }
  
  .theme-switch.dark span {
    color: #e74c3c;
  }
    `}</Style>
    <button
      class="theme-switch"
      onClick={(e) => {
        e.stopPropagation();
      }}
      style={{
        color: theme()?.navbarTextColor || "#000", // Ensure fallback to prevent null
        "border-color": theme()?.navbarTextColor || "#000", // Match border color
      }}
      aria-label={isDarkMode() ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDarkMode() ? <IoMoon class="icon" /> : <IoSunny class="icon" />}
      <span style={{color: theme()?.navbarTextColor}}>{isDarkMode() ? "Dark" : "Light"}</span>
    </button>
    </>
  );
};

export default ThemeSwitch;
