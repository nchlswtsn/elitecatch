'use strict';

app.service('radarService', function($http) {
  var autoIP = 'http://api.wunderground.com/api/dec8bf3b3a454036/geolookup/q/autoip.json';
  this.getIP = function(){return $http.get(autoIP)}
})
