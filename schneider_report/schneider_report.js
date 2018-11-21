'use strict';

var app=angular.module('myApp.schneider_report', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/schneider_report', {
    templateUrl: 'schneider_report/schneider_report.html',
    controller: 'schneider_reportCtrl'
  });
}])
app.controller('schneider_reportCtrl', ['$scope','myservice','$http','$timeout',function ($scope,myservice,$http,$timeout) {
  $scope.POData=[];
  $scope.notGenerated=[];
  $scope.PODataGenerated=[];
  $scope.PODataPaid=[];
  $scope.poData={}
  $scope.poData.materialCode=" "
    $scope.poData.quantity=" "
    $scope.poData.date=" "
    $scope.poData.transactionType=" "
  $scope.val="1"
  $scope.Search=false
  $scope.Search1=false
  $scope.fialuier2=false
  $scope.fialuier=false
  $scope.fialuier1=false
  $scope.BatchId=""
  $scope.PONumber=""
  $scope.LineNo=" "
  $scope.price=" "
  $scope.SEmaterialCode=" "
  $scope.POQty=" "
  $scope.UOP=" "
  $scope.DeliveryDate=" "
 $scope.Currency=" "
 $scope.deliveryNoteNo=" "
 $scope.shippmentDate=" "
 $scope.shippedQty=" "
 $scope.Unpaid=false
 $scope.notGen=false
 $scope.paid=false
 $scope.display=true
 $scope.Pending=false
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
  

  
  $http.get("http://ec2-35-173-231-185.compute-1.amazonaws.com:3000/api/purchaseorder/"+$scope.id)
  .then(function(response) {
     $scope.res = response.data;
     for(var n=0;n<$scope.res.length;n++){
       for(var j=0;j<$scope.res.report.length;j++){
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