export default class extends HTMLElement {
    obtainHeaderCallback = () => `My Data Consumer`;

    constructor() {
        super();
        const container = this.attachShadow({ mode: "open" });

        const button = document.createElement("button");
        button.innerText = "Query Data";
        // we use an arrow function to wrap the handler to make sure that
        // inside the handler, `this` is the current HTML element instead of the button element
        button.addEventListener("click", () => this.#queryData());

        container.append(button);
    }

    async #queryData() {
        const dataSource = prompt("Enter the data source", "demo:my/data/path");
        const queryObject = JSON.parse(
            prompt("Enter the query object", `{"foo": 1}`),
        );
        // we can call the VGA provided function `queryDataDelegate` to query the data
        // the first arugment should be a string as format of `<data-type-identifier>:<data-source> (for example "csv:my/data/url")
        // the second argument could be any object that the corresponding data provider can understand (for example `{sql: "SELECT * FROM my-table"}`)
        const data = await this.queryDataDelegate(dataSource, queryObject);
        alert(JSON.stringify(data));
    }
}
