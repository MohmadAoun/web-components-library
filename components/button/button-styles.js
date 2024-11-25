const styles = new CSSStyleSheet();
styles.replaceSync(`
  div{
    display:inline;
  }
  .wrapper{
    margin:1%;
  }
  .mdc-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    font-size: var(--font-size);
    font-weight: var(--font-weight);
    border-radius: var(--border-radius);
    border: none;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
    text-transform: uppercase;
  }
  /* Button Variants */
  .mdc-button--filled {
    background-color: var(--primary-color);
    color: var(--background-color);
    box-shadow: var(--box-shadow);
  }
  .mdc-button--filled:hover {
    background-color: var(--hover-background);
  }
  .mdc-button--filled:active {
    background-color: var(--active-background);
  }
  .mdc-button--filled:disabled {
    background-color: var(--disabled-background);
    color: var(--disabled-text-color);
    cursor: not-allowed;
  }
  /* Outlined Variant */
  .mdc-button--outlined {
    border: 1px solid var(--primary-color); 
    background-color: transparent;
    color: var(--primary-color);
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }
  .mdc-button--outlined:hover {
    background-color: rgba(var(--primary-color-rgb), 0.1); 
    color: var(--background-color); 
    border-color: var(--hover-background); 
  }
  .mdc-button--outlined:active {
    background-color: rgba(var(--primary-color-rgb), 0.2); 
    border-color: var(--active-background); 
  }
  .mdc-button--outlined:disabled {
    background-color: transparent; 
    border-color: var(--disabled-background); 
    color: var(--disabled-text-color); 
    cursor: not-allowed;
  }
  /* Elevated Variant */
  .mdc-button--elevated {
    box-shadow: var(--box-shadow);
    background-color: var(--background-color);
    color: var(--text-primary-color);
  }
  .mdc-button--elevated:hover {
    box-shadow: var(--box-shadow-hover);
  }
  .mdc-button--elevated:disabled {
    box-shadow: none;
    background-color: var(--disabled-background);
    color: var(--disabled-text-color);
  }
  /* Text Variant */
  .mdc-button--text {
    background-color: transparent;
    color: var(--text-primary-color);
  }
  .mdc-button--text:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .mdc-button--text:disabled {
    color: var(--disabled-text-color);
  }
  /* Tonal Variant */
  .mdc-button--tonal {
    background-color: rgba(var(--primary-color-rgb), 0.2);
    color: var(--primary-color); 
  }
  .mdc-button--tonal:hover {
    background-color: rgba(var(--primary-color-rgb), 0.3); /* Slightly darker on hover */
  }
  .mdc-button--tonal:disabled {
    background-color: var(--disabled-background);
    color: var(--disabled-text-color);
  }
  /* FAB (Floating Action Button) */
  .mdc-button--fab {
    padding: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: var(--background-color);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-shadow: var(--box-shadow);
  }
  .mdc-button--fab:hover {
    background-color: var(--hover-background);
  }
  .mdc-button--fab:disabled {
    background-color: var(--disabled-background);
    color: var(--disabled-text-color);
  }
  /* Icon Button */
  .mdc-button--icon {
    padding: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: transparent;
    color: var(--text-primary-color);
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .mdc-button--icon:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .mdc-button--icon:disabled {
    color: var(--disabled-text-color);
  }
`);
export default styles;
