/*
 * We are importing a Markdown parsing library `marked`. The docs are available at https://www.npmjs.com/package/marked.
 */
import { marked } from "https://esm.sh/marked@^15";

export default class extends HTMLElement {
    obtainHeaderCallback = () => `Markdown`;

    // basically, you can consider the library `marked` provides a function `marked.parse()`, which takes a markdown string and returns a parsed HTML string
    // TODO 1: find where the `marked` should be used, and replace that part of the code to make the plugin shows the parsed markdown content
    // TODO 2: try to pass the markdown URL from the config file
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    hostFirstLoadedCallback() {
        // this is just a shorthand to get the previously attched shadowDOM (using `this.attachShadow({ mode: "open" })`)
        const container = this.shadowRoot;
        if (!container) {
            return;
        }

        const MARKDOWN_URL = myurl;
        this.#renderMarkdown(
            new URL(MARKDOWN_URL, document.baseURI),
            container,
        );
    }

    async #renderMarkdown(url, container) {
        if (!url) {
            return;
        }
        const content = await this.#fetchMarkdownContent(url);
        container.innerHTML = marked.parse(content);
    }

    async #fetchMarkdownContent(url) {
        return await fetch(url).then((res) => res.text());
    }
}
