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
      friend: null
    }
  });
});

IOU.run(function(Auth){
  console.log("in the run module. Attmpeting to auth via google...");
  Auth.fromGoogle();
});

IOU.controller('NavCtrl', function($scope, User, $state){
  var ref = new Firebase('https://jordansdemo.firebaseio.com/users');
  $scope.authedUserInfo = User.get();

  ref.on('value', function(snapshot) {
    $scope.$apply(function () {
      $scope.users = snapshot.val();
      console.log($scope.users);
    });
  });

  $scope.navCtrl = 'in the nav controller';
  $scope.viewTransactions = function(user){
    console.log(user);
  $state.go('main', {friend: user});
  };
});
