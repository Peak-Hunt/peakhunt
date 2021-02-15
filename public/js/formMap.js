
mapboxgl.accessToken = 'pk.eyJ1IjoiYXNpZXJiYXlvbiIsImEiOiJja2w0NW0wOGwxNm9yMnFvNGJoa3hleWYyIn0.tStWnu8Y2c9X9cqyDhGVpw';
let routeLocation = { coordinates: [7.752261277369426, 46.02250468893015] }

const data = document.getElementById('formMap').dataset.location;
if (data.length > 35) routeLocation = JSON.parse(data);

var map = new mapboxgl.Map({
    container: 'formMap',
    style: 'mapbox://styles/asierbayon/ckl468ovn32wm17rm9h60p16s',
    center: routeLocation.coordinates, // [lng, lat]
    zoom: 11,
});

/* var geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true,
  },
    trackUserLocation: true,
});
map.addControl(geolocate); 
map.on('load', function() {
    geolocate.trigger();
}) */

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: 'Set the starting point',
    language: 'en',
    position: 'top-left'
});

map.addControl(geocoder);

geocoder.on('result', function (result) {
    document.getElementById('location').value = result.result.center;
    document.getElementById('locationAddress').value = result.result.place_name
})

new mapboxgl.Marker().setLngLat(routeLocation.coordinates).addTo(map);