/*
 *  File Name: waiting.js
 *
 *  Functionalities:
 *  1. Get requests including finding one specific users, receiving all records,
 *     finding the specific request with id, finding the specific status with id,
 *     get filtered requests with specified keys.
 *  2. The cancel key can be linked to the index page, the Go Back key can be
 *     linked to the previous page.
 *  3. Map display volunteer location and estimation of arriving time
 *  4. Play the video.
 *  5. Div corresponding to id is displayed according to the value of the obtained
 *     state, and it is refreshed every two seconds to ensure timely jump to the
 *     new state.
 */


// Globals
let requester_data;
let accepter_latitude;
let accepter_longitude;
let map_flag = false;

$(document).ready(() => {

  let url = '../../request_info/uid/' + localStorage.getItem("request_id");
  console.log(url);
  $.ajax({
    url: url,
    type: 'GET',
    dataType : 'json',
    success: (data) => {
      console.log('You received some data!', data);
      all_records = data;


      const source = $("#taskinfo").html();
      const template = Handlebars.compile(source);
      const parentDiv = $("#single_task");

      for (const record of all_records) {
          const curData = record;
          const curHtml = template(curData);
          parentDiv.append(curHtml);

          console.log(curData);

          $('#zsy_cancel').click(() => {
            console.log("Cancel clicked");
            if (confirm("Are you sure to cancel?")) {
              $.ajax({
                // all URLs are relative to http://localhost:3000/
                url: '../../delete/' + record.uid,
                type: 'POST',
                success: window.location = "r_record.html" // <-- this is POST, not GET
              });
            }
          });
        }
      }

    });

  $('#zsy_finish').click(() => {
    $.ajax({
      url: '../../change_status/' + localStorage.getItem("request_id"),
      type: 'POST',
      data: {
        status: "Finished",
        accepter: localStorage.getItem("user")
      },
      success: (data) => {
        console.log("next clicked");
        window.location = "r_finished.html";
      }
    });
  });

  $("#lqz_back").click(()=> {
    window.location = "r_record.html";
  });



  show1();

  function order(){

    $.ajax({
      url: url,
      type: 'GET',
      timeout: 2000,
      cache: false,
      async: true,
      dataType: 'json',
      success: (data) => {
        requester_data = data[0];
        console.log("Ajax success, data recieved: ", requester_data);
        console.log('Current status: ', data[0].status);

        if (data[0].status == 'Matched') {
          show2();
          accepter_latitude = data[0].accepter_latitude;
          accepter_longitude = data[0].accepter_longitude;
          if(map_flag == false){
            displayMap();
          }
        }
        else if (data[0].status == 'Arrived'){
          show3();
        }
      }
    });
  }

  order();
  setInterval(order, 2000);

});

function show1() {
  document.getElementById("waiting").style.display = "block";
  document.getElementById("cancelbtn").style.display = "block";
  document.getElementById("video").style.display = "block";
  document.getElementById("matched").style.display = "none";
  document.getElementById("finished").style.display = "none";
};

function show2() {
  document.getElementById("matched").style.display = "block";
  document.getElementById("cancelbtn").style.display = "block";
  document.getElementById("waiting").style.display = "none";
  document.getElementById("video").style.display = "none";
  document.getElementById("finished").style.display = "none";
}

function show3() {
  document.getElementById("finished").style.display = "block";
  document.getElementById("waiting").style.display = "none";
  document.getElementById("cancelbtn").style.display = "none";
  document.getElementById("matched").style.display = "none";
  document.getElementById("video").style.display = "none";
}

function GetMap() {

  let map = new Microsoft.Maps.Map('#myMap-match', {credentials: key});
  let request_location = new Microsoft.Maps.Location(requester_data.latitude, requester_data.longitude);

  console.log("Got volunteer's location at: " + accepter_latitude + " " + accepter_longitude);

  let volunteer_location = new Microsoft.Maps.Location(accepter_latitude, accepter_longitude);

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

  document.getElementById('routeInfoPanel-match').innerHTML = 'Distance: ' + distance + ' ' + distanceUnits + '<br/>Time with Traffic: ' + time + ' minutes';
}

function directionsError(e) {
  alert('Error: ' + e.message + '\r\nResponse Code: ' + e.responseCode)
}

function displayMap(){
  map_flag = true;
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.defer = true;
  script.src ='http://www.bing.com/api/maps/mapcontrol?callback=GetMap';
  document.body.appendChild(script);
}
