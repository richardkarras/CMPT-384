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

        const colors = ['#a50026','#d73027','#f46d43','#fdae61','#fee090','#ffffbf','#e0f3f8','#abd9e9','#74add1','#4575b4','#313695'];

        const geojsonLayer = this.leaflet?.geoJSON(
            geojson,
            {
            style: (feature) => ({
                weight: 0,
                fillOpacity: 0.5,
                color: colors[feature.properties.cartodb_id - 1] || '#000000', // Default to black if out of range
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
