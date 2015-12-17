app.controller('HistoryCtrl', ['$scope', '$state', function($scope, $state) {
  console.log('History Controller loaded!');

  $scope.return = function() {
    $state.go('control');
  }
}])
