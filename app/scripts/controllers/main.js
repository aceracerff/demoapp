'use strict';

/**
 * @ngdoc function
 * @name angulardemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angulardemoApp
 */
angular.module('angulardemoApp')
  .controller('MainCtrl', function ($scope, $stateParams, $firebaseObject) {
    $scope.user = $stateParams.user;

    //Bind the firebase location of our Friend
    var FBFriendRef = new Firebase('https://jordansdemo.firebaseio.com/items/' + $scope.user + "/owes");
    var FBFriendObj = $firebaseObject(FBFriendRef);
    FBFriendObj.$bindTo($scope, "itemsFriendOwes");

    //Bind the firebase location of the user         NOTE: change the "Jordan" here to the app user
    var FBUserRef = new Firebase('https://jordansdemo.firebaseio.com/items/' + 'Jordan' + "/owes");
    var FBUserObj = $firebaseObject(FBUserRef);
    FBUserObj.$bindTo($scope, "itemsUserIsOwed");

    $scope.updateQuantity = function (key, qty) {
      var FBFriendItem = FBFriendRef.child(key);
      FBFriendItem.update({qty: qty});
    };

    $scope.removeItem = function(key)  {
      var FBFriendItem = FBFriendRef.child(key);
      FBFriendItem.remove();
    };

    $scope.addItem = function(qty, item)  {
      var FBnewref = FBFriendRef.push();
      FBnewref.set({name: item, qty: qty, to: 'Jordan'});
    };
  });
