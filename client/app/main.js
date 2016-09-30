'use strict';

const app = angular
	.module('SaddleUp', ['ngRoute'])
	.config($routeProvider => {
		$routeProvider
			.when('/', {
				controller: 'AvailableCtrl',
				templateUrl: 'partials/available.html'
			})
			.when('/login', {
				controller: 'LoginCtrl',
				templateUrl: 'partials/login.html'
			})
			.when('/login/:msg', {
				controller: 'LoginCtrl',
				templateUrl: 'partials/login.html'
			})
			.when('/logout', {
				controller: 'LogoutCtrl',
				templateUrl: 'partials/logout.html'
			})
			.when('/register', {
				controller: 'RegisterCtrl',
				templateUrl: 'partials/register.html'
			})
			.when('/profile', {
				controller: 'ProfileCtrl',
				templateUrl: 'partials/profile.html'
			})
			.otherwise('/')
	})
