app.controller('ControlCtrl', ['$scope', '$state', '$timeout', function($scope, $state, $timeout) {
  console.log('Control Controller loaded!');
  $scope.secondPhase = false;
  $scope.showSecondPhase = function() {
    $scope.secondPhase = true;
  }
  $timeout($scope.showSecondPhase, 2000);

  $scope.searchBar = function() {
    $state.go('finder');
  }
  $scope.viewHistory = function() {
    $state.go('history');
  }
  $scope.viewFavorites = function() {
    $state.go('favorite');
  }


}])
