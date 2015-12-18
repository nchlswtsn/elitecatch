'use strict';

var app = angular.module('eliteApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  // $locationProvider.html5Mode(true);

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
    parent: 'return',
    templateUrl: './public/html/search.html',
    controller: 'SearchCtrl'
  })
  .state('finder', {
    parent: 'return',
    templateUrl: './public/html/searchPanel.html',
    controller: 'FinderCtrl'
  })
  .state('control', {
    parent: 'return',
    templateUrl: './public/html/controlPanel.html',
    controller: 'ControlCtrl'
  })
  .state('history', {
    parent: 'return',
    templateUrl: './public/html/history.html',
    controller: 'HistoryCtrl'
  })
  .state('favorite', {
    parent: 'return',
    templateUrl: './public/html/favorite.html',
    controller: 'FavoriteCtrl'
  });
});

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

app.controller('FavoriteCtrl', ['$scope', '$state', function($scope, $state) {
  console.log('Favorite Controller loaded');

  $scope.savedSpots = localStorage.savedSpots ? JSON.parse(localStorage.savedSpots) : [];
  console.log($scope.savedSpots);

  $scope.return = function() {
    $state.go('control');
  }
}])

app.controller('FinderCtrl', ['$scope', '$state', '$timeout', function($scope, $state, $timeout) {
  $scope.thirdPhase = false;
  $scope.showThirdPhase = function() {
    $scope.thirdPhase = true;
  }
  $timeout($scope.showThirdPhase, 300);

  console.log('SEARCH CONTROLLER');

  $scope.searchData = function() {
    mixpanel.track('Location searched');
    console.log('FINDER?');
    $state.go('search')
  }
  // END OF ANIMATION

  // $scope.searchModal = function() {
  //   $(function () {
  //     $('[data-toggle="tooltip"]').tooltip()
  //   })
  //   console.log("Search controller loaded!");
  //   // var city = location.split(', ')[0];
  //   // var state = location.split(', ')[1];
  //   // var geoCityState = city + '/' + state
  //   // var url = 'http://api.wunderground.com/api/dec8bf3b3a454036/forecast10day/q/' + geoCityState + '.json';
  //   $scope.day;
  //   $scope.temp;
  //   $scope.pressure;
  //   $scope.condition;
  //   $scope.grade;
  //   $scope.technique = ['Deep Water', 'Top Water', 'Trolling'][Math.floor(Math.random() * 3)]
  //   var pressure;
  //
  //
  //   var forecastUrl = 'http://api.wunderground.com/api/dec8bf3b3a454036/forecast10day/q/CA/Fremont.json';
  //   var pressureUrl = 'http://api.wunderground.com/api/dec8bf3b3a454036/conditions/q/CA/Fremont.json';
  //   $http.get(forecastUrl)
  //   .then(function(data) {
  //     $scope.day = data.data.forecast.simpleforecast.forecastday[0].date.weekday;
  //     $scope.temp = data.data.forecast.simpleforecast.forecastday[0].high.fahrenheit;
  //     $scope.condition = data.data.forecast.simpleforecast.forecastday[0].conditions;
  //     $scope.grade = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+'][Math.floor(Math.random() * 10)]
  //   });
  //   $http.get(pressureUrl)
  //   .then(function(data) {
  //     var pressureNumber = data.data.current_observation.pressure_mb;
  //     if (pressureNumber > 1086) {
  //       $scope.pressure = "Extremely High: " + pressureNumber;
  //     }
  //     else if (pressureNumber > 1030) {
  //       $scope.pressure = "High: " + pressureNumber;
  //     }
  //     else if (pressureNumber > 1013) {
  //       $scope.pressure = "Average: " + pressureNumber;
  //     }
  //     else if (pressureNumber > 1000) {
  //       $scope.pressure = "Low: " + pressureNumber;
  //     }
  //     else if (pressureNumber > 980) {
  //       $scope.pressure = "Semi-dangerously low: " + pressureNumber;
  //     }
  //     else if (pressureNumber > 950) {
  //       $scope.pressure = "DANGER! Very low: " + pressureNumber;
  //     }
  //     else if (pressureNumber > 870) {
  //       $scope.pressure = "EXTREME DANGER! Record low: " + pressureNumber;
  //     }
  //     else if (pressureNumber < 870) {
  //       $scope.pressure = "Stay inside, Tornado warning! " + pressureNumber;
  //     }
  //
  //     $scope.displayMore = false;
  //     console.log($scope.displayMore);
  //     $scope.expand = function() {
  //       console.log('I COMMAND YOU TO EXPAND!');
  //       $scope.displayMore = !$scope.displayMore;
  //     }
  //
  //
  //     // 1086 mb (32.08 inches of mercury): Highest Ever Recorded
  //     // 1030 mb (30.42 inches of mercury): Strong High Pressure System
  //     // 1013 mb (29.92 inches of mercury): Average Sea Level Pressure
  //     // 1000 mb (29.54 inches of mercury): Typical Low Pressure System
  //     // 980 mb (28.95 inches of mercury): CAT 1 Hurricane or a very intense mid-latitude cyclone
  //     // 950 mb (28.06 inches of mercury): CAT 3 Hurricane
  //     // 870 mb (25.70 inches of mercury): Lowest Ever Recorded (not including tornadoes)
  //   })
  // }
}])

app.controller('HistoryCtrl', ['$scope', '$state', function($scope, $state) {
  console.log('History Controller loaded!');

  $scope.return = function() {
    $state.go('control');
  }
}])

'use strict';

app.controller('InitCtrl', ['$scope', '$timeout', '$state', function($scope, $timeout, $state) {
  mixpanel.track('Home Page Visited');
}])

