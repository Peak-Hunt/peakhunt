mapboxgl.accessToken = 'pk.eyJ1IjoiYXNpZXJiYXlvbiIsImEiOiJja2w0NW0wOGwxNm9yMnFvNGJoa3hleWYyIn0.tStWnu8Y2c9X9cqyDhGVpw'
const formLocation = document.getElementById('locationAddress').value;

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    language: 'en',
    placeholder: formLocation
});
geocoder.addTo('#geocoder');

geocoder.on('result', function (result) {
    document.getElementById('location').value = result.result.center;
    document.getElementById('locationAddress').value = result.result.place_name;
})