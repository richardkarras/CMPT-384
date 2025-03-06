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
        // Retrieve the GeoJSON object from the config file
        const geojson = this.geojson;

        console.log(geojson);
        const geojsonLayer = this.leaflet?.geoJSON(
            geojson,
            {
                style: (feature) => ({
                    color: feature.properties.id > 1 ? "red" : "blue"
                })
            }
        );

        geojsonLayer.bindPopup((layer) => layer.feature.properties.description);

        this.addMapLayerDelegate?.(
            geojsonLayer,
            this.layerName,
            this.layerType,
            this.active
        );
    }
}
