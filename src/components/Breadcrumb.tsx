import { useLocation, useNavigate } from "@solidjs/router";
import { Component } from "solid-js";
import { Style } from "@solidjs/meta";
import { useTheme } from "../context/ThemeContext";

const Breadcrumb: Component = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const formatSegment = (segment: string) => {
    return segment
      .split("-") // Split by dashes
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" "); // Join words with spaces
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean); // Split the path and remove empty segments

    return pathSegments.map((segment, index) => {
      // Reconstruct the path up to the current segment
      const path = "/" + pathSegments.slice(0, index + 1).join("/");
      return { name: formatSegment(segment), path };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <>
      <Style>
        {`
          .breadcrumb-container {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.5rem;
            font-family: 'Inter', sans-serif; /* Replace with your website's font */
            color: ${theme().textColor};
            margin-bottom: 1rem;
            background: ${theme().backgroundColor};
            padding-left: 0;
          }

          .breadcrumb-link {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            color: ${theme().linkColor || "#3498db"};
            font-weight: 300;
            font-size: 1rem;
            text-decoration: none;
            transition: color 0.3s ease, transform 0.2s ease;
            cursor: pointer;
          }

          .breadcrumb-link:hover {
            color: ${theme().hoverColor || "#e74c3c"};
            transform: translateY(-2px); /* Slight hover lift effect */
            text-decoration: underline; /* Optional underline on hover */
          }

          .breadcrumb-current {
            font-weight: 300;
            color: ${theme().mutedTextColor || "gray"};
            cursor: default;
          }

          .breadcrumb-divider {
            color: ${theme().dividerColor || "#bdc3c7"};
            font-size: 1rem;
          }

          .breadcrumb-container li {
            list-style: none;
          }
        `}
      </Style>
      <nav aria-label="breadcrumb">
        <ul class="breadcrumb-container">
          {breadcrumbs.map((breadcrumb, index) => (
            <li>
              {index < breadcrumbs.length - 1 ? (
                <a
                  onClick={() => navigate(breadcrumb.path)}
                  class="breadcrumb-link"
                >
                  {breadcrumb.name}
                </a>
              ) : (
                <span class="breadcrumb-current">{breadcrumb.name}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span class="breadcrumb-divider"> /</span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Breadcrumb;