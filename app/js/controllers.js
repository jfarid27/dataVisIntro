'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('startCtrl', [function() {

  }])
  .controller('chapter1Ctrl', ['$scope', function($scope){

    $scope.datatypes = [

      {"name":"Nominal", "encodes":"classes", "operations":"equality"},
      {"name":"Ordinal", "encodes":"rankings", "operations":"equality, inequality"},
      {"name":"Quantitative - Interval", "encodes":"arbitrary zero quantities", "operations":"equality, inequality, metric (difference)"},
      {"name":"Quantitative - Ratio", "encodes":"classes", "operations":"equality, inequality, metric (difference), ratio"},


    ];

    $scope.visAttrs = [
      {"name":"Position", "rank":1},
      {"name":"Length", "rank":2},
      {"name":"Angle", "rank":3},
      {"name":"Slope", "rank":4},
      {"name":"Area", "rank":5},
      {"name":"Volume", "rank":6},
      {"name":"Color", "rank":7},
      {"name":"Texture", "rank":8}
    ];
    $scope.relations = [

      {"type": "Nominal", "attribute":"Length", "color":"green" },
      {"type": "Nominal", "attribute":"Position", "color":"green" },
      {"type": "Nominal", "attribute":"Angle", "color":"green" },
      {"type": "Nominal", "attribute":"Slope", "color":"green" },
      {"type": "Nominal", "attribute":"Area", "color":"green" },
      {"type": "Nominal", "attribute":"Volume", "color":"green" },
      {"type": "Nominal", "attribute":"Color", "color":"green" },
      {"type": "Nominal", "attribute":"Texture", "color":"green" },
      {"type": "Ordinal", "attribute":"Length", "color":"green" },
      {"type": "Ordinal", "attribute":"Position", "color":"green" },
      {"type": "Ordinal", "attribute":"Area", "color":"green" },
      {"type": "Ordinal", "attribute":"Volume", "color":"green" },
      {"type": "Ordinal", "attribute":"Color", "color":"yellow" },
      {"type": "Ordinal", "attribute":"Texture", "color":"yellow" },
      {"type": "Quantitative - Interval", 
       "attribute":"Length",
       "color":"green"
      },
      {"type": "Quantitative - Interval", "attribute":"Position", "color":"green" },
      {"type": "Quantitative - Interval", "attribute":"Area", "color":"red" },
      {"type": "Quantitative - Interval", "attribute":"Volume", "color":"red"},
      {"type": "Quantitative - Interval", "attribute":"Color", "color":"yellow" },
      {"type": "Quantitative - Interval", "attribute":"Texture", "color": "red" },


    ]

  }]);

