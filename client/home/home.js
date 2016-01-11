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
		    zoomControl: false
		}).setView([40, -74.50], 9);

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
		
	}
});



