import { Navbar as BSNavbar, Button, Container, Nav, Row, Col } from "solid-bootstrap";
import { useTheme } from "../../context/ThemeContext";
import { Component, createEffect, createSignal, Show } from "solid-js";
import { Style } from "@solidjs/meta";
import { Headshot1, LunarEclipseLandscape, OfficePhoto, RocketFlightPathLandscape, RocketTakeoffLandscape, RocketTakeoffLandscape1, WideMoonLandscape } from "../../utils/images";
import { css } from "solid-styled-components";
import { useAppContext } from "../../context/AppContext";
import { A, useLocation, useNavigate } from "@solidjs/router";
import ProfileDropdown from "../ProfileImageDropdown";

export default function Navbar() {
  const { theme } = useTheme();
  const {showing, setShowing, user} = useAppContext()
  const [activeDropdown, setActiveDropdown] = createSignal<string | null>(null);
  const [hoveringDropdown, setHoveringDropdown] = createSignal(false);

  const menuItems = {
    services: {
      columns: [
        {
          category: { text: "Marketing", href: "/services/web" },
          links: [
            { text: "Marketing Package", href: "/services/seo" },
            { text: "Web Development", href: "/services/web-development" },
          ],
        },
        {
          category: { text: "PR", href: "/services/consulting" },
          links: [

            { text: "Technical Consulting", href: "/services/tech" },
          ],
        },
        {
          category: { text: "Courses", href: "/services/courses" },
          links: [
            { text: "JavaScript Basics", href: "/courses/javascript-basics" },
            { text: "Advanced Python", href: "/courses/advanced-python" },
            { text: "React for Beginners", href: "/courses/react-for-beginners" },
          ],
        },
        {
          category: { text: "Consulting", href: "/services/consulting" },
          links: [
            { text: "Technical Consulting", href: "/services/tech" },
            { text: "Software Development", href: "/services/software-development" },

          ],
        },
        {
          category: { text: "Design", href: "/services/design" },
          links: [
            {       text: "Strategy",
              href: "/services/strategy",
              image: WideMoonLandscape, // Image link
            },
            { text: "UI/UX Design", href: "/services/ui-ux" },
            { text: "Branding", href: "/services/branding" },
          ],
        },
      ],
    },
    blog: {
      columns: [
 
        {
          category: { text: "News", href: "/news" },
          links: [
            { text: "All", href: "/blog/news/" },
            { text: "Press Release", href: "/blog/press-release" },
          ],
        },
        {
          category: { text: "Popular Blogs", href: "/blog/trending" },
          links: [
            {
              text: "KOLs (Key Opinion Leaders)",
              href: "/about/key-opinion-leaders",
              image: OfficePhoto, // Image link
            },
          ],
        },
        {
          category: { text: "Clients", href: "/about/clients" },
          links: [
            {
              text: "Our Clients",
              href: "/services/strategy",
              image: RocketTakeoffLandscape, // Image link
            },
          ],
        },
        {
          category: { text: "Team", href: "/about/our-team" },
          links: [
            {
              text: "Our Team",
              href: "/about/our-team",
              image: RocketTakeoffLandscape1, // Image link
            },
          ],
        },
      ],
    },
    products: {
      columns: [
        {
          category: { text: "Products", href: "/products/" },
          links: [
            { text: "Marketing", href: "/products/marketing/" },
            { text: "Press Release", href: "/products/press-release/" },
          ],
        },
        {
          category: { text: "Services", href: "/services/testimonials" },
          links: [
            { text: "Marketing", href: "/portfolio/client-a" },
            { text: "Press Release", href: "/portfolio/client-b" },
          ],
        },
      ],
    },
    about: {
      columns: [
        {
          category: { text: "About Us", href: "/about" },
          links: [
            { text: "Book Meeting", href: "/book-meeting" },
            { text: "Consultation Booking", href: "/portfolio/case-study-1" },
            { text: "Privacy Policy", href: "/portfolio/case-study-2" },
            { text: "Terms and Conditions", href: "/portfolio/case-study-2" },
          ],
        },
        {
          category: { text: "KOLs", href: "/about/key-opinion-leaders" },
          links: [
            {
              text: "KOLs (Key Opinion Leaders)",
              href: "/about/key-opinion-leaders",
              image: RocketFlightPathLandscape, // Image link
            },
          ],
        },
        {
          category: { text: "Clients", href: "/about/clients" },
          links: [
            {
              text: "Our Clients",
              href: "/services/strategy",
              image: RocketTakeoffLandscape, // Image link
            },
          ],
        },
        {
          category: { text: "Team", href: "/about/our-team" },
          links: [
            {
              text: "Our Team",
              href: "/about/our-team",
              image: RocketTakeoffLandscape1, // Image link
            },
          ],
        },
      ],
    },
    contact: {
      columns: undefined,
    },
  };
  const loggedInMenuItems = {
    dashboard: {},
    blog: {},

  }

  const location = useLocation()
  const isActive = (path: string) => location.pathname.startsWith(path);

  createEffect(() => {
    console.log(location.pathname, Object.entries(menuItems), user())
  })
  const navigate = useNavigate()



  return (
<>
      <NavbarStyles />
      <BSNavbar
        expand="lg"
        sticky="top"
        class="navbar"
        style={{
          background: theme().navbarBg,
          color: theme().navbarTextColor,
          transition: "background 0.5s ease, color 0.5s ease",
        }}
      >
        <Container>
          <BSNavbar.Brand as={A} href={user() ? '/dashboard' : "/"} class="d-flex align-items-center fw-bold" style={{ color: theme().navbarTextColor }}>
            Blockwire
          </BSNavbar.Brand>
          <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BSNavbar.Collapse id="basic-navbar-nav">
            <Nav class="ms-auto align-items-center">
              {Object.entries((user() ? loggedInMenuItems : menuItems)).map(([key, value]) => (
                <div
                  class="dropdown-link"
                  onMouseEnter={() => {
                    setActiveDropdown(key);
                    setHoveringDropdown(true);
                  }}
                  onMouseLeave={() => {
                    setTimeout(() => {
                      if (!hoveringDropdown()) {
                        setActiveDropdown(null);
                      }
                    }, 200);
                  }}
                >
                  <Nav.Link
                    as={A}
                    class={`fw-bold ${isActive(`/${key}`) ? "active-nav-link" : ""}`}
                    href={`/${key}`}
                    style={{
                      color: isActive(`/${key}`) ? `${theme()?.buttonBg}!important;` : theme().navbarTextColor,
                    }}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Nav.Link>
                  <Show when={value.columns}>
                  <div
                    classList={{
                      [`dropdown-menu ${activeDropdown() === key ? "show" : ""}`]: true,
                      [css`background-color: ${theme().navbarBg}!important; color: ${theme()?.navbarTextColor}!important;`]: true,
                    }}
                    onMouseEnter={() => setHoveringDropdown(true)}
                    onMouseLeave={() => {
                      setHoveringDropdown(false);
                      setTimeout(() => {
                        if (!hoveringDropdown()) {
                          setActiveDropdown(null);
                        }
                      }, 200);
                    }}
                  >
                    <Container>
                      <Row>
                        {value.columns?.map((column) => (
                          <LinksColumn column={column} setActiveDropdown={setActiveDropdown} />
                        ))}
                      </Row>
                    </Container>
                  </div>
                  </Show>
                </div>
              ))}
              <Show when={!user()} fallback={
                <>
                  <div class="d-flex align-items-center">
                    <A href="/profile">
                    <img src={Headshot1} class="profile-image-icon" />
                    </A>
                  <ProfileDropdown />
                  </div>
                </>
              }>
              <A href="/log-in"
                class="ms-3"
                onClick={(e) => {
                  e.preventDefault()
                  setShowing('loginForm', true)
                }}
                style={{
                  background: 'unset',
                  color: theme().navbarTextColor,
                  border: "none",
                  'text-decoration': "none",
                  display: 'flex',
                  'align-items': 'center',
                  "text-transform": "uppercase",
                  "font-weight": "bold",
                  "line-height": ".125rem",
                  height: "30px",
                  padding: ".125rem 1rem",
                  "border-radius": "40px",
                }}
               
              >
                Log In
              </A>
              <A href="/sign-up"
                class="ms-3"
                style={{
                  background: theme().navbarTextColor,
                  color: theme().navbarBg,
                  border: "none",
                  'text-decoration': "none",
                  display: 'flex',
                  'align-items': 'center',
                  "text-transform": "uppercase",
                  "font-weight": "bold",
                  "line-height": ".125rem",
                  height: "30px",
                  padding: ".125rem 1rem",
                  "border-radius": "40px",
                }}
               
              >
                Sign Up
              </A>
              </Show>
            </Nav>
          </BSNavbar.Collapse>
        </Container>
      </BSNavbar>
    </>
  );
}

