


'use strict';


angular.module('emsaApp')
    .controller('mainCtrl', function ($scope) {


           $scope.efectoCarousel = function(){
               $('.carousel').carousel({
                   interval: 5000
               })
           }


    });
