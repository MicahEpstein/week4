//import data
import stops from '../data/stops.js';
import { initializeStopMap, showStopsOnMap } from './stops-map.js';

let stopMap = initializeStopMap();
showStopsOnMap(stops, stopMap);

let routeCheckboxes = document.querySelectorAll( '.route-checkbox');
let stopNameInput = document.querySelector('#stop-name-input');


for (const cb of routeCheckboxes){
    cb.addEventListener('change', (evt)=> {
        const checkbox = evt.target;
        const route = checkbox.value;
        const isChecked = checkbox.checked;
        if (isChecked){
        const filteredStops = stops.filter(function(stop){
            const routes = stop['routes_ids'];
            const hasRoutes = routes.includes(route);
            return hasRoutes;
        });
        showStopsOnMap(filteredStops, stopMap);
    } else {
        showStopsOnMap(stops, stopMap);
    }
    });
}

stopNameInput.addEventListener('input', () => {
    const text = stopNameInput.value;
    console.log('the text box contains: ' + text);
    const filteredStops = stops.filter(function (stop){
        const name = stop['stop_name'].toLowerCase();
        const hasText = name.includes(text);
        return hasText;
    });
    showStopsOnMap(filteredStops, stopMap);
});

//make data ?global
window.stops = stops;
window.stopMap = stopMap;
window.routeCheckboxes = routeCheckboxes;