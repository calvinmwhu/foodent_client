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

        //this is just for testing purpose, delete it afterwards:
        $scope.user.followers = ["572977452e2d88ce099ecc72", "5729764f6a309eab09b006ca", "57296ee7754b301209d92474"];
        $scope.user.following = ["57296e99754b301209d92473", "57296d42754b301209d92471", "5724358d53b0f43d13cf8d9f"];

        $scope.user.history = {
            attended: ['5726f64e2f6324fd123dd714', '57280db1bcd7e2fe08264314'],
            hosted: ['572812ae357f12ad0999722a', '572812786f9e099d095647a2']
        };

        $scope.signup = function () {
            if (!$scope.user.profileImage) {
                //DEFAULT_IMAGES.urls
                var idx = Math.floor(Math.random() * DEFAULT_IMAGES.urls.length);
                $scope.user.profileImage = DEFAULT_IMAGES.urls[idx];
            }
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

foodentControllers.controller('UserProfileController', ['$scope', '$location', '$routeParams', 'UserService', 'EventService', 'AuthService', function ($scope, $location, $routeParams, UserService, EventService, AuthService) {
    //this is used for controlling two routes: 1. users/:id and 2, userprofile.
    //userprofile is current users profile, while users/:id returns other users profile
    if (!AuthService.isAuthenticated() || !AuthService.getCurrentUserId()) {
        $location.path('/login');
    } else {
        $scope.currentId = AuthService.getCurrentUserId();
        $scope.otherId = $routeParams.id ? $routeParams.id : $scope.currentId;
        $scope.user = {};
        UserService.getUserDetail($scope.otherId).then(function (response) {
            console.log(response.data);
            $scope.user = response.data.data;
        }, function (response) {
            $scope.response = response;
            console.log(response.data);
        });

        //if ($routeParams.id && $routeParams.id != currentId) {
        //    UserService.getOtherUserDetail($routeParams.id).then(function (response) {
        //        console.log(response.data);
        //        $scope.user = response.data.data;
        //    }, function (response) {
        //        $scope.response = response;
        //        console.log(response.data);
        //    });
        //} else {
        //    UserService.getUserDetail().then(function (response) {
        //        console.log(response.data);
        //        $scope.user = response.data.data;
        //    }, function (response) {
        //        $scope.response = response;
        //        console.log(response.data);
        //    });
        //}
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
                name: 1
            },
            skip: 0
        };
        UserService.getUsers(queryParams).then(function (response) {
            $scope.following = response.data.data;
        }, function (response) {
            console.log(response);
        });
    };

    $scope.getHostedEvents = function () {
        var queryParams = {
            where: {
                _id: {
                    $in: $scope.user.history.hosted
                }
            }
        };
        EventService.getEvents(queryParams).then(function (response) {
            $scope.hostedEvents = response.data.data;
        }, function (response) {
            console.log(response);
        });
    };

    $scope.getAttendedEvents = function () {
        var queryParams = {
            where: {
                _id: {
                    $in: $scope.user.history.attended
                }
            }
        };
        EventService.getEvents(queryParams).then(function (response) {
            $scope.attendedEvents = response.data.data;
        }, function (response) {
            console.log(response);
        });
    };


    $scope.isMyself = function() {
        return $scope.currentId == $scope.otherId;
    };


    $scope.followUser = function() {
        if(AuthService.isAuthenticated() && !$scope.isMyself()) {

        }
    };
    //
    //$scope.logout = function () {
    //    AuthService.logout();
    //};


}]);




