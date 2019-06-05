/*
*  File Name: v_task.js
*
*  Functionalities:
*  1. see the all tickets in db
*  2. filter the tickets
*/
$(document).ready(() => {
  let params = {emergency:"", category:"", disability:""};
  console.log(params);


  filtered_data ()
  // change hanlder for emergency dropdown
  $('#emergency_select').change(()=>{
    params["emergency"] = $("#emergency_select option:selected").text();
    if (params.emergency == "Nothing selected...") {
      params.emergency = "";
    }
    filtered_data ()
  })

  // change handler for category dropdown
  $('#category_select').change(()=>{
    params["category"] = $("#category_select option:selected").text();
    if (params.category == "Nothing selected...") {
      params.category = "";
    }
    filtered_data ()
  })

  // change handler for type dropdown
  $('#type_select').change(()=>{
    params["disability"] = $("#type_select option:selected").text();
    if (params.disability == "Nothing selected...") {
      params.disability = "";
    }
    filtered_data ()
  })

  // filter helper, call backend filter request
  function filtered_data (){
    $.ajax({
      url: '../../filter/',
      type: 'GET',
      data: params,
      dataType : 'json',
      async:false,
      success: (data) => {
        console.log('You received some data!', data);
        display_record(data);
      }
    })
  }

  // display record helper, apply data get from db to template
  function display_record(all_records){
    $("#templatedProjects").empty();

    for (const record of all_records) {
      if (record.status != "Waiting") {continue;}

      const point = `${record.latitude},${record.longitude}`
      const entityTypes = "Address"
      const url = `http://dev.virtualearth.net/REST/v1/Locations/${point}?includeEntityTypes=${entityTypes}&key=${key}`
      let address = ""

      // api call to get location name of the request
      $.ajax({
        url: url,
        type: 'GET',
        dataType : 'json',
        async: false,
        success: (data) => {
          address = data.resourceSets[0].resources[0].name
        }
      })

      // template to display
      const template = `
      <div class='recordbox'>
      <div class='lqz_accept' id="box_${record.uid}">
      <p>Status: ${record.status}</p>
      <p>Request ID: ${record.uid}</p>
      <p>Emergency Level: ${record.emergency}</p>
      <p>Category: ${record.category}</p>
      <p>Personal Condition: ${record.disability}</p>
      <p>Location: ${address}</p>
      <p>Description: ${record.description}</p>
      </div>
      <div class='buttons'>
      <button class='lqz_report' id="btn_${record.uid}"> More </button>
      </div>
      </div>`;

      $("#templatedProjects").append(template);

      let btn_id = "#btn_"+record.uid;
      let box_id = "#box_"+record.uid;

      // click handlers as user click on ticket
      $(btn_id).click(() => {
        localStorage.setItem("request_id", record.uid);
        console.log(record.uid);
        window.location = "v_taskinfo.html";
      });
      $(box_id).click(() => {
        localStorage.setItem("request_id", record.uid);
        console.log(record.uid);
        window.location = "v_taskinfo.html";
      });

    }
  }

  // signout handler
  $('#signout').click(()=>{
    console.log("signout clicked!");
    localStorage.removeItem('user');
    // this.navCtrl.setRoot(LoginPage);
    window.location = "../../index.html";
  })

  // record handler
  $('.record').click(() => {
    window.location = "v_record.html";
  });

  // refresh handler
  $('#lqz_refresh').click(() => {
    document.location.reload();
  });
})
