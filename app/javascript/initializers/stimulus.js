import { Application } from "@hotwired/stimulus";

const kebabize = (str) =>
  str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? "-" : "") + $.toLowerCase().replaceAll("-controller", "")
  );

const application = Application.start();
window.Stimulus = application;
window.ourStimulus = application;

const controllerModules = import.meta.glob("../controllers/*_controller.js");
Object.keys(controllerModules).forEach((name) => {
  const newName = kebabize(name).replaceAll("-controller", "");
  application.register(newName, controllerModules[name]);
});
