import firebase from 'firebase';
import $ from 'jquery';
import CryptoJS from 'crypto-js';
export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "1009914269750"
  });
}
export const askForPermissioToReceiveNotifications = async () => {
    try {
      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();
      console.log('Current Token', token);
      var tokenId = CryptoJS.AES.decrypt(localStorage.getItem('TokenId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      
      console.log('Db Token', tokenId);
  $.ajax({
    type: 'POST',
    data: JSON.stringify({
      idToken:token,
      companyId:companyId,
      employeeId:employeeId,
          }),
    url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/Push/SendToken",
    contentType: "application/json",
    dataType: 'json',
    async: false,
    success: function (data, textStatus, jqXHR) {

    console.log("IdToken Returned : " +data.idToken);
    localStorage.setItem('TokenId', CryptoJS.AES.encrypt(token, "shinchanbaby"));			
    },
    error:function(data, textStatus, jqXHR){
     console.log("error token",data);
    }
   
});



    /*  $.ajax({
        type: 'POST',
        data: JSON.stringify({
          "notification":{
            "title":"Sandy1",
            "body":"hi to all",
            "click_action":"http://localhost:3000"
          },
          "to":token,
          "priority" : 10,
        }),
        
      crossDomain: true,
        beforeSend: function(xhr) {
          xhr.setRequestHeader( 'Authorization', "key=AAAA6yOU0DY:APA91bEP68B2ZNij3eLobj8a_-yc-bZ0Vl8KhSBpW1Qn32OTpzhSel788HgTXhrtLDNexyyoqhCJ39P9tY8DkfcppLiRG9c0VUaMLht9E9SnG4jgCpoOaT8cjc71MFn8V4SXYjkSfj4Y"
        );
        },
        url: "https://fcm.googleapis.com/fcm/send",
         contentType: "application/json",
        async: false,
        success: function (data) {
          console.log("tok",token)
          console.log("daa1",data);
          alert("suc"+data);
        },
        error:function(data, textStatus, jqXHR){
          console.log("daa",data," t",textStatus," j",jqXHR);
          alert("err"+data);
        }
        });
 */
 
      return token;
    } catch (error) {
      console.error(error);
    }
  }

  /*  headers: 
        {
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin':'http://localhost:3000',
          'Access-Control-Allow-Methods':'POST',
          'Access-Control-Allow-Headers':'application/json',
          'Authorization': "key=AAAA6yOU0DY:APA91bEP68B2ZNij3eLobj8a_-yc-bZ0Vl8KhSBpW1Qn32OTpzhSel788HgTXhrtLDNexyyoqhCJ39P9tY8DkfcppLiRG9c0VUaMLht9E9SnG4jgCpoOaT8cjc71MFn8V4SXYjkSfj4Y"
        }, */
       
        //url: "https://fcm.googleapis.com/fcm/send",
         /* 
         
          url:"https://gcm-http.googleapis.com/gcm/send",
       
         data: JSON.stringify({
          "notification":{
            "title":"Sandy1",
            "body":"hi to all",
            "click_action":"http://localhost:3000"
          },
          "to":token,
          "priority" : 10,
        }), 

        data : 

       
        JSON.stringify({
         
           "to" :"cY64DJgUemQ:APA91bF9xuIBWT3edtl19js2tfgRdrTvYRH_kTIkJ-MODJjVjt2RnnssE7r9vBeiuUS2V3i9bKDETYjz1ICDz3rzOHC_Mbd3v1zRx_e656Sd6gd8B_imOX0n3oSeh8HrD0eJzqaRWO1r",
           "notification": {
             "title": "FCM Message",
             "body": "This is a message from FCM"
           },
           "webpush": {
             "headers": {
               "Urgency": "high"
             },
             "notification": {
               "body": "This is a message from FCM to web",
               "requireInteraction": "true",
              
             }
           }
         
       }),
        */