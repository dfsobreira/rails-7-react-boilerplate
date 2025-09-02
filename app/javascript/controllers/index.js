// Load all the controllers within this directory and all subdirectories.
// Controller files must be named *_controller.js.

import { Application } from "@hotwired/stimulus";

import TestController from "./test_controller";
import HelloController from "./hello_controller";

const application = Application.start();
application.debug = false;
window.Stimulus = application;

application.register("test", TestController);
application.register("hello", HelloController);

export { application };
