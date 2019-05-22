$(document).ready(() => {

  // v_task
  let all_records;
  let curr_request;

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Current location: " + position.coords.latitude + " " + position.coords.longitude);
    });
  }
  else{
    console.log("Can't access location info!");
  }


  $('.record').click(() => {
    window.location = "v_record.html";
  });

  $.ajax({
    url: '../../request_info',
    type: 'GET',
    dataType : 'json',
    success: (data) => {
      console.log('You received some data!', data);
      all_records = data;

      const parentDiv = $("#templatedProjects");

      for (const record of all_records) {
        const template = `
        <div class='recordbox'>
            <div class='lqz_accept' id="btn_${record.uid}">
            <p>Status: ${record.status}</p>
            <p>Request ID: ${record.uid}</p>
            <p>Emergency Level: ${record.emergency}</p>
            <p>Category: ${record.category}</p>
            <p>Personal Condition: ${record.disability}</p>
            <p>Description: ${record.description}</p>
            </div>
            <div class='buttons'>
              <button class='lqz_report' id="btn_${record.uid}"> More </button>
            </div>
          </div>`;

          $("#templatedProjects").append(template);

          $('.lqz_report').click(() => {
            window.location = "v_report.html";
          });

          let btn_id = "#btn_"+record.uid;
          $(btn_id).click(() => {
            localStorage.setItem("request_id", record.uid);
            console.log(record.uid);
          });

          $('.lqz_accept').click(() => {
            window.location = "v_taskinfo.html";
          });

        }
      }
    });
    $('#lqz_refresh').click(() => {
      document.location.reload();
    });
});


$(document).ajaxError(() => {
  $('#status').html('Error: unknown ajaxError!');
});
