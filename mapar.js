//SEGUNDO MAPA DE RUTAS

const maparutas = document.getElementById('maparutas');
const mapar = L.map(maparutas).setView([ -17.9647 ,-67.106],13);

const rutaSelector = document.getElementById('rutas');
const mapPath = document.getElementsByTagName('path');

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapar);


//boton de control localizacion
var loc = L.control.locate({
    position: 'topright',
    showPopup: true,
    drawCircle: true,
    drawMarker: true,
    strings: {
       title: "Click para ver tu ubicacion."
    }
}).addTo(mapar);

// Agregar mapa base
var carto_light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {attribution: '©OpenStreetMap, ©CartoDB',subdomains: 'abcd',maxZoom: 24});

// Agregar plugin MiniMap
var minimap = new L.Control.MiniMap(carto_light,
    {
        toggleDisplay: true,
        minimized: false,
        position: "bottomleft"
    }).addTo(mapar);

// Agregar escala
 new L.control.scale({position:'bottomright'}).addTo(mapar);


//todas las rutas
var styleRutas = {
    "color": "#EABF08",
    "weight": 3,
    "opacity": 0.8
};

var ltodas = L.geoJSON(rutas, {
    style: styleRutas
    
}).addTo(mapar);


//rutas norte
 var styleNorte = {
    "color": "#ff7800",
    "weight": 3,
    "opacity": 0.8
};

var lnorte = L.geoJSON(rutasNorte, {
    style: styleNorte

}).addTo(mapar);

//rutas centro
var styleCentral= {
    "color": "#AA339B",
    "weight": 3,
    "opacity": 0.8
};

var lcentro = L.geoJSON(rutasCentral, {
    style: styleCentral,
}).addTo(mapar);

//rutas sud
var styleSud= {
    "color": "#09A41D",
    "weight": 3,
    "opacity": 0.8
};

var lsud = L.geoJSON(rutasSud, {
    style: styleSud,
}).addTo(mapar);

//objetos de capas base y otros
var baseMaps = {
    "OpenStreetMap": osm
};

var overlayMaps = {
    "Todas las rutas": ltodas,
    "Zona Norte (martes-jueves-sabado)": lnorte,
    "Zona Sud (lunes-miercoles-viernes)": lsud,
    "Zona Central (lunes a sabado)": lcentro
};
// control de capas
var layerControl = L.control.layers(baseMaps, overlayMaps,{
    position: 'bottomright', // 'topleft', 'bottomleft', 'bottomright'
}).addTo(mapar);


//ver mapa en pantalla completa
function fullScreenviewr(){
    maparutas.requestFullscreen();
}

L.control.browserPrint({position: 'bottomright', title: 'Imprimir mapa actual'}).addTo(mapar);


