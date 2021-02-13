function initMap() {
    const mapContainer = document.getElementById('map');
    if (mapContainer) new
}

class RouteMap {
    constructor(container) {
        const center = {
            lat: 47.42309799791316, 
            lng: 9.369663480592965
        }

        this.map = new loginWithGoogle.maps.Map(container, {
            zoom: 13,
            center: stGallen
        });
    }

    centerOnBrowser() {
        if (!navigator.geolocation) return 

        navigator.geolocation.getCurrentPosition(function (position) {
            const center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            this.map.setCenter(center)
        });
    }
}