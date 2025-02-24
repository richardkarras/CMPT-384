// Docs: https://www.npmjs.com/package/@seanwong24/json-x
import Evaluator, {
    DEFAULT_FNS,
    wrapSimpleFn,
} from "https://esm.sh/@seanwong24/json-x@^0.1";

export default class extends HTMLElement {
    #evaluator;

    obtainHeaderCallback = () => "Foo";

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // create the evaluator
        this.#evaluator = new Evaluator();
        // load the default functions as pre-defined functions into the evaluator
        this.#evaluator.addFns(DEFAULT_FNS);
    }

    async hostFirstLoadedCallback() {
        await this.renderUI(this.shadowRoot);
    }

    async renderUI(container) {
        // ask user input for two values
        const v1 = prompt("enter a number (v1):", 1);
        const v2 = prompt("enter a number (v2):", 1);

        // add two custom functions to evaluators
        // they basically just return the coresponding values
        this.#evaluator.addFns({
            v1: wrapSimpleFn(() => +v1),
            v2: wrapSimpleFn(() => +v2),
        });

        // evaluate the JSON expression (from `this.expr`)
        const result = await this.#evaluator.eval(this.expr);

        // display the result
        container.innerHTML = /* html */ `
            <div>v1: ${v1}</div>
            <div>v2: ${v2}</div>
            <div>evaluated result: ${JSON.stringify(result)}</div>
        `;
    }
}
