angular.module('Showmap',[])
.controller('ShowmapController', ['$ionicLoading','KmradiusServices', function($ionicLoading,KmradiusServices){
    var vm = this;
    var kmRad;

    // set default map
    var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
 
    var mapOptions = {
        center: myLatlng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };    

    // init google map
    google.maps.event.addDomListenerOnce(window, 'click', function() {
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location",
                animation: google.maps.Animation.BOUNCE,
            });
            google.maps.event.addListener(myLocation, 'click', function() {
                infowindow.setContent("<h style='color:pink'>หิว</h>");
                infowindow.open(map, this);
          });
            
        });

        //button to go current position
        vm.go_Mypos = function(){
            navigator.geolocation.getCurrentPosition(function(pos) {
                map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            });
        };

        kmRad = KmradiusServices.getRad();

        // set radius search
        navigator.geolocation.getCurrentPosition(function(pos) {
            var request = {
                location: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),

                keyword: 'KFC' ,
                types: ['restaurant', 'food','meal_delivery'],
                name: ['KFC'],
                radius: 25000
              };

            service_places.radarSearch(request, callback_places);
        });

        var service_places = new google.maps.places.PlacesService(map);
        var infowindow = new google.maps.InfoWindow(); 
        
        // mark place that found
        function callback_places(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }
          }
        }
        // mark a place
        function createMarker(place) {
          var placeLoc = place.geometry.location;
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: "./img/KFC_icon.png",
            title: "KFC",

          });
          var service_distance = new google.maps.DistanceMatrixService();
          // click mark to pop up the detail window
          google.maps.event.addListener(marker, 'click', function() {
                    
            infowindow.setContent("");
            infowindow.open(map, this);
            service_places.getDetails({placeId: place.place_id}, function(place, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {

            console.log(place)
                    var pop_up = '<div><img src="./img/KFC.png" alt="KFC" style="width:15px;height:15px;"></img></div>'+
                    place.name + "<br>" +"<p>Address: "+ place.vicinity + "</p>" +
                    '<div><a href="https://www.kfc.co.th/#!/home">link web</a></div>'+
                    "<div>tel: <a href='tel://1150'>1150</a></div>";

                    infowindow.setContent(pop_up);
                }
            });

            infowindow.open(map, this);
            console.log(kmRad); 
            
          });
        }


        vm.map = map;
    });






}]);
