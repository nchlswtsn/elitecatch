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
