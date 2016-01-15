googleMaps = {
	
	setLocation:function(){
		var currentLocation = new google.maps.LatLng(Session.get('Lat'),Session.get('Lng'));
		map.panTo(currentLocation);
		map.setZoom(8);
	},

	initialize:function(){
		var currentLocation = new google.maps.LatLng(37.780096,-122.420017);

		map = new google.maps.Map(
			document.getElementById('map'),{
			zoom: 8,
			center: currentLocation,
			disableDefaultUI: true
		});

		
/////////////
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
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

  function expandViewportToFitPlace(place) {
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
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

    // If the place has a geometry, store its place ID and route if we have
    // the other place ID
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

    // If the place has a geometry, store its place ID and route if we have
    // the other place ID
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
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
//////////////
		var zoomInButton = document.getElementById('zoomIn');
		var zoomOutButton = document.getElementById('zoomOut');

		zoomInButton.addEventListener('click', function() {
		    map.setZoom(map.getZoom() + 1);
		});
			
		zoomOutButton.addEventListener('click', function() {
		    map.setZoom(map.getZoom() - 1);
		});
		}
	}


userLocation = {
	iAmHere:function(){
		
	}
}

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
