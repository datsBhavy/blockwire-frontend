import { createSignal } from "solid-js";
import { Style } from "@solidjs/meta";

const SearchModal = () => {
  const [searchText, setSearchText] = createSignal("");
  const [searchItems, setSearchItems] = createSignal([
    { name: "Jason Woordheart", detail: "jason@dribbble.com", icons: ["chat", "add"] },
    { name: "Rob Miller", detail: "rob@icloud.com", icons: ["add"] },
    { name: "Hannah Steward", detail: "replied on thread", icons: ["email", "add"] },
  ]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredItems = () =>
    searchItems().filter((item) =>
      `${item.name} ${item.detail}`.toLowerCase().includes(searchText().toLowerCase())
    );

  return (
    <>
      <Style>
        {`
          & .search-modal-container {
          :root {
            --color-gray: #656565;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            width: 100%;
            height: 100vh;
            background: url("./hero-4.jpg") no-repeat 50% 50%;
            background-size: cover;
            font-family: "Saans TRIAL";
            overflow: hidden;
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .search {
            width: 100%;
            margin-top: 7.5em;
          }

          .search-modal {
            margin: 0 auto;
            width: 40%;
            background: linear-gradient(
              320deg,
              rgba(27, 27, 27, 0.9) 0%,
              rgba(20, 20, 20, 0.96) 100%
            );
            backdrop-filter: blur(20px);
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 1em;
            overflow: hidden;
          }

          .search-bar {
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;
            padding: 1em;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          #search-input {
            width: 100%;
            background: none;
            outline: none;
            border: none;
            color: #fff;
            font-family: "Saans TRIAL";
            font-size: 15px;
            padding-left: 1em;
          }

          ::placeholder {
            color: var(--color-gray);
          }

          .search-items-container ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }

          .search-items-container ul li {
            display: flex;
            align-items: center;
            padding: 1em;
            cursor: pointer;
          }

          .search-items-container ul li:hover {
            background: rgba(255, 255, 255, 0.05);
          }

          .user {
            width: 24px;
            height: 24px;
            background: var(--color-gray);
            border-radius: 50%;
            margin-right: 1em;
          }

          li a {
            color: #fff;
            text-decoration: none;
            font-size: 15px;
          }

          li a span {
            color: var(--color-gray);
            padding-left: 0.5em;
          }
            }
        `}
      </Style>

      <div class="search-modal-container">
        <div class="search-modal">
          {/* Search Bar */}
          <div class="search-bar">
            <div class="search-icon">
              <i class="ph ph-magnifying-glass"></i>
            </div>
            <div class="input">
              <input
                type="text"
                id="search-input"
                placeholder="Search for action, people, instruments"
                value={searchText()}
                onInput={handleSearch}
              />
            </div>
          </div>

          {/* Search Items */}
          <div class="search-items-container">
            <ul>
              {filteredItems().map((item) => (
                <li>
                  <div class="user"></div>
                  <a href="#">
                    {item.name} <span>{item.detail}</span>
                  </a>
                  <div class="item-icons">
                    {item.icons.map((icon) => (
                      <i class={`ph ph-${icon}`}></i>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;