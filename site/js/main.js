import stops from '../data/stops.js';
import universitycity from '../data/universitycity.js';


let stopMap = L.map('stop-map').setView([39.95315006697334, -75.1973682197421], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
}).addTo(stopMap);

