let req_data;
let status;
$(document).ready(() => {
  let url = '../../request_info/' + localStorage.getItem("request_id");
  console.log(url);


  // $.ajax({
  //   url: url,
  //   type: 'GET',
  //   dataType: 'json',
  //   success: (data) => {
  //     console.log('You received some data!', data);
  //     console.log('status: ' + data[0].status);
  //     req_data = data;
  //   }
  // });

  $(document).ready(() => {
    $('#zsy_finish').click(() => {
      console.log("next clicked");
      window.location = "r_finished.html";
    });

  })
  $(document).ready(() => {
    $('#zsy_cancel').click(() => {
      console.log("Cancel clicked");
      if (confirm("Are you sure to cancel?")) {
        window.location = "../../index.html";
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
  // function runEvery1Sec() {
  //     setTimeout( runEvery10Sec, 1000 );
  //     $.ajax({
  //       url: url,
  //       type: 'GET',
  //       dataType: 'json',
  //       success: (data) => {
  //         console.log('You received some data!', data);
  //         console.log('status: ' + data[0].status);
  //         req_data = data;
  //       }
  //     });
  // //   }
  // function changeDivStyle(){
  //   while(true)
  //   {
  //     runEvery1Sec();
  //     // var status = 2;
  //     status = req_data[0].status;
  //     if(status==2){
  //       show2();
  //     }else if(status==3){
  //       show3();
  //     }
  //   }
  //
  // }
  setInterval("order()",2000);
  function order() {
      $.ajax({
          type: "POST",
          url: url,
          timeout: 2000,
          cache: false,
          async: true,
          dataType: "json",
          success: function(data) {
            if(data[0].status==2){
              show2();
            }else if(data[0].status==2){
              show3();
            }
          }
      });
  }

});
