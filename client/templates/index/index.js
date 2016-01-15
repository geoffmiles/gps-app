Template.index.onRendered(function(){
	googleMaps.initialize();

	Deps.autorun(function(){
		if(Session.get('Lat') != null && Session.get("Lng") != null){
			googleMaps.setLocation();
		}
		if(Session.get('followMe') == true){
			setTimeout(function(){
				if(navigator.geolocation){navigator.geolocation.getCurrentPosition(function(position){
					Session.set('Lat', position.coords['latitude']);
					Session.set('Lng',  position.coords['longitude']);
				},
				function(error){console.log(error);},
				{enableHighAccuracy: true})}},3000);
		}
	});
});
	