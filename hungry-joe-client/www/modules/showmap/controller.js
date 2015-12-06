angular.module('Showmap',[])
.controller('ShowmapController', ['$ionicLoading','KmradiusServices','RestaurantListsServices','MapvalueServices','$scope', function($ionicLoading,KmradiusServices,RestaurantListsServices,MapvalueServices,$scope){
	var vm = this;
    var kmRad;
    var search = [];
    var from;
    var ResID;
    var showResImage;

    vm.showResImage = "./img/joe.png";

    // set default map
    var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
 
    var mapOptions = {
        center: myLatlng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //checkbox
        vm.checkBoxDrive = function(){
            vm.checkwalk = false;
            vm.selectedMode = "DRIVING";
        }

         vm.checkBoxWalk = function(){
              vm.checkdrive = false;
              vm.selectedMode = "WALKING";
         }         


    // init google map
    google.maps.event.addDomListenerOnce(window, 'click', function() {

        vm.selectedMode = "DRIVING";
        vm.checkdrive = true;

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);

        var origin;

        var service_places = new google.maps.places.PlacesService(map);
        var infowindow = new google.maps.InfoWindow(); 
        var directionsDisplay = new google.maps.DirectionsRenderer({
            map: map,
            polylineOptions: { strokeColor: '#000066' },
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


        // $scope.showtheDir = function(){
        //     console.log("helloscope");
        //     $scope.request = {
        //          origin: vm.placeorigin,
        //          destination: vm.placelocation,
        //          durationInTraffic: false,
        //          travelMode: google.maps.TravelMode[vm.selectedMode]
        //      };
        //      directionsService.route($scope.request, function(response, status) {
        //       if (status == google.maps.DirectionsStatus.OK) {
        //             directionsDisplay.setDirections(response);
        //             $scope.distance = response.routes[0].legs[0].distance.text;
        //             $scope.duration = response.routes[0].legs[0].duration.text;
        //             MapvalueServices.setDistance(vm.distance);
        //             MapvalueServices.setDuration(vm.duration);
        //       }
        //      });
        // }

        // $scope.$watch('distance',function(n,o){
        //         $scope.distance = n;
        //         // $scope.duration = n;
        //     },true)

        vm.showtheDir = function(){
             var request = {
                 origin: vm.placeorigin,
                 destination: vm.placelocation,
                 durationInTraffic: false,
                 travelMode: google.maps.TravelMode[vm.selectedMode]
             };
             directionsService.route(request, function(response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    vm.distance = response.routes[0].legs[0].distance.text;
                    vm.duration = response.routes[0].legs[0].duration.text;
                    MapvalueServices.setDistance(vm.distance);
                    MapvalueServices.setDuration(vm.duration);
                    console.log(vm.distance);
                    console.log(vm.duration);
              }
             });
        }

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
              travelMode: google.maps.TravelMode[vm.selectedMode]
          };
          vm.placeorigin = origin;
          vm.placelocation = place.geometry.location;

          directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
               directionsDisplay.setDirections(response);
               vm.distance = response.routes[0].legs[0].distance.text;
               vm.duration = response.routes[0].legs[0].duration.text;
                    MapvalueServices.setDistance(vm.distance);
                    MapvalueServices.setDuration(vm.duration);
            }
          });
            infowindow.setContent("");
            infowindow.open(map, this);
            service_places.getDetails({placeId: place.place_id}, function(place, status) {

                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    var pop_up;
                    if(results == 'KFC'){
                        pop_up = '<div><img src="./img/KFC_icon.png" alt="KFC" style="width:15px;height:15px;"> </img>' + '<a href="#/restaurant">go to restaurant page</a></div>'+
                    place.name + "<br>" +"<p>Address: "+ place.vicinity + "</p>";
                    vm.reslogo = "KFC-logo.jpg";
                    }
                    else if(results == 'McDonald'){
                        pop_up = '<div><img src="./img/McDonald_icon.png" alt="McDonald" style="width:15px;height:15px;"> </img>'+ '<a href="#/restaurant">go to restaurant page</a></div>'+
                    place.name + "<br>" +"<p>Address: "+ place.vicinity + "</p>";
                     vm.reslogo = "MC-logo.png";
                    }
                    else if(results == 'PizzaHut'){
                        pop_up = '<div><img src="./img/PizzaHut_icon.png" alt="PizzaHut" style="width:15px;height:15px;"> </img>'+ '<a href="#/restaurant">go to restaurant page</a></div>'+
                    place.name + "<br>" +"<p>Address: "+ place.vicinity + "</p>";
                    vm.reslogo = "pizzahut-logo.jpg";
                    }
                    else if(results == 'PizzaCompany'){
                        pop_up = '<div><img src="./img/PizzaCompany_icon.png" alt="PizzaCompany" style="width:15px;height:15px;"> </img>'+ '<a href="#/restaurant">go to restaurant page</a></div>'+
                    place.name + "<br>" +"<p>Address: "+ place.vicinity + "</p>";
                    vm.reslogo = "pizzacompany-logo.jpeg";
                    }
                    vm.resname = place.name;

                    vm.showResImage = "./img/" + vm.reslogo;

                    infowindow.setContent(pop_up);
                    
                }
                MapvalueServices.setGresID(place.place_id);
                MapvalueServices.setRestaurant(results);
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
