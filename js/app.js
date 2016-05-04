/**
 * Created by an5ra on 5/2/2016.
 */
var app = angular.module('foodent-main', ['ngRoute','ngAnimate', 'foodentControllers', 'foodentServices']);
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: './partials/home.html',
        controller: 'HomeController'
    }).
    when('/user', {
        templateUrl: './partials/user.html',
        controller: 'UserController'
    }).
    when('/add-event', {
        templateUrl: './partials/add-event.html',
        controller: 'AddEventController'
    }).
    when('/signup',{
        templateUrl: './partials/signup.html',
        controller: 'SignUpController'
    }).
    otherwise({
        templateUrl: './partials/home.html',
        controller: 'HomeController'
    });
}]);


