'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$location', '$http', 'Auth', 'UserProfile', function($scope, $location, $http, Auth, UserProfile) {


	$scope.display_name = UserProfile.get_displayName();
	$scope.pics = UserProfile.get_pics();

	$scope.playlists = [];
	/* getting the users playlists */
	$http({
		url: 'https://api.spotify.com/v1/users/'+Auth.getUsername()+'/playlists',
		headers: {
			'Authorization': 'Bearer ' + Auth.getAccessToken()
		}
	}).success(function(response) {
      	console.log(response);
      	$scope.playlists = response.items
	});

}]);