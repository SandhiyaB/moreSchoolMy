
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
import Switch from 'react-toggle-switch';

class EditDevicePage extends Component {

    constructor() {
        super()
        var biometric = CryptoJS.AES.decrypt(localStorage.getItem('BiometricValue'), "shinchanbaby").toString(CryptoJS.enc.Utf8);


        var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

        this.state = {
            deviceId: '',
            organizationName: '',

            BioDeviceVal: '',
            SmsDeviceVal: '',
            RFIDDeviceVal: '',

            NewBioDeviceVal: '',
            NewSmsDeviceVal: '',
            NewRFIDDeviceVal: '',

        };
    }

    Request() {

        var self = this;
        $.ajax({
            type: 'POST',

            //url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/device/ListAllDevice",
            url: "http://localhost:8080/EmployeeAttendenceAPI/device/ListAllDevice",
            
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                alert("data" + data);
                if (data.length != 0) {
                    var tab = '<thead><tr class="headcolor"  class="headcolor" style="color: white; background-color: #486885;" ><th>DeviceId</th><th>CompanyId</th><th>Org Name</th><th>Biometric</th><th>SMS</th><th>RFID</th><th colspan="2"  style="text-align:center;">Actions</th></tr></thead>';
                    var bio;
                    var sms;
                    var rfid;


                    $.each(data, function (i, item) {

                        if (item.biometric == 0) {
                            bio = "Disabled";
                        } else {
                            bio = "Enabled";
                        }
                        if (item.sms == 0) {
                            sms = "Disabled";
                        } else {
                            sms = "Enabled";
                        }
                        if (item.rfid == 0) {
                            rfid = "Disabled";
                        } else {

                            rfid = "Enabled";
                        }
                        tab += '<tr class="success" ><td>' + item.deviceId + '</td><td>' + item.companyId + '</td><td>' + item.organizationName + '</td><td >' + bio + '</td><td>' + sms + '</td><td>' + rfid + '</td> <td><button  class="updatedevice" id="updatedevice" > Update</button></td><td><button   class="DeleteSlect"> Remove</button></td></tr>';

                    });

                    $("#tableHeadings").append(tab);

                } else {
                    $("#tableHeadings").append('<h3 align="center">No Devices</h3>');
                }

            }
        });
    }


    componentDidMount() {
        $("#DeviceStatus").hide();


        this.Request();
        window.scrollTo(0, 0);
        var self = this;
        var Currentbioval;
        var Smsbioval;
        var RFIDbioval;
        var deviceIdval;

        $(document).ready(function () {

            // code to read selected table row cell data (values).
            $("#tableHeadings").on('click', '.updatedevice', function () {

                $("#DeviceStatus").show();
                // get the current row
                var currentRow = $(this).closest("tr");

                /* 
                                self.state.employeeId = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
                                self.state.checkInTime = currentRow.find("td:eq(2)").text(); // get current row 2nd TD
                              */
                deviceIdval = currentRow.find("td:eq(0)").text();
                self.state.deviceId = deviceIdval;

                self.state.organizationName = currentRow.find("td:eq(2)").text();

                Currentbioval = currentRow.find("td:eq(3)").text();
                if (Currentbioval == "Enabled") {
                    self.state.BioDeviceVal = 1
                    self.state.NewBioDeviceVal = 1
                } else {
                    self.state.BioDeviceVal = 0
                    self.state.NewBioDeviceVal = 0
                }

                Smsbioval = currentRow.find("td:eq(4)").text();
                if (Smsbioval == "Enabled") {
                    self.state.SmsDeviceVal = 1
                    self.state.NewSmsDeviceVal = 1

                } else {
                    self.state.SmsDeviceVal = 0
                    self.state.NewSmsDeviceVal = 0
                }

                RFIDbioval = currentRow.find("td:eq(5)").text();
                if (RFIDbioval == "Enabled") {
                    self.state.RFIDDeviceVal = 1
                    self.state.NewRFIDDeviceVal = 1
                } else {
                    self.state.RFIDDeviceVal = 0
                    self.state.NewRFIDDeviceVal = 0
                }



                /*  self.state.date = currentRow.find("td:eq(4)").text(); // get current row 3rd TD
                 */


                var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
                var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

                self.state.reportingMangerId = employeeId;
                self.state.companyId = companyId;
                /* 
                                alert("bioval", self.state.BioDeviceVal);
                                alert("smsval", self.state.SmsDeviceVal);
                                alert("Rfidval", self.state.RFIDDeviceVal); */


                self.setState({
                    deviceId: self.state.deviceId,
                    employeeId: self.state.employeeId,
                    companyId: self.state.companyId,
                    BioDeviceVal: self.state.BioDeviceVal,
                    SmsDeviceVal: self.state.SmsDeviceVal,
                    RFIDDeviceVal: self.state.RFIDDeviceVal,
                    reportingMangerId: self.state.reportingMangerId,
                    superiorId: self.state.superiorId,
                    NewBioDeviceVal: self.state.NewBioDeviceVal,
                    NewSmsDeviceVal: self.state.NewSmsDeviceVal,
                    NewRFIDDeviceVal: self.state.NewRFIDDeviceVal,


                })
                /*  confirmAlert({
                     title: 'Employee Attendance Request Accept Confirmation',                        // Title dialog
                     message: 'Are You Sure Do You Want To Accept the Request For  The Employee Id ' + self.state.employeeId + ' ? ',               // Message dialog
                     confirmLabel: 'Accept',                           // Text button confirm
                     cancelLabel: 'Cancel',                             // Text button cancel
                     onConfirm: () => { self.AcceptConfirm(currentRow) },    // Action after Confirm
                     onCancel: () => { self.NoAction() },      // Action after Cancel
 
                 }) */



            });
        });


    }

    NoAction() {
        ReactDOM.render(
            <Router>
                <div>

                  
                    <Route path="/" component={EditDevicePage} />
               

                </div>
            </Router>, document.getElementById('contentRender'));

    }
    Submit() {

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });
        var self = this;

        if ((this.state.BioDeviceVal != this.state.NewBioDeviceVal) || (this.state.SmsDeviceVal != this.state.NewSmsDeviceVal) || (this.state.RFIDDeviceVal != this.state.NewRFIDDeviceVal)) {
            alert("ajax call"+JSON.stringify(this.state));
            $.ajax({
                type: 'POST',
                data: JSON.stringify({

                    deviceId: this.state.deviceId,
                    biometric: this.state.NewBioDeviceVal,
                    sms: this.state.NewSmsDeviceVal,
                    rfid: this.state.NewRFIDDeviceVal,
                    companyId: this.state.companyId,
                    superiorId: this.state.superiorId,
                }),
                //  url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeshiftconfig/ShiftUpdate",
                url: "http://localhost:8080/EmployeeAttendenceAPI/device/UpdateDeviceBioSmsRfid",

                contentType: "application/json",
                dataType: 'json',
                async: false,

                success: function (data, textStatus, jqXHR) {
                    alert("device", data);

                    confirmAlert({
                        title: 'Success',                        // Title dialog
                        message: 'Changes saved Successfully',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });
                    self.Request();
                   
                    $("#DeviceStatus").empty(); 
                    
              
                },
                error: function (data) {
                    confirmAlert({
                        title: 'No Internet',                        // Title dialog
                        message: 'Network Connection Problem',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });



                }

            });
        }
        else {
            alert("No changes");
            confirmAlert({
                title: 'Already Eixts',                        // Title dialog
                message: 'Already Eixts',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
            });

        }





    }
    CancelUpdate() {

        $("#DeviceStatus").hide();

    }

    toggleBioMode = () => {

        if (this.state.NewBioDeviceVal == 0) {
            this.state.NewBioDeviceVal = 1;


            this.setState({
                NewBioDeviceVal: 1,

            })
        } else {
            this.state.NewBioDeviceVal = 0;

            this.setState({
                NewBioDeviceVal: 0,
            })
        }
    };

    toggleRFIDMode = () => {

        if (this.state.NewRFIDDeviceVal == 0) {
            this.state.NewRFIDDeviceVal = 1;

            this.setState({
                NewRFIDDeviceVal: 1,
            })
        } else {
            this.state.NewRFIDDeviceVal = 0;

            this.setState({
                NewRFIDDeviceVal: 0,
            })
        }
    };

    toggleSMSMode = () => {

        if (this.state.NewSmsDeviceVal == 0) {
            this.state.NewSmsDeviceVal = 1;

            this.setState({
                NewSmsDeviceVal: 1,
            })
        } else {
            this.state.NewSmsDeviceVal = 0;

            this.setState({
                NewSmsDeviceVal: 0,
            })
        }
    };

    render() {
        return (


            <div className="container">

                <table class="table">
                    <tbody>
                        <div id="DeviceStatus">
                            <div class="jumbotron" style={{ marginTop: "-55px" }}>
                                <h2> {this.state.organizationName} Device Status</h2>



                                <tr>
                                    <td>BIO</td>
                                    <td><Switch id="BioDeviceVal" onClick={() => this.toggleBioMode()} on={this.state.NewBioDeviceVal} /> </td>
                                </tr>

                                <tr>

                                    <td> SMS</td>
                                    <td> <Switch id="SmsDeviceVal" onClick={() => this.toggleSMSMode()} on={this.state.NewSmsDeviceVal} /> </td>
                                </tr>
                                <tr>
                                    <td>RFID</td>
                                    <td> <Switch id="RFIDDeviceVal" onClick={() => this.toggleRFIDMode()} on={this.state.NewRFIDDeviceVal} /> </td>
                                </tr>

                                <button onClick={() => this.Submit()} id="submit">Submit</button>
                                <button onClick={() => this.CancelUpdate()} id="CancelUpdate">Cancel</button>


                            </div>
                        </div>
                    </tbody>
                </table>

                <h3 className="centerAlign" style={{ textAlign: "center" }}>Device List</h3>
                <div id="tableOverflow">
                    <table class="table" id="tableHeadings" style={{ marginBottom: "10%" }}>
                    </table>
                </div>
            </div>


        );
    }

}
export default EditDevicePage;