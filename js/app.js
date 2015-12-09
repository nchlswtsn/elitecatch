'use strict';

var app = angular.module('eliteApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'template/home.html',
      controller: 'HomeCtrl'
    });
});
