//import data
import stops from '../data/stops.js';
import { initializeStopMap, showStopsOnMap } from './stops-map.js';

let stopMap = initializeStopMap;
showStopsOnMap(stopMap, stops);

//make data ?global
window.stops = stops;
window.universityCity = universityCity;