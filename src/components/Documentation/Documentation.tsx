import { Style } from "@solidjs/meta";
import { Component, For, createSignal, onMount } from "solid-js";

interface DocumentationData {
  categories: Array<{
    name: string;
    sections: Array<{
      header: string;
      description: string;
    }>;
  }>;
}

interface DocumentationSectionProps {
  data: DocumentationData;
  class?: string;
}

const DocumentationSection: Component<DocumentationSectionProps> = (props) => {
  const [activeCategory, setActiveCategory] = createSignal<string | null>(null);

  const handleTabClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  onMount(() => {
    setActiveCategory(props.data.categories[0]?.name || null);
  });

  return (
    <>
    <Style>{`
    
    .documentation-container {
  display: flex;
  font-family: "Helvetica Neue", sans-serif;
  color: #333;
}

.sidebar {
  width: 20%;
  padding: 1rem;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-right: 2px solid #e0e0e0;
  position: sticky;
  top: 0;
  height: calc(100vh);
}

.sidebar-tab {
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  margin: 0.5rem 0;
  text-align: left;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.sidebar-tab:hover,
.sidebar-tab.active {
  background: linear-gradient(90deg, #3498db, #9b59b6);
  color: white;
  transform: translateX(5px);
}

.documentation-content {
  width: 80%;
  padding: 2rem;
}

.documentation-category {
  margin-bottom: 3rem;
}

.category-name {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  border-bottom: 2px solid #3498db;
  display: inline-block;
  padding-bottom: 0.5rem;
}

.documentation-section {
  margin-bottom: 1.5rem;
}

.section-header {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.section-description {
  font-size: 1rem;
  color: #7f8c8d;
  line-height: 1.5;
}
`}</Style>
    <div class={`documentation-container ${props.class}`}>
      <nav class="sidebar">
        <For each={props.data.categories}>
          {(category) => (
            <button
              class={`sidebar-tab ${activeCategory() === category.name ? "active" : ""}`}
              onClick={() => {
                setActiveCategory(category.name);
                handleTabClick(category.name);
              }}
            >
              {category.name}
            </button>
          )}
        </For>
      </nav>
      <section class="documentation-content">
        <For each={props.data.categories}>
          {(category) => (
            <div id={category.name} class="documentation-category">
              <h2 class="category-name">{category.name}</h2>
              <For each={category.sections}>
                {(section) => (
                  <div class="documentation-section">
                    <h3 class="section-header">{section.header}</h3>
                    <p class="section-description">{section.description}</p>
                  </div>
                )}
              </For>
            </div>
          )}
        </For>
      </section>
    </div>
    </>
  );
};

export default DocumentationSection;