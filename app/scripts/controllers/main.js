'use strict';

/**
 * @ngdoc function
 * @name angulardemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angulardemoApp
 */
angular.module('angulardemoApp')
  .controller('MainCtrl', function ($scope, $stateParams) {
    $scope.user = $stateParams.user;
    $scope.itemsIOwe = [];
    $scope.itemsYouOwe = [];

    var FBref = new Firebase('https://jordansdemo.firebaseio.com/user/' + $scope.user);

    FBref.on('value', function(snapshot) {
        $scope.itemsOwed = snapshot.val();
    });

    $scope.increaseYourItem = function (itm, currentVal) {
      var theVal = FBref.child(itm);
      theVal.update({Jordan: currentVal+1});
    };

    $scope.decreaseYourItem = function (itm, currentVal) {
      var theVal = FBref.child(itm);
      theVal.update({Jordan: currentVal-1});
    };

    $scope.submitYourItems = function (qty, itm) {

    };



    $scope.submitMyItems = function (input) {
      $scope.itemsIOwe.push(input);
    };

    $scope.removeMyItem = function (item) {
      $scope.itemsIOwe.splice(item, 1);
    };
    $scope.removeYourItem = function (item) {
      $scope.itemsYouOwe.splice(item, 1);
    };
  });
