'use strict';

app.controller('InitCtrl', ['$scope', '$timeout', '$state', function($scope, $timeout, $state) {
  mixpanel.track('Home Page Visited');
}])
