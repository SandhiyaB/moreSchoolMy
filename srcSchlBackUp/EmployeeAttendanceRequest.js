
import React, { Component } from 'react';
import LoginPage from './LoginPage';
import { FormErrors } from './FormErrors';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import registerServiceWorker from './registerServiceWorker';
import NoAttendanceRequest from './NoAttendanceRequest';
import EmployeeMenuPage from './EmployeeMenuPage';
import EmployeeRequestAcceptReject from './EmployeeRequestAcceptReject';
import FooterText from './FooterText';
import { isFunction } from 'util';

class EmployeeAttendanceRequest extends Component {

    constructor() {
        super()

        var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        this.state = {
            date: '',
            checkInTime: '',
            checkOutTime: '',
            employeeId: '',
            companyId: '',
            superiorId: superiorId,
        };
    }

    Request() {

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.state.employeeId = employeeId;
        this.setState({
            companyId: companyId,
            employeeId: employeeId,

        });
        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                employeeId: this.state.employeeId,
                companyId: this.state.companyId,     
            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/EmployeeRequest",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                if (data.attendanceRegulation.length != 0) {
                    var tab = '<thead><tr class="headcolor"  class="headcolor" style="color: white; background-color: #486885;" ><th>Id</th><th>Name</th><th>CheckIn</th><th>CheckOut</th><th>Date</th><th colspan="2"  style="text-align:center;">Actions</th></tr></thead>';


                    $.each(data.attendanceRegulation, function (i, item) {
                        tab += '<tr class="success" ><td>' + item.employeeId + '</td><td>' + item.employeeName + '</td><td>' + item.checkInTime + '</td><td>' + item.checkOutTime + '</td><td>' + item.date + '</td><td><button class="AcceptSelect"> Accept</button></td><td><button class="RejectSelect"> Reject</button></td></tr>';
                    });
                    $("#tableHeadings").append(tab);
                    $("#accpet").click(self.Accept);
                } else {
                    ReactDOM.render(
                        <Router>
                            <div>
                                   <Route path="/" component={EmployeeRequestAcceptReject} />

                                <Route path="/" component={NoAttendanceRequest} />	
                                    							 		 </div>
       

                        </Router>,

                        document.getElementById('contentRender'));
                    registerServiceWorker();
                }

            }
        });
    }

    componentDidMount() {
        this.Request();
        window.scrollTo(0, 0);
        var self = this;
        $(document).ready(function () {

            // code to read selected table row cell data (values).
            $("#tableHeadings").on('click', '.AcceptSelect', function () {
                // get the current row
                var currentRow = $(this).closest("tr");
                self.state.employeeId = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
                self.state.checkInTime = currentRow.find("td:eq(2)").text(); // get current row 2nd TD
                self.state.checkOutTime = currentRow.find("td:eq(3)").text();
                self.state.date = currentRow.find("td:eq(4)").text(); // get current row 3rd TD
                var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
                var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

                self.state.reportingMangerId = employeeId;
                self.state.companyId = companyId;

                self.setState({

                    employeeId: self.state.employeeId,
                    companyId: self.state.companyId,
                    checkInTime: self.state.checkInTime,
                    checkOutTime: self.state.checkOutTime,
                    date: self.state.date,
                    reportingMangerId: self.state.reportingMangerId,
                    superiorId: self.state.superiorId,
                })
                confirmAlert({
                    title: 'Employee Attendance Request Accept Confirmation',                        // Title dialog
                    message: 'Are You Sure Do You Want To Accept the Request For  The Employee Id ' + self.state.employeeId + ' ? ',               // Message dialog
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
                self.state.checkInTime = currentRow.find("td:eq(2)").text(); // get current row 2nd TD
                self.state.checkOutTime = currentRow.find("td:eq(3)").text();
                self.state.date = currentRow.find("td:eq(4)").text(); // get current row 3rd TD
                var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
                var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

                self.state.reportingMangerId = employeeId;
                self.state.companyId = companyId;
                self.setState({

                    employeeId: self.state.employeeId,
                    companyId: self.state.companyId,
                    checkInTime: self.state.checkInTime,
                    checkOutTime: self.state.checkOutTime,
                    date: self.state.date,
                    reportingMangerId: self.state.reportingMangerId,
                    superiorId: self.state.superiorId,
                })

                confirmAlert({
                    title: 'Employee Attendance Request Reject Confirmation',                        // Title dialog
                    message: 'Are You Sure Do You Want To Reject the Request For The Employee Id  ' + self.state.employeeId + ' ? ',               // Message dialog
                    confirmLabel: 'Reject',                           // Text button confirm
                    cancelLabel: 'Cancel',                             // Text button cancel
                    onConfirm: () => { self.RejectConfirm(currentRow) },    // Action after Confirm
                    onCancel: () => { self.NoAction() },      // Action after Cancel

                })


            });
        });

    }



    RejectConfirm(currentRow) {

        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                employeeId: this.state.employeeId,
                companyId: this.state.companyId,
                checkInTime: this.state.checkInTime,
                checkOutTime: this.state.checkOutTime,
                date: this.state.date,
                reportingMangerId: this.state.reportingMangerId,
                superiorId: this.state.superiorId,
            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/SupervisorAuthority/AttendanceRegulationReject",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                self.pushNotificationFunc(data,"Rejected");
              
                confirmAlert({
                    title: 'Employee Attendance Request Rejected',                        // Title dialog
                    message: ' Rejected The Attendance Request For The Emplloyee Id ' + data.employeeId+' Successuly',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm

                })

                currentRow.remove();
                ReactDOM.render(
                    <Router>
                        <div>
                               <Route path="/" component={EmployeeRequestAcceptReject} />
                            <Route path="/" component={EmployeeAttendanceRequest} />
                         
                        </div>
                    </Router>,
                    document.getElementById('contentRender'));
                registerServiceWorker();

            },


            error: function (data) {
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
                    <Route path="/" component={EmployeeAttendanceRequest} />
                
                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();

    }

    AcceptConfirm(currentRow) {
        var self = this;

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                employeeId: this.state.employeeId,
                companyId: this.state.companyId,
                checkInTime: this.state.checkInTime,
                checkOutTime: this.state.checkOutTime,
                date: this.state.date,
                reportingMangerId: this.state.reportingMangerId,
                superiorId: this.state.superiorId,

            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/SupervisorAuthority/AttendanceRegulationAccept",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                self.pushNotificationFunc(data,"Accepted");
                confirmAlert({
                    title: 'Employee Attendance Request Accepted',                        // Title dialog
                    message: ' Accepted the Request For The Employee Id ' + data.employeeId +' Successfully',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                })


                currentRow.remove();
                ReactDOM.render(
                    <Router>
                        <div>
                               <Route path="/" component={EmployeeRequestAcceptReject} />
                            <Route path="/" component={EmployeeAttendanceRequest} />
                    
                        </div>
                    </Router>,
                    document.getElementById('contentRender'));
                registerServiceWorker();
            },


            error: function (data) {

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
                    <Route path="/" component={EmployeeAttendanceRequest} />
                
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
                "body":"Attendance Regularization Request "+status,
                "click_action":"https://tictoks-v3.firebaseapp.com/",
                "icon": "%PUBLIC_URL%/favicon.ico"
                
              },
              "data": {
                "Nick": "Mario",
                "body": "Great match!",
                "Room": "PortugalVSDenmark"
              },
             // "to":item.tokenId,
              "registration_ids":registration_ids,
              /*  [
                item.tokenId,
                'fjd18p2i1yQ:APA91bHwD79d9GRcoDYvbvFfUXT-k4i-mSQ87KqXCfB7xUJl0KizuM37bEEr2wHBd7s1m-L-tG7sO39yjLhQr9XGeQFGURQavh8Pa1fp2Xt_-S0uK7bM5tmu3N1oiCwuvBsZNGIpuqTv',
                'ejzIuta_Zdc:APA91bGcx9znKXZIoBVXADQCzpCAO2LYDisSPNiz_1P6dClibZW9y2ZkRyakYKfceNbIXifEL60sdmN4O65gOBTFtNKAwqZxqd4ZMm69EeMqPp4QOO5SCYXfOg40kIs1BbExIgHVmlVr'
                ] */
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


    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>
                      <Route path="/" component={EmployeeMenuPage} />
                  
                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }




    render() {
        return (


            <div className="container">

                <h3 className="centerAlign" style={{ textAlign: "center" }}>Attendance Regularization Request</h3>
                <div id="tableOverflow">
                <table class="table" id="tableHeadings" style={{ marginBottom: "10%" }}>
                </table>
                </div>
            </div>


        );
    }

}
export default EmployeeAttendanceRequest;