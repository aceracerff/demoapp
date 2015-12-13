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
  Auth.fromGoogle();
});

IOU.controller('NavCtrl', function($scope, User, $firebaseObject, $state){
  var ref = new Firebase('https://jordansdemo.firebaseio.com/users');
  var obj = $firebaseObject(ref);
  $scope.$on('AUTHED-USER-DATA-READY', function(){
    $scope.authedUserInfo = User.get();

    var userExists = false;
    obj.$loaded().then(function() {
      $scope.users = obj;
      $scope.users.forEach(function(user) {
        console.log(user);
        console.log($scope.authedUserInfo);
        if (user.email == $scope.authedUserInfo.email) userExists = true;
      });
      console.log("user exists:" + userExists);
      if (!userExists) {
        var FBnewref = ref.push();
        FBnewref.set({name: $scope.authedUserInfo.name, email: $scope.authedUserInfo.email, imageURL: $scope.authedUserInfo.profileImage});
      }
    });
  });


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
