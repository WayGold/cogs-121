$(document).ready(() => {

  $.ajax({
    url: '../../request_info/' + localStorage.getItem("request_id"),
    type: 'GET',
    dataType : 'json',
    success: (data) => {
      let phone = "";

      console.log('You received some data!', data);
      for (let record of data) {
        console.log(record.accepter);
        $.ajax({
          url: '../../users/' + record.accepter,
          type: 'GET',
          dataType : 'json',
          async:false,
          success:(info) => {
            phone = info.phone;
          }
        });
        const template = `
        <div class='record'>
        <p>Report Subject: ${record.accepter} </p>
        <p>Contact Number: ${phone} </p>
        <p>Request ID: ${record.uid}</p>
        <p>Description: ${record.description}</p>
        </div>
        `;

        $("#template").append(template);

        $("#zw_finish_cancel").click(() => {
          console.log("cancel clicked!");
          window.location = "r_record.html";
        });

        $("#zw_finish_submit").click(() => {
          console.log("submit clicked!");
          const desc = $('#lqz_desc').val();
          console.log(desc);
          if(confirm("Are you sure to submit?")){
            $.ajax({
              // all URLs are relative to http://localhost:3000/
              url: '../../add_report',
              type: 'POST', // <-- this is POST, not GET
              data: {
                uid: record.uid,
                description:desc,
              },
              success:window.location = "r_record.html",

            });

          }
        });
      }
    }

  });
});
