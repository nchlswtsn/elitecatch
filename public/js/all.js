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
      url: '/return',
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
  $scope.thirdPhase = false;

  $scope.fullName = JSON.parse(localStorage.fullName);

  $scope.showFirstPhase = function() {
    $scope.firstPhase = true;
  }
  $scope.showThirdPhase = function() {
    $scope.thirdPhase = true;
  }
  $timeout($scope.showFirstPhase, 1000);
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
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
  console.log("Search controller loaded!");
  // var city = location.split(', ')[0];
  // var state = location.split(', ')[1];
  // var geoCityState = city + '/' + state
  // var url = 'http://api.wunderground.com/api/dec8bf3b3a454036/forecast10day/q/' + geoCityState + '.json';
  $scope.day;
  $scope.temp;
  $scope.pressure;
  $scope.condition;
  $scope.grade;
  $scope.technique = ['Deep Water', 'Top Water', 'Trolling'][Math.floor(Math.random() * 3)]
  var pressure;


  var forecastUrl = 'http://api.wunderground.com/api/dec8bf3b3a454036/forecast10day/q/OH/Oxford.json';
  var pressureUrl = 'http://api.wunderground.com/api/dec8bf3b3a454036/conditions/q/OH/Oxford.json';
  $http.get(forecastUrl)
  .then(function(data) {
    $scope.day = data.data.forecast.simpleforecast.forecastday[0].date.weekday;
    $scope.temp = data.data.forecast.simpleforecast.forecastday[0].high.fahrenheit;
    $scope.condition = data.data.forecast.simpleforecast.forecastday[0].conditions;
    $scope.grade = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+'][Math.floor(Math.random() * 10)]
  });
  $http.get(pressureUrl)
  .then(function(data) {
    var pressureNumber = data.data.current_observation.pressure_mb;
    if (pressureNumber > 1086) {
      $scope.pressure = "Extremely High: " + pressureNumber;
    }
    else if (pressureNumber > 1030) {
      $scope.pressure = "High: " + pressureNumber;
    }
    else if (pressureNumber > 1013) {
      $scope.pressure = "Average: " + pressureNumber;
    }
    else if (pressureNumber > 1000) {
      $scope.pressure = "Low: " + pressureNumber;
    }
    else if (pressureNumber > 980) {
      $scope.pressure = "Semi-dangerously low: " + pressureNumber;
    }
    else if (pressureNumber > 950) {
      $scope.pressure = "DANGER! Very low: " + pressureNumber;
    }
    else if (pressureNumber > 870) {
      $scope.pressure = "EXTREME DANGER! Record low: " + pressureNumber;
    }
    else if (pressureNumber < 870) {
      $scope.pressure = "Stay inside, Tornado warning! " + pressureNumber;
    }

    $scope.displayMore = false;
    console.log($scope.displayMore);
    $scope.expand = function() {
      console.log('I COMMAND YOU TO EXPAND!');
      $scope.displayMore = !$scope.displayMore;
    }


    // 1086 mb (32.08 inches of mercury): Highest Ever Recorded
    // 1030 mb (30.42 inches of mercury): Strong High Pressure System
    // 1013 mb (29.92 inches of mercury): Average Sea Level Pressure
    // 1000 mb (29.54 inches of mercury): Typical Low Pressure System
    // 980 mb (28.95 inches of mercury): CAT 1 Hurricane or a very intense mid-latitude cyclone
    // 950 mb (28.06 inches of mercury): CAT 3 Hurricane
    // 870 mb (25.70 inches of mercury): Lowest Ever Recorded (not including tornadoes)
  })
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
