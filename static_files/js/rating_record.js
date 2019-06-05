$(document).ready(() => {

  $.ajax({
    url: '../../rating_info/' + localStorage.getItem("request_id"),
    type: 'GET',
    dataType : 'json',
    success:(data) => {
      console.log("Rating:" + data);
        const rating = data;
        $.ajax({
          url: '../../request_info/uid/' + localStorage.getItem("request_id"),
          type: 'GET',
          dataType : 'json',
          success:(request) => {
            console.log("Request:" + request);
            for (record of request){
              if (rating.description == null){
                rating.description = ""
              }
              
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
    });

  $('#lqz_back').click(()=>{window.history.back();})
  $('#signout').click(()=>{
    console.log("signout clicked!");
    localStorage.removeItem('user');
    // this.navCtrl.setRoot(LoginPage);
    window.location = "../../index.html";
  })
});
