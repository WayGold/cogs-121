$(document).ready(() => {

  $.ajax({
    url: '../../user/' + localStorage.getItem("request_id"),
    type: 'GET',
    dataType : 'json',
    success: (data) => {
      let phone = "";

      console.log('You received some data!', data);
      for (let record of data) {
        $.ajax({
          url: '../../user/' + record.accepter,
          type: 'GET',
          dataType : 'json',
          async:false,
          success:(info) => {
            phone = info.phone;
          }});
        const template = `
        <div class='record'>
        <p>Volunteer: ${record.accepter} </p>
        <p>Contact Number: ${phone} </p>
        <p>Request ID: ${record.uid}</p>
        <p>Description: ${record.description}</p>
        </div>
        `;

        $("#template").append(template);
      }
    }
  });

  $("#zw_finish_cancel").click(() => {
    console.log("cancel clicked!");
    window.location = "r_record.html";
  });

  $("#zw_finish_submit").click(() => {
    console.log("submit clicked!");
    window.location = "r_record.html";
  });

})
