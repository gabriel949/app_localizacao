var app = angular.module("localizar");

app.service('$foursquareService', function ($http) {

    this.categories;
    this.getPlace = (lat, long, radius, categorie, success) => {

        $http({
            method: 'GET',
            url: `https://api.foursquare.com/v2/venues/explore?ll=${lat},${long}&radius=${radius}&intent=browse&categoryId=${categorie}&client_id=TXET1A4ZJVPO3WKCKURVFZZJI0DHLDX34KYVTVOILLOFYAVT&client_secret=5OOBVYLQOLQ24GAGSPAOT3VU5G5FXLTW5OBSXU3UM0DPPIEE&v=20131016`
        }).then(success, (error) => {
            console.log(error);
        });

    }

    this.rankedsChekins = (success) => {
        navigator.geolocation.getCurrentPosition((myLocation) => {
            $http({
                method: 'GET',
                url: `https://api.foursquare.com/v2/venues/explore?ll=${myLocation.coords.latitude},${myLocation.coords.longitude}&limit=5&client_id=TXET1A4ZJVPO3WKCKURVFZZJI0DHLDX34KYVTVOILLOFYAVT&client_secret=5OOBVYLQOLQ24GAGSPAOT3VU5G5FXLTW5OBSXU3UM0DPPIEE&v=20170708`

            }).then(success, function errorCallback(response) {
            })
        });
    }

     this.loadCategories = (success) => {
            $http({
                method: 'GET',
                url: `https://api.foursquare.com/v2/venues/categories?v=20150214&m=foursquare&client_secret=5OOBVYLQOLQ24GAGSPAOT3VU5G5FXLTW5OBSXU3UM0DPPIEE&client_id=TXET1A4ZJVPO3WKCKURVFZZJI0DHLDX34KYVTVOILLOFYAVT`
            }).then(success, function errorCallback(response) {
            });
        }


});