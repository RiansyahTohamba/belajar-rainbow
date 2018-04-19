angular.module('bootstrap').component('rbxMessage', {
    bindings: {
        item: '<'
    },
    controller : function(rainbowSDK, $scope, $interval) {

        var ctrl = $scope;

        var updateDateFields = function() {

            var mdate = moment($scope.$ctrl.item.date);

            if (moment().diff(mdate, 'days') == 0) {
                return mdate.fromNow();
            } else {
                return mdate.format('lll');
            }
            return d;
        };

        var saveToFile = function(blob, filename) {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        };

        $scope.onDownloadFile = function() {
            rainbowSDK.fileStorage.downloadFile($scope.$ctrl.item.shortFileDescriptor).then(function(blob) {
                  // Download the file on disk
                  saveToFile(blob, $scope.$ctrl.item.shortFileDescriptor.filename);
              }).catch(function(err) {
                  console.log(err);
              });
        };

        $scope.date = updateDateFields();

        // Arm update date timer
        $interval(function ($scope) {
            ctrl.date = updateDateFields();
            ctrl.$apply();
        }, 30000, 0, false);

        $scope.userData = JSON.parse(localStorage.getItem('user'));

    },
    templateUrl: './resources/angular/angular/js/components/conversations/messageCmp.template.html'
});
