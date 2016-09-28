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
			.otherwise('/')
	})