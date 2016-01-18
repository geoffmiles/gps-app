googleMaps = {
	initialize:function(){
		var currentLocation = new google.maps.LatLng(Session.get('Lat'),Session.get('Lng'));

		map = new google.maps.Map(
			document.getElementById('map'),{
			zoom: 19,
			center: currentLocation,
			disableDefaultUI: true
		});

    var marker = new google.maps.Marker({
      position: currentLocation,
      map: map,
    });
////////////Directions and Autocomplete Begin
    var origin_place_id = null;
    var destination_place_id = null;
    var travel_mode = google.maps.TravelMode.DRIVING;

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);

    var origin_input = document.getElementById('origin-input');
    var destination_input = document.getElementById('destination-input');

    var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
    origin_autocomplete.bindTo('bounds', map);
  
    var destination_autocomplete = new google.maps.places.Autocomplete(destination_input);
    destination_autocomplete.bindTo('bounds', map);

    var onChangeHandler = function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    };

    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('right-panel'));

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      var start = document.getElementById('origin_input').value;
      var end = document.getElementById('destination_input').value;
      directionsService.route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
        }, 
        function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var routeResult = response.routes[0];

            // Iterate over each leg of the route
            routeResult.legs.forEach(function(leg) {
              // Build HTML for each step
              var stepHTML = '';
              leg.steps.forEach(function(step) {
                stepHTML += '<div class="directionStep">'+
                          '<div>'+step.instructions+'</div>'+
                          '<div class="grey">'+step.distance.text+' ('+step.duration.text+')'+'</div>'+
                        '</div>';
              });

              // Put the step HTML somewhere
              $('#test').append(stepHTML);
            });
          } 
          else {
            window.alert('Directions request failed due to ' + status);
          }
      });
    }

    function expandViewportToFitPlace(place) {
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
        document.getElementById('test').innerHTML = directionResult.routes[0].legs[0].steps[0].html_instructions;
      } 
      else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
    }

    origin_autocomplete.addListener('place_changed', function() {
      var place = origin_autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
      }
      expandViewportToFitPlace(place);
      origin_place_id = place.place_id;
      route(origin_place_id, destination_place_id, directionsService, directionsDisplay);
    });

    destination_autocomplete.addListener('place_changed', function() {
      var place = destination_autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
      }
      expandViewportToFitPlace(place);
      destination_place_id = place.place_id;
      route(origin_place_id, destination_place_id, directionsService, directionsDisplay);
    });

    function route(origin_place_id, destination_place_id, directionsService, directionsDisplay) {
      if (!origin_place_id || !destination_place_id) {
        return;
      }
      directionsService.route({
        origin: {'placeId': origin_place_id},
        destination: {'placeId': destination_place_id},
        travelMode: travel_mode
      }, 
      function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } 
        else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }

//    var test = document.getElementById('setValue');
//    test.addEventListener('click', function(){
//      document.getElementById('origin_input').value = currentLocation;
//    });
//////////////Directions and Autocomplete End    
//////////////Zoom buttons Begin
//		var zoomInButton = document.getElementById('zoomIn');
//		var zoomOutButton = document.getElementById('zoomOut');
//
//		zoomInButton.addEventListener('click', function() {
//		    map.setZoom(map.getZoom() + 1);
//		});
//			
//		zoomOutButton.addEventListener('click', function() {
//		    map.setZoom(map.getZoom() - 1);
//		});
	}
}
/////////////Zoom buttons End
/////////////Location Refresh Begins
setTimeout(function(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			Session.set('Lat', position.coords['latitude']);
			Session.set('Lng',  position.coords['longitude']);
		},
	function(error){
		console.log(error);
	},
	{
		enableHighAccuracy: true
	})
	}
},
	3000
);
/////////////Location Refresh Ends