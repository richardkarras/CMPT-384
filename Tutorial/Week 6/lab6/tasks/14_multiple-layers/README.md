# The tile layer plugin

This task would guide you to create a multiple-layer dashboard.

Go to [`./config.json`](./config.json), in the `plugins` array, append the
following element and check the layer control.

```json
{
    "import": "my-tile-layer",
    "container": "",
    "props": {
        "layerName": "World_Imagery",
        "layerType": "base-layer",
        "active": false,
        "urlTemplate": "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        "options": {
            "attribution": "Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
        }
    }
},
{
    "import": "my-tile-layer",
    "container": "",
    "props": {
        "layerName": "World_Physical_Map",
        "layerType": "base-layer",
        "active": false,
        "urlTemplate": "https://server.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}",
        "options": {
            "attribution": "Source: US National Park Service"
        }
    }
}
```

Then append the following element and check the layer control. Since we use
`overlay` layer type for the GeoJSON layer, we can toggle it on or off in the
layer control.

```json
{
    "import": "my-geosjon-layer",
    "container": "",
    "props": {
        "layerName": "GeoJSON",
        "layerType": "overlay",
        "active": true
    }
}
```
