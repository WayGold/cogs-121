// $(document).ready(() => {
//
//   // v_task
//   let all_records;              // original  copy of data returned from db
//   let working_records;          // working copy of data for filter purposes
//   let curr_request;
//
//   // geolocation tester
//   if(navigator.geolocation){
//     navigator.geolocation.getCurrentPosition(function (position) {
//       console.log("Current location: " + position.coords.latitude + " " + position.coords.longitude);
//     });
//   }
//   else{
//     console.log("Can't access location info!");
//   }
//
//
//   $('.record').click(() => {
//     window.location = "v_record.html";
//   });
//
//   $.ajax({
//     url: '../../request_info',
//     type: 'GET',
//     dataType : 'json',
//     success: (data) => {
//       console.log('You received some data!', data);
//       all_records = data;
//       working_records = all_records;
//
//       const parentDiv = $("#templatedProjects");
//
//   $('#lqz_refresh').click(() => {
//     document.location.reload();
//   });
//
// display_record(working_records);
//   // Function used to filter the all_records array with the specified flag
//   function filter_record(flag, all_records){
//     // new record to return
//     let new_record = [];
//
//     // switch statement to filter the array
//     switch (flag) {
//       case "Low":
//         for(const record of all_records){
//           if(record.emergency == "Low"){
//             // unshift = push_front
//             new_record.unshift(record);
//           }
//         }
//         break;
//
//       case "Medium":
//         for(const record of all_records){
//           if(record.emergency == "Medium"){
//             new_record.unshift(record);
//           }
//         }
//         break;
//
//       case "High":
//         for(const record of all_records){
//           if(record.emergency == "High"){
//             new_record.unshift(record);
//           }
//         }
//         break;
//
//       case "Routine":
//         for(const record of all_records){
//           if(record.category == "Routine"){
//             new_record.unshift(record);
//           }
//         }
//         break;
//
//       case "Transportation":
//         for(const record of all_records){
//           if(record.category == "Transportation"){
//             new_record.unshift(record);
//           }
//         }
//         break;
//
//       case "Mental":
//         for(const record of all_records){
//           if(record.disability == "Mental"){
//             new_record.unshift(record);
//           }
//         }
//         break;
//
//       case "Physical":
//         for(const record of all_records){
//           if(record.disability == "Physical"){
//             new_record.unshift(record);
//           }
//         }
//         break;
//
//       default:
//         console.log("Flag not specified!");
//     }
//     return new_record;
//   }
//
//   // FIXME move the template into the function, should work
//   function display_record(all_records){
//     $("#templatedProjects").empty();
//
//     for (const record of all_records) {
//       if (record.status != "Waiting") {continue;}
//       const template = `
//       <div class='recordbox'>
//       <div class='lqz_accept' id="box_${record.uid}">
//       <p>Status: ${record.status}</p>
//       <p>Request ID: ${record.uid}</p>
//       <p>Emergency Level: ${record.emergency}</p>
//       <p>Category: ${record.category}</p>
//       <p>Personal Condition: ${record.disability}</p>
//       <p>Description: ${record.description}</p>
//       </div>
//       <div class='buttons'>
//       <button class='lqz_report' id="btn_${record.uid}"> More </button>
//       </div>
//       </div>`;
//
//       $("#templatedProjects").append(template);
//
//       let btn_id = "#btn_"+record.uid;
//       let box_id = "#box_"+record.uid;
//
//       $(btn_id).click(() => {
//         localStorage.setItem("request_id", record.uid);
//         console.log(record.uid);
//         window.location = "v_taskinfo.html";
//       });
//       $(box_id).click(() => {
//         localStorage.setItem("request_id", record.uid);
//         console.log(record.uid);
//         window.location = "v_taskinfo.html";
//       });
//
//     }
//   }
//
//   //filter by emergency level
//   let flag;
//   $('#emergency_select').change(()=>{
//
//     let new_record;
//     //extracting text value selected
//     let selected = $("#emergency_select option:selected").text();
//     console.log(selected + " selected!");
//
//     //check text value and setting flag accordingly
//     if(selected == "Low"){
//       console.log("setting flag to low");
//       flag = "Low";
//     }
//     else if(selected == "Medium"){
//       console.log("setting flag to medium");
//       flag = "Medium";
//     }
//     else if(selected == "High"){
//       console.log("setting flag to high");
//       flag = "High";
//     }
//     else{
//       console.log("Nothing selected or Something bad happened!");
//     }
//
//     // create a new array with filtered values, call helper function to filter
//     new_record = filter_record(flag, working_records);
//
//     // store the filtered records back to the global variable
//     working_records = new_record;
//     console.log(new_record);
//
//     // call display _record everytime user selected a new option so that the front end will be refreshed
//     display_record(working_records);
//
//   });
//
//   // filter by category
//   $('#category_select').change(()=>{
//
//     //extracting text value selected
//     let selected = $("#category_select option:selected").text();
//     console.log(selected + " selected!");
//
//     //check text value and setting flag accordingly
//     if(selected == "Routine"){
//       console.log("setting flag to Routine");
//       flag = "Routine";
//     }
//     else if(selected == "Transportation"){
//       console.log("setting flag to Transportation");
//       flag = "Transportation";
//     }
//     else{
//       console.log("Nothing selected or Something bad happened!");
//     }
//
//     // create a new array with filtered values, call helper function to filter
//     new_record = filter_record(flag, working_records);
//
//     // store the filtered records back to the global variable
//     working_records = new_record;
//
//     // call display _record everytime user selected a new option so that the front end will be refreshed
//     display_record(working_records);
//   });
//
//   // filter by disability type
//   $('#type_select').change(()=>{
//
//     //extracting text value selected
//     let selected = $("#type_select option:selected").text();
//     console.log(selected + " selected!");
//
//     //check text value and setting flag accordingly
//     if(selected == "Mental"){
//       console.log("setting flag to Mental");
//       flag = "Mental";
//     }
//     else if(selected == "Physical"){
//       console.log("setting flag to Physical");
//       flag = "Physical";
//     }
//     else{
//       console.log("Nothing selected or Something bad happened!");
//     }
//
//   // create a new array with filtered values, call helper function to filter
//   new_record = filter_record(flag, working_records);
//
//   // store the filtered records back to the global variable
//   working_records = new_record;
//
//   // call display _record everytime user selected a new option so that the front end will be refreshed
//   display_record(working_records);
//   });
//
//   $('#signout').click(()=>{
//     console.log("signout clicked!");
//     localStorage.removeItem('user');
//     // this.navCtrl.setRoot(LoginPage);
//     window.location = "../../index.html";
//   })
// }});
//
// });
//
// $(document).ajaxError(() => {
//   $('#status').html('Error: unknown ajaxError!');
// });
$(document).ready(() => {
  let params = {emergency:"", category:"", disability:""};
  console.log(params);
  filtered_data ()
  $('#emergency_select').change(()=>{
    params["emergency"] = $("#emergency_select option:selected").text();
    if (params.emergency == "Nothing selected...") {
      params.emergency = "";
    }
    filtered_data ()
  })
  $('#category_select').change(()=>{
    params["category"] = $("#category_select option:selected").text();
    if (params.category == "Nothing selected...") {
      params.category = "";
    }
    filtered_data ()
  })
  $('#type_select').change(()=>{
    params["disability"] = $("#type_select option:selected").text();
    if (params.disability == "Nothing selected...") {
      params.disability = "";
    }
    filtered_data ()
  })

  function filtered_data (){
  $.ajax({
     url: '../../filter/',
     type: 'GET',
     data: params,
     dataType : 'json',
     async:false,
     success: (data) => {
       console.log('You received some data!', data);
       display_record(data);
     }
   })
 }

   function display_record(all_records){
       $("#templatedProjects").empty();

       for (const record of all_records) {
         if (record.status != "Waiting") {continue;}
         const template = `
         <div class='recordbox'>
         <div class='lqz_accept' id="box_${record.uid}">
         <p>Status: ${record.status}</p>
         <p>Request ID: ${record.uid}</p>
         <p>Emergency Level: ${record.emergency}</p>
         <p>Category: ${record.category}</p>
         <p>Personal Condition: ${record.disability}</p>
         <p>Description: ${record.description}</p>
         </div>
         <div class='buttons'>
         <button class='lqz_report' id="btn_${record.uid}"> More </button>
         </div>
         </div>`;

         $("#templatedProjects").append(template);

         let btn_id = "#btn_"+record.uid;
         let box_id = "#box_"+record.uid;

         $(btn_id).click(() => {
           localStorage.setItem("request_id", record.uid);
           console.log(record.uid);
           window.location = "v_taskinfo.html";
         });
         $(box_id).click(() => {
           localStorage.setItem("request_id", record.uid);
           console.log(record.uid);
           window.location = "v_taskinfo.html";
         });

       }
     }
 })
