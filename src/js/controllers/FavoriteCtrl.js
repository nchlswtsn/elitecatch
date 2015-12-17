app.controller('FavoriteCtrl', ['$scope', '$state', function($scope, $state) {
  console.log('Favorite Controller loaded');

  $scope.return = function() {
    $state.go('control');
  }
}])
