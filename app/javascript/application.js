// Entry point for the build script in your package.json
import "@hotwired/turbo-rails";
import "./controllers";
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { initializeReactRenderer } from "./helpers";
import TestComponent from "./components/TestComponent";

// Make React and components globally available
window.React = React;
window.ReactDOM = ReactDOM;
window.ReactDOM.createRoot = createRoot; // Add createRoot manually
window.TestComponent = TestComponent;

// Initialize React component rendering
initializeReactRenderer();
