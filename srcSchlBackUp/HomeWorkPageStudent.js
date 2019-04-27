
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
import HomeWorkStudentMenuPage from './HomeWorkStudentMenuPage';
import StudentHistory from './StudentHistory';
class HomeWorkPageStudent extends Component {

    constructor() {
        super()

        var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        this.state = {
            date: '',
            submittedDate: '',
            subjectName: '',
            description: '',
            companyId: '',
            employeeId: employeeId,
            type:'',
            completionDate:'',
            status:'',
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
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/HomeWork/PendingHomeWorkDetails",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                console.log("res",data);
                 if (data.homeRetrieveList.length != 0) {
                    var tab = '<thead><tr class="headcolor"  class="headcolor" style="color: white; background-color: #486885;" ><th>No</th><th>Date</th><th>Subject Name</th><th>Type</th><th>Description</th><th>Addition Info</th><th>Due Date</th><th style="text-align:center;">Actions</th><th>Submit</th></tr></thead>';

                    var j=1;
                    $.each(data.homeRetrieveList, function (i, item) {
                        if(item.status==3){
                            tab += '<tbody id="myTable" ><tr class="success" ><td>' + j + '</td><td>' + item.date + '</td><td>' + item.subjectName + '</td><td>' + item.type + '</td><td>' + item.description + '</td><td>' + item.additional + '</td><td>' + item.completionDate + '</td><td > <select class="SelectOption"  style=" width:auto;"><option value="notCompleted">Reassigned</option> <option value="completed">Completed</option></select></td><td><button class="Submit" > Submit</button></td></tr></tbody>';
                        }else{
                            tab += '<tbody id="myTable" ><tr class="success" ><td>' + j + '</td><td>' + item.date + '</td><td>' + item.subjectName + '</td><td>' + item.type + '</td><td>' + item.description + '</td><td>' + item.additional + '</td><td>' + item.completionDate + '</td><td > <select class="SelectOption"  style=" width:auto;"><option value="notCompleted">Assigned</option> <option value="completed">Completed</option></select></td><td><button class="Submit" > Submit</button></td></tr></tbody>';
               
                        }
                   j++;
                    });
                    $("#tableHeadings").append(tab);
                 
                } else {
                    $("#tableHeadings").append('<h3 align="center">No Data</h3>');
        
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
            $("#tableHeadings").on('click', '.Submit', function () {
               
                var today = new Date();
                var currenttime = today.toLocaleTimeString([], { hour12: false });
      
                today= today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()+' '+currenttime;
                self.state.submittedDate=today;
                // get the current row
                var currentRow = $(this).closest("tr");
                self.state.date = currentRow.find("td:eq(1)").text(); // get current row 3rd TD
                
                self.state.subjectName = currentRow.find("td:eq(2)").text(); // get current row 1st TD value
                self.state.type = currentRow.find("td:eq(3)").text(); // get current row 2nd TD
                self.state.description = currentRow.find("td:eq(4)").text();
                self.state.completionDate = currentRow.find("td:eq(6)").text();
                self.state.status = currentRow.find(".SelectOption").val();
                var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
                var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
                
               
                self.state.companyId = companyId;
                self.state.employeeId = employeeId
                self.setState({
                    submittedDate:self.state.submittedDate,
                    employeeId: self.state.employeeId,
                    companyId: self.state.companyId,
                    subjectName: self.state.subjectName,
                    type: self.state.type,
                    date: self.state.date,
                    description: self.state.description,
                    completionDate: self.state.completionDate,
                })
              
                if(self.state.status=="completed"){
                 
                    confirmAlert({
                        title: 'Home Work Submission Confirmation',                        // Title dialog
                        message: 'Do You Want To Submit ' + self.state.subjectName + ' Home Work ? ',               // Message dialog
                        confirmLabel: 'Submit',                           // Text button confirm
                        cancelLabel: 'Cancel',                             // Text button cancel
                        onConfirm: () => { self.Submit(currentRow) },    // Action after Confirm
                        onCancel: () => { self.NoAction() },      // Action after Cancel
    
                    })
                }else{
                    confirmAlert({
                        title: 'Error',                        // Title dialog
                        message: 'Change Home Status Completed And Submit the Home Work  ',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                                                   // Text button cancel
                
                    })
                }
               
            });
        });
        $(document).ready(function () {
            $("#myInput").on("keyup", function () {
              var value = $(this).val().toLowerCase();
              $("#myTable tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
              });
            });
          });

    }



    Submit(currentRow) {
        var self = this;

        
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                    submittedDate:this.state.submittedDate,
                    employeeId:this.state.employeeId,
                    companyId:this.state.companyId,
                    subjectName:this.state.subjectName,
                    type:this.state.type,
                    date:this.state.date,
                    description:this.state.description,
                    completionDate:this.state.completionDate,
            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/HomeWork/SubmitHomeWorkStudent",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                confirmAlert({
                    title: 'Success',                        // Title dialog
                    message: 'Successfully Submitted ' + self.state.subjectName +' Home Work.',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                })


                $("#tableHeadings").empty(); 
               
               
            },


            error: function (data) {

                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                  });
          
            }


        });
        self.Request();
        
    }



    NoAction() {
        ReactDOM.render(
            <Router>
                <div>

                   <Route path="/" component={HomeWorkPageStudent} />           
                  

                </div>
            </Router>, document.getElementById('contentRender'));

    }

   
   
    render() {
        return (


            <div className="container">
      
                    <div>
                        
        <input style={{ color: "black" }} type="text" id="myInput" placeholder="Search.." title="Type in a name" />

                <h3 className="centerAlign" style={{ textAlign: "center" }}>Home Work</h3>
               
                <div id="tableOverflow">
                <table class="table" id="tableHeadings" style={{ marginBottom: "10%" }}>
                </table>
                </div>
            </div>
            </div>
           
        


        );
    }

}
export default HomeWorkPageStudent;