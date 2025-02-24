export default class extends HTMLElement {
    obtainHeaderCallback = () => `My Better Tile Layer`;

    constructor() {
        super();
        const container = this.attachShadow({ mode: "open" });
        container.innerHTML = "This is my tile layer plugin.";
    }

    hostFirstLoadedCallback() {
        this.#createAndAddATileLayerIntoMap();
    }

    #createAndAddATileLayerIntoMap() {
        /*
        A VGA plugin can receive props from the configuration file.
        You can check [`./config.json`](./config.json) to see which props are passed in to the plugin.
        The passed in props can be accessed as class properties in the plugin.
        For example, if a prop `foo` is passed in, you can access it using `this.foo`.
        */

        /*
        TODO 1:
        - replace the first parameter of the `tileLayer` function with `this.urlTemplate`
        - replace the second parameter of the `tileLayer` function with `this.options`
        */
        const tileLayer = this.leaflet?.tileLayer(
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            },
        );

        /*
        TODO 2:
        - replace the second parameter of the `addMapLayerDelegate` function with `this.layerName`
        - replace the third parameter of the `addMapLayerDelegate` function with `this.layerType`
        - replace the fourth parameter of the `addMapLayerDelegate` function with `this.active`
        */
        this.addMapLayerDelegate?.(
            tileLayer,
            "My Tile Layer",
            "base-layer",
            true,
        );

        // TODO 3: Go to [`./config.json`](./config.json) and modify some props there
    }
}
