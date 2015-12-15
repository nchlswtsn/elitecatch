app.controller('ReturnCtrl', ['$scope', '$http', '$timeout', '$state', function($scope, $http, $timeout, $state) {
  $state.go('control')

  $scope.firstVisit = JSON.parse(localStorage.firstVisit);
  // Check if first visit
  if (!localStorage.visited) {
    $state.go('welcome');
  }
  if ($scope.firstVisit === true) {
    localStorage.firstVisit = JSON.stringify(false);
  }

  // Start Home Load Animation
  $scope.firstPhase = false;
  // $scope.thirdPhase = false;

  $scope.fullName = JSON.parse(localStorage.fullName);

  $scope.showFirstPhase = function() {
    $scope.firstPhase = true;
  }
  // $scope.showThirdPhase = function() {
  //   $scope.thirdPhase = true;
  // }
  $timeout($scope.showFirstPhase, 1000);
  // $timeout($scope.showThirdPhase, 2000);

  // var waypoint = new Waypoint({
  //   element: document.getElementById('radarImg'),
  //   handler: function(direction) {
  //     console.log('Radar hit:', direction);
  //   },
  //   offset: '80%'
  // })
  // End Home Load Animation
}]);
