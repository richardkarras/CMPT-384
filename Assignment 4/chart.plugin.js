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

    
    #renderChart(mainContainer) {
        d3.csv("leisure_data-1.csv").then(function(data) {
            console.log(data);
            
            //get max data values for chart scaling
            var ageMax = d3.max(data, d=>d.age);
            var leisureMax = d3.max(data, d=>d.leisure_hours);
            console.log(`Max Age: ${ageMax}, Max Leisure: ${leisureMax}`);

            data = data.filter(function(d) {
                d.age = parseInt(d.age, 10);
                d.leisure_hours = parseFloat(d.leisure_hours);
                return d;
            });
            console.log(data);

            const canvasXscale = d3.scaleLinear()
                .domain([0, ageMax])
                .range([10, 90]);
            
            const canvasYscale = d3.scaleLinear()
                .domain([0, 12])
                .range([90, 10]);


            const svg = d3.select(mainContainer)
                .append("svg")
                .attr("height","100%")
                .attr("width","100%")
                .attr("viewBox","0 0 100 100")
                .attr("preserveAspectRatio","xMidYMid meet");
            
            // Add X axis
            svg.append("g")
                .attr("transform", `translate(0, 90)`)
                .call(d3.axisBottom(canvasXscale).ticks(7).tickSize(2).tickPadding(1))
                .selectAll("text")
                .style("font-size", "2px");
            // Add Y axis
            svg.append("g")
                .attr("transform", `translate(10, 0)`)
                .call(d3.axisLeft(canvasYscale).ticks(11).tickSize(2).tickPadding(1))
                .selectAll("text")
                .style("font-size", "2px");

            // Change axis draw weight
            svg.selectAll(".domain, .tick line")
                .style("stroke-width", "0.5px");

            // Add X axis label
            svg.append("text")
                .attr("x", 50)
                .attr("y", 98)
                .attr("fill", "black")
                .style("font-size", "2px")
                .text("Age (years)");

            // Add Y axis label
            svg.append("text")
                .attr("transform", `rotate(-90)`)
                .attr("x", -60)
                .attr("y", 5)
                .attr("fill", "black")
                .style("font-size", "2px")
                .text("Leisure Hours (per day)");

            svg.selectAll(".dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", d => canvasXscale(d.age))
                .attr("cy", d => canvasYscale(d.leisure_hours))
                .attr("r", 1)
                .style("fill", "steelblue");

        })
    
    }
}
