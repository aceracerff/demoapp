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

IOU.controller('NavCtrl', function($scope, $firebaseArray, $firebaseObject, $firebaseAuth, $state){
  var ref = new Firebase('https://jordansdemo.firebaseio.com/users');
  var obj = $firebaseObject(ref);

  var authRef = new Firebase("https://jordansdemo.firebaseio.com");
  var auth = $firebaseAuth(authRef);

  auth.$authWithOAuthPopup("google", { scope: 'email' }).then(function(authData) {
    var userEmail = authData.google.email;
    var userName = authData.google.displayName;
    var userImage = authData.google.profileImageURL;

    obj.$loaded().then(function() {
        $scope.users = obj;
        var userExists = false;
        $scope.users.forEach(function(user) {
          if (user.email == userEmail) userExists = true;
        });
        console.log("user exists:" + userExists);
        if (!userExists) {
            var FBnewref = ref.push();
            FBnewref.set({name: userName, email: userEmail, imageURL: userImage});
        }
    });

  }).catch(function(error) {
    console.error("Authentication failed:", error);
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
