/*
*  File Name: rating_record.js
*
*  Functionalities:
*  1. see the rating that was given by the requester
*/
$(document).ready(() => {

  // backend get request to get rating info with specified ticket id
  $.ajax({
    url: '../../rating_info/' + localStorage.getItem("request_id"),
    type: 'GET',
    dataType : 'json',
    success:(data) => {
      console.log(data);

      for (const rating of data){
        // get the ticket info
        $.ajax({
          url: '../../request_info/uid/' + localStorage.getItem("request_id"),
          type: 'GET',
          dataType : 'json',
          success:(request) => {

            for (record of request){
              if (rating.description == null){
                rating.description = ""
              }
              // display with template
              const template = `
              <div class='record'>
              <p>Rater: ${record.requester} </p>
              <p>Volunteer: ${record.accepter} </p>
              <p>Request ID: ${record.uid}</p>
              <p>Comment: ${rating.description}</p>
              </div>
              `;

              for (let i = 1; i <= rating.score; i++){
                const star = "#star" + i;
                console.log(star);
                $(star).css("color", "#ffc700");
              }

              $("#template").append(template);
            }
          }
        });
      }
    }
  });

    // button handlers
    $('#lqz_back').click(()=>{window.history.back();})
    $('#signout').click(()=>{
      console.log("signout clicked!");
      localStorage.removeItem('user');
      // this.navCtrl.setRoot(LoginPage);
      window.location = "../../index.html";
    })
  });