app.controller('NavionicsCtrl', ['$scope', '$http', function($scope, $http) {
  console.log('NAVIONICS WORKS!!!');
}])

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
    console.log("TIMEOUT?");
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

app.controller('SearchCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
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
  $scope.forecastData = [];

  var forecastUrl = 'http://api.wunderground.com/api/dec8bf3b3a454036/forecast10day/q/CA/Fremont.json';
  var pressureUrl = 'http://api.wunderground.com/api/dec8bf3b3a454036/conditions/q/CA/Fremont.json';
  var openUrl = 'api.openweathermap.org/data/2.5/forecast/daily?q=Fremont&mode=json&units=imperial&cnt=10?APPID=99c2f58822d3d9b37eaaed986d390d29';
  // var openUrl = 'api.openweathermap.org/data/2.5/forecast/daily?q=Fremont&mode=json&units=imperial&cnt=10?APPID=99c2f58822d3d9b37eaaed986d390d29';
  $http.get(openUrl)
  .success(function(data) {
    console.log('OPEN:', data);
  })
  $http.get(forecastUrl)
  .then(function(data) {
    var data = data.data.forecast.simpleforecast.forecastday;
    $scope.day = data[0].date.weekday;
    $scope.temp = data[0].high.fahrenheit;
    $scope.condition = data[0].conditions;
    $scope.grade = ['B'][0];
    $scope.forecastData = data;
    console.log($scope.forecastData);
    console.log($scope.forecastData[0].date);
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
      $scope.pressure = "Very low: " + pressureNumber;
    }
    else if (pressureNumber > 950) {
      $scope.pressure = "Severely low: " + pressureNumber;
    }
    else if (pressureNumber > 870) {
      $scope.pressure = "EXTREME DANGER!" + pressureNumber;
    }
    else if (pressureNumber < 870) {
      $scope.pressure = "Tornado warning! " + pressureNumber;
    }

    $scope.displayMore = false;
    console.log($scope.displayMore);
    $scope.expand = function() {
      console.log('I COMMAND YOU TO EXPAND!');
      $scope.displayMore = !$scope.displayMore;
    }

    $scope.return = function() {
      $state.go('control');
    }

    // 1086 mb (32.08 inches of mercury): Highest Ever Recorded
    // 1030 mb (30.42 inches of mercury): Strong High Pressure System
    // 1013 mb (29.92 inches of mercury): Average Sea Level Pressure
    // 1000 mb (29.54 inches of mercury): Typical Low Pressure System
    // 980 mb (28.95 inches of mercury): CAT 1 Hurricane or a very intense mid-latitude cyclone
    // 950 mb (28.06 inches of mercury): CAT 3 Hurricane
    // 870 mb (25.70 inches of mercury): Lowest Ever Recorded (not including tornadoes)
  })

  $scope.savedSpots = [];

  $scope.saveSpot = function() {
    var unixTime = new Date();
    var date = unixTime.toUTCString();
    console.log(date);
    mixpanel.track('Location Saved');
    $scope.savedSpots.push({
      date: date,
      temp: $scope.temp,
      pressure: $scope.pressure,
      condition: $scope.condition,
      grade: $scope.grade,
      technique: $scope.technique
    })
    localStorage.savedSpots = JSON.stringify($scope.savedSpots);


  }
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
  $timeout($scope.showFirstPhase, 1000);
  $timeout($scope.showSecondPhase, 2000);
  $timeout($scope.showThirdPhase, 3000);


  // RADAR TRIGGER
  $scope.radarImage = false;

  var waypoint = new Waypoint({
    element: document.getElementById('radarImageTrigger'),
    handler: function(direction) {
      console.log('Radar hit:', direction);
      if (direction === 'down') {
        $scope.radarImage = true;
        console.log($scope.radarImage);
        $scope.$apply()
      }
    },
    offset: '80%'
  })

  // DEPTH TRIGGER
  $scope.depthImage = false;

  var waypoint = new Waypoint({
    element: document.getElementById('depthImageTrigger'),
    handler: function(direction) {
      console.log('Radar hit:', direction);
      if (direction === 'down') {
        $scope.depthImage = true;
        console.log($scope.depthImage);
        $scope.$apply()
      }
    },
    offset: '80%'
  })

  // End Home Load Animation
  var defaultName = "Guest";
  var defaultLocation = "Fremont, CA"

  $scope.saveInfo = function() {
    mixpanel.track('User Joined');
    localStorage.fullName = JSON.stringify($scope.fullName)
    localStorage.homeLocation = JSON.stringify($scope.homeLocation)
    localStorage.memberSince = JSON.stringify(Date.now())
    $scope.fullName = '';
    $scope.homeLocation = '';
    localStorage.visited = JSON.stringify(true);
    localStorage.firstVisit = JSON.stringify(true);
    $state.go('return');
  }
  $scope.saveInfoGuest = function() {
    mixpanel.track('Tried by Guest');
    localStorage.fullName = JSON.stringify(defaultName);
    localStorage.homeLocation = JSON.stringify(defaultLocation);
    localStorage.memberSince = JSON.stringify(Date.now())
    $scope.fullName = '';
    $scope.homeLocation = '';
    localStorage.visited = JSON.stringify(true);
    localStorage.firstVisit = JSON.stringify(true);
    $state.go('return');
  }


  // var geoCityState = data.data.location.state + '/' + data.data.location.city;
  // function logTest(data) {
  //   console.log(data);
  // }
  // var url = 'http://api.wunderground.com/api/dec8bf3b3a454036/animatedradar/q/OH/Oxford.gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50?callback=logTest';
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

'use strict';

app.service('radarService', function($http) {
  var autoIP = 'http://api.wunderground.com/api/dec8bf3b3a454036/geolookup/q/autoip.json';
  this.getIP = function(){return $http.get(autoIP)}
})
