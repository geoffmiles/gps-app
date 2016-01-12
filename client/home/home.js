// Basic
Meteor.startup(function(){
    Mapbox.load({
       plugins: ['minimap', 'markercluster']
    });
});

Deps.autorun(function () {
  if (Mapbox.loaded()){
	    L.mapbox.accessToken = 'pk.eyJ1IjoiZ2VvZmZtaWxlcyIsImEiOiJjaWphZ2xrODIwMDk5dHdrbno1c3R1a3R5In0.MmoFAbmhiqY0Vqcbzmon7Q';
		var map = L.mapbox.map('map', 'mapbox.streets', {
		    zoomControl: true
		}).setView([40, -74.50], 9).addControl(L.mapbox.geocoderControl('mapbox.places', {
        autocomplete: true
    }));

		// move the attribution control out of the way
		map.attributionControl.setPosition('bottomleft');

		// create the initial directions object, from which the layer
		// and inputs will pull data.
		var directions = L.mapbox.directions();

		var directionsLayer = L.mapbox.directions.layer(directions)
		    .addTo(map);

		var directionsInputControl = L.mapbox.directions.inputControl('inputs', directions)
		    .addTo(map);

		var directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions)
		    .addTo(map);

		var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions)
		    .addTo(map);

		var directionsInstructionsControl = L.mapbox.directions.instructionsControl('instructions', directions)
		    .addTo(map);

		var geo_options = {
		    enableHighAccuracy: true, 
		    maximumAge        : 3000,
		    timeout           : 9000
		};

		var watch;

		document.getElementById("button").onclick = function() {

		    if ( !navigator.geolocation ){
		        errorsDiv.innerHTML = "<p>Geolocation is not supported by your browser</p>";
		        return;
		    }
		  
		    // Geo Position
		    navigator.geolocation.getCurrentPosition( success, error, geo_options );

		};

		function success(position) {      
		    var lat  = position.coords.latitude,
		        lng = position.coords.longitude;
		    map.panTo( [lat,lng] );
		    map.setZoom( 17 );
		    directions.setOrigin( L.latLng(lat,lng) );
		    mapbox-directions-origin-input.classList.add( 'z-lower' );
		    geoWatch( position );
		    positionMarker.addTo(map);
		};

		 function watchSuccess( position ) {
		    positionMarker.setLatLng( L.latLng( position.coords.latitude, position.coords.longitude ) );
		}

		function error() {
		    errorsDiv.innerHTML = "Unable to retrieve your location";
		};

		function geoWatch( position ) {
		    watch = navigator.geolocation.watchPosition( watchSuccess, error, geo_options);
		}


	}
});
