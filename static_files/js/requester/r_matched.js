$(document).ready(() => {
  $('#zsy_finish').click(() => {
    console.log("Finish clicked");
    if(confirm("Are you sure to Finish?")) {
      window.location = "r_finished.html";
    }
  });

})
