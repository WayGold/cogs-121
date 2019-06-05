

$(document).ready(() => {

  let url = '../../request_info/uid/' + localStorage.getItem("request_id");
  console.log(url);

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Current location: " + position.coords.latitude + " " + position.coords.longitude);
    });
  }
  else{
    console.log("Can't access location info!");
  }

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

        $.ajax({
          url: url,
          type: 'GET',
          dataType : 'json',
          async: false,
          success: (data) => {
            address = data.resourceSets[0].resources[0].name
          }
        })

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

  $("#zw_v_report_cancel").click(() => {
    console.log("cancel clicked!");
    window.location = "v_task.html";
  })

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
        // console.log(data);
        window.location = "v_taskinfo1.html";
      }
    });
  })
  $('#signout').click(()=>{
    console.log("signout clicked!");
    localStorage.removeItem('user');
    // this.navCtrl.setRoot(LoginPage);
    window.location = "../../index.html";
  })
});
