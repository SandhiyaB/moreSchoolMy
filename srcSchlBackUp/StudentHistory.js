import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import ReportMenuPage from './ReportMenuPage';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import DailyOrganizationAttendanceReport from './DailyOrganizationAttendanceReport';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import FooterText from './FooterText';
import './LeaveTypeCss.css';
import testLeaveReport from './testLeaveReport';
import Calendar from './Calendar';
import ClassHistory from './ClassHistory';
import HomeWorkPageStudent from './HomeWorkPageStudent'
import HomeWorkStudentMenuPage from './HomeWorkStudentMenuPage'

class StudentHistory extends Component {

  constructor() {
    super()

    var today = new Date();
    
        var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    
    //today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var year=today.getFullYear() ;
    this.state = {

      date: today,
      companyId: '',
      year:year,
      submittedDate: '',
      subjectName: '',
      description: '',
      companyId: '',
      employeeId: employeeId,
      type: '',
      completionDate: '',
      status: '',

    };
  }


  componentDidMount() {
    //window.scrollTo(0, 0);
    //alert("hi")
var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.companyId = companyId;
    this.state.employeeId = employeeId;
    //this.state.date="2018-12-31";

    this.setState({
      date: this.state.today1,
      //date:this.state.date,
      companyId: this.state.companyId,
      employeeId: this.state.employeeId,

    });
/* alert(JSON.stringify({
        companyId:this.state.companyId,
        employeeId:this.state.employeeId,
      })); */

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId:this.state.companyId,
        employeeId:this.state.employeeId,
      }),
     // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeReport/employeeIndividualAttendanceDailyReport",

       url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/HomeWork/StudentHomeWorkHistory",
     
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {

       console.log(data);
       
        if (data.length != 0) {
         
          var tab = '<thead><tr className="headcolor" class="headcolor" style="color: white; background-color: #486885;"><th>Id</th><th>SubjectName</th><th>Description</th><th>Date</th><th>CompletionDate</th><th>SubmissionDate</th><th>Status</th></tr></thead>';
         
          $.each(data, function (i, item) {
            var Status="Not Completed";
            var submittedDate='-';
            if(item.status==0){
              Status="Not Completed";
            }else if(item.status==1){
              Status="Submitted";
            }else if(item.status==2){
              Status="Completed";
            } else if(item.status==3){
              Status="Reassigned";
            } 
            if(item.submittedDate==null){
              submittedDate='-';
            }else{
              submittedDate=item.submittedDate;
            }
            tab += '<tbody id= "myTable"><tr ><td>' + item.employeeId + '</td><td>' + item.subjectName + '</td><td>' + item.description+ '</td><td>'+item.date+'</td><td>'+item.completionDate+'</td><td>'+submittedDate+'</td><td>'+Status+'</td></tr></tbody>';
           });
          
          $("#tableHeadings").append(tab);
        }
        else {
          $("#tableHeadings").append('<h3 align="center">No Data</h3>');
        }
      },
      error: function (data) {
        confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });



      }
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



  render() {
    return (
      <div className="container" id="menucol" style={{ paddingTop: "5%", marginBottom: "10%" }}>
  
  <input style={{ color: "black" }} type="text" id="myInput" placeholder="Search.." title="Type in a name" />

        <h2 className="centerAlign" style={{ textAlign: "center" }}>Student HomeWork History {this.state.year}</h2>
         <div id="tableOverflow">
          <table style={{ margin: "auto" }} className="table" id="tableHeadings">
          </table>

        </div>
                </div>

  

    );
  }

}
export default StudentHistory;


