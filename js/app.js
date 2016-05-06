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
    }).when('/users/:id', {
        templateUrl: './partials/userprofile.html',
        controller: 'UserProfileController'
    }).when('/login', {
        templateUrl: './partials/login.html',
        controller: 'LoginController'
    }).when('/events/:id', {
        templateUrl: './partials/event.html',
        controller: 'EventController'
    }).otherwise({
        templateUrl: './partials/login.html',
        controller: 'LoginController'
    });
}]);

app.constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated'
}).constant('API_ENDPOINT', {
    // url: 'http://198.199.102.246:4000/api'
    //  For a simulator use: url: 'http://127.0.0.1:8080/api'
    url: 'http://127.0.0.1:4000/api'

}).constant('DEFAULT_IMAGES', {
    urls: [
        'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-knives-ninja.png',
        'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-bad-werewolf.png',
        'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-ponsy-deer.png',
        'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-braindead-zombie.png'
    ],
    food_urls: [
        'http://static1.consumerreportscdn.org/content/dam/cro/magazine-articles/2014/August/CRM_Page15_FastFood_Opener_Chart_08-14.jpg',
        'http://barcodedc.com/wp-content/gallery/food/pizza-junk-food-600.jpg',
        'http://i.huffpost.com/gen/2745340/images/o-ORGANIC-facebook.jpg',
        'http://www.wealthladdermagazine.com/wp-content/uploads/2016/03/ALS-Food-Hero.jpg'
    ]
}).constant('DEFAULT_BIOS', {
    quotes: [
        'Tell me what you eat, and I will tell you who you are.',
        'First we eat, then we do everything else.',
        'Life is uncertain. Eat dessert first.',
        'You don’t need a silver fork to eat good food.',
        'The only time to eat diet food is while you’re waiting for the steak to cook.',
        'I cook with wine. Sometimes I even add it to the food.”',
        'We all eat, and it would be a sad waste of opportunity to eat badly.',
        'A balanced diet is a cookie in each hand.',
        'People who love to eat are always the best people.',
        'My doctor told me I had to stop throwing intimate dinners for four unless there are three other people.'


    ]
});



