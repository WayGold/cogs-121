$(document).ready(() => {

  $('#zw_login_btn').click(() => {
    console.log("login clicked");

    const username = $('#zw_login_username').val();
    const pwd = $('#zw_login_pwd').val();
    const requestURL = '../users/' + username;

    $.ajax({
      // all URLs are relative to http://localhost:3000/
      url: requestURL,
      type: 'GET',
      dataType : 'json',
      success: (data) => {
        console.log('You received some data!', data);
        if(data){
          if(!Object.keys(data).length){
            console.log("User not found!");
            $('#zw_login_status').html('User not found!');
          }
          else{
            // Check for pwd correctness
            console.log("Evaluating pwd: " + pwd + " with " + data.password);
            if(data.password == pwd){
              console.log(username + 'login successfully!' );
              // Set global user to login user
              current_user = username;
              localStorage.setItem("user", data.username);
              // Check user role
              if(data.role == 1) // volunteer
                window.location = "/html/volunteer/v_task.html";
              else // requester
                window.location = "/html/requester/r_record.html";
            }
            // Pwd not match
            else{
              $('#zw_login_status').html('Wrong password!');
            }
          }
        }
      }
    });
  });

  $('#zw_create_account_btn').click(() => {
    console.log("create clicked!");

    if(confirm("Please confirm your action")){
      $.ajax({
        // all URLs are relative to http://localhost:3000/
        url: '../../create_user',
        type: 'POST', // <-- this is POST, not GET
        data: {
          username: $('#zw_create_account_username').val(),
          name: $('#zw_create_account_name').val(),
          password: $('#zw_create_account_pwd').val(),
          phone: $('#zw_create_account_phone').val(),
          location: $('#zw_create_account_loc').val(),
          role: $('#zw_create_account_role').val(),
        },
        success: (data) => {
          console.log(data);
          if(data == "Success") {
            window.location = "../html/login.html";
          }

          else {
            console.log("{message: 'error in app.post(/create_user), try another username'}");
            $('#zw_create_status').html('Fail to create, try another username!');
          }
        }
      });
    }

  })
})
