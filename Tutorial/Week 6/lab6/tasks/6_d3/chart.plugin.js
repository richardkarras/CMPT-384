/*
 * We are importing `d3`. The docs are available at https://d3js.org/.
 */
import * as d3 from "https://esm.sh/d3@^7";

export default class extends HTMLElement {
    #mainContainer;

    obtainHeaderCallback = () => `My D3 Chart`;

    constructor() {
        super();
        const container = this.attachShadow({ mode: "open" });

        // create a `div` as the main chart container
        this.#mainContainer = document.createElement("div");
        this.#mainContainer.style.position = "relative";
        this.#mainContainer.style.height = "100%";
        this.#mainContainer.style.width = "100%";
        container.append(this.#mainContainer);
    }

    hostFirstLoadedCallback() {
        // render the chart
        this.#renderChart(this.#mainContainer);
    }

    // TODO 1: replace the large red rectangle and implement your own D3 vis here
    #renderChart(mainContainer) {
        const svg = d3.select(mainContainer)
            .append("svg")
            .attr("height", "100%")
            .attr("width", "100%")
            .attr("viewBox", "0 0 100 100")
            .attr("preserveAspectRatio", "xMidYMid meet");
        svg.append("rect")
            .attr("x", 10)
            .attr("y", 10)
            .attr("width", 80)
            .attr("height", 80)
            .attr("fill", "red");
    }
}
