/*
 * We are importing a charting library `chart.js`. The docs are available at https://www.chartjs.org/docs/.
 */
import Chart from "https://esm.sh/chart.js@^4/auto";

export default class extends HTMLElement {
    #mainContainer;
    set sharedStates(value) {
        this.metadata = value?.metadata;
    };


    obtainHeaderCallback = () => `Census Data`;

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

    async #renderChart(canvas) {
        // Import geojson file 
        const geojsonPath = "./data/CanadaCensus.geojson";
        const geojson = await fetch(geojsonPath).then(response => response.json());
        // Extract data from the imported GeoJSON file
        const data = {
            labels: geojson.features.map(feature => feature.properties.sname),
            datasets: [
                {
                    label: "Census 2016",
                    data: geojson.features.map(feature => feature.properties.census2016),
                    backgroundColor: "rgb(255, 99, 132)",
                },
                {
                    label: "Census 2021",
                    data: geojson.features.map(feature => feature.properties.census2021),
                    backgroundColor: "rgb(54, 162, 235)",
                }
            ]
        };
        

        
        console.log(data);
        
        const config = {
            type: 'bar',
            data: data,
            options: {
            onClick: (e, elements) => {
                if (elements.length > 0) {
                const elementIndex = elements[0].index;
                const tooltipData = {
                    Region: data.labels[elementIndex],
                    Population2016: data.datasets[0].data[elementIndex],
                    Population2021: data.datasets[1].data[elementIndex]
                };
                console.log(tooltipData);
                this.updateSharedStatesDelegate?.({
                    ...this.sharedStates,
                    metadata: tooltipData
                });
                }
            },
            scales: {
                y: {
                beginAtZero: true,
                }
            },
            responsive: true,
            plugins: {
                legend: {
                position: 'top',
                },
                title: {
                display: true,
                text: 'Canadian Census Data 2016 and 2021'
                },
                tooltip: {
                enabled: true
                }
            },
            aspectRatio: 0.75
            }
        };

        new Chart(canvas, config);
    }
}
