import cssModule from "./button-styles.js";
class ButtonMDWC extends BaseComponent {
  static get properties() {
    return {
      disabled: { attribute: "disabled", type: Boolean, default: false },
      softDisabled: {
        attribute: "soft-disabled",
        type: Boolean,
        default: false,
      },
      href: { attribute: "href", type: String, default: "" },
      target: { attribute: "target", type: String, default: "" },
      trailingIcon: {
        attribute: "trailing-icon",
        type: Boolean,
        default: false,
      },
      hasIcon: { attribute: "has-icon", type: Boolean, default: false },
      type: { attribute: "type", type: String, default: "submit" },
      value: { attribute: "value", type: String, default: "" },
      variant: { attribute: "variant", default: "filled", required: true },
      name: { type: String, default: "" },
      form: { type: HTMLFormElement, default: "" },
    };
  }
  static events = [{ event: "click", handler: "_handleClick" }];
  static styles = [cssModule];

  constructor() {
    super();
  }
  _handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    if (this.href) {
      window.open(this.href, this.target);
    } else if (this.type === "submit") {
      const form = this._getFormElement();
      if (form) form.submit();
    } else {
      this.dispatchCustomEvent("button-click", { value: this.value });
    }
  }
  getRenderContent() {
    const { disabled, softDisabled, type, name, value, variant } = this;
    const buttonClass = `mdc-button ${
      variant ? `mdc-button--${variant}` : ""
    } ${disabled || softDisabled ? "disabled" : ""}`;
    return `
      <button
        class="${buttonClass}"
        type="${type}"
        name="${name}"
        value="${value}"
        ${disabled ? "disabled" : ""}
        ${softDisabled ? "aria-disabled='true'" : ""}
      >
        <slot name="icon-leading" class="icon leading"></slot>
        <slot class="label">Button</slot>
        <slot name="icon-trailing" class="icon trailing"></slot>
      </button>
    `;
  }
}

customElements.define("button-mdwc", ButtonMDWC);
