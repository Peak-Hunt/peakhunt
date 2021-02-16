mapboxgl.accessToken = process.env.MB_CLIENT_ID;
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