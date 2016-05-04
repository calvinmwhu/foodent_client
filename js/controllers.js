/**
 * Created by an5ra on 5/2/2016.
 */
var foodentControllers = angular.module('foodentControllers', []);

foodentControllers.controller('HomeController', ['$scope', function ($scope) {
    /*
    The following lines control the event grid 
    */
    var $grid = $('.grid');
    $grid.masonry({
        itemSelector: '.grid-item',
        percentPosition: true,
        columnWidth: '.grid-sizer',
        //isFitWidth: true,
        gutter: 23
    });

    // layout masonry after each image loads
    $grid.imagesLoaded().progress(function () {
        $grid.masonry();

    });
    /*-------------------------------------
    */
    
    /* Add service calls below */
}]);

foodentControllers.controller('UserController', ['$scope', function ($scope) {
$scope.name = "Anurag" //test 
    var $grid = $('.grid');

    $grid.masonry({
        itemSelector: '.grid-item',
        percentPosition: true,
        columnWidth: '.grid-sizer',
        //isFitWidth: true,
        gutter: 23
    });

    // layout masonry after each image loads
    $grid.imagesLoaded().progress(function () {
        $grid.masonry();

    });
}]);

foodentControllers.controller('EventController', ['$scope', function ($scope) {

}]);

foodentControllers.controller('AddEventController', ['$scope', function ($scope) {

}]);
foodentControllers.controller('SignUpController', ['$scope', function ($scope) {

}]);

