class BaseComponent extends HTMLElement {
  static get observedAttributes() {
    return Object.keys(this.properties || {}).map(
      (prop) => this.properties[prop].attribute
    );
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.constructor.styles) {
      this.shadowRoot.adoptedStyleSheets = this.constructor.styles;
      document.adoptedStyleSheets = this.constructor.styles;
      // this._styles = document.createElement("style");
      // this._styles.textContent = this.constructor.styles;
      // this.shadowRoot.appendChild(this._styles);
    }
    this._wrapper = document.createElement("div");
    this._wrapper.classList.add("wrapper");
    this.shadowRoot.appendChild(this._wrapper);

    this._boundEvents = [];
    this._initializeProperties();
    this._initializeEvents();
    this._renderPending = false;
  }

  connectedCallback() {
    if (typeof this.onConnect === "function") {
      this.onConnect();
    }
    this._requestRender();
  }
  disconnectedCallback() {
    if (typeof this.onDisconnect === "function") {
      this.onDisconnect();
    }
    this._disposeEvents();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    const prop = this.constructor.attributeToProperty(name);
    if (prop) {
      const convertedValue = this._convertAttributeValue(newValue);
      if (this[`_${prop}`] !== convertedValue) {
        this[`_${prop}`] = convertedValue;
        this._propertyUpdated(prop, convertedValue);
      }
    }
  }
  _initializeProperties() {
    const props = this.constructor.properties || {};
    for (const [prop, options] of Object.entries(props)) {
      if (options.hasOwnProperty("default")) {
        this[prop] = options.default;
      }
      this._createPropertyAccessors(prop, options.attribute);
    }
  }
  _initializeEvents() {
    const events = this.constructor.events || [];
    events.forEach(({ event, handler }) => {
      if (typeof this[handler] === "function") {
        const boundHandler = this[handler].bind(this);
        this.addEventListener(event, boundHandler);
        this._boundEvents.push({ event, handler: boundHandler });
      }
    });
  }
  _disposeEvents() {
    this._boundEvents.forEach(({ event, handler }) => {
      this.removeEventListener(event, handler);
    });
    this._boundEvents = [];
  }
  static attributeToProperty(attr) {
    const properties = this.properties || {};
    for (const [prop, options] of Object.entries(properties)) {
      if (options.attribute === attr || this._camelToKebab(prop) === attr) {
        return prop;
      }
    }
    console.warn(`No property found for attribute: ${attr}`);
    return null;
  }
  static _camelToKebab(str) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  _createPropertyAccessors(prop, attribute) {
    Object.defineProperty(this, prop, {
      get() {
        return this[`_${prop}`];
      },
      set(value) {
        const oldValue = this[`_${prop}`];
        if (oldValue !== value) {
          this[`_${prop}`] = value;
          this._propertyUpdated(prop, value);

          if (attribute && this.getAttribute(attribute) !== String(value)) {
            this.setAttribute(attribute, value);
          }

          this._requestRender();
        }
      },
    });
  }
  _propertyUpdated(prop, value) {
    if (typeof this.onPropertyChange === "function") {
      this.onPropertyChange(prop, value);
    }
  }
  _requestRender() {
    if (!this._renderPending) {
      this._renderPending = true;
      requestAnimationFrame(() => {
        this.render();
        this._renderPending = false;
      });
    }
  }
  _convertAttributeValue(value) {
    if (value === "true") return true;
    if (value === "false") return false;
    if (!isNaN(value) && value !== "") return Number(value);
    return value;
  }
  dispatchCustomEvent(eventName, detail = {}) {
    this.dispatchEvent(
      new CustomEvent(eventName, { detail, bubbles: true, composed: true })
    );
  }
  getRenderContent() {
    return "";
  }
  render() {
    this._wrapper.innerHTML = "";
    const content = this.getRenderContent();
    this._wrapper.insertAdjacentHTML("afterbegin", content);
  }
}
