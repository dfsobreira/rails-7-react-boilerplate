// React Component Renderer
// This file handles the automatic rendering of React components in the DOM

// Function to render a React component by name
export const renderReactComponent = (componentName, container, props = {}) => {
  const Component = window[componentName];
  if (!Component) {
    console.error(`Component "${componentName}" not found`);
    return;
  }

  if (!container) {
    console.error("Container element not provided");
    return;
  }

  if (!window.React || !window.ReactDOM) {
    console.error("React or ReactDOM not available");
    return;
  }

  // Check if createRoot is available (React 18+)
  if (window.ReactDOM.createRoot) {
    const root = window.ReactDOM.createRoot(container);
    root.render(window.React.createElement(Component, props));
  } else if (window.ReactDOM.render) {
    // Fallback for older React versions
    window.ReactDOM.render(
      window.React.createElement(Component, props),
      container
    );
  } else {
    console.error("ReactDOM.createRoot and ReactDOM.render are not available");
  }
};

// Function to render component with data from dataset
export const renderComponentWithData = (
  componentName,
  containerId,
  dataAttribute = "data"
) => {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }

  const data = dataAttribute ? JSON.parse(dataAttribute) : {};

  renderReactComponent(componentName, container, data);
};

// Auto-render components marked with data-react-component
export const autoRenderComponents = () => {
  const components = document.querySelectorAll("[data-react-component]");

  components.forEach((element) => {
    const componentName = element.dataset.reactComponent;
    const dataAttribute = element.dataset.reactData || "reactData";

    if (componentName) {
      renderComponentWithData(componentName, element.id, dataAttribute);
    }
  });
};

// Initialize React rendering when DOM is ready
export const initializeReactRenderer = () => {
  document.addEventListener("DOMContentLoaded", function () {
    // Auto-render components with data-react-component attribute
    autoRenderComponents();
  });
};

// Make functions globally available for manual use
window.renderReactComponent = renderReactComponent;
window.renderComponentWithData = renderComponentWithData;
window.autoRenderComponents = autoRenderComponents;
