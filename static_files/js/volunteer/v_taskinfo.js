

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

          console.log(curData);
        }
      }
    });

  $("#zw_v_report_cancel").click(() => {
      console.log("cancel clicked!");
      window.location = "v_task.html";
  })

  $("#zw_v_report_submit").click(() => {
      curr_record = localStorage.getItem("request_id");
      $.ajax({
        url: '../../change_status/' + curr_record,
        type: 'POST',
        data: {
          status: "Matched",
          accepter: localStorage.getItem("user")
        },
        success: (data) => {
          console.log("Successfully accepted!");
          // console.log(data);
          window.location = "v_taskinfo1.html";
        }
      });
  })
});
