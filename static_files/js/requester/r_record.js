
$(document).ready(() => {


  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Current location: " + position.coords.latitude + " " + position.coords.longitude);
    });
  }
  else{
    console.log("Can't access location info!");
  }

  $('#lqz_new_request').click(() => {
    window.location = "r_request.html";
  });

  $('#lqz_refresh').click(() => {
    document.location.reload();
  });

  $.ajax({
    url: '../../request_info/requester/' + localStorage.getItem("user"),
    type: 'GET',
    dataType : 'json',
    success: (data) => {
      console.log('You received some data!', data);
      const all_records = data;

      for (const record of all_records) {
        let rate_or_report = "";
        $.ajax ({
          url: '../../rating_info/' + record.uid,
          type: 'GET',
          dataType : 'json',
          async:false,
          success: (data) => {
            if (data == "1") {
              rate_or_report = "Report";
            }
            else {
              rate_or_report = "Rate";
            }
          }
        });

        let button_text = "";
        let button_html = "";
        let redirect = ""
        if (record.status != "Finished") {
          button_text = "Cancel";
          redirect = "waiting.html"
        }
        else {
          button_text = "Delete";
          button_html = `<button class='lqz_rate' id="btn_${record.uid}">${rate_or_report}</button>`;
          redirect = "r_report.html";
        }

        const template = `
        <div class='recordbox'>
        <div class='record' id="btn_${record.uid}">
        <p>Status: ${record.status}</p>
        <p>Request ID: ${record.uid}</p>
        <p>Emergency Level: ${record.emergency}</p>
        <p>Category: ${record.category}</p>
        <p>Personal Condition: ${record.disability}</p>
        <p>Description: ${record.description}</p>
        </div>
        <div class='buttons'>
        ${button_html}
        <button class='lqz_cancel' id="cancel_${record.uid}">${button_text}</button>
        </div>
        </div>
        `;

        $("#templatedProjects").append(template);


        $('.lqz_rate').click(() => {
          localStorage.setItem("request_id", record.uid);
          if ($('.lqz_rate').html() == "Rate")
          window.location = "r_finished.html";
          else {
            window.location = "r_report.html";
          }
        });

        let btn_id = "#btn_"+record.uid;
        $(btn_id).click(() => {
          localStorage.setItem("request_id", record.uid);
          console.log(record.uid);
        });
          $(".record").click(() => {window.location = redirect});

        let cancel_id = "#cancel_"+record.uid;
        $(cancel_id).click(() => {
          if (confirm("Are you sure to cancel?")){
            $.ajax({
              // all URLs are relative to http://localhost:3000/
              url: '../../delete/' + record.uid,
              type: 'POST',
              success: window.location = "r_record.html" // <-- this is POST, not GET
            });
          }
        });



      }}


    });
  });


  $(document).ajaxError(() => {
    $('#status').html('Error: unknown ajaxError!');
  });
