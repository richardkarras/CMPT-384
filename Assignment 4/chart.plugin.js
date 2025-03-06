/*
 * We are importing `d3`. The docs are available at https://d3js.org/.
 */
import * as d3 from "https://esm.sh/d3@^7";

export default class extends HTMLElement {
    #mainContainer;

    obtainHeaderCallback = () => `Assignment 4, Q1`;

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
                .attr("preserveAspectRatio","xMidYMid meet")
                .on("pointerenter pointermove", pointermoved)
                .on("pointerleave", pointerleft)
                .on("touchstart", event => event.preventDefault());
            
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

            //Tooltip start
            const tooltip = svg.append("g");

            function formatAge(age) {
                return age.toLocaleString("en", {style: "decimal",labelAge: "Age"});
            }
            function formatHours(leisure_hours){
                return leisure_hours.toLocaleString("en", {style: "decimal",labelHours: "Leisure Hours per day"});
            }
            //Tooltip end
            //Event Listeners start
            const bisect = d3.bisector(d => d.age).center;
            function pointermoved(event) {
                const i = bisect(data, canvasXscale.invert(d3.pointer(event)[0]));
                tooltip.style("display",null);
                tooltip.attr("transform", `translate(${canvasXscale(data[i].age)},${canvasYscale(data[i].leisure_hours)})`);
            
                const path = tooltip.selectAll("path")
                    .data([,])
                    .join("path")
                    .attr("fill","white")
                    .attr("stroke","black");

                const text = tooltip.raise().selectAll("text")
                    .data([,])
                    .join("text")
                    .call(text => text
                        .selectAll("tspan")
                        .data(["Age: " + formatAge(data[i].age),"Leisure Hours: " +formatHours(data[i].leisure_hours)])
                        .join("tspan")
                        .attr("x",0)
                        .attr("y", (_ , i) => `${i * 1.1}em`)
                        .attr("font-weight", (_ , i) => i ? null : "bold")
                        .style("font-size", "2px")
                        .text(d => d)
                        );
                size(text,path);
            }

            function pointerleft() {
                tooltip.style("display","none");
            }

            function size(text, path) {
                const {x, y, width: w, height: h} = text.node().getBBox();
                text.attr("transform", `translate(${-w / 2},${6 - y})`);
                path.attr("d", `M${-w / 2 - 1},5H-5,-5,5H${w / 2 + 1}v${h + 2}h-${w + 2}z`);
            }

            //Event Listeners end

            // Add points
            svg.selectAll(".dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", d => canvasXscale(d.age))
                .attr("cy", d => canvasYscale(d.leisure_hours))
                .attr("r", 1)
                .style("fill", "steelblue");

            // Add line
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 0.5)
                .attr("d", d3.line()
                .curve(d3.curveBasis)
                    .x(function(d) { return canvasXscale(d.age); })
                    .y(function(d) { return canvasYscale(d.leisure_hours); })
                );
        });
    }
}
