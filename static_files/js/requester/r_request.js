/*
 *  File Name: r_request.js
 *
 *  Functionalities:
 *  1. Button onclick functions to get user input
 *  2. Get requester location
 *  3. Post request to the backend server, push the request data into the db
 *
 */

// Globals for user input
let input_emergency, input_category, input_disability, input_description, input_latitude, input_longitude;

// Get user location
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function (position) {
    input_latitude = position.coords.latitude;
    input_longitude = position.coords.longitude;
  });
}
else{
  console.log("Can't access location info!");
}

$(document).ready(() => {

  // Debug geolocation
  console.log("latitude: " + input_latitude);
  console.log("longitude: " + input_longitude);

  /* Onclick Function Handlers */

  $('#zw_Low').click(() => {
    console.log("low clicked");
    input_emergency = "Low";
    $('#zw_Low').toggleClass("click");
    $('#zw_Medium').removeClass("click");
    $('#zw_High').removeClass("click");
    //$('#zw_emergency_status').html('Emergency: ' + input_emergency);
  });

  $('#zw_Medium').click(() => {
    console.log("medium clicked");
    input_emergency = "Medium";
    $('#zw_Medium').toggleClass("click");
    $('#zw_Low').removeClass("click");
    $('#zw_High').removeClass("click");
    //$('#zw_emergency_status').html('Emergency: ' + input_emergency);
  });

  $('#zw_High').click(() => {
    console.log("high clicked");
    input_emergency = "High";
    $('#zw_High').toggleClass("click");
    $('#zw_Medium').removeClass("click");
    $('#zw_Low').removeClass("click");
    //$('#zw_emergency_status').html('Emergency: ' + input_emergency);
  });

  $('#zw_Routine').click(() => {
    console.log("Routine clicked");
    input_category = "Routine";
    $('#zw_Routine').toggleClass("click");
    $('#zw_Trans').removeClass("click");
    //$('#zw_category_status').html('Category: ' + input_category);
  });

  $('#zw_Trans').click(() => {
    console.log("Transportation clicked");
    input_category = "Transportation";
    $('#zw_Trans').toggleClass("click");
    $('#zw_Routine').removeClass("click");
    //$('#zw_category_status').html('Category: ' + input_category);
  });

  $('#zw_Mental').click(() => {
    console.log("Mental clicked");
    input_disability = "Mental";
    $('#zw_Mental').toggleClass("click");
    $('#zw_Physical').removeClass("click");
    //$('#zw_disability_status').html('Disability: ' + input_disability);
  });

  $('#zw_Physical').click(() => {
    console.log("Physical clicked");
    input_disability = "Physical";
    $('#zw_Physical').toggleClass("click");
    $('#zw_Mental').removeClass("click");
    //$('#zw_disability_status').html('Disability: ' + input_disability);
  });

  $('#zw_submit').click(() => {
    console.log("Submit clicked");

    input_description = $('#zw_description').val();

    if(confirm("Are you sure to submit?")){
      // Ajax call to backend post data
      $.ajax({
        // all URLs are relative to http://localhost:3000/
        url: '../../request_info',
        type: 'POST', // <-- this is POST, not GET
        data: {
          uid: null,
          requester: localStorage.getItem("user"),
          emergency: input_emergency,
          category: input_category,
          disability: input_disability,
          description: input_description,
          latitude: input_latitude,
          longitude: input_longitude,
          accepter_latitude: null,
          accepter_longitude: null,
          status: "Waiting",
          accepter: null,
        },
        success: (data) => {
          if(confirm("Submission Completed!")){
            //FIXME
            window.location = "r_record.html";
          }
          else{
            //FIXME
            window.location = "r_record.html";
          }
        }
      });
    }
  });

  $('#zw_cancel').click(() => {
    console.log("Cancel clicked");
    if(confirm("Are you sure to go back to home page?")) {
      window.location = "r_record.html";
    }
  });
  $('#signout').click(()=>{
    console.log("signout clicked!");
    localStorage.removeItem('user');
    // this.navCtrl.setRoot(LoginPage);
    window.location = "../../index.html";
  })
})
