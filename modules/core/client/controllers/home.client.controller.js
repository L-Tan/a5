'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication','fgDelegate',"$timeout",
  '$state', 'HomeSketchService',
  function ($scope, Authentication, fgDelegate, $timeout, $state, HomeSketchService) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    HomeSketchService.getAllSketchs().then(function(res) {
      $scope.sketchList = res.data;
    })


    //$scope.pagedItems = $scope.items;
    //
    //$scope.figureOutItemsToDisplay = function () {
    //  $scope.filteredItems = $filter('filter')($scope.items, {
    //    $: $scope.search
    //  });
    //  $scope.filterLength = $scope.filteredItems.length;
    //  var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
    //  var end = begin + $scope.itemsPerPage;
    //  $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    //};

    $scope.goToSketchNew = function() {
      $state.go('sketch-create')
    }

    $scope.goToComment = function(id) {
      $state.go('sketch-comment', {
        sketckId: id
      });
    }

    $scope.searchUser = function() {
      $state.go('sketch-search', {
        search:$scope.search,
        method:"user"
      });
    }

    $scope.searchSketch = function() {
      $state.go('sketch-search', {
        search:$scope.search,
        method:"title"
      });
    }

    var flow;
    /**
     * ====== important ========
     * make sure ngRepeat is done, it is better to use ngFlowGrid directive
     * otherwise, u need to make sure ng-repeat is done,
     */
    $timeout( function(){
      console.log("create flow")
      flow = fgDelegate.new({
        name:"demoGird",
        minItemWidth:200,
        container: document.getElementById("demogrid"), // must give a container
        itemSelector:".flowGridItem", // item's className
      })
    },100);

  }
]);
