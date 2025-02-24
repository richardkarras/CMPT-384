export default class extends HTMLElement {
    obtainHeaderCallback = () => `Foo`;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        if (this.checkIfPluginIsInTheLargePresenterDelegate?.()) {
            this.shadowRoot.innerHTML =
                /* html */ `<div style="font-size: 5em;">Hello from the large plugin view.</div>`;
            return;
        }

        this.shadowRoot.innerHTML = `Hello, world!`;
    }
}
