
$(document).ready(() => {
  let all_records;

  $.ajax({
    url: '../../request_info/accepter/' + localStorage.getItem("user"),
    type: 'GET',
    dataType : 'json',
    success: (data) => {
      console.log('You received some data!', data);
      all_records = data;

      for (const record of all_records) {
        let button_text = "";
        let redirect = "";
        if (record.status == "Waiting") {
          button_text = "Cancel";
          redirect = "v_taskinfo.html"
        }
        else if (record.status == "Matched") {
          button_text = "Cancel";
          redirect = "v_taskinfo1.html"
        }
        else {
          button_text = "Delete";
          redirect = "v_report.html";
        }
          const template = `
          <div class='recordbox'>
              <div class='record' id="btn_${record.uid}">
              <p>Status: ${record.status}</p>
              <p>Request ID: ${record.uid}</p>
              <p>Requester: ${record.requester}</p>
              <p>Emergency Level: ${record.emergency}</p>
              <p>Category: ${record.category}</p>
              <p>Personal Condition: ${record.disability}</p>
              <p>Description: ${record.description}</p>
              </div>
              <div class='buttons'>
                <button class='lqz_cancel' id="cancel_${record.uid}">Delete</button>
                <button class='lqz_report' id="btn_${record.uid}">Report</button>
              </div>
            </div>
          `;

          $("#templatedProjects").append(template);

          $('.lqz_report').click(() => {
            localStorage.setItem("request_id", record.uid);
            window.location = "v_report.html";
          });

          let btn_id = "#btn_"+record.uid;
          $(btn_id).click(() => {
            localStorage.setItem("request_id", record.uid);
            console.log(record.uid);
          });
          $(".record").click(() => {window.location = redirect});

          let cancel_id = "#cancel_"+record.uid;
          $(cancel_id).click(() => {
            if (confirm("Are you sure to delete?")){
              $.ajax({
                // all URLs are relative to http://localhost:3000/
                url: '../../delete/accepter/' + record.uid,
                type: 'POST',
                success: window.location = "v_record.html" // <-- this is POST, not GET
              });
            }
          });
        }
      }
    });

    $('#lqz_find').click(() => {
      window.location = "v_task.html";
    });

    $('#lqz_refresh').click(() => {
      document.location.reload();
    });
    $('#signout').click(()=>{
      console.log("signout clicked!");
      localStorage.removeItem('user');
      // this.navCtrl.setRoot(LoginPage);
      window.location = "../../index.html";
    })
  });


$(document).ajaxError(() => {
  $('#status').html('Error: unknown ajaxError!');
});
