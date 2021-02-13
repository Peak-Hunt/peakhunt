const routeLocation = JSON.parse(document.getElementById('map').dataset.location);
console.log('locations', location);

mapboxgl.accessToken = 'pk.eyJ1IjoiYXNpZXJiYXlvbiIsImEiOiJja2w0NW0wOGwxNm9yMnFvNGJoa3hleWYyIn0.tStWnu8Y2c9X9cqyDhGVpw';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/asierbayon/ckl468ovn32wm17rm9h60p16s',
    center: routeLocation.coordinates,
    zoom: 11,
    scrollZoom: false
});

map.addControl(nav, 'top-left')

const el = document.createElement('div');
el.className = 'marker'

new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
}).setLngLat(routeLocation.coordinates).addTo(map);
