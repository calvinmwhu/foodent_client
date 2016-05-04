/**
 * Created by an5ra on 5/2/2016.
 */
var foodentServices = angular.module('foodentServices', []);


foodentServices.factory('AuthService', ['$http', '$q', 'API_ENDPOINT', function ($http, $q, API_ENDPOINT) {
    var ACCESS_TOKEN = 'access_token';
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

    function storeUserCredentials(token) {
        window.localStorage.setItem(ACCESS_TOKEN, token);
        useCredentials(token);
    }

    var signup = function (user) {
        var config = {
            method: 'POST',
            url: API_ENDPOINT.url + '/signup',
            data: user
        };
        return $q(function (resolve, reject) {
            $http(config).then(function (response) {
                storeUserCredentials(response.data.token);
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
                storeUserCredentials(response.data.token);
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
        console.log(window.localStorage);
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
        }
    }

}]);

foodentServices.factory('UserService', ['$http', '$q', 'API_ENDPOINT', function ($http, $q, API_ENDPOINT) {
    var getUserDetail = function(queryParams){
        var config = {
            method: 'GET',
            url: API_ENDPOINT.url + '/userprofile',
            params: queryParams
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


    return {
        getUserDetail: getUserDetail,
        getUsers: getUsers
    };
}]);
