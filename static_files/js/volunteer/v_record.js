
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
        <div id='btns_${record.uid}' style="text-align:center">
        <button class='lqz_cancel' id="cancel_${record.uid}"></button>
        </div>
        `;

        $("#templatedProjects").append(template);

        let cancel_id = "#cancel_"+record.uid;
        if (record.status == "Matched") {
          $(cancel_id).html('Cancel');
          $(cancel_id).click(()=>{change_status(record.uid, "Waiting", null)});
          $(`#btn_${record.uid}`).click(() => {window.location = "v_taskinfo1.html"});
        }
        else if (record.status == "Arrived") {
          $(cancel_id).html('Finish');
          $(cancel_id).click(()=>{change_status(record.uid, "Finished", record.accepter)});
          $(`#btn_${record.uid}`).click(() => {window.location = "v_taskinfo1.html"});
        }
        else {
          console.log("â");
          $(`#btns_${record.uid}`).append(`<button class='lqz_report' id="btn_${record.uid}">Report</button>`);
          $(cancel_id).html('Delete');

          $(cancel_id).click(()=>{delete_record(record.uid)});
          let records = {};
          $.ajax ({
            url: '../../rating_info/' + record.uid,
            type: 'GET',
            dataType : 'json',
            async:false,
            success: (data) => {
              records = data;
            }
          });
          if (Object.keys(records).length != 0) {
            $(`#btn_${record.uid}`).click(() => {
              localStorage.setItem("request_id", record.uid);
              window.location = "../rating_record.html"});
            }
            else {
              $(`#btn_${record.uid}`).click(()=>{});
            }
          }

          $('.lqz_report').click(() => {
            localStorage.setItem("request_id", record.uid);
            window.location = "../report.html";
          });

          function cancel(uid){
            // if($(this).html ==)
            if (confirm("Are you sure to delete?")){
              $.ajax({
                // all URLs are relative to http://localhost:3000/
                url: '../../delete/accepter/' + uid,
                type: 'POST',
                success: window.location = "v_record.html" // <-- this is POST, not GET
              });
            }
          }

          function delete_record(uid){
            // if($(this).html ==)
            if (confirm("Are you sure to delete?")){
              $.ajax({
                // all URLs are relative to http://localhost:3000/
                url: '../../delete/accepter/' + uid,
                type: 'POST',
                success: window.location = "v_record.html" // <-- this is POST, not GET
              });
            }
          }

          function change_status(uid, status, accepter){
            let question = ""
            if (status != "Finished"){
              qustion = "Are you sure to cancel?"
            }
            else {
              question = "Are you sure to finish?"
            }
            if (confirm(question)) {
              $.ajax({
                // all URLs are relative to http://localhost:3000/
                url: '../../change_status/' + uid,
                type: 'POST',
                data: {
                  status: status,
                  accepter: accepter
                },
                success: window.location = "v_record.html" // <-- this is POST, not GET
              });
            }
          }
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
