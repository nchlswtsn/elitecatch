'use strict';

var app = angular.module('eliteApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('welcome', {
      url: '/',
      templateUrl: './public/html/welcome.html',
      controller: 'WelcomeCtrl'
    })
    .state('return', {
      url: '/return',
      templateUrl: './public/html/return.html',
      controller: 'ReturnCtrl'
    })
    .state('search', {
      url: '/search',
      templateUrl: './public/html/search.html',
      controller: 'SearchCtrl'
    })
    .state('finder', {
      parent: 'return',
      url: '/finder',
      templateUrl: './public/html/searchPanel.html',
      controller: 'FinderCtrl'
    })
    .state('control', {
      parent: 'return',
      url: 'control-panel',
      templateUrl: './public/html/controlPanel.html',
      controller: 'ControlCtrl'
    })
});

'use strict';

app.controller('InitCtrl', ['$scope', '$timeout', '$state', function($scope, $timeout, $state) {

}])
app.controller('WelcomeCtrl', ['$scope', '$timeout', '$http', 'radarService', '$state', function($scope, $timeout, $http, radarService, $state) {
  console.log(localStorage);
  if (localStorage.visited) {
    $state.go('return');
  } else {
    $state.go('welcome');
  }

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

  // var waypoint = new Waypoint({
  //   element: document.getElementById('radarImg'),
  //   handler: function(direction) {
  //     console.log('Radar hit:', direction);
  //   },
  //   offset: '80%'
  // })
  // End Home Load Animation

  $scope.saveInfo = function() {
    localStorage.fullName = JSON.stringify($scope.fullName)
    localStorage.homeLocation = JSON.stringify($scope.homeLocation)
    localStorage.memberSince = JSON.stringify(Date.now())
    console.log(localStorage);
    $scope.fullName = '';
    $scope.homeLocation = '';
    localStorage.visited = JSON.stringify(1);
    localStorage.firstVisit = JSON.stringify(true);
    $state.go('return');
  }
  $scope.saveInfoGuest = function() {
    localStorage.fullName = 'Guest';
    localStorage.homeLocation = JSON.stringify($scope.homeLocation)
    localStorage.memberSince = JSON.stringify(Date.now())
    console.log(localStorage);
    $scope.fullName = '';
    $scope.homeLocation = '';
    localStorage.visited = JSON.stringify(1);
    localStorage.firstVisit = JSON.stringify(true);
    $state.go('return');
  }


  // var geoCityState = data.data.location.state + '/' + data.data.location.city;
  // var url = 'http://api.wunderground.com/api/dec8bf3b3a454036/animatedradar/q/OH/Oxford.gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50';
  // console.log(url);
  // $http.get(url)
  // .then(function(data) {
  //   console.log(data);
  // })

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
app.controller('ReturnCtrl', ['$scope', '$http', '$timeout', '$state', function($scope, $http, $timeout, $state) {

  // Check if first visit
  $scope.firstVisit = JSON.parse(localStorage.firstVisit);
  if ($scope.firstVisit === true) {
    localStorage.firstVisit = JSON.stringify(false);
  } else if ($scope.firstVisit === undefined) {
    $state.go('welcome');
  }

  // Start Home Load Animation
  $scope.firstPhase = false;
  $scope.thirdPhase = false;

  $scope.fullName = JSON.parse(localStorage.fullName);

  $scope.showFirstPhase = function() {
    $scope.firstPhase = true;
  }
  $scope.showThirdPhase = function() {
    $scope.thirdPhase = true;
  }
  $timeout($scope.showFirstPhase, 2000);
  $timeout($scope.showThirdPhase, 3000);

  // var waypoint = new Waypoint({
  //   element: document.getElementById('radarImg'),
  //   handler: function(direction) {
  //     console.log('Radar hit:', direction);
  //   },
  //   offset: '80%'
  // })
  // End Home Load Animation
}]);

app.controller('SearchCtrl', ['$scope', '$http', function($scope, $http) {
  console.log("Search controller loaded!");
  // var city = location.split(', ')[0];
  // var state = location.split(', ')[1];
  // var geoCityState = city + '/' + state
  // var url = 'http://api.wunderground.com/api/dec8bf3b3a454036/forecast10day/q/' + geoCityState + '.json';
  $scope.day;
  $scope.temp;
  $scope.condition;
  $scope.grade;
  var url = 'http://api.wunderground.com/api/dec8bf3b3a454036/forecast10day/q/OH/Oxford.json';
  $http.get(url)
  .then(function(data) {
    console.log(data);
    $scope.day = data.data.forecast.simpleforecast.forecastday[0].date.weekday;
    $scope.temp = data.data.forecast.simpleforecast.forecastday[0].high.fahrenheit;
    $scope.condition = data.data.forecast.simpleforecast.forecastday[0].conditions;
    $scope.grade = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+'][Math.floor(Math.random() * 10)]
    console.log($scope.day);
  });
}])

app.controller('HistoryCtrl', ['$scope', function($scope) {
  console.log('History Controller loaded!');
}])

app.controller('FavoriteCtrl', ['$scope', function($scope) {
  console.log('Favorite Controller loaded');
}])

'use strict';

app.service('radarService', function($http) {
  var autoIP = 'http://api.wunderground.com/api/dec8bf3b3a454036/geolookup/q/autoip.json';
  this.getIP = function(){return $http.get(autoIP)}
})
