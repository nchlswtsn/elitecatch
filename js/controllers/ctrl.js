'use strict';

app.controller('InitCtrl', ['$scope', '$timeout', function($scope, $timeout) {

}])
app.controller('WelcomeCtrl', ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {
  // Start Home Load Animation
  $scope.firstPhase = false;
  $scope.secondPhase = false;
  $scope.thirdPhase = false;

  $scope.showFirstPhase = function() {
    $scope.firstPhase = true;
  }
  $scope.showSecondPhase = function() {
    $scope.secondPhase = true;
  }
  $scope.showThirdPhase = function() {
    $scope.thirdPhase = true;
  }
  $timeout($scope.showFirstPhase, 2000);
  $timeout($scope.showSecondPhase, 3000);
  $timeout($scope.showThirdPhase, 4000);
  // End Home Load Animation


}]);

// app.controller('ToolCtrl', ['$scope', '$http', functino($scope, $http) {
//   var autoIP = 'http://api.wunderground.com/api/dec8bf3b3a454036/geolookup/q/autoip.json';
//   // var url = 'http://api.wunderground.com/api/dec8bf3b3a454036/animatedradar/q/' + $scope.state + '/' + $scope.city + '.gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50';
//
//   $http.get(autoIP)
//     .then(function(data) {
//       console.log(data);
//     })
//
// }]);
