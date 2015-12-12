'use strict';

/**
 * @ngdoc overview
 * @name angulardemoApp
 * @description
 * # angulardemoApp
 *
 * Main module of the application.
 */
var IOU = angular.module('angulardemoApp', [
    'ui.router',
    'firebase'
  ]);

IOU.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/users');
  $stateProvider
  .state('nav',{
    url: '/users',
    templateUrl: '/views/nav.html',
    controller: 'NavCtrl'
  })
  .state('main', {
    url: '/transaction_summary',
    templateUrl: '/views/main.html',
    controller: 'MainCtrl',
    params: {
      user: null
    }
  });
});

IOU.controller('NavCtrl', function($scope, $firebaseArray, $firebaseObject, $state){
  var ref = new Firebase('https://jordansdemo.firebaseio.com/user');

  ref.on('value', function(snapshot) {
    $scope.$apply(function () {
      $scope.users = snapshot.val();
    });
  });

  $scope.navCtrl = 'in the nav controller';
  $scope.viewTransactions = function(user){
  $state.go('main', {user: user});
  };
});













