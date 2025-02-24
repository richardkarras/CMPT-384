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
        const geojson = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "id": 1,
                        "description": "This is the first feature",
                    },
                    "geometry": {
                        "coordinates": [
                            [
                                [
                                    -132.28956123183815,
                                    66.79321488278092,
                                ],
                                [
                                    -132.28956123183815,
                                    54.00963421298252,
                                ],
                                [
                                    -112.22676659883098,
                                    54.00963421298252,
                                ],
                                [
                                    -112.22676659883098,
                                    66.79321488278092,
                                ],
                                [
                                    -132.28956123183815,
                                    66.79321488278092,
                                ],
                            ],
                        ],
                        "type": "Polygon",
                    },
                },
                {
                    "type": "Feature",
                    "properties": {
                        "id": 2,
                        "description": "This is the second feature",
                    },
                    "geometry": {
                        "coordinates": [
                            [
                                [
                                    -101.48893285158782,
                                    63.344269594477055,
                                ],
                                [
                                    -101.48893285158782,
                                    51.089994270256994,
                                ],
                                [
                                    -71.53602818822567,
                                    51.089994270256994,
                                ],
                                [
                                    -71.53602818822567,
                                    63.344269594477055,
                                ],
                                [
                                    -101.48893285158782,
                                    63.344269594477055,
                                ],
                            ],
                        ],
                        "type": "Polygon",
                    },
                },
            ],
        };

        const geojsonLayer = this.leaflet?.geoJSON(
            geojson,
            // TODO 1: uncomment the following block to set the polygons' styles accroding to the properties
            // {
            //     style: (feature) => ({
            //         color: feature.properties.id > 1 ? "red" : "blue",
            //     }),
            // },
        );

        // TODO 2: uncomment the following block to bind Leaflet popups so that when we click on a feature, the popup shows up
        // geojsonLayer.bindPopup((layer) => layer.feature.properties.description);

        // TODO 3: try to pass the GeoJSON object from the config file

        this.addMapLayerDelegate?.(
            geojsonLayer,
            this.layerName,
            this.layerType,
            this.active,
        );
    }
}
