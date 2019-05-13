$(document).ready(() => {

  $("#zw_finish_cancel").click(() => {
    console.log("cancel clicked!");
    window.location = "v_record.html";
  })

  $("#zw_finish_submit").click(() => {
    console.log("submit clicked");
    window.location = "v_record.html";
  })
});
