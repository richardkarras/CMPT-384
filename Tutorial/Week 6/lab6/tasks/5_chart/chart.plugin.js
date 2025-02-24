/*
 * We are importing a charting library `chart.js`. The docs are available at https://www.chartjs.org/docs/.
 */
import Chart from "https://esm.sh/chart.js@^4/auto";

export default class extends HTMLElement {
    #mainContainer;

    obtainHeaderCallback = () => `My Chart`;

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
        // create a `canvas` inside the main container
        const chartCanvas = document.createElement("canvas");
        this.#mainContainer.append(chartCanvas);

        // render the chart
        this.#renderChart(chartCanvas);
    }

    // TODO 1: modify it to pass the data from the config file
    // TODO 2: modify it to show another type of a chart
    #renderChart(canvas) {
        const data = {
            labels: [
                "Red",
                "Blue",
                "Yellow",
            ],
            datasets: [{
                label: "My First Dataset",
                data: [300, 50, 100],
                backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                ],
                hoverOffset: 4,
            }],
        };
        const config = {
            type: "doughnut",
            data: data,
        };
        new Chart(canvas, config);
    }
}
