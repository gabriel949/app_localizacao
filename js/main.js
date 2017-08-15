var app = angular.module("localizar", []);

app.controller('main', ['$scope', '$http', '$mapsService', '$foursquareService', function ($scope, $http, $mapsService, $foursquareService) {

  $mapsService.initMapsService()
  $foursquareService.loadCategories(function successCallback(response) {
    $scope.categories = response.data.response.categories;
  });

  $scope.radius;
  $scope.findCategorie = "";
  $scope.categories = [];



  $scope.viewHeatMap = () => {
    $mapsService.toggleHeatMap();
  }

  $scope.filterNumber = () => {
    $scope.radius = $scope.radius.toString().replace(/[^\d]/, "");

    if ($scope.radius > 100000) {
      $scope.radius = 100000;
    }
  }


  $scope.getPlace = function () {

    $foursquareService.getPlace($mapsService.findLat, $mapsService.findLong, $scope.radius, $scope.findCategorie,
      function (response) {
        $mapsService.resetMarkers();
        $mapsService.createMarkers(response.data.response.groups[0].items);

      }
    )

  }

  $scope.rankedsChekins = () => {
    $foursquareService.rankedsChekins(function(response){
      console.log(response);
      $mapsService.createMarkers(response.data.response.groups[0].items)
    })
    
  }


  }])


