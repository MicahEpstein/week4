import universityCity from '../data/universitycity.js';

function initializeStopMap () {
    //initial zoom and center
    let stopMap = L.map('stop-map').setView([39.95315006697334, -75.1973682197421], 14.5);

    //add basemap
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
    }).addTo(stopMap);

    //including UCity polygon and restyling
    L.geoJSON(universityCity, {
        style: { fill: null, color: '#000' },
    })
    .addTo(stopMap);

    return stopMap;
}


//function that converts .js into GeoJSON format
    function makeStopFeature(stop){
        return{
            'type': 'Feature',
            'properties': {
                'routes_ids':stop['routes_ids'],
                'stop_id':stop['stop_id'],
                'stop_name':stop['stop_name'],
                'wheelchair_boarding':stop['wheelchar_boarding'],
            },
            'geometry': stop['geom'],
        };
}


function showStopsOnMap (stopsToShow, stopMap) {
    if (stopMap.stopLayers !== undefined) {
        stopMap.removeLayer(stopMap.stopLayers);
      }
    /*creates a new Feature Collection from those converted GeoJSON objects.
    Use "const" b/c no intent to change later on.*/
    const stopFeatureCollection ={
        "type":"FeatureCollection",
        "features":stopsToShow.map(makeStopFeature),
    };

    //add feature collection to map
    stopMap.stopLayers = L.geoJSON(stopFeatureCollection, {
        pointToLayer: (geoJSONPoint, latlng) => L.circleMarker(latlng),
        style: {
            stroke: null,
            fillOpacity: 0.8,
            radius: 5,
        },
    })
    .bindTooltip(layer => layer.feature.properties['stop_name'])
    .addTo(stopMap);
}

export{
    initializeStopMap,
    showStopsOnMap,
};

window.universityCity = universityCity;
