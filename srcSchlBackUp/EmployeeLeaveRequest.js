
import React, { Component } from 'react';
import LoginPage from './LoginPage';
import { FormErrors } from './FormErrors';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import EmployeeMenuHeader from './EmployeeMenuHeader';
import CryptoJS from 'crypto-js';
import NoLeaveRequest from './NoLeaveRequest';
import registerServiceWorker from './registerServiceWorker';
import EmployeeAttendanceRequest from './EmployeeAttendanceRequest';
import EmployeeRequestAcceptReject from './EmployeeRequestAcceptReject';
import FooterText from './FooterText';

class EmployeeLeaveRequest extends Component {
    constructor() {
        super()
        var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var today = new Date();
         today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        
        this.state = {
            noOfDays: '',
            fromDate: '',
            toDate: '',
            subject: '',
            reportingManagerId: '',
            companyId: '',
            superiorId: superiorId,
            leaveActionDate:today,
        };
    }

    componentDidMount() {




        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var reportingManagerId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        this.state.companyId = companyId;
        this.state.reportingManagerId = reportingManagerId;

        this.setState({
            companyId: companyId,
            reportingManagerId: reportingManagerId,
        });

        var self = this;

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                reportingManagerId: this.state.reportingManagerId,
                companyId: this.state.companyId,
                superiorId: this.state.superiorId,
            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/leaveauthorize",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

                if (data.length != 0) {
                    var tab = '<thead><tr class="headcolor"  class="headcolor" style="color: white; background-color: #486885;"><th>Id</th><th>Name</th><th>#Days</th><th>LeaveType</th></th><th>From</th><th>To</th><th>Subject</th><th colspan="2"  style="text-align:center;">Actions</th></tr></thead>';
                    $.each(data, function (i, item) {
                        tab += '<tr class="success" ><td>' + item.employeeId + '</td><td>' + item.employeeName + '</td><td>' + item.day + '</td><td>' + item.leaveType + '</td><td>' + item.fromDate + '</td><td>' + item.toDate + '</td><td>' + item.subject + '</td><td><button class="AcceptSelect"> Accept</button></td><td><button class="RejectSelect"> Reject</button></td></tr>';
                        /*  tab+='<td><button class="btnSelect"> Accpet</button></td><td><button> Reject</button></td>' 
             */        });
                    $("#tableHeadings").append(tab);

                } else {

                    ReactDOM.render(
                        <Router>
                            <div>
                                <Route path="/" component={EmployeeRequestAcceptReject} />

                                <Route path="/" component={NoLeaveRequest} />
                            	 		 </div>
                        </Router>,

                        document.getElementById('contentRender'));
                    registerServiceWorker();

                }

            },
            error: function (data, textStatus, jqXHR) {
                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                  });
          
            }



        });

        window.scrollTo(0, 0);


        $(document).ready(function () {

            // code to read selected table row cell data (values).
            $("#tableHeadings").on('click', '.AcceptSelect', function () {
                // get the current row
                var currentRow = $(this).closest("tr");

                self.state.employeeId = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
                self.state.employeeName = currentRow.find("td:eq(1)").text(); // get current row 1st TD value
                self.state.noOfDays = currentRow.find("td:eq(2)").text(); // get current row 2nd TD
                self.state.leaveType=currentRow.find("td:eq(3)").text();
                self.state.fromDate = currentRow.find("td:eq(4)").text();
                self.state.toDate = currentRow.find("td:eq(5)").text(); // get current row 3rd TD
                self.state.subject = currentRow.find("td:eq(6)").text(); // get current row 3rd TD

                var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
                var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

                self.state.reportingManagerId = employeeId;
                self.state.companyId = companyId;

                self.setState({
                    employeeId: self.state.employeeId,
                    companyId: self.state.companyId,
                    date: self.state.fromDate,
                    noOfDays: self.state.noOfDays,
                    employeeName: self.state.employeeName,
                    fromDate: self.state.fromDate,
                    toDate: self.state.toDate,
                    subject: self.state.subject,
                    reportingManagerId: self.state.reportingManagerId,
                    leaveType:self.state.leaveType,
                });

                confirmAlert({
                    title: ' Employee Leave Request Accept Confirmation ',                        // Title dialog
                    message: 'Are You  Sure Do You Want To Accept the Leave Request For The Employee Id  ' + self.state.employeeId + ' ?',               // Message dialog
                    confirmLabel: 'Accept',                           // Text button confirm
                    cancelLabel: 'Cancel',                             // Text button cancel
                    onConfirm: () => { self.AcceptConfirm(currentRow) },    // Action after Confirm
                    onCancel: () => { self.NoAction() },      // Action after Cancel

                })

            });
        });


        $(document).ready(function () {

            // code to read selected table row cell data (values).
            $("#tableHeadings").on('click', '.RejectSelect', function () {
                // get the current row
                var currentRow = $(this).closest("tr");

                self.state.employeeId = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
                self.state.employeeName = currentRow.find("td:eq(1)").text(); // get current row 1st TD value
                self.state.noOfDays = currentRow.find("td:eq(2)").text(); // get current row 2nd TD
                self.state.leaveType=currentRow.find("td:eq(3)").text();
                self.state.fromDate = currentRow.find("td:eq(4)").text();
                self.state.toDate = currentRow.find("td:eq(5)").text(); // get current row 3rd TD
                self.state.subject = currentRow.find("td:eq(6)").text(); // get current row 3rd TD
              
                var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
                var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

                self.state.reportingManagerId = employeeId;
                self.state.companyId = companyId;
                self.setState({
                    employeeId: self.state.employeeId,
                    companyId: self.state.companyId,
                    date: self.state.fromDate,
                    noOfDays: self.state.noOfDays,
                    employeeName: self.state.employeeName,
                    fromDate: self.state.fromDate,
                    toDate: self.state.toDate,
                    subject: self.state.subject,
                    reportingManagerId: self.state.reportingManagerId,
                    leaveType:self.state.leaveType,
                    });


                confirmAlert({
                    title: 'Employee Leave Request  Reject Confirmation',                        // Title dialog
                    message: 'Are You Sure Do You Want To Reject the Request For The Employee Id  ' + self.state.employeeId + '? ',               // Message dialog
                    confirmLabel: 'Reject',                           // Text button confirm
                    cancelLabel: 'Cancel',                             // Text button cancel
                    onConfirm: () => { self.RejectConfirm(currentRow) },    // Action after Confirm
                    onCancel: () => { self.NoAction() },      // Action after Cancel

                })




            });
        });



    }




    AcceptConfirm(currentRow) {
        var self = this;

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                employeeId: self.state.employeeId,
                companyId: self.state.companyId,
                date: self.state.fromDate,
                noOfDays: self.state.noOfDays,
                employeeName: self.state.employeeName,
                fromDate: self.state.fromDate,
                toDate: self.state.toDate,
                subject: self.state.subject,
                reportingManagerId: self.state.reportingManagerId,
                superiorId: this.state.superiorId,
                leaveType:self.state.leaveType,
                leaveActionDate:self.state.leaveActionDate
              
            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/leaveauthorized",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

                self.pushNotificationFunc(data,"Accepted");
             
                confirmAlert({
                    title: 'Employee Leave Request Accepted',                        // Title dialog
                    message: ' Accepted the Leave Request For  The Employee Id' + self.state.employeeId +'Successfully',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm

                })

                currentRow.remove();

                ReactDOM.render(
                    <Router>
                        <div>
                             <Route path="/" component={EmployeeRequestAcceptReject} />

                            <Route path="/" component={EmployeeLeaveRequest} />
                         

                        </div>
                    </Router>,
                    document.getElementById('contentRender'));
                registerServiceWorker();

            },
            error: function (data, textStatus, jqXHR) {
                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                  });
          
            }


        });

        ReactDOM.render(
            <Router>
                <div>
                      <Route path="/" component={EmployeeRequestAcceptReject} />

                    <Route path="/" component={EmployeeLeaveRequest} />
                 
                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();

    }

    RejectConfirm(currentRow) {
        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                employeeId: self.state.employeeId,
                companyId: self.state.companyId,
                date: self.state.date,
                noOfDays: self.state.noOfDays,
                employeeName: self.state.employeeName,
                fromDate: self.state.fromDate,
                toDate: self.state.toDate,
                subject: self.state.subject,
                reportingManagerId: self.state.reportingManagerId,
                superiorId: this.state.superiorId,
                leaveType:self.state.leaveType,
                leaveActionDate:self.state.leaveActionDate
              
            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/leavenotauthorized",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                self.pushNotificationFunc(data,"Rejected");
                confirmAlert({
                    title: 'Employee Leave Request Rejected',                        // Title dialog
                    message: ' Rejected The Leave  Request For The Employee Id ' + self.state.employeeId+'Succesfully',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                })

                currentRow.remove();
                ReactDOM.render(
                    <Router>
                        <div>
                        
                            <Route path="/" component={EmployeeRequestAcceptReject} />

                            <Route path="/" component={EmployeeLeaveRequest} />
                        
                        </div>
                    </Router>,
                    document.getElementById('contentRender'));
                registerServiceWorker();

            },
            error: function (data, textStatus, jqXHR) {
                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                  });
          
            }


        });
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeRequestAcceptReject} />
                    <Route path="/" component={EmployeeLeaveRequest} />
                  
                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();


    }

    pushNotificationFunc(data,status){
        var registration_ids=[];
             if(data.tokenId!=null){
                    var tok=data.tokenId.split(',');
                    if(tok.length==2){
                    for(var i = 0; i < tok.length; i++){
                        registration_ids.push(tok[i]);
                    }
                }else{
                    registration_ids.push(data.tokenId);
                }
                }
          
      if(registration_ids!=[]){
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
              "notification":{
                "title":"Tictok",
                "body":"Leave Request "+status,
                "click_action":"https://tictoks-v3.firebaseapp.com/",
                "icon": "%PUBLIC_URL%/favicon.ico"
                
              },
             
               "registration_ids":registration_ids,
               "priority" : 10,
              "webpush": {
                "headers": {
                  "Urgency": "high"
                }
              }
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
              console.log("tok",registration_ids);
              console.log("succ",data);
              
            },
            error:function(data, textStatus, jqXHR){
            console.log("tok",registration_ids);
             
              console.log("err",data," t",textStatus," j",jqXHR);
           
            }
            });
          }
        }
    
    NoAction() {
        ReactDOM.render(
            <Router>
                <div>

                  
                    <Route path="/" component={EmployeeAttendanceRequest} />
               


                </div>
            </Router>, document.getElementById('contentRender'));


    }

    render() {
        return (

            <div className="container">

                <h3 className="centerAlign" style={{ textAlign: "center" }}>Leave Request</h3>
                <div id="tableOverflow">
                <table class="table" id="tableHeadings" style={{ marginBottom: "10%" }}>


                </table>
                </div>
            </div>


        );
    }

}
export default EmployeeLeaveRequest;
