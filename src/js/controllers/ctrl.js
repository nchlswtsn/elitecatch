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
app.controller('ReturnCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
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
}])

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
    $scope.grade = 'B+';
    console.log($scope.day);
  });
}])

app.controller('HistoryCtrl', ['$scope', function($scope) {
  console.log('History Controller loaded!');
}])

app.controller('FavoriteCtrl', ['$scope', function($scope) {
  console.log('Favorite Controller loaded');
}])
