mapboxgl.accessToken = 'pk.eyJ1IjoiYXNpZXJiYXlvbiIsImEiOiJja2w0NW0wOGwxNm9yMnFvNGJoa3hleWYyIn0.tStWnu8Y2c9X9cqyDhGVpw';

var map = new mapboxgl.Map({
    container: 'formMap',
    style: 'mapbox://styles/asierbayon/ckl468ovn32wm17rm9h60p16s',
    center: [8.551813819082557, 47.467729453922765], // [lng, lat]
    zoom: 11,
});

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: 'Set the starting point',
    language: 'en'
});

map.addControl(geocoder);

geocoder.on('result', function(result) {
    document.getElementById('location').value = result.result.center;
    document.getElementById('locationAddress').value = result.result.place_name
 })