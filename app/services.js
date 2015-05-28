'use strict';

angular.module('myApp.services', [])

.service('UserProfile', function() {

	this.set_displayName = function (displayName) {
		this.displayName = displayName;
		console.log('this', this.displayName);
	};
	this.get_displayName = function () {
		console.log('getting this', this.displayName)
		return this.displayName;
	};

	this.set_pics = function (pics) {
		this.pics = pics;
	};
	this.get_pics = function () {
		return this.pics;
	};
})

.factory('Auth', function() {

	var CLIENT_ID = '';
	var REDIRECT_URI = '';
	var scope = 'user-read-private user-read-email';

	// if (location.host == 'localhost:8000') {
		CLIENT_ID =	'1e3183a202714746a2615399cfb8b4db';
		REDIRECT_URI = 'http://localhost:8000/app/callback.html';
	// } else {
	// 	CLIENT_ID = '1e3183a202714746a2615399cfb8b4db';
	// 	REDIRECT_URI = 'http://lab.possan.se/thirtify/callback.html';
	// }

	function getLoginURL(scopes) {
		return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID
			+ '&redirect_uri=' + encodeURIComponent(REDIRECT_URI)
			+ '&scope=' + encodeURIComponent(scope)
			+ '&response_type=token';
	}

	return {
		openLogin: function() {
			var url = getLoginURL('user-read-private user-read-email');

			var width = 450,
					height = 730,
					left = (screen.width / 2) - (width / 2),
					top = (screen.height / 2) - (height / 2);

			var w = window.open(url,
					'Spotify',
					'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
			);
		},
		getAccessToken: function() {
			var expires = 0 + localStorage.getItem('pa_expires', '0');
			if ((new Date()).getTime() > expires) {
				return '';
			}
			var token = localStorage.getItem('pa_token', '');
			return token;
		},
		setAccessToken: function(token, expires_in) {
			localStorage.setItem('pa_token', token);
			localStorage.setItem('pa_expires', (new Date()).getTime() + expires_in);
			// _token = token;
			// _expires = expires_in;
		},
		getUsername: function() {
			var username = localStorage.getItem('pa_username', '');
			return username;
		},
		setUsername: function(username) {
			localStorage.setItem('pa_username', username);
		},
		getUserCountry: function() {
			var userCountry = localStorage.getItem('pa_usercountry', 'US');
			return userCountry;
		},
		setUserCountry: function(userCountry) {
			localStorage.setItem('pa_usercountry', userCountry);
		}
	}
});