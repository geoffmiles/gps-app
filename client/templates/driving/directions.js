var origin = '200 bloomfield ave west hartford ct 06117';
var destination = '967 asylum ave hartford ct 06105';
var url = ('https://maps.googleapis.com/maps/api/directions/json?origin="' + origin + '"&destination="' + destination + '"&key=AIzaSyBwzdWlhhhTeh6-6whG5M3I6cW5rqQTY3g');

$.getJSON(url, function (json) {

    // Set the variables from the results array
    var step = json.routes[0].legs[0].steps[0].html_instructions;
    console.log('Step : ', step);
    
    var distance = json.routes[0].legs[0].distance.text;
    console.log('Distance : ', distance);
    
    var duration = json.routes[0].legs[0].duration.text;
    console.log('Duration : ', duration);

    var distdur = (duration + " (" + distance + ")");

    // Set the table td text
    $('#step').text(step);
    $('#distance').text(distance);
    $('#duration').text(duration);
    $('#dist-dur').text(distdur);
});