interface LinksColumnProps {
  setActiveDropdown: (value: string | null) => void;
  column: {
    category: { text: string; href: string };
    links: { text: string; href: string; image?: string }[];
  }
}

const LinksColumn: Component<LinksColumnProps> = (props) => {
  const {theme} = useTheme();
  const [showAllLinks, setShowAllLinks] = createSignal(false);
  const linksToShow = () => showAllLinks() ? props.column.links ?? [] : props.column.links.slice(0, 7) ?? [];

  return (
    <Col class="d-flex flex-column">
      <A
        href={props.column.category.href}
        onClick={(e) => {
          e.preventDefault(); // Prevent default navigation for testing
          props.setActiveDropdown(null); // Close the dropdown
          window.location.href = props.column.category.href; // Navigate after closing
        }}
      >
        <p class="text-light mb-3 text-muted fw-light">{props.column.category.text}</p>
      </A>
      {(linksToShow()).map((link) =>
        link.image ? (
          <div class="image-link">
            <A
              href={link.href}
              onClick={(e) => {
                e.preventDefault(); // Prevent default navigation for testing
                props.setActiveDropdown(null); // Close the dropdown
                window.location.href = link.href; // Navigate after closing
              }}
            >
              <img loading="lazy" src={link.image} alt={link.text} />
              <p>{link.text}</p>
            </A>
          </div>
        ) : (
          <A
            href={link.href}
            onClick={(e) => {
              e.preventDefault(); // Prevent default navigation for testing
              props.setActiveDropdown(null); // Close the dropdown
              window.location.href = link.href; // Navigate after closing
            }}
          >
            {link.text}
          </A>
        )
      )}
      <Show when={props.column.links.length > 7 && !showAllLinks()}>
        <div class="d-inline-flex">
        <button
          class="btn btn-link text-start mt-2"
          onClick={() => setShowAllLinks(true)}
          style={{ color: "inherit", 'text-decoration': "none", 'font-weight': "bold", border: `1px solid ${theme().textColor}` }}
        >
          View More
        </button>
        </div>
      </Show>
      <Show when={showAllLinks()}>
        <div class="d-inline-flex">
        <button
          class="btn btn-link text-start mt-2"
          onClick={() => setShowAllLinks(false)}
          style={{ color: "inherit", 'text-decoration': "none", 'font-weight': "bold", border: `1px solid ${theme().textColor}` }}
        >
          View Less
        </button>
        </div>
      </Show>
    </Col>
  );
};


