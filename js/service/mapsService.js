var app = angular.module("localizar");


app.service('$mapsService', function () {

    this.map;
    this.findLat;
    this.findLong;
    this.heatMap;
    this.markers=[];
    this.bounds;
    this.heatMarker=[];
    this.heatmapShow = false;

    this.initMapsService = () => {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -19.9450109, lng: -43.9433489 },
            scrollwheel: true,
            zoom: 13,
        });

        this.heatmap = new google.maps.visualization.HeatmapLayer({
            map: this.map,
            dissipating: true,
            radius: 40
        });

        var autocomplete = new google.maps.places.Autocomplete(document.querySelector('#city'));
        autocomplete.addListener('place_changed', () => {          
            this.findLat = autocomplete.getPlace().geometry.location.lat();
            this.findLong = autocomplete.getPlace().geometry.location.lng();
        });
    }

    this.resetMarkers = () => {
        this.markers.map((e) => {
            e.setMap(null);
        });
        this.markers = [];
         
    }

    this.createMarkers = (locations) => {
        this.bounds = new google.maps.LatLngBounds();
         
        locations.map((location) => {
            this.heatMarker.push({ location: new google.maps.LatLng(location.venue.location.lat, location.venue.location.lng), weight: 1 });
            var image = {
                url: './img/pin.png',
                size: new google.maps.Size(100, 100),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(32, 32)
            };
            let marker = new google.maps.Marker({
                position: { lat: location.venue.location.lat, lng: location.venue.location.lng },
                map: this.map,
                title: location.venue.name,
                icon: image
            });
            this.markers.push(marker);
            this.bounds.extend(marker.position);
            this.map.fitBounds(this.bounds);
        });
    }

    this.toggleHeatMap = () => {
        this.heatmapShow = !this.heatmapShow;
        if (this.heatmapShow) {
            this.heatmap.setData(this.heatMarker);
        }

        else {
            this.heatmap.setData([]);
        }
    }

}
);