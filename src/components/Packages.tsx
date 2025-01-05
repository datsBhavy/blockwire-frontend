import { Style } from "@solidjs/meta";
import { JSX, Show } from "solid-js";
import CubeComponent from "./cubeComponent/CubeComponent";
import { useTheme } from "../context/ThemeContext";
import { Dark, Light } from "../constants/styles";
import { Col, Row } from "solid-bootstrap";

interface item {
  text: string;
  onClick?: (text?: string) => void;
}

interface Package {
  name: string;
  description: string;
  price: string;
  button?: {
    text: string;
    onClick?: () => void;
  };
  items?: item[];
}

interface PackagesProps {
  packages?: Package[];
}

const Packages = (props: PackagesProps) => {
  const { theme } = useTheme();

  function getPriceText(priceString: string) {
    const price = priceString.split(" /")[0];
    if (isNaN(parseInt(price))) {
      return <p class="package-price mb-3">{price}</p>
    }
    const rate = priceString.split("/ ")[1];
    return (
      <div class="d-flex align-items-end mb-3">
        <p class="package-price">{price}</p>
        <p class="package-rate">/ {rate}</p>
      </div>
    );
  }

  return (
    <>
      <Style>{`
        .packages-container {
          background-color: ${Dark};
          padding-bottom: 2rem;

        }

        .package {
          border: 1px solid ${theme().textColor};
          border-radius: 25px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          text-align: start;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .package:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .package h1 {
          font-size: 1.5rem;
          font-weight: 300;
          text-transform: uppercase;
          margin-bottom: 1rem;
          color: ${theme()?.buttonBg};
        }

        .package-price {
          font-size: 2.8rem;
          line-height: 2.4rem;
          font-weight: bold!important;
          margin-bottom: 0;
          color: ${theme().buttonBg};
        }

        .package-rate {
          margin-bottom: 0;
          font-size: 1rem;
          line-height: 1rem;
          font-weight: 300;
          color: ${theme().buttonBg};
        }

        .package ul {
          list-style: none;
          padding: 0;
          margin: 1rem 0;
        }

        .package ul li {
          font-size: 0.9rem;
          margin: 0.5rem 0;
          color: ${Light}90;
          cursor: pointer;
          transition: color 0.3s ease;
          display: flex;
          align-items: start;
          text-align: start;
        }

        .package ul li:hover {
          color: ${theme().highlightColor || theme().textColor};
        }

        .package-description {
          height: 30%;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.5;
          max-height: calc(1.5em * 3);
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
      `}</Style>
      <Row class="packages-container">
        {props.packages?.map((pkg) => (
            <Col class={props.packages?.length === 3 ? "col-12 col-md-4 mb-3 mb-md-0" : "col-12 col-md-3 mb-3 mb-md-0"}>
              <div class="package h-100">
              <h1>{pkg.name}</h1>
            <Show when={pkg.price}>
              <p class="package-price">{getPriceText(pkg.price)}</p>
              </Show>
              <p class="fw-light package-description">{pkg.description}</p>
              <Show when={pkg.button}>
                <button class="secondary-button w-100 justify-content-center" onClick={pkg.button?.onClick}>{pkg.button?.text}</button>
              </Show>
              {pkg.items && (
                <ul>
                  {pkg.items.map((item) => (
                    <li onClick={() => item.onClick?.(item.text)}>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              )}
              </div>
            </Col>
        ))}
      </Row>
    </>
  );
};

export default Packages;