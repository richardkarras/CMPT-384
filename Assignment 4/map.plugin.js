export default class extends HTMLElement {
    obtainHeaderCallback = () => `My Tile Layer`;

    constructor() {
        super();
        const container = this.attachShadow({ mode: "open" });
        container.innerHTML = "This is my tile layer plugin.";
    }

    hostFirstLoadedCallback() {
        this.#createAndAddATileLayerIntoMap();
    }

    #createAndAddATileLayerIntoMap() {
        const tileLayer = this.leaflet?.tileLayer(
            this.urlTemplate,
            this.options,
        );

        this.addMapLayerDelegate?.(
            tileLayer,
            this.layerName,
            this.layerType,
            this.active,
        );
    }
}

