export default class extends HTMLElement {
    obtainHeaderCallback = () => `My Tile Layer`;

    constructor() {
        super();
        const container = this.attachShadow({ mode: "open" });
        container.innerHTML = "This is my tile layer plugin.";
    }

    async hostFirstLoadedCallback() {
        await this.#createAndAddATileLayerIntoMap();
    }

    async #createAndAddATileLayerIntoMap() {
        const geojson = await this.queryDataDelegate(
            `geojson:${this.fileName}`,
        );

        const geojsonLayer = this.leaflet?.geoJSON(
            geojson,
            {
                style: (feature) => ({
                    color: feature.properties.id > 1 ? "red" : "blue",
                }),
                onEachFeature: (feature, layer) => {
                    layer.on("click", () => {
                        this.updateSharedStatesDelegate?.({
                            ...this.sharedStates,
                            metadata: feature.properties,
                        });
                    });
                },
            },
        );

        this.addMapLayerDelegate?.(
            geojsonLayer,
            this.layerName,
            this.layerType,
            this.active,
        );
    }
}
