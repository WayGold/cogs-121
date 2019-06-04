/*
 *  File Name: login.js
 *
 *  Functionalities:
 *  1. Some error handling functions for input
 *  2. login functionality by calling a get request from the backend and compare
 *     the userid and password
 *  3. Register via a post request to the backend
 */

// password error handling
function isPasswd(s) {
  var patrn = /^(\w){6,20}$/;
  if (!patrn.exec(s)) return false
  return true
}

// Name error handling
function isTrueName(s) {
  var patrn = /^[a-zA-Z]{1,30}$/;
  if (!patrn.exec(s))
    return false
  return true
}

// Phone error handling
function isMobil(s) {
  var patrn = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
  if (!patrn.exec(s)) return false
  return true
}

// Postal code error handling
function isPostalCode(s) {
  var patrn = /^[a-zA-Z0-9 ]{3,12}$/;
  if (!patrn.exec(s)) return false
  return true
}

// Check for all error
function check_login() {

  if ((($('#zw_create_account_username').val()).length < 6)||($('#zw_create_account_username').val()).length > 20) {
    alert("username must be between 6 and 20 characters long");
    return false;
  }
  else if (!isPasswd($('#zw_create_account_pwd').val())) {
    alert("password must be between 6 and 20 characters long");
    return false
  }

  else if (!isMobil($('#zw_create_account_phone').val())) {
    alert("invaild phone number");
    return false
  }
  else if (!isTrueName($('#zw_create_account_name').val())) {
    alert("invaild name");
    return false
  }

  else if (!isPostalCode($('#zw_create_account_loc').val())) {
    alert("invaild zipcode");
    return false
  }
  else
  return true
}

$(document).ready(() => {

  $('#zw_login_btn').click(() => {
    console.log("login clicked");

    const username = $('#zw_login_username').val();
    const pwd = $('#zw_login_pwd').val();
    const requestURL = '../users/' + username;

    // Get request to the backend getting all users
    $.ajax({
      // all URLs are relative to http://localhost:3000/
      url: requestURL,
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        console.log('You received some data!', data);
        if (data) {
          if (!Object.keys(data).length) {
            console.log("User not found!");
            $('#zw_login_status').html('User not found!');
          } else {
            // Check for pwd correctness
            console.log("Evaluating pwd: " + pwd + " with " + data.password);
            if (data.password == pwd) {
              console.log(username + 'login successfully!');
              // Set global user to login user
              current_user = username;
              localStorage.setItem("user", data.username);
              // Check user role
              if (data.role == 1) // volunteer
                window.location = "/html/volunteer/v_task.html";
              else // requester
                window.location = "/html/requester/r_record.html";
            }
            // Pwd not match
            else {
              $('#zw_login_status').html('Wrong password!');
            }
          }
        }
      }
    });
  });
$('#signout').click(()=>{
  console.log("signout clicked!");
  localStorage.removeItem('user');
  // this.navCtrl.setRoot(LoginPage);
  window.location = "index.html";
})
  $('#zw_create_account_btn').click(() => {
    console.log("create clicked!");
      if (confirm("Please confirm your action")) {
        if(check_login()){
          // Post request to the backend with user input
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
              if (data == "Success") {
                window.location = "../html/login.html";
              } else {
                console.log("{message: 'error in app.post(/create_user), try another username'}");
                $('#zw_create_status').html('Fail to create, try another username!');
              }
            }
          });
        }

        else{
          $('#zw_create_status').html('Fail to create!');
        }
      }

  })
})
