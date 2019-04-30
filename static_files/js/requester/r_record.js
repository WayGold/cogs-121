$(document).ready(() => {
  $.ajax({
    url: 'request_info',
    type: 'GET',
    dataType : 'json',
    success: (data) => {
      console.log('You received some data!', data);
      $('#lqz_status').html('All users: ' + data);
    },
  })
});

$(document).ajaxError(() => {
  $('#status').html('Error: unknown ajaxError!');
});
