$(document).ready(() => {
  $('#zsy_finish').click(() => {
    console.log("next clicked");
      window.location = "r_finished.html";
  });

})
$(document).ready(() => {
  $('#zsy_cancel').click(() => {
    console.log("Cancel clicked");
    if(confirm("Are you sure to cancel?")) {
      window.location = "../../index.html";
    }
  });

})
