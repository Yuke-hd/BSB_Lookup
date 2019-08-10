var myApp = angular.module('myApp', []);
myApp.controller('Hello', ($scope) => {
    $scope.bsb_text='bsb lookup';

    $scope.greeting = { "id": 123, "content": "kkk" };
    console.log($scope);
    
    $scope.clickMe = function () {
        console.log('asd');
        $scope.greeting.content = $scope.data;
        console.log($scope.greeting.content);
    }
 
    $scope.readData = function () {
        var url = "/BSB_Lookup/data.csv";
        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send(null);

        var csvData = new Array();
        var jsonObject = request.responseText.split(/\r?\n|\r/);
        for (var i = 0; i < jsonObject.length; i++) {
            jsonObject[i]=jsonObject[i].replace(/\"/g, '');
            csvData.push(jsonObject[i].split(','));
        }
        // Retrived data from csv file content
        console.log(csvData);
        return csvData;
    }

    $scope.bsbData=$scope.readData();

    $scope.checkBsb = function () {
        $scope.bsb_text='run'
        let responseText= $scope.bsb.substring(0,3)+"-"+$scope.bsb.substring(3,6);
        console.log(responseText);
        let data = $scope.bsbData;
        for (let index = 0; index < data.length; index++) {
            if (responseText == data[index][0]) {
                //console.log('match found');
                $scope.bsb_text=data[index][1]+', '+data[index][2];
                break;
            }
        }
        if ($scope.bsb_text=='run') {
            $scope.bsb_text='no match';
        }
    }


});



