let request_location;
let directionsManager;
let volunteer_location;
let req_data;


$(document).ready(() => {

  let url = '../../request_info/' + localStorage.getItem("request_id");
  console.log(url);

  $.ajax({
    url: url,
    type: 'GET',
    dataType : 'json',
    success: (data) => {
      console.log('You received some data!', data);
      console.log('Latitude: ' + data[0].latitude + ' Longitude: ' + data[0].longitude);
      req_data = data;
    }
  });

  $("#zw_v_report_submit").click(() => {
    console.log("Arrived clicked");
    window.location = "v_record.html";
  })

});

function GetMap() {

  let map = new Microsoft.Maps.Map('#myMap', {credentials: key});
  request_location = new Microsoft.Maps.Location(req_data[0].latitude, req_data[0].longitude);
  //Request the user's location
  navigator.geolocation.getCurrentPosition(function (position) {
    volunteer_location = new Microsoft.Maps.Location(
      position.coords.latitude,
      position.coords.longitude);
    });

    Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
      //Create an instance of the directions manager.
      directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);

      //Create waypoints to route between.
      let request_Waypoint = new Microsoft.Maps.Directions.Waypoint({location: request_location});
      console.log("Adding way point at: " + request_location);
      directionsManager.addWaypoint(request_Waypoint);

      let volunteer_Waypoint = new Microsoft.Maps.Directions.Waypoint({location: volunteer_location});
      console.log("Adding way point at: " + volunteer_location);
      directionsManager.addWaypoint(volunteer_Waypoint);

      //Add event handlers to directions manager.
      Microsoft.Maps.Events.addHandler(directionsManager, 'directionsError', directionsError);
      Microsoft.Maps.Events.addHandler(directionsManager, 'directionsUpdated', directionsUpdated);

      //Calculate directions.
      directionsManager.calculateDirections();
    });
  }

  function directionsUpdated(e) {
    //Get the current route index.
    var routeIdx = directionsManager.getRequestOptions().routeIndex;

    //Get the distance of the route, rounded to 2 decimal places.
    var distance = Math.round(e.routeSummary[routeIdx].distance * 100)/100;

    //Get the distance units used to calculate the route.
    var units = directionsManager.getRequestOptions().distanceUnit;
    var distanceUnits = '';

    if (units == Microsoft.Maps.Directions.DistanceUnit.km) {
      distanceUnits = 'km'
    } else {
      //Must be in miles
      distanceUnits = 'miles'
    }

    //Time is in seconds, convert to minutes and round off.
    var time = Math.round(e.routeSummary[routeIdx].timeWithTraffic / 60);

    document.getElementById('routeInfoPanel').innerHTML = 'Distance: ' + distance + ' ' + distanceUnits + '<br/>Time with Traffic: ' + time + ' minutes';
  }

  function directionsError(e) {
    alert('Error: ' + e.message + '\r\nResponse Code: ' + e.responseCode)
  }
