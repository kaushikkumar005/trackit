angular.module('starter.controllers', ['firebase'])

.controller('MapCtrl', function ($scope, $ionicLoading, $firebaseArray) {
    $scope.mapCreated = function (map) {
        $scope.map = map;
        //    };

        //    $scope.centerOnMe = function () {
        //        console.log("Centering");
        if (!$scope.map) {
            return;
        }

        $scope.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function (pos) {
            console.log('Got pos', pos);


            var chaturl = "https://testhariom.firebaseio.com/rooms/Fashion/Chats";
            var myDataRef = new Firebase(chaturl);
            //                myDataRef.push({ lat: pos.coords.latitude, lon: pos.coords.longitude,createdAt: Firebase.ServerValue.TIMESTAMP });
            //            var markers = [
            //            [pos.coords.latitude, pos.coords.longitude],
            //            [26.509776, 78.0533701]
            //            ];
            $scope.markers = $firebaseArray(myDataRef);

            $scope.markers.$loaded().then(function (test) {
                $scope.testmarker = [];


                var bounds = new google.maps.LatLngBounds();
                for (i = 0; i < test.length; i++) {


                    var position1 = new google.maps.LatLng(test[i].lat, test[i].lon);


                    $scope.map.setCenter(new google.maps.LatLng(test[i].lat, test[i].lon));
                    $scope.loading.hide();
                    bounds.extend(position1);
                    marker = new google.maps.Marker({
                        position: position1,
                        map: $scope.map,
                        draggable: false,
                        animation: google.maps.Animation.BOUNCE
                    });
                    $scope.testmarker.push(marker);
                    
                    $scope.map.fitBounds(bounds);
                }
            }, function (error) {
                alert('Unable to get location: ' + error.message);
            });
        });

    };
});
