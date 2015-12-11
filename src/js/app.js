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
    });
});
