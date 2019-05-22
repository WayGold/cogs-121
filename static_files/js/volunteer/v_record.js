
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
              <div class='lqz_accept' id="btn_${record.uid}">
              <p>Status: ${record.status}</p>
              <p>Request ID: ${record.uid}</p>
              <p>Emergency Level: ${record.emergency}</p>
              <p>Category: ${record.category}</p>
              <p>Personal Condition: ${record.disability}</p>
              <p>Description: ${record.description}</p>
              </div>
              <div class='buttons'>
                <button class='lqz_accept' id="btn_${record.uid}"> More </button>
              </div>
            </div>
          `;

          $("#templatedProjects").append(template);

          $('.lqz_report').click(() => {
            window.location = "v_report.html";
          });

          $('.record').click(() => {
            window.location = "v_report.html";
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

  });


$(document).ajaxError(() => {
  $('#status').html('Error: unknown ajaxError!');
});
