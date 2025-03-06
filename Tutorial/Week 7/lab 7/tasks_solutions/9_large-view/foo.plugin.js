export default class extends HTMLElement {
    obtainHeaderCallback = () => `Foo`;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    // this is a callback of `HTMLElement`
    // it is invoked each time the current element is connected to the DOM
    // we can use this one to track the container change in this case
    connectedCallback() {
        // we can use the VGA provided `checkIfPluginIsInTheLargePresenterDelegate` function
        // to check if the plugin is currently in the large presenter
        // TODO 1: uncomment the following block to show different content when in the large presenter
        if (this.checkIfPluginIsInTheLargePresenterDelegate?.()) {
            this.shadowRoot.innerHTML =
                /* html */ `<div style="font-size: 5em;">Hello from the large plugin view.</div>`;
            return;
        }

        this.shadowRoot.innerHTML = `Hello, world!`;
    }
}
