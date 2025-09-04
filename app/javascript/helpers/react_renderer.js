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

// Initialize React rendering when DOM is ready
export const initializeReactRenderer = () => {
  document.addEventListener("DOMContentLoaded", function () {
    const callback = () => {
      const mountPoints = document.querySelectorAll(
        "[data-react-component]:not([data-react-rendered])"
      );
      mountPoints.forEach((mountPoint) => {
        const componentName = mountPoint.dataset.reactComponent;
        const componentId = mountPoint.id;
        const props = mountPoint.dataset.reactData || "ReactData";
        renderComponentWithData(componentName, componentId, props);
        mountPoint.dataset.reactRendered = "true";
      });
    };
    const observer = new MutationObserver(callback);
    observer.observe(document, { childList: true, subtree: true });
  });
};

// Make functions globally available for manual use
window.renderReactComponent = renderReactComponent;
window.renderComponentWithData = renderComponentWithData;
