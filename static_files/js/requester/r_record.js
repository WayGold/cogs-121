
$(document).ready(() => {
  let all_records;

  $.ajax({
    url: '../../request_info/requester/' + localStorage.getItem("user"),
    type: 'GET',
    dataType : 'json',
    success: (data) => {
      console.log('You received some data!', data);
      all_records = data;

      const source = $("#entry-template").html();
      const template = Handlebars.compile(source);
      const parentDiv = $("#templatedProjects");

      for (const record of all_records) {
          const curData = record;
          const curHtml = template(curData);
          parentDiv.append(curHtml);

          $('.lqz_rate').click(() => {
            window.location = "r_finished.html";
          });

          $('.lqz_report').click(() => {
            window.location = "r_report.html";
          });

          $('.record').click(() => {
            window.location = "waiting.html";
          });

          console.log(curData)
        }
      }
    });

    $('#lqz_new_request').click(() => {
      window.location = "r_request.html";
    });

    $('#lqz_refresh').click(() => {
      document.location.reload();
    });

  });


$(document).ajaxError(() => {
  $('#status').html('Error: unknown ajaxError!');
});
