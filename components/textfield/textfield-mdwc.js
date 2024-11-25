import { regexPatterns } from "../base/RegEx/regexPatterns.js";
import { errorMessages } from "../base/err/errorMessages.js";

class TextField extends BaseComponent {
  static get properties() {
    return {
      disabled: { type: Boolean, attribute: "disabled" },
      error: { type: String, attribute: "error" },
      invalid: { type: Boolean, attribute: "invalid" },
      label: { type: String, attribute: "label" },
      leading: { type: String, attribute: "leading" },
      pattern: { type: Number, attribute: "pattern" },
      placeholder: { type: String, attribute: "placeholder" },
      variant: { type: String, attribute: "variant" },
      required: { type: Boolean, attribute: "required" },
      trailing: { type: String, attribute: "trailing" },
      type: { type: String, attribute: "type", default: "text" },
      value: { type: String, attribute: "value" },
    };
  }

  static events = [
    { event: "input", handler: "handleInput" },
    { event: "click", handler: "handleFocus" },
    { event: "blur", handler: "handleBlur" }, // Added blur event
  ];

  constructor() {
    super();
    this.value = ""; // Ensure value is initialized
  }

  handleFocus(event) {
    if (this.label) {
      this.querySelectorAll(".label").forEach((label) => {
        label.classList.add("focused");
      });
      console.log("Label focused");
    }
    event.stopPropagation();
  }

  handleBlur(event) {
    if (this.label && !this.value) {
      this.querySelectorAll(".label").forEach((label) => {
        label.classList.remove("focused");
      });
      console.log("Label unfocused");
    }
    event.stopPropagation();
  }

  handleInput(event) {
    if (this.label) {
      this.value = event.target.value;
      this.querySelectorAll(".label").forEach((label) => {
        if (this.value) {
          label.classList.add("focused");
        } else {
          label.classList.remove("focused");
        }
      });
      console.log("Input handled");
    }
    event.stopPropagation();
  }

  render() {
    this.innerHTML = `
      <div class="text-field-container ${
        this.variant ? this.variant : "outlined"
      }">
        <div class="input-wrapper">
          ${
            this.leading
              ? `<span class="icon leading-icon">${this.leading}</span>`
              : ""
          }
          ${
            this.label
              ? `<label class="label ${
                  this.leading ? `w-leading` : `wo-leading`
                }">${this.label}</label>`
              : ""
          }
          <input 
            type="${this.type}" 
            value="${this.value || ""}" 
            placeholder="${this.label ? "" : this.placeholder}"
            ${this.disabled ? "disabled" : ""}
          />
          ${
            this.trailing
              ? `<span class="icon trailing-icon">${this.trailing}</span>`
              : ""
          }
        </div>
        ${
          this.error
            ? `<div class="supporting-text">${errorMessages.firstName}</div>`
            : ``
        }
      </div>
    `;
  }
}

customElements.define("text-field", TextField);
