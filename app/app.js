'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.services',
  'myApp.view1',
  // 'myApp.login',
  'myApp.view2',
  'myApp.version'
])
.config(['$routeProvider', function($routeProvider) {
  // $routeProvider.otherwise({redirectTo: '/view1'});
}])

.controller('AppController', function($scope, $location, $http, Auth, UserProfile) {
	console.log('in AppController');

	console.log(location);

	function checkUser(redirectToLogin) {
		console.log('should send request');
		$http({
	      url: 'https://api.spotify.com/v1/me',
	      headers: {
	        'Authorization': 'Bearer ' + Auth.getAccessToken()
	      }
	  //     },
	  //     success: function(response) {
	  //     	console.log(response);
   //    		Auth.setUsername(response.id);
			// Auth.setUserCountry(response.country);
			// console.log('name', response.display_name);
			// UserProfile.set_displayName = response.display_name;
			// if (redirectToLogin) {
			// 	$scope.$emit('login');
			// 	$location.replace();
			// }
		 //  },
		 //  error: function(err) {
		 //  	$scope.showplayer = false;
			// $scope.showlogin = true;
			// $location.replace();
		 //  }
		}).success(function(response) {
	      	console.log(response);
      		Auth.setUsername(response.id);
			Auth.setUserCountry(response.country);
			console.log('name', response.display_name);
			UserProfile.set_displayName(response.display_name);
			UserProfile.set_pics(response.images);
			if (redirectToLogin) {
				$scope.$emit('login');
				$location.replace();
			}
		});
	}

	window.addEventListener("message", function(event) {
		console.log('got postmessage', event);
		var hash = JSON.parse(event.data);
		if (hash.type == 'access_token') {
			Auth.setAccessToken(hash.access_token, hash.expires_in || 60);
			checkUser(true);
		}
	}, false);

	$scope.isLoggedIn = false;//(Auth.getAccessToken() != '');
	$scope.showplayer = $scope.isLoggedIn;
	$scope.showlogin = !$scope.isLoggedIn;

	$scope.$on('login', function() {
		console.log('should switch')
		$scope.showplayer = true;
		$scope.showlogin = false;
		// $location.path('/').replace().reload();
	});

	$scope.$on('logout', function() {
		$scope.showplayer = false;
		$scope.showlogin = true;
	});

	$scope.login = function () {
		Auth.openLogin();
	}

});