
$(document).ready(() => {
  let all_records;
  $.ajax({
    url: '../../request_info',
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


          $('.lqz_report').click(() => {
            window.location = "v_report.html";
          });

          $('.record').click(() => {
            window.location = "v_taskinfo.html";
          });

          console.log(curData)
        }
      }
    });


    $('#lqz_home').click(() => {
      window.location = "../index.html";
    });



    $('#lqz_refresh').click(() => {
      document.location.reload();
    });

  });


$(document).ajaxError(() => {
  $('#status').html('Error: unknown ajaxError!');
});
