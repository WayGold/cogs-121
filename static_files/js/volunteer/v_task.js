$(document).ready(() => {

  // v_task
  let all_records;
  let curr_request;

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

          let btn_id = "#btn_"+record.uid;
          $(btn_id).click(() => {
            localStorage.setItem("request_id", record.uid);
            console.log(record.uid);
          });

          $('.lqz_accept').click(() => {
            window.location = "v_taskinfo.html";
          });

          console.log(curData)
        }
      }
    });

});


$(document).ajaxError(() => {
  $('#status').html('Error: unknown ajaxError!');
});
