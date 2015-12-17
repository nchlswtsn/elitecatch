app.controller('ControlCtrl', ['$scope', '$state', '$timeout', function($scope, $state, $timeout) {
  console.log('Control Controller loaded!');
  $scope.secondPhase = false;
  $scope.showSecondPhase = function() {
    $scope.secondPhase = true;
  }
  $timeout($scope.showSecondPhase, 2000);

  $scope.searchBar = function() {
    $scope.secondPhase = false;
    $state.go('finder');
  }
  $scope.viewHistory = function() {
    $scope.secondPhase = false;
    $state.go('history');
  }
  $scope.viewFavorites = function() {
    $scope.secondPhase = false;
    $state.go('favorite');
  }


}])
