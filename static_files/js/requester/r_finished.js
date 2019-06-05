/*
*  File Name: r_finished.js
*
*  Functionalities:
*  1. rate the volunteer
*/
$(document).ready(() => {

  // get the current ticket via the request id
  $.ajax({
    url: '../../request_info/' + localStorage.getItem("request_id"),
    type: 'GET',
    dataType : 'json',
    success: (data) => {
      let phone = "";

      console.log('You received some data!', data);
      for (let record of data) {
        console.log(record.accepter);
        // get the volunteer info
        $.ajax({
          url: '../../users/' + record.accepter,
          type: 'GET',
          dataType : 'json',
          async:false,
          success:(info) => {
            phone = info.phone;
          }
        });
        // template to display
        const template = `
        <div class='record'>
        <p>Volunteer: ${record.accepter} </p>
        <p>Contact Number: ${phone} </p>
        <p>Request ID: ${record.uid}</p>
        <p>Description: ${record.description}</p>
        </div>
        `;

        $("#template").append(template);

        // rating with star
        let score = 0;
        $('#star1').click(()=>{score = 1;});
        $('#star2').click(()=>{score = 2;});
        $('#star3').click(()=>{score = 3;});
        $('#star4').click(()=>{score = 4;});
        $('#star5').click(()=>{score = 5;});

        // cancel button handler
        $("#zw_finish_cancel").click(() => {
          console.log("cancel clicked!");
          window.location = "r_record.html";
        });

        // submit handler
        $("#zw_finish_submit").click(() => {
          console.log("submit clicked!");
          const desc = $('#lqz_desc').val();
          console.log(desc);
          if(confirm("Are you sure to submit?")){
            $.ajax({
              // all URLs are relative to http://localhost:3000/
              url: '../../add_rating',
              type: 'POST', // <-- this is POST, not GET
              data: {
                uid: record.uid,
                score:score,
                description:desc,
              },
              success:window.location = "r_record.html",

            });

          }
        });
      }
    }

  });
  // signout handler
  $('#signout').click(()=>{
    console.log("signout clicked!");
    localStorage.removeItem('user');
    // this.navCtrl.setRoot(LoginPage);
    window.location = "../../index.html";
  })
});
