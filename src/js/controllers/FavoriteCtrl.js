app.controller('FavoriteCtrl', ['$scope', '$state', function($scope, $state) {
  console.log('Favorite Controller loaded');

  $scope.savedSpots = localStorage.savedSpots ? JSON.parse(localStorage.savedSpots) : [];
  console.log($scope.savedSpots);

  $scope.return = function() {
    $state.go('control');
  }
}])
