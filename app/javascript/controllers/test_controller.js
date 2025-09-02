import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["message", "counter", "colorBox"];
  static values = {
    initialCount: Number,
    colors: Array,
  };

  connect() {
    console.log("Test Stimulus controller connected!");
    this.count = this.initialCountValue || 0;
    this.colorIndex = 0;
    this.updateDisplay();
  }

  disconnect() {
    console.log("Test Stimulus controller disconnected!");
  }

  increment() {
    this.count++;
    this.updateDisplay();
  }

  decrement() {
    this.count--;
    this.updateDisplay();
  }

  reset() {
    this.count = this.initialCountValue || 0;
    this.updateDisplay();
  }

  changeColor() {
    if (this.hasColorBoxTarget) {
      const colors = this.colorsValue || [
        "bg-red-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-purple-500",
      ];
      this.colorIndex = (this.colorIndex + 1) % colors.length;
      this.colorBoxTarget.className = `w-16 h-16 rounded-lg transition-all duration-300 ${
        colors[this.colorIndex]
      }`;
    }
  }

  showAlert() {
    const message = this.hasMessageTarget
      ? this.messageTarget.value
      : "Hello from Stimulus!";
    alert(message);
  }

  toggleVisibility() {
    const element = this.element.querySelector(".toggle-content");
    if (element) {
      element.classList.toggle("hidden");
    }
  }

  updateDisplay() {
    if (this.hasCounterTarget) {
      this.counterTarget.textContent = this.count;
    }
  }
}
