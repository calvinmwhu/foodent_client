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

//NavBarController
foodentControllers.controller('NavBarController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
    $scope.logout = function () {
        AuthService.logout();
        $location.path('/home');
    };
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

foodentControllers.controller('SignUpController', ['$scope', '$location', 'AuthService', 'DEFAULT_IMAGES', function ($scope, $location, AuthService, DEFAULT_IMAGES) {
    if (AuthService.isAuthenticated()) {
        $location.path('/userprofile');
    } else {
        $scope.user = {email: '', password: '', about: ''};
        $scope.signup = function () {
            if (!$scope.user.profileImage) {
                //DEFAULT_IMAGES.urls
                var idx = Math.floor(Math.random() * DEFAULT_IMAGES.urls.length);
                $scope.user.profileImage = DEFAULT_IMAGES.urls[idx];
            }
            console.log($scope.user);
            AuthService.signup($scope.user).then(function (response) {
                console.log(response.data);
                $location.path('/userprofile');
            }, function (response) {
                console.log(response.data);
            });
        };
    }
}]);

foodentControllers.controller('LoginController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
    if (AuthService.isAuthenticated()) {
        $location.path('/userprofile');
    } else {
        $scope.user = {email: '', password: ''};
        $scope.login = function () {
            //AuthService.
            AuthService.login($scope.user).then(function (response) {
                console.log(response.data);
                $location.path('/userprofile');
            }, function (response) {
                console.log(response.data);
            });
        };
    }

}]);


foodentControllers.controller('UserProfileController', ['$scope', '$location', 'UserService', 'AuthService', function ($scope, $location, UserService, AuthService) {

    if (!AuthService.isAuthenticated()) {
        $location.path('/login');
    } else {
        $scope.user = {};
        UserService.getUserDetail().then(function (response) {
            console.log(response.data);
            $scope.user = response.data.data;
        }, function (response) {
            $scope.response = response;
            console.log(response.data);
        });
    }
    $scope.getFollowers = function () {
        var queryParams = {
            where: {
                _id: {
                    $in: $scope.user.followers
                }
            },
            select: {
                name: 1,
                _id: 1,
                profileImage: 1
            },
            sort: {
                name: -1
            },
            skip: 0
        };
        UserService.getUsers(queryParams).then(function (response) {
            $scope.followers = response.data.data;
        }, function (response) {
            console.log(response);
        });
    };

    $scope.getFollowings = function () {
        var queryParams = {
            where: {
                _id: {
                    $in: $scope.user.following
                }
            },
            select: {
                name: 1,
                _id: 1,
                profileImage: 1
            },
            sort: {
                name: -1
            },
            skip: 0
        };
        UserService.getUsers(queryParams).then(function (response) {
            $scope.following = response.data.data;
        }, function (response) {
            console.log(response);
        });
    };

    //
    //$scope.logout = function () {
    //    AuthService.logout();
    //};

}]);




