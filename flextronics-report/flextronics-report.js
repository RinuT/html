'use strict';

var app=angular.module('myApp.flextronics-report', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/flextronics-report', {
    templateUrl: 'flextronics-report/flextronics-report.html',
    controller: 'flextronics-reportCtrl'
  });
}])
app.controller('flextronics-reportCtrl', ['$scope','myservice','$http','$timeout',function ($scope,myservice,$http,$timeout) {
    $scope.poData={}
  $scope.poData.materialCode=" "
    $scope.poData.quantity=" "
    $scope.poData.date=" "
    $scope.poData.transactionType=" "
    $scope.poData.poNumber
  $scope.PODataPending=[]
  $scope.loading=true
  $scope.id=""
  var acc = document.getElementsByClassName("accordion");
  var i;
  $scope.CreationDate = new Date();
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight){
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
    });
  }
  

  
  $http.get("http://ec2-35-173-231-185.compute-1.amazonaws.com:3000/api/Material")
  .then(function(response) {
     $scope.res = response.data;
     for(var n=0;n<$scope.res.length;n++){
       for(var j=0;j<$scope.res[n].report.length;j++){
        $scope.poData.poNumber=$scope.res[n].report[j].poNumber
        $scope.poData.materialCode=$scope.res[n].report[j].materialCode
        $scope.poData.quantity=$scope.res[n].report[j].quantity
        $scope.poData.date=$scope.res[n].report[j].date
        $scope.poData.transactionType=$scope.res[n].report[j].transactionType
      $scope.PODataPending.push($scope.poData)
      $scope.poData={}
      
       }
     }
    $scope.loading=false
    $scope.fialuier=false
      
  }, function errorCallback(response){
   console.log("POST-ing of data failed");
   $scope.loading=false
   $scope.fialuier=true
});
    
 
   }]);

   

      
  app.service('myservice', function() {
    this.xxx = "yyy";
  });
