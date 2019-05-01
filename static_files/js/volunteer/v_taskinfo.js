$(document).ready(() => {

  $("#zw_v_report_cancel").click(() => {
    console.log("cancel clicked!");
    window.location = "v_task.html";
  })

  $("#zw_v_report_submit").click(() => {
    console.log("accept clicked");
    window.location = "v_taskinfo1.html";
  })
});
