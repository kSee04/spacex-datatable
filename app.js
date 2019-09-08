var app = angular.module("myApp", ["ngTable"]);

app.controller('MainCtrl', function($scope, $http, NgTableParams) {  
  $http.get('https://api.spacexdata.com/v3/launches')
    .success(function (data){
      let tableData = data;
      $scope.tableParams = new NgTableParams({}, { dataset: tableData});
      document.getElementById('loadingMessage').classList.add('hidden');
  }).error(function(data, status) {
      console.error('Error occurred:', data, status);
  }).finally(function() {
      console.log("Task Finished.");
  });

  $scope.showPresskit = function(){
    if(this.flight.links && this.flight.links.presskit){
      $scope.selected_flight_number = this.flight.flight_number;
      document.getElementById('pdfFrame').setAttribute('src', this.flight.links.presskit);
      document.getElementById('pdfContainer').classList.remove('hidden');
      document.getElementById('tableContainer').classList.add('hidden');
    }
  }

  $scope.showTable = function(){
    document.getElementById('pdfContainer').classList.add('hidden');
    document.getElementById('tableContainer').classList.remove('hidden');
  }
});
