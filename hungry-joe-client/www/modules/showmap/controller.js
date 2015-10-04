angular.module('Showmap',[])
.controller('ShowmapController', ['$ionicLoading', function($ionicLoading){
	var vm = this;

    // set default map
    var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
 
    var mapOptions = {
        center: myLatlng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };    

    // start google map
	google.maps.event.addDomListenerOnce(window, 'click', function() {
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
            
        });

        //button to go current position
        vm.go_Mypos = function(){
            navigator.geolocation.getCurrentPosition(function(pos) {
                map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            });
        };

        // set radius search
        navigator.geolocation.getCurrentPosition(function(pos) {
            var request = {
                location: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                radius: '5000',
                type: ['food'],
                // name: 'kfc',
                keyword: 'kfc'
              };

            service.nearbySearch(request, callback);
        });

        var service = new google.maps.places.PlacesService(map);
        var infowindow = new google.maps.InfoWindow(); 

        // service.nearbySearch(request, callback);
        

        function callback(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }
          }
        }

        function createMarker(place) {
          var placeLoc = place.geometry.location;
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name +"\n"+ place.id +"\n"+ place.vicinity);
            infowindow.open(map, this);
          });
        }

        vm.map = map;
    });






}]);
