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
