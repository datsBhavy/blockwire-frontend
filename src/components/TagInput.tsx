import { IoClose } from "solid-icons/io";
import { Component, createSignal, For, createMemo, onCleanup, Show, createEffect } from "solid-js";
import { ITag } from "../types";
import { Style } from "@solidjs/meta";
import { useTheme } from "../context/ThemeContext";

interface TagInputProps {
  tags: ITag[];
  selectedTags: ITag[];
  onTagChange: (tags: ITag[]) => void;
  onTagAdd?: (tag: string) => void;
}

const TagInput: Component<TagInputProps> = (props) => {
  const { theme } = useTheme();
  let inputRef: HTMLInputElement;

  const [searchText, setSearchText] = createSignal("");
  const [isDropdownOpen, setDropdownOpen] = createSignal(false);

  // Filter tags based on search text
  const filteredTags = createMemo(() =>
    (props.tags ?? []).filter(
      (tag) => !props.selectedTags.some((selectedTag) => selectedTag.id === tag.id)
    )
  );

  const handleTagAdd = (tag: ITag) => {
    const newTags = [...props.selectedTags, tag];
    props.onTagChange(newTags);
    setSearchText(""); // Clear search text
    setDropdownOpen(true); // Keep dropdown open
  };

  const handleTagRemove = (tag: ITag) => {
    const newTags = props.selectedTags.filter((t) => t.id !== tag.id);
    props.onTagChange(newTags);
  };

  const handleAddNewTag = () => {
    const newTag = { id: Date.now().toString(), name: searchText() };
    props.onTagAdd?.(searchText());
    setSearchText('')
  };

  const handleInputFocus = () => {
    setDropdownOpen(true);
  };

  const handleInputBlur = (e: FocusEvent) => {
    if (!(e.relatedTarget instanceof HTMLElement && e.relatedTarget.closest(".tag-dropdown-menu"))) {
      setDropdownOpen(false);
    }
  };

  createEffect(() => {
    console.log(props.tags, props.selectedTags)
  })

  onCleanup(() => {
    inputRef?.removeEventListener("focus", handleInputFocus);
    inputRef?.removeEventListener("blur", handleInputBlur);
  });

  return (
    <>
      <Style>{`
        .tag-input-wrapper {
          display: flex;
          align-items: center;
          border-bottom: 1px solid ${theme().textColor};
          margin-bottom: 2rem;
          padding: 0.5rem;
          cursor: text;
          position: relative;
          z-index: 10;
        }
        .tag-button {
          background-color: #f1f1f1;
          border: none;
          color: black;
          padding: 5px 10px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 14px;
          cursor: pointer;
          border-radius: 16px;
          white-space: nowrap;
          margin-bottom: 0.5rem;
          margin-right: 0.5rem;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .tag-input {
            all: unset;
            border-bottom: unset!important;
            width: 100%;
        }
        .tag-button:hover {
          background-color: #ddd;
        }
          .modal {
  overflow: visible; /* Ensure dropdown isn't clipped */
}
.tag-dropdown-menu {
  position: absolute;
  top: 100%; /* Ensure it appears below the input */
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
  z-index: 1060; /* Bootstrap modals typically use z-index 1050 */
  max-height: 200px;
  overflow-y: auto; /* Enable scrolling */
  padding: 5px;
  display: flex;
  flex-direction: column;

}
        .dropdown-item {
          padding: 0.5rem;
          cursor: pointer;
          transition: background-color 0.2s;
          position: relative;
        }
        .dropdown-item:hover {
          background-color: #f1f1f1;
        }
        .add-new-tag {
          color: ${theme().textColor};
          font-weight: bold;
        }
      `}</Style>
      <div
        class="tag-input-wrapper"
        onClick={() => {
          inputRef?.focus()
          setDropdownOpen(true)
        }}
        tabindex="0"
      >
        <For each={props.selectedTags}>
          {(tag) => (
            <button
              class="tag-button"
              type="button"
              onClick={() => handleTagRemove(tag)}
            >
              {tag.text} <IoClose />
            </button>
          )}
        </For>
        <input
          ref={inputRef!}
          //   class="custom-input"
          class="tag-input"
          value={searchText()}
          onInput={(e) => setSearchText(e.currentTarget.value)}
          onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          placeholder="Type to search or add tags..."
        />
<Show when={isDropdownOpen() && (filteredTags().length > 0 || searchText().trim())}>          <div class="tag-dropdown-menu">
            <For each={filteredTags()}>
              {(tag) => (
                <div
                  class="dropdown-item"
                  tabindex="0"
                  onClick={() => handleTagAdd(tag)}
                >
                  {tag.text}
                </div>
              )}
            </For>
            <Show when={filteredTags().length === 0 && searchText()}>
              <div
                class="dropdown-item add-new-tag"
                tabindex="0"
                onClick={handleAddNewTag}
              >
                Add new tag: "{searchText()}"
              </div>
            </Show>
          </div>
        </Show>
      </div>
    </>
  );
};

export default TagInput;