const NavbarStyles = () => {
  const {theme} = useTheme();
  return (
    <>
        <Style>{`
        .profile-image-button{
          background: unset;
          border: none;
          display: flex;
          align-items: center;
        margin-left: 0rem;
          padding: 0;
          color: ${theme().navbarTextColor};
          }
          .profile-image-icon {
              width: 60px;
          height: 60px;
          border: 1px solid ${theme().navbarTextColor};
            border-radius: 30px;
            object-fit: cover;
            margin-left: 1rem;
            margin-right: 1rem;
          }
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    height: 100px;
  }

  .navbar .dropdown-menu {
    position: fixed;
    top: 100%;
    left: 0;
    right: 0;
    width: 100vw;
    background: ${theme().backgroundColor};
    color: ${theme().navbarTextColor};
    display: none;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: opacity 0.3s ease;
    z-index: 999;
    font-weight: 300;
    text-transform: uppercase;
  }

  .navbar .dropdown-menu.show {
    display: block;

  }

  .dropdown-link:hover .dropdown-menu,
  .dropdown-menu:hover {
          color: ${theme().buttonBg
            
          };
    display: block;
  }

  .navbar .nav-link {
    position: relative; /* Required for the underline effect */
    display: inline-block; /* Ensure proper alignment */
    text-decoration: none; /* Remove default underline */
    font-weight: bold;
    text-transform: uppercase;
    transition: color 0.3s ease; /* Smooth transition for text color */
    color: ${theme().navbarTextColor}; /* Default text color */
  }

  .navbar .nav-link:hover,
  .navbar .nav-link.active {
  color: ${theme().buttonBg1}!important; /* Change text color on hover */
    -webkit-background-clip: text; /* Clip gradient to text */
  }

.dropdown-menu a {
  display: inline-block; /* Default behavior for all links */
  text-decoration: none; /* Remove underline */
  color: inherit; /* Inherit text color */
  font-weight: 400!important;
}

.dropdown-menu a:hover {
  color: ${theme()?.hoverTextColor}; /* Change text color to blue on hover */
}

  .dropdown-menu a img {
    width: 100%; /* Ensure the image fills the width of its container */
    height: auto; /* Maintain aspect ratio */
    object-fit: cover; /* Ensure the image covers the container */
    border-radius: 5px; /* Optional: Rounds the corners */
    margin-bottom: 1rem;
  }

.dropdown-menu a.image-link {
  display: block;
  position: relative;
  width: 100%; /* Full width */
  overflow: hidden; /* Ensure overflow is hidden */
}

.dropdown-menu a.image-link img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-height: 200px;
  object-fit: cover; /* Ensures the image fills the container */
}

.dropdown-menu a.image-link::before {
  content: ""; /* Creates the aspect ratio box */
  display: block;
  padding-top: 66.67%; /* 3:2 aspect ratio (100% / 1.5 = 66.67%) */
}

  .dropdown-menu a.image-link span {
    display: block; /* Place text below the image */
    margin-top: 0.5rem; /* Add spacing between image and text */
  }

    @media (max-width: 578px) {
    .navbar .dropdown-menu {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: ${theme().backgroundColor};
      color: ${theme().navbarTextColor};
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      z-index: 9999;
    }

    .navbar .dropdown-menu.show {
      display: flex;
    }

    .navbar .dropdown-menu .close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: transparent;
      border: none;
      font-size: 1.5rem;
      color: ${theme().navbarTextColor};
      cursor: pointer;
    }

    .navbar .nav-link {
      text-align: center;
      width: 100%; /* Full width for better touch target */
      padding: 1rem;
      font-size: 1.2rem;
      border-bottom: 1px solid ${theme().dividerColor || "#ddd"};
    }

    .navbar .nav-link:hover {
          color: ${theme().buttonBg}!important;;
    }

    .navbar .dropdown-menu a {
      display: block;
      text-align: center;
      margin: 1rem 0;
      font-size: 1.2rem;
    }
  }
      @media (max-width: 578px) {
    .navbar-toggler {
      border: none; /* Remove default border */
      padding: 0.5rem 0.75rem; /* Adjust padding for better touch target */
      border-radius: 4px; /* Slight rounding for better aesthetics */
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s ease, transform 0.2s ease;
    }

    .navbar-toggler:hover {
      transform: scale(1.1); /* Slight zoom effect */
    }

    .navbar-toggler-icon {
      background-image: none; /* Remove default icon */
      display: flex;
      flex-direction: column;
      gap: 3px; /* Space between bars */
    }

    .navbar-toggler-icon span {
      display: block;
      width: 25px; /* Adjust width of bars */
      height: 3px; /* Height of each bar */
      background-color: #fff; /* Bar color */
      border-radius: 2px; /* Slight rounding for bars */
      transition: all 0.3s ease;
    }

    .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px); /* Rotate first bar */
    }

    .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon span:nth-child(2) {
      opacity: 0; /* Hide middle bar */
    }

    .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px); /* Rotate last bar */
    }
  }
      .navbar .nav-link.active-nav-link {
    color: ${theme().buttonBg1}!important; /* Default to red */
    font-weight: bold;
  }
`}</Style>
</>
  )
}