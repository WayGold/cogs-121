/*
 *  File Name: v_taskinfo.js
 *
 *  Functionalities:
 *  1. Get requests including finding one specific users, receiving all records,
 *     finding the specific request with id, get filtered requests with specified
 *     keys.
 *  2. The cancel key can be linked to the previous page, the submit key can be
 *     linked to the next page, and change the current state of record to 'Matched'.
 */

$(document).ready(() => {
  // get current request id
  let url = '../../request_info/uid/' + localStorage.getItem("request_id");
  console.log(url);

  // get latitude and longitude
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Current location: " + position.coords.latitude + " " + position.coords.longitude);
    });
  }
  else{
    console.log("Can't access location info!");
  }

  // get request info from backend
  $.ajax({
    url: url,
    type: 'GET',
    dataType : 'json',
    success: (data) => {
      console.log('You received some data!', data);
      all_records = data;

      for (const record of all_records) {
        const point = `${record.latitude},${record.longitude}`
        const entityTypes = "Address"
        const url = `http://dev.virtualearth.net/REST/v1/Locations/${point}?includeEntityTypes=${entityTypes}&key=${key}`
        let address = ""

        // get Address by calling Bing Maps's api
        $.ajax({
          url: url,
          type: 'GET',
          dataType : 'json',
          async: false,
          success: (data) => {
            address = data.resourceSets[0].resources[0].name
          }
        })

        // create and append template
        const template =
        `<div class='recordbox'>
        <div class='record'>
        <p>Request ID: ${record.uid}</p>
        <p>Requester: ${record.requester}</p>
        <p>Emergency Level: ${record.emergency}</p>
        <p>Category: ${record.category}</p>
        <p>Personal Condition: ${record.disability}</p>
        <p>Location: ${address}</p>
        <p>Description: ${record.description}</p>
        </div>
        </div>
        `
        $("#single_task").append(template);
      }
    }
  });

  // click button to go back
  $("#zw_v_report_cancel").click(() => {
    console.log("cancel clicked!");
    window.location = "v_task.html";
  })

  // click button to set request status
  $("#zw_v_report_submit").click(() => {
    curr_record = localStorage.getItem("request_id");
    $.ajax({
      url: '../../change_status/' + curr_record,
      type: 'POST',
      data: {
        status: "Matched",
        accepter: localStorage.getItem("user")
      },
      success: (data) => {
        console.log("Successfully accepted!");
        window.location = "v_taskinfo1.html";
      }
    });
  })

  // signout handler
  $('#signout').click(()=>{
    console.log("signout clicked!");
    localStorage.removeItem('user');
    window.location = "../../index.html";
  })
});
