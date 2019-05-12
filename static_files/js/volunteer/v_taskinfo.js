

$(document).ready(() => {

  let url = '../../request_info/' + localStorage.getItem("request_id");
  console.log(url);

  $.ajax({
    url: url,
    type: 'GET',
    dataType : 'json',
    success: (data) => {
      console.log('You received some data!', data);
      all_records = data;

      const source = $("#taskinfo").html();
      const template = Handlebars.compile(source);
      const parentDiv = $("#single_task");

      for (const record of all_records) {
          const curData = record;
          const curHtml = template(curData);
          parentDiv.append(curHtml);

          $('.lqz_report').click(() => {
            window.location = "v_report.html";
          });


          $('.lqz_accept').click(() => {
            curr_record = record.uid;
            window.location = "v_taskinfo.html";
          });

          console.log(curData);
        }
      }
    });

  $("#zw_v_report_cancel").click(() => {
      console.log("cancel clicked!");
      window.location = "v_task.html";
  })

  $("#zw_v_report_submit").click(() => {
      console.log("accept clicked");
      window.location = "v_taskinfo1.html";
  })
});
