export default class extends HTMLElement {
    obtainHeaderCallback = () => `My Tile Layer`;

    constructor() {
        super();
        const container = this.attachShadow({ mode: "open" });
        container.innerHTML = "This is my tile layer plugin.";
    }

    /** This is a VGA callback function, which would be called when the VGA core is loaded at the first time. */
    hostFirstLoadedCallback() {
        /*
        VGA provides some built-in [Leaflet](https://leafletjs.com/) support.
        The Leaflet instance is provided and can be accessed with `this.leaflet`.
        We can use `this.addMapLayerDelegate`, which is provided by VGA as well, to add a created layer into the map.
        */
        // TODO 1: Uncomment the following line
        this.#createAndAddATileLayerIntoMap();
    }

    #createAndAddATileLayerIntoMap() {
        // This creates a Leaflet tile layer
        const tileLayer = this.leaflet?.tileLayer(
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            },
        );

        // This adds the tile layer into the map
        this.addMapLayerDelegate?.(
            tileLayer,
            "My Tile Layer", // This is label of the layer that would be shown in the layer control
            "base-layer", // This is type of the layer (base-layer or overlay)
            true, // This is to determine whether it would be active by default
        );
    }
}
