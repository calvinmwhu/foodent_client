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

//NavBarController-- this adds the logout functionality to the nav-bar, call the logout function to logout, will redirect to /home after logout
foodentControllers.controller('NavBarController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
    $scope.isAuthenticated = AuthService.isAuthenticated();
    console.log($scope.isAuthenticated)
    $scope.currentName = "n/a";
    $scope.$watch(function () {
        return AuthService.isAuthenticated();
    }, function (newVal, oldVal) {
        console.log("Changed!", newVal);
        $scope.isAuthenticated = newVal;
        if (newVal) {


            $scope.currentId = AuthService.getCurrentUserId();
            $scope.currentName = AuthService.getCurrentUserName().split(' ')[0];

        }
    }, true);

}]);
foodentControllers.controller('NavBarOptionsController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
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


//controls signup page. needs user to enter email, name, and password
foodentControllers.controller('SignUpController', ['$scope', '$location', 'AuthService', 'DEFAULT_IMAGES', 'DEFAULT_BIOS', function ($scope, $location, AuthService, DEFAULT_IMAGES, DEFAULT_BIOS) {
    // if user is already authenticated, needs to redirect him to userprofile page.
    if (AuthService.isAuthenticated()) {
        $location.path('/userprofile');
    } else {
        $scope.user = {email: '', password: '', about: ''};

        //these are temporary data just for testing purpose, delete it afterwards:
        //$scope.user.followers = ["572977452e2d88ce099ecc72", "5729764f6a309eab09b006ca", "57296ee7754b301209d92474"];
        //$scope.user.following = ["57296e99754b301209d92473", "57296d42754b301209d92471", "5724358d53b0f43d13cf8d9f"];
        //$scope.user.eventsAttended = ['5726f64e2f6324fd123dd714', '57280db1bcd7e2fe08264314'];
        //$scope.user.eventsHosted = ['572812ae357f12ad0999722a', '572812786f9e099d095647a2'];
        //-------------------------------------------------------------------------

        $scope.signup = function () {
            // randomly assign an image url to user if not provided
            if (!$scope.user.profileImage) {
                var idx = Math.floor(Math.random() * DEFAULT_IMAGES.urls.length);
                $scope.user.profileImage = DEFAULT_IMAGES.urls[idx];
            }
            if (!$scope.user.about) {
                var randomNumber = Math.floor(Math.random() * DEFAULT_BIOS.quotes.length);
                $scope.user.about = DEFAULT_BIOS.quotes[randomNumber];
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


    $('#title-text').typeIt({
        whatToType: ["With Foodent, there <strong>is</strong> such thing as a free lunch.", "Foodent connects <strong>generous</strong> people with <strong>hungry</strong> people.", "Foodent is Freeganism, but <i>healthy</i>.", "Foodent like tinder, but the date's <strong>guaranteed</strong>."],
        breakLines: false,
        lifeLike: true,
        loop: true,
        typeSpeed: 100
    }, function () {

    });

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


//this is used for controlling two routes: 1. users/:id and 2, userprofile.
//userprofile is current users profile, while users/:id should return other users profile
//if :id equals to current user's id, then this route still returns the current user's detail
foodentControllers.controller('UserProfileController', ['$scope', '$location', '$routeParams', 'UserService', 'EventService', 'AuthService', function ($scope, $location, $routeParams, UserService, EventService, AuthService) {

    $scope.user = {};
    // helper function to get an user, self-explanatory
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


    var updateUser = function (id) {
        //$scope.user = {};
        UserService.getUserDetail(id).then(function (response) {
            console.log(response.data);
            $scope.user = response.data.data;
        }, function (response) {
            $scope.response = response;
            console.log(response.data);
        });
    };

    if (!AuthService.isAuthenticated() || !AuthService.getCurrentUserId()) {
        $location.path('/login');
    } else {
        $scope.currentId = AuthService.getCurrentUserId();
        $scope.otherId = $routeParams.id ? $routeParams.id : $scope.currentId;
        updateUser($scope.otherId);

    }


    // for current user, call this function on the front-end to get a list of followers
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
            $('#followers-modal').openModal();
            console.log($scope.followers);
        }, function (response) {
            console.log(response);
        });
    };

    // for current user, call this function on the front-end to get a list of following users
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
            $('#following-modal').openModal();


        }, function (response) {
            console.log(response);
        });

    };


    // for current user, call this function on the front-end to get events currently and previous hosted
    $scope.getHostedEvents = function () {
        var queryParams = {
            where: {
                _id: {
                    $in: $scope.user.eventsHosted
                }
            }
        };
        EventService.getEvents(queryParams).then(function (response) {
            $scope.hostedEvents = response.data.data;
        }, function (response) {
            console.log(response);
        });
    };

    // for current user, call this function on the front-end to get events currently and previous attended
    $scope.getAttendedEvents = function () {
        var queryParams = {
            where: {
                _id: {
                    $in: $scope.user.eventsAttended
                }
            }
        };
        EventService.getEvents(queryParams).then(function (response) {
            $scope.attendedEvents = response.data.data;
        }, function (response) {
            console.log(response);
        });
    };

    // this function checks if you are visiting your own profile page
    // if return false, then you are at other's profile page
    $scope.isMyself = function () {
        return $scope.currentId == $scope.otherId;
    };


    // this function follows a specific user
    // only call this function if you are on other's profile page!(you cannot follow yourself)
    $scope.followUser = function () {
        if (AuthService.isAuthenticated() && !$scope.isMyself()) {
            UserService.followUser($scope.otherId).then(function (response) {
                console.log(response);
                updateUser($scope.otherId);
                //$scope.user = response.data.data;
            }, function (response) {
                console.log(response);
            });
        }
    };

    // this function unfollows a specific user
    // only call this function if you are on other's profile page!(you cannot unfollow yourself)
    $scope.unfollowUser = function () {
        if (AuthService.isAuthenticated() && !$scope.isMyself()) {
            UserService.unfollowUser($scope.otherId).then(function (response) {
                console.log(response);
                updateUser($scope.otherId);
                //$scope.user = response.data.data;
            }, function (response) {
                console.log(response);
            });
        }
    };

    // this function returns if you are currently following the user
    $scope.isFollowing = function () {
        if (AuthService.isAuthenticated() && !$scope.isMyself() && $scope.user.followers != undefined) {
            return $scope.user.followers.indexOf($scope.currentId) != -1;
        }
        return false;
    };


}]);


foodentControllers.controller('EventController', ['$scope', '$routeParams', '$location', 'UserService', 'EventService', 'InviteService', 'AuthService', function ($scope, $routeParams, $location, UserService, EventService, InviteService, AuthService) {
    // helper function to get an event, self-explanatory
    var updateEvent = function (id) {
        EventService.getEventDetail(id).then(function (response) {
            //console.log(response.data);
            $scope.event = response.data.data;
            $scope.invite = $scope.event.invite;
        }, function (response) {
            $scope.response = response;
            console.log(response.data);
        });
    };

    //event status
    $scope.isHostForEvent = function () {
        return $scope.event && $scope.event.host && ($scope.event.host == $scope.currentUserId || $scope.event.host.indexOf($scope.currentUserId) != -1);
    };

    var eventEnded = function () {
        return $scope.event && $scope.event.time && $scope.event.time.end < Date.now();
    };

    //invite status
    $scope.inviteStarted = function () {
        return $scope.invite!=undefined && $scope.invite;
    };

    var inviteEnded = function () {
        return $scope.inviteStarted() && $scope.invite.endTime < Date.now();
    };

    $scope.isOpenInvite = function () {
        return $scope.inviteStarted() && $scope.invite.inviteType == 'open';
    };

    // as a host, user can cancel an event
    $scope.cancelEvent = function () {
        if ($scope.isHostForEvent()) {
            EventService.deleteEvent($scope.event._id).then(function (response) {
                console.log(response);
            }, function (response) {
                console.log(response);
            });
        }
    };

    // as a host, it can start an invite on an event
    $scope.startInvite = function () {
        if (!$scope.inviteStarted() && $scope.isHostForEvent()) {
            EventService.addInvite($scope.event._id, {
                startTime: $scope.inviteStartTime,
                endTime: $scope.inviteEndTime,
                inviteType: $scope.inviteType
                //startTime: '2016-05-29T05:00:00.000Z',
                //endTime: '2016-05-29T05:00:00.000Z',
                //inviteType: 'restricted'
            }).then(function (response) {
                $scope.invite = response.data.data;
                console.log($scope.invite);
            }, function (response) {
                console.log(response);
            });
        }
    };

    // as a host, it can cancel an invite from an event
    $scope.cancelInvite = function () {
        if (!$scope.inviteStarted() && isHostForEvent()) {
            EventService.removeInvite($scope.event._id).then(function (response) {
                console.log(response);
            }, function (response) {
                console.log(response);
            });
        }
    };


    // as a host, it can accept a user's request for an restricted invite (need to request first)
    $scope.acceptUserRequest = function (userId) {
        if ($scope.isHostForEvent()) {
            InviteService.updateUserInRequestList($scope.invite._id, userId, "accepted").then(function (response) {
                $scope.invite = response.data.data;
                console.log("invite updated", response.data);
                // after updating user in the request list, it needs to add the user to the guest list
                return EventService.addUserToGuestList($scope.event._id, userId);
            }).then(function (response) {
                $scope.event = response.data.data;
                console.log($scope.event);
            }, function (response) {
                console.log(response);
            });
        }
    };

    // as a host, it can deny a user's request
    $scope.denyUserRequest = function (userId) {
        if ($scope.isHostForEvent()) {
            InviteService.updateUserInRequestList($scope.invite._id, userId, "denied").then(function (response) {
                $scope.invite = response.data.data;
                console.log(response.data);
            }, function (response) {
                console.log(response.data);
            });
        }
    };

    // as a host, it can pend a user's request (this function maynot be useful)
    $scope.pendUserRequest = function (userId) {
        if ($scope.isHostForEvent()) {
            InviteService.updateUserInRequestList($scope.invite._id, userId, "pending").then(function (response) {
                $scope.invite = response.data.data;
                console.log(response.data);
            }, function (response) {
                console.log(response.data);
            });
        }
    };

    // as a guest, it can request an invite for a restricted event
    $scope.requestInvite = function (userId) {
        if ($scope.inviteStarted() && !$scope.isOpenInvite()) {
            InviteService.addUserToRequestList($scope.invite._id, userId).then(function (response) {
                $scope.invite = response.data.data;
                console.log($scope.invite);
            }, function (response) {
                console.log(response.data);
            });
        }
    };

    // as a guest, it can join an open invite event
    $scope.requestToJoinEvent = function (userId) {
        if ($scope.inviteStarted() && $scope.isOpenInvite()) {
            EventService.addUserToGuestList($scope.event._id, userId).then(function (response) {
                $scope.event = response.data.data;
                console.log(response.data);
            }, function (response) {
                console.log(response.data);
            });
        }
    };


    if (!AuthService.isAuthenticated() || !AuthService.getCurrentUserId()) {
        $location.path('/login');
    } else {
        $scope.currentUserId = AuthService.getCurrentUserId();
        updateEvent($routeParams.id);
    }

    var updateGuestList = function () {
        if ($scope.event) {
            var queryParams = {
                where: {
                    _id: {
                        $in: $scope.event.guests
                    }
                },
                select: {
                    _id: 1,
                    name: 1,
                    profileImage: 1
                },
                sort: {
                    name: 1
                },
                skip: 0
            };
            UserService.getUsers(queryParams).then(function (response) {
                $scope.eventGuestList = response.data.data;
            }, function (response) {
                console.log(response.data);
            });
        }
    };

    var updateUserRequestStatus = function () {
        if ($scope.isHostForEvent() || !$scope.inviteStarted()) {
            $scope.userRequestStatus = undefined;
        } else {
            var userRequest = $scope.invite.request.find(function (req) {
                return req.userId == $scope.currentUserId;
            });
            $scope.userRequestStatus = userRequest ? userRequest.status : undefined;
        }
    };

    var updatePendingUser = function () {
        if (!$scope.inviteStarted()) {
            $scope.pendingUsers = {};
        } else {
            console.log('called');
            var pendingUsers = $scope.invite.request.filter(function (item) {
                return item.status == 'pending';
            });
            var pendingUserIds = pendingUsers.map(function (item) {
                return item.userId;
            });
            var queryParams = {
                where: {
                    _id: {
                        $in: pendingUserIds
                    }
                },
                select: {
                    _id: 1,
                    name: 1,
                    profileImage: 1
                },
                sort: {
                    name: 1
                },
                skip: 0
            };
            UserService.getUsers(queryParams).then(function (response) {
                $scope.pendingUsers = response.data.data;
            }, function (response) {
                console.log(response.data);
            });
        }
    };


    $scope.$watch('event', updateGuestList, true);
    $scope.$watch('invite', updateUserRequestStatus, true);
    $scope.$watch('invite', updatePendingUser, true);

}]);

foodentControllers.controller('AddEventController', ['$scope',  '$mdpTimePicker', '$location', 'UserService', 'EventService', 'AuthService', 'DEFAULT_IMAGES', 'DEFAULT_BIOS', function ($scope ,$mdpTimePicker, $location, UserService, EventService, AuthService, DEFAULT_IMAGES, DEFAULT_BIOS) {
    $scope.event = {};
    if (!AuthService.isAuthenticated()) {
        $location.path('/login');
    } else {
        $scope.addEvent = function () {
            if (!$scope.event.imageUrls) {
                var idx = Math.floor(Math.random() * DEFAULT_IMAGES.food_urls.length);
                $scope.event.imageUrls = [DEFAULT_IMAGES.food_urls[idx]];
            }
            if (!$scope.event.notes) {
                var randomNumber = Math.floor(Math.random() * DEFAULT_BIOS.quotes.length);
                $scope.user.about = DEFAULT_BIOS.quotes[randomNumber];
            }
            EventService.addEvent($scope.event).then(function (response) {
                var newEvent = response.data.event;
                console.log(newEvent);
                console.log(response.data.address);
                $location.path('/event/' + newEvent._id);
            }, function (response) {
                console.log(response.data);
            });
        };
    }

    $scope.eventDate = new Date();
    $scope.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    $scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    //$scope.disable = [false, 1, 7];
    $scope.today = 'Today';
    $scope.clear = 'Clear';
    $scope.close = 'Close';
    var days = 15;
    //$scope.startTime;
    //$scope.endTime;

    $scope.map = {center: {latitude: 45, longitude: -73}, zoom: 17};
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            $scope.$apply(function () {
                $scope.position = position;
                $scope.map.center.latitude = position.coords.latitude;
                $scope.map.center.longitude = position.coords.longitude;

            });
        });
    }
    $scope.gPlace;
    var address = {};
    $scope.placeAdded = function () {
        var place = $scope.gPlace.getPlace();
        //console.log(place);
        address.latitude = place.geometry.location.lat();
        address.longitude = place.geometry.location.lng();
        address.formatted_address = place.formatted_address;
        $scope.map.center.latitude = address.latitude;
        $scope.map.center.longitude = address.longitude;
        $scope.map.zoom = 15;
        var myLatlng = new google.maps.LatLng(address.latitude, address.longitude);
        $scope.marker = {
            id: "0",
            coords: {
                latitude: address.latitude,
                longitude: address.longitude
            }
        }
    }
}]);







