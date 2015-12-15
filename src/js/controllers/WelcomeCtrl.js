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
