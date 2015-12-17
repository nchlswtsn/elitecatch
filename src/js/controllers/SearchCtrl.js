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

  $scope.saveSpot = function() {
    mixpanel.track('Location Saved');


  }
}])
