'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/start', {
    templateUrl: 'partials/start.html', 
    controller: 'startCtrl'});

  $routeProvider.when('/chapter-1-1', {
    templateUrl: 'partials/chapter_1_1.html', 
    controller: 'chapter1Ctrl'});

  $routeProvider.otherwise({redirectTo: '/start'});

}]);
