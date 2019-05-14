// let req_data;
// let status;
$(document).ready(() => {

  $.ajax({
    url: '../../request_info/' + localStorage.getItem("request_id"),
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      console.log('You received some data!', data);
    }
  });

  $(document).ready(() => {
    $('#zsy_finish').click(() => {
      $.ajax({
        url: '../../change_status/' + localStorage.getItem("request_id"),
        type: 'POST',
        data: {
          status: "Finished",
          accepter: localStorage.getItem("user")
        },
        success: (data) => {
          console.log("next clicked");
          window.location = "r_finished.html";
        }
      });
    });
  });
  $(document).ready(() => {
    $('#zsy_cancel').click(() => {
      console.log("Cancel clicked");
      if (confirm("Are you sure to cancel?")) {
        window.location = "r_record.html";
      }
    });

  })

  function show1() {
    document.getElementById("waiting").style.display = "block";
    document.getElementById("matched").style.display = "none";
    document.getElementById("finished").style.display = "none";
  };

  function show2() {
    document.getElementById("matched").style.display = "block";
    document.getElementById("waiting").style.display = "none";
    document.getElementById("finished").style.display = "none";
  }

  function show3() {
    document.getElementById("finished").style.display = "block";
    document.getElementById("waiting").style.display = "none";
    document.getElementById("matched").style.display = "none";
  }
   show1();
  function order() {

    $.ajax({
      url: '../../request_info/' + localStorage.getItem("request_id"),
      type: 'GET',
      timeout: 2000,
      cache: false,
      async: true,
      dataType: 'json',
      success: (data) => {
        console.log('You received some data!', data[0].status);

        if (data[0].status == 'Matched') {
          show2();
        } else if (data[0].status == 'Arrived'){
          show3();
        }
      }
    });

  }
  order();
  setInterval(order, 2000);

});
