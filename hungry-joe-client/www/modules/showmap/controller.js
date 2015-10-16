angular.module('Showmap',[])
.controller('ShowmapController', ['$ionicLoading','KmradiusServices','RestaurantListsServices','MapvalueServices', function($ionicLoading,KmradiusServices,RestaurantListsServices,MapvalueServices){
	var vm = this;
    var kmRad;
    var search = [];
    var from;
    var ResID;

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

        var origin;

        var service_places = new google.maps.places.PlacesService(map);
        var infowindow = new google.maps.InfoWindow(); 
        var directionsDisplay = new google.maps.DirectionsRenderer({
            map: map,
            polylineOptions: { strokeColor: "Black" },
            suppressMarkers : true 
          });
        var directionsService = new google.maps.DirectionsService();


 
        navigator.geolocation.getCurrentPosition(function(pos) {
            origin = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location",
                animation: google.maps.Animation.BOUNCE,
            });
            // click to show pop up on mymark
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

        from = KmradiusServices.getFrom();

        if(from == 0){
            kmRad = KmradiusServices.getRad();
            // set radius search
            navigator.geolocation.getCurrentPosition(function(pos) {
                var place = ['KFC', 'McDonald', 'Pizza Hut', 'The Pizza Company']

                for(var i=0;i<place.length;i++){
                    var request = {
                        location: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),

                        keyword: place[i] ,
                        types: ['restaurant', 'food'],
                        name: [place[i]],
                        radius: kmRad
                      };
                if(place[i] == 'KFC')
                    service_places.nearbySearch(request, callback_KFC);
                else if(place[i] == 'McDonald')
                    service_places.nearbySearch(request, callback_McDonald);
                else if(place[i] == 'Pizza Hut')
                    service_places.nearbySearch(request, callback_PizzaHut);
                else if(place[i] == 'The Pizza Company')
                    service_places.nearbySearch(request, callback_PizzaCompany);
                }
            });
        }
        else if(from == 1){
            search = KmradiusServices.getSearch();
            navigator.geolocation.getCurrentPosition(function(pos) {
                for(var i=0;i<search.length;i++){
                var request = {
                    location: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),

                    keyword: search[i],
                    types: ['restaurant', 'food'],
                    name: [search[i]],
                    radius: 5000
                  };
                if(search[i] == 'KFC')
                    service_places.nearbySearch(request, callback_KFC);
                else if(search[i] == 'McDonald')
                    service_places.nearbySearch(request, callback_McDonald);
                else if(search[i] == 'Pizza Hut')
                    service_places.nearbySearch(request, callback_PizzaHut);
                else if(search[i] == 'The Pizza Company')
                    service_places.nearbySearch(request, callback_PizzaCompany);
                }
            });
        }
        
        // mark place that found
        function callback_KFC(results, status, pagination) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i], 'KFC');
            }
          }
            if(pagination.hasNextPage){
                pagination.nextPage();
            }
        }
        // mark place that found
        function callback_McDonald(results, status, pagination) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i], 'McDonald');
            }
          }
            if(pagination.hasNextPage){
                pagination.nextPage();
            }
        }
        // mark place that found
        function callback_PizzaHut(results, status, pagination) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i], 'PizzaHut');
            }
          }
            if(pagination.hasNextPage){
                pagination.nextPage();
            }
        }
        // mark place that found
        function callback_PizzaCompany(results, status, pagination) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i], 'PizzaCompany');
            }
          }
            if(pagination.hasNextPage){
                pagination.nextPage();
            }
        }
        // mark a place 
        function createMarker(place, results) {
          var placeLoc = place.geometry.location;
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: "./img/" + results + "_icon.png",
            title: results
          });

          // click mark to pop up the detail window
          google.maps.event.addListener(marker, 'click', function() {
             var request = {
              origin: origin,
              destination: place.geometry.location,
              durationInTraffic: false,
              travelMode: google.maps.TravelMode.DRIVING
          };
          directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
               distance = response.routes[0].legs[0].distance.text;
               duration = response.routes[0].legs[0].duration.text;
                    MapvalueServices.setDistance(distance);
                    MapvalueServices.setDuration(duration);
            }
          });

            infowindow.setContent("");
            infowindow.open(map, this);
            service_places.getDetails({placeId: place.place_id}, function(place, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    var pop_up = '<div><img src="./img/KFC.png" alt="KFC" style="width:15px;height:15px;"></img><a href="#/restaurant">go to restaurant page</a></div>'+
                    place.name + "<br>" +"<p>Address: "+ place.vicinity + "</p>" +
                    '<div><a href="https://www.kfc.co.th/#!/home">link web</a></div>'+
                    "<div>tel: <a href='tel://1150'>1150</a></div>";

                    infowindow.setContent(pop_up);
                }
                MapvalueServices.setGresID(place.place_id);
                var ResPromise = RestaurantListsServices.getRestaurantByGresID(place.place_id)
                ResPromise.$promise.then(function(data){
                    if(!data.hasOwnProperty('gres_id')){
                        RestaurantListsServices.addRestaurant(place.name,place.place_id);
                    }
                })
            });
            infowindow.open(map, this);
          });
        }
        vm.map = map;
    });
}]);