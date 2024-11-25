class SwitchMDWC extends BaseComponent {
  static properties = {
    checked: { attribute: "checked", default: false },
    disabled: { attribute: "disabled", default: false },
  };

  constructor() {
    super();
    this.classList.add("mdwc-switch");
  }

  onConnect() {
    this.addEventListener("click", this._toggle.bind(this));
  }

  _toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.dispatchCustomEvent("change", { checked: this.checked });
      this._updateSliderPosition();
    }
  }

  _updateSliderPosition() {
    this.checked
      ? this.classList.add("checked")
      : this.classList.remove("checked");
  }

  render() {
    this.innerHTML = `
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
    `;
    this._updateSliderPosition();
  }
}

customElements.define("switch-mdwc", SwitchMDWC);
