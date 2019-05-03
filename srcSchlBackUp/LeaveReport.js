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
import IndividualLeaveHistory1 from './IndividualLeaveHistory1';
import OrganizationLeaveHistory from './OrganizationLeaveHistory';
import IndividualLeaveReport1 from './IndividualLeaveReport1';

class LeaveReport extends Component {

  constructor() {
    super()

    var today = new Date();
    //today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var year=today.getFullYear() ;
    this.state = {

      date: today,
      companyId: '',
      year:year,

    };
  }


  componentDidMount() {
    //window.scrollTo(0, 0);
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


    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId:this.state.companyId,
        employeeId:this.state.employeeId,
      }),
     // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeReport/employeeIndividualAttendanceDailyReport",

       url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/individualLeaveReport",
     
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {

     //   console.log(data);
       
        if (data.length != 0) {
         
          var tab = '<thead><tr className="headcolor" class="headcolor" style="color: white; background-color: #486885;"><th>Leave Type</th><th>#Days Given</th><th>#Days Available</th></tr></thead>';
         
          $.each(data, function (i, item) {
            
            tab += '<tr ><td>' + item.companyLeaveType + '</td><td>' + item.companyLeaveDays + '</td><td>' + item.employeeLeaveDays+ '</td></tr>';
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
   
  }

BackbtnFunc(){
    ReactDOM.render(
            <Router>
              <div>           
                     <Route path="/" component={ReportMenuPage}/>
                   
                             </div>
                                  </Router>,
                                            document.getElementById('contentRender'));
                                            registerServiceWorker();
                                        }   




LeaveReport(){
  ReactDOM.render(
    <Router>
      <div>

        <Route path="/" component={IndividualLeaveReport1} />
    
      </div>
    </Router>,
    document.getElementById('contentRender'));
  registerServiceWorker();


}

  render() {
    return (
      <div className="container" id="menucol" style={{ paddingTop: "5%", marginBottom: "10%" }}>
        <ul class="previous disabled" id="backbutton"
          style={{
            backgroundColor: "#f1b6bf",
            float: "none",
            display: "inline-block",
            marginLeft: "5px",
            borderRadius: "5px",
            padding: "3px 7px 3px 7px"
          }}>
          <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i></a></ul>


        <div className="col-sm-12 col-xs-12 col-lg-12" style={{ marginBottom: "10%" }}>

 <h3 className="centerAlign" style={{ textAlign: "center" }}>Individual Leave Report For The Year {this.state.year}</h3>
 
 <div id='horMenunew' >
          <ul id='horMenunew' class="ulmenubar"  style={{ backgroundColor: "#8811d6", padding: "10px 0px!important" }}>
          <li><a style={{ padding: "10px 0px" }} className="active" onClick={() => this.LeaveReport()} ><span class="glyphicon glyphicon-th-large"></span>Leave_Report</a></li>
            <li><a style={{ padding: "10px 0px" }}  onClick={() => this.LeaveHistory()} ><span class="glyphicon glyphicon-th-large"> </span>Leave_History</a></li>
                 </ul>

        </div>
    

 


  <div id="tableOverflow">
          <table style={{ margin: "auto" }} className="table" id="tableHeadings">
          </table>

        </div>




      </div>
      </div>

    );
  }

}
export default LeaveReport;


