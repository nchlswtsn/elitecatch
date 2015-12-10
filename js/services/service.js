'use strict';

app.service(function() {
  var autoIP = 'http://api.wunderground.com/api/dec8bf3b3a454036/geolookup/q/autoip.json';
  var geoCityState = '';
  var radarUrl = '';
  var radarSrc = '';

  $http.get(autoIP)
  .then(function(data) {
    geoCityState = data.data.location.state + '/' + data.data.location.city;
    radarUrl = 'http://api.wunderground.com/api/dec8bf3b3a454036/animatedradar/q/' + geoCityState + '.gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50';
    $http.get({
      dataType: 'jsonp',
      url: radarUrl
    })
    .then(function(data) {
      console.log(data);
      // radarSrc = data.data.gif
    })
  })
})
