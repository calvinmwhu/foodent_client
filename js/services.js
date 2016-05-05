var foodentServices = angular.module('foodentServices', []);

foodentServices.factory('AuthService', ['$http', '$q', 'API_ENDPOINT', function ($http, $q, API_ENDPOINT) {
    var ACCESS_TOKEN = 'access_token';
    var CURRENT_USER_ID = 'current_user_id';
    var isAuthenticated = false;
    var authToken;

    function useCredentials(token) {
        isAuthenticated = true;
        authToken = token;
        // Set the token as header for your requests!
        $http.defaults.headers.common.Authorization = authToken;
    }

    function loadUserCredentials() {
        var token = window.localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            useCredentials(token);
        }
    }

    function storeUserCredentials(token, user) {
        window.localStorage.setItem(ACCESS_TOKEN, token);
        window.localStorage.setItem(CURRENT_USER_ID, user._id);
        useCredentials(token);
    }

    function getCurrentUserId() {
        return window.localStorage.getItem(CURRENT_USER_ID);
    }

    var signup = function (user) {
        var config = {
            method: 'POST',
            url: API_ENDPOINT.url + '/signup',
            data: user
        };
        return $q(function (resolve, reject) {
            $http(config).then(function (response) {
                storeUserCredentials(response.data.token, response.data.data);
                resolve(response);
            }, function (response) {
                reject(response);
            });
        });
    };

    var login = function (user) {
        var config = {
            method: 'POST',
            url: API_ENDPOINT.url + '/authenticate',
            data: user
        };
        return $q(function (resolve, reject) {
            $http(config).then(function (response) {
                storeUserCredentials(response.data.token, response.data.data);
                resolve(response);
            }, function (response) {
                console.log(response);
                reject(response);
            });
        });
    };

    function destroyUserCredentials() {
        authToken = undefined;
        isAuthenticated = false;
        $http.defaults.headers.common.Authorization = undefined;
        window.localStorage.removeItem(ACCESS_TOKEN);
        window.localStorage.removeItem(CURRENT_USER_ID);
        //console.log(window.localStorage);
    }


    var logout = function () {
        destroyUserCredentials();
    };

    loadUserCredentials();

    return {
        login: login,
        signup: signup,
        logout: logout,
        isAuthenticated: function () {
            return isAuthenticated;
        },
        getCurrentUserId: getCurrentUserId
    }

}]);


foodentServices.factory('UserService', ['$http', '$q', 'AuthService', 'API_ENDPOINT', function ($http, $q, AuthService, API_ENDPOINT) {
    var getUserDetail = function(id){
        var config = {
            method: 'GET',
            url: API_ENDPOINT.url + '/users/'+id
        };
        return $http(config);
    };

    var getUsers = function(queryParams){
        var config = {
            method: 'GET',
            url: API_ENDPOINT.url + '/users',
            params: queryParams
        };
        return $http(config);
    };

    var followUser = function(idToFollow) {
        var config = {
            method: 'PUT',
            url: API_ENDPOINT.url + '/followuser/'+ AuthService.getCurrentUserId(),
            data: {
                idToFollow: idToFollow
            }
        };
        return $http(config);
    };


    var unfollowUser = function(idToUnfollow) {
        var config = {
            method: 'PUT',
            url: API_ENDPOINT.url + '/unfollowuser/'+ AuthService.getCurrentUserId(),
            data: {
                idToUnfollow: idToUnfollow
            }
        };
        return $http(config);
    };

    return {
        getUserDetail: getUserDetail,
        getUsers: getUsers,
        followUser: followUser,
        unfollowUser: unfollowUser
    };
}]);


foodentServices.factory('EventService', ['$http', '$q', 'API_ENDPOINT', function ($http, $q, API_ENDPOINT) {
    var getEventDetail = function(id){
        var config = {
            method: 'GET',
            url: API_ENDPOINT.url + '/event/'+id
        };
        return $http(config);
    };

    var getEvents = function(queryParams){
        var config = {
            method: 'GET',
            url: API_ENDPOINT.url + '/events',
            params: queryParams
        };
        return $http(config);
    };

    return {
        getEventDetail: getEventDetail,
        getEvents: getEvents
    };
}]);



