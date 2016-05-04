/**
 * Created by an5ra on 5/2/2016.
 */
var app = angular.module('foodent-main', ['ngRoute', 'ngAnimate', 'foodentControllers', 'foodentServices']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: './partials/home.html',
        controller: 'HomeController'
    }).when('/user', {
        templateUrl: './partials/user.html',
        controller: 'UserController'
    }).when('/add-event', {
        templateUrl: './partials/add-event.html',
        controller: 'AddEventController'
    }).when('/signup', {
        templateUrl: './partials/signup.html',
        controller: 'SignUpController'
    }).when('/userprofile', {
        templateUrl: './partials/userprofile.html',
        controller: 'UserProfileController'
    }).when('/login', {
        templateUrl: './partials/login.html',
        controller: 'LoginController'
    }).otherwise({
        templateUrl: './partials/home.html',
        controller: 'HomeController'
    });
}]);

app.constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated'
}).constant('API_ENDPOINT', {
    url: 'http://127.0.0.1:4000/api'
    //  For a simulator use: url: 'http://127.0.0.1:8080/api'
}).constant('DEFAULT_IMAGES', {
    urls: [
        'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-knives-ninja.png',
        'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-bad-werewolf.png',
        'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-ponsy-deer.png',
        'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-braindead-zombie.png'
    ]
});



