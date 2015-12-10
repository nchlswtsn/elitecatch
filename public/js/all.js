'use strict';

var app = angular.module('eliteApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('welcome', {
      url: '/',
      templateUrl: './public/html/welcome.html',
      controller: 'WelcomeCtrl'
    });
});

'use strict';

app.controller('InitCtrl', ['$scope', '$timeout', function($scope, $timeout) {

}])
app.controller('WelcomeCtrl', ['$scope', '$timeout', '$http', 'radarService', function($scope, $timeout, $http, radarService) {
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

  // var geoCityState = data.data.location.state + '/' + data.data.location.city;
  var url = 'http://api.wunderground.com/api/dec8bf3b3a454036/animatedradar/q/OH/Oxford.gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50?callback=?';
  console.log(url);
  $http.get(url)
  .then(function(data) {
    console.log(data);
  })

  // radarService.getIP().then(function(data) {
  //   var geoCityState = data.data.location.state + '/' + data.data.location.city;
  //   var url = 'http://api.wunderground.com/api/dec8bf3b3a454036/animatedradar/q/' + geoCityState + '.gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50';
  //   // console.log(url);
  //   $http.get({
  //     url: url
  //   })
  //   .then(function(data) {
  //     console.log();
  //   })
  //
  // })
}]);

// app.controller('ToolCtrl', ['$scope', '$http', functino($scope, $http) {
//   var autoIP = 'http://api.wunderground.com/api/dec8bf3b3a454036/geolookup/q/autoip.json';
//
//   $http.get(autoIP)
//     .then(function(data) {
//       console.log(data);
//     })
//
// }]);

'use strict';

app.service('radarService', function($http) {
  var autoIP = 'http://api.wunderground.com/api/dec8bf3b3a454036/geolookup/q/autoip.json';
  this.getIP = function(){return $http.get(autoIP)}
})