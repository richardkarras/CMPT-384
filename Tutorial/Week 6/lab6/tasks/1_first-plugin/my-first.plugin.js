/**
 * A valid plugin file needs to be an ES module and export a default class that extends `HTMLElement`.
 * Basically, it should be ready to be loaded as a [web component](https://developer.mozilla.org/en-US/docs/web/web_components).
 * The inner content of the HTML element would be shown as the plugin's UI.
 */
export default class extends HTMLElement {
    /** This is a mandatory method to be implemented that returns the header of the plugin to be shown. */
    obtainHeaderCallback = () => `My First Plugin`;

    constructor() {
        super();
        /*
        Here `this` is the HTML element itself, we use the `attachShadow` function only for better isolation.
        The returned node can be used as our plugin's UI container.
        */
        const container = this.attachShadow({ mode: "open" });

        /*
        We can directly assign its `innerHTML`
        */
        // TODO 1: Modify the `innerHTML` to `"Hello World!"`
        container.innerHTML = "Hello World!";

        /*
        We can also create a HTML element and append to it.
        */
        // TODO 2: Uncomment the following line
        this.#renderButton(container);

        // TODO 3: Try adding something else that your want
    }

    #renderButton(container) {
        const button = document.createElement("button");
        button.innerText = "Click me!";
        button.addEventListener("click", () => alert("Button clicked."));
        container.append(button);
    }
}
