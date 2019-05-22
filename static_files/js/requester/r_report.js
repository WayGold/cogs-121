$(document).ready(() => {

  $.ajax({
    url: '../../request_info/' + localStorage.getItem("request_id"),
    type: 'GET',
    dataType : 'json',
    success: (data) => {
      console.log('You received some data!', data);
      for (let record of data) {

console.
        const template = `

        <div class='record' id="btn_${record.uid}">
        <p>Request ID: ${record.uid}</p>
        <p>Emergency Level: ${record.emergency}</p>
        <p>Category: ${record.category}</p>
        <p>Personal Condition: ${record.disability}</p>
        <p>Description: ${record.description}</p>
        </div>
        <div class='buttons'>
        <button class='lqz_rate' id="btn_${record.uid}"> Rate </button>
        <button class='lqz_cancel' id="cancel_${record.uid}"> ${button_text}</button>
        </div>

        `;

        $("#info").append(template);
      }
    }
  });

  $("#zw_finish_cancel").click(() => {
    console.log("cancel clicked!");
    window.location = "r_record.html";
  })

  $("#zw_finish_submit").click(() => {
    console.log("submit clicked");
    window.location = "r_record.html";
  })
});
