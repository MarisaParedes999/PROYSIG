//PRIMER MAPA DE CANASTILLOS
//inicializacion del primer mapa de canastillos
let map = L.map('map').setView([ -17.9647 ,-67.106],13)
map.zoomControl.setPosition('topright');

//capa de openstreet
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//para dar estilo a los puntos
const geojsonMarkerOptions = {
    radius: 10,
    fillColor: "#00FF00", 
    color: false,
    weight: 1,
    opacity: 1,
    fillOpacity: 0.5,
  }; 

//ir a las coordenadas

document.getElementById('select-location').addEventListener('change', function(e){
    let coords = e.target.value.split(",");
    map.flyTo(coords,13);
})

// Agregar mapa base
var carto_light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {attribution: '©OpenStreetMap, ©CartoDB',subdomains: 'abcd',maxZoom: 24});

// Agregar plugin MiniMap
var minimap = new L.Control.MiniMap(carto_light,
    {
        toggleDisplay: true,
        minimized: false,
        position: "bottomleft"
    }).addTo(map);

// Agregar escala
 new L.control.scale({position:'bottomright'}).addTo(map);

//imagen de contenedor  
var contenedorIcon = L.icon({
    iconUrl: 'assets/img/contenedor.png',
    iconSize: [50,50]
})
  
// Configurar PopUp
function popup(feature,layer){
    if(feature.properties && feature.properties.nombre){
        layer.bindPopup("<strong>PUNTO DE RECICLAJE: </strong>" + feature.properties.nombre + "<br/>" + "<strong>DIRECCION: </strong>" + feature.properties.direccion+ "<br/>" + "<strong>UBICACION: </strong>" + feature.properties.ubicacion+ "<br/>" + "<strong>CANTIDAD: </strong>" + feature.properties.cantidad)       
    }
}

var markerGroupLayer = L.layerGroup();

// Agregar capa en formato GeoJson
L.geoJson(puntos,{
    onEachFeature: popup,
    pointToLayer: function (feature, lating){
        var marker = L.marker(lating, { icon: contenedorIcon });
        markerGroupLayer.addLayer(marker);
        return marker;
    }
}).addTo(map);

//ver mapa en pantalla completa
var mapId = document.getElementById('map');
function fullScreenview(){
    mapId.requestFullscreen();
}

L.control.browserPrint({position: 'topleft', title: 'Imprimir mapa actual'}).addTo(map);


//para mostrar la ubicacion y sacar  puntos actuales
var peopleIcon = L.icon({
    iconUrl: 'assets/img/people.png',
    iconSize: [30, 30]
})

var nearMarkerIcon = L.icon({
    iconUrl: 'assets/img/near.png',
    iconSize: [30, 30]
})


var locacion = map.locate({setView: true});

map.on('locationfound', function onLocationFound(e) {
    //var radius = e.accuracy;
    var latp = e.latlng.lat; 
    var lonp = e.latlng.lng; 
   
    //anadir el icono de donde estamos actualmente
    var marker = L.marker([latp, lonp], { icon: peopleIcon }).addTo(map);
    L.marker(e.latlng).addTo(map).bindPopup("Tu te encuentras aqui").openPopup();

    //anadir el icono en el punto mas cercano
    var nearMarker = L.GeometryUtil.closestLayer(map, markerGroupLayer.getLayers(), e.latlng);
    console.log('punto cercano' + nearMarker.latlng);
    L.marker([nearMarker.latlng.lat,nearMarker.latlng.lng],{ }).addTo(map).bindPopup("Este es tu contenedor mas cercano").openPopup();;
    console.log('puntos'+latp+','+lonp);
    
    //anadir la ruta mas cercana
    L.Routing.control({
        waypoints: [
            L.latLng(latp,lonp),
            L.latLng(nearMarker.latlng.lat, nearMarker.latlng.lng)
        ]
    }).on('routesfound', function (e) {
        var routes = e.routes;
        console.log(routes);
        e.routes[0].coordinates.forEach(function (coord, index) {
            setTimeout(function () {
                marker.setLatLng([coord.lat, coord.lng])
            }, 100 * index)
        })

    }).addTo(map);
   

    //dar click en el lugar que se desea la ruta
    //map.on('click', function (e) {
    //    console.log(e)
    //    L.Routing.control({
    //        waypoints: [
    //            L.latLng(latp,lonp),
    //            L.latLng(e.latlng.lat, e.latlng.lng)
    //        ]
    //    }).on('routesfound', function (e) {
    //        var routes = e.routes;
    //        console.log(routes);
    //        e.routes[0].coordinates.forEach(function (coord, index) {
    //            setTimeout(function () {
    //                marker.setLatLng([coord.lat, coord.lng])
    //            }, 100 * index)
     //       })

    //    }).addTo(map);
    //});

});
