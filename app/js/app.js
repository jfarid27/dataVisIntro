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

  $routeProvider.when('/chapter-1-2', {
    templateUrl: 'partials/chapter_1_2.html', 
    controller: 'chapter1Ctrl'});
  $routeProvider.when('/chapter-2-intro', {
    templateUrl: 'partials/chapter_2_intro.html', 
    controller: 'chapter1Ctrl'});
  
  $routeProvider.when('/chapter-2-1', {
    templateUrl: 'partials/chapter_2_1.html', 
    controller: 'chapter2Ctrl'});
  
  $routeProvider.when('/chapter-2-2', {
    templateUrl: 'partials/chapter_2_2.html', 
    controller: 'chapter2Ctrl'});

  $routeProvider.when('/chapter-2-3', {
    templateUrl: 'partials/chapter_2_3.html', 
    controller: 'chapter2Ctrl'});

  $routeProvider.when('/conclusion', {
    templateUrl: 'partials/conclusion.html', 
    controller: 'chapter2Ctrl'});

  
  $routeProvider.otherwise({redirectTo: '/start'});

}]);
