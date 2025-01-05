import { createSignal, Show, onCleanup, onMount } from "solid-js";
import { IoChevronDown } from "solid-icons/io";
import { Style } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { useTheme } from "../context/ThemeContext";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  const { theme } = useTheme();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const closeDropdown = (e: MouseEvent) => {
    const dropdownContainer = document.querySelector(".dropdown-container");
    if (dropdownContainer && !dropdownContainer.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener("click", closeDropdown);
  });

  onCleanup(() => {
    document.removeEventListener("click", closeDropdown);
  });

  return (
    <>
      <Style>{`
        .dropdown-container {
          position: relative;
        }

        .profile-image-button {
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 5px;
          transition: background 0.3s ease;
        }

        .profile-image-button:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }

        .profile-dropdown-menu {
          position: fixed;
          top: 80px;
          right: 2rem;
          background: ${theme().navbarBg};
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 0;
          overflow: hidden;
          z-index: 1000;
          display: flex;
          flex-direction: column;
        }

        .profile-dropdown-menu a {
          padding: 0.75rem 1rem;
          text-decoration: none;
          transition: background 0.3s ease;
          color: ${theme().navbarTextColor}!important;
        }

        .profile-dropdown-menu a:hover {
          background: rgba(0, 0, 0, 0.05);
        }
      `}</Style>
      <div class="dropdown-container">
        <button class="profile-image-button" onClick={toggleDropdown}>
          <IoChevronDown size={20} />
        </button>
        <Show when={isOpen()}>
          <div class="profile-dropdown-menu">
            <A href="/profile">Profile</A>
            <A href="/settings">Settings</A>
            <A href="/logout">Logout</A>
          </div>
        </Show>
      </div>
    </>
  );
};

export default ProfileDropdown;