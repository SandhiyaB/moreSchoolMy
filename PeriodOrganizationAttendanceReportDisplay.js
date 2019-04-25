import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import ReportMenuPage from './ReportMenuPage';
import PeriodOrganizationAttendanceReport from './PeriodOrganizationAttendanceReport';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import FooterText from './FooterText';
import './EmployeeMenuPage.css';

class PeriodOrganizationAttendanceReportDisplay extends Component {
  constructor(data) {
    super(data)
    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    this.state = {
      date: today,
      fromDate:data.fromDate,
      toDate:data.toDate,
    };
  }
  componentDidMount() {

    window.scrollTo(0, 0);
    var Presentcount = 0;
    var Leavecount = 0;
    var Absentcount = 0;
    var employeeId = null;
    var employeeName;
    var totalWorkHour = "00:00:00";
    var status;
    var color;
    
    if (this.props.data.employeeRetrievelist.length != 0) {
    
    var tab = '<thead><tr  class="headcolor" style="color: white; background-color: #486885;" ><th>Date</th><th>Id</th><th>Name</th><th>Dept</th><th>CheckIn</th><th>CheckOut </th><th>Duration</th><th>Status</th><th>Type</th></tr></thead>';
    
    var summaryIn = '<thead><tr class="headcolor" style="color: white; background-color: #486885;"><th>Id</th><th>Name</th><th>#Present</th><th>#Absent</th><th>#Hour</th></tr></thead>';
    $("#summary").append(summaryIn);
   
    $.each(this.props.data.employeeRetrievelist, function (i, item) {
   
    if (employeeId == null) {
    employeeId = item.employeeId;
   
    }
    if (employeeId == item.employeeId) {
    //count block
   
    employeeName = item.name;
   
   
    if (item.status == "P") {
    Presentcount++;
    status = "Present";
    color = "#5cb85cad";
    } else if (item.status == "A") {
    Absentcount++;
    status = "Absent";
    color = "#ff000087";
    } else if (item.status == "L") {
    Leavecount++;
    status = "Leave";
    color = "#e8e92ab3";
   
    } else {
    status = "Holiday";
    color = "#428bcab3";
    }
    tab += '<tbody id= "myTable" ><tr style="background-color:' + color + ';"><td>' + item.date + '</td><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>' + item.checkinTime + '</td><td>' + item.checkoutTime + '</td><td>' + item.totalWorkHour + '</td><td>' + status + '</td><td>' + item.employeeType + '</td></tr></tbody>';
   
    if (item.totalWorkHour != "-") {
    var start = totalTimeString([totalWorkHour, item.totalWorkHour]);
    totalWorkHour = start;
   
    }
   
    } else {
   
    var summary = '<tbody id= "myTable" ><tr class="success" ><td>' + employeeId + '</td><td>' + employeeName + '</td><td>' + Presentcount + '</td><td>' + Absentcount + '</td><td>' + totalWorkHour + '</td></tr></tbody>';
   
    $("#summary").append(summary);
    employeeId = item.employeeId;
   
    //initalize count to 0
    Presentcount = 0;
    Leavecount = 0;
    Absentcount = 0;
   
   
    totalWorkHour = "00:00:00";
   
    if (item.status == "P") {
    Presentcount++;
    status = "Present";
    color = "#5cb85cad";
    
    } else if (item.status == "A") {
    Absentcount++;
    status = "Absent";
    color = "#ff000087";
   
    } else if (item.status == "L") {
    Leavecount++;
    status = "Leave";
    color = "#e8e92ab3";
   
    }else {
      status = "Holiday";
      color = "#428bcab3";
      }
      tab += '<tbody id= "myTable" ><tr style="background-color:' + color + ';"><td>' + item.date + '</td><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>' + item.checkinTime + '</td><td>' + item.checkoutTime + '</td><td>' + item.totalWorkHour + '</td><td>' + status + '</td><td>' + item.employeeType + '</td></tr></tbody>';
   
    
    if (item.totalWorkHour != "-") {
    var start = totalTimeString([totalWorkHour, item.totalWorkHour]);
    totalWorkHour = start;
   
    }
   
    }
    });
   
   
    $("#tableHeadings").append(tab);
    var summary = '<tr class="success" ><td>' + employeeId + '</td><td>' + employeeName + '</td><td>' + Presentcount + '</td><td>' + Absentcount + '</td><td>' + totalWorkHour + '</td></tr>';
   
    $("#summary").append(summary);
    }
    else {
    $("#tableHeadings").append('<h3 align="center">No Data</h3>');
    }
    
    function zeroPad(num) {
      var str = String(num);
      if (str.length < 2) {
        return '0' + str;
      }

      return str;
    }

    // assuming your time strings will always be (H*:)(m{0,2}:)s{0,2} and never negative
    function totalTimeString(timeStrings) {
      var totals = timeStrings.reduce(function (a, timeString) {
        var parts = timeString.split(':');
        var temp;
        if (parts.length > 0) {
          temp = Number(parts.pop()) + a.seconds;
          a.seconds = temp % 60;
          if (parts.length > 0) {
            temp = (Number(parts.pop()) + a.minutes) + ((temp - a.seconds) / 60);
            a.minutes = temp % 60;
            a.hours = a.hours + ((temp - a.minutes) / 60);
            if (parts.length > 0) {
              a.hours += Number(parts.pop());
            }
          }
        }

        return a;
      }, {
          hours: 0,
          minutes: 0,
          seconds: 0
        });

      // returned string will be HH(H+):mm:ss
      return [
        zeroPad(totals.hours),
        zeroPad(totals.minutes),
        zeroPad(totals.seconds)
      ].join(':');
    }

    //search button func 
    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });


  }

  BackbtnFunc() {
    ReactDOM.render(
      <Router>
        <div>
           <Route path="/" component={PeriodOrganizationAttendanceReport} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }




  render() {

    return (

      <div className="container">
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

        <h3 className="centerAlign" style={{ textAlign: "center" }}>Period Organization Attendance Report</h3>
        <h4 className="centerAlign" style={{ textAlign: "center" }}>From:{this.state.fromDate} </h4>
        <h4 className="centerAlign" style={{ textAlign: "center" }}>To:{this.state.toDate} </h4>
        <input style={{ color: "black" }} type="text" id="myInput" placeholder="Search.." title="Type in a name" />

<div    style={{ display: "grid" }}>
<div >
<ReactHTMLTableToExcel
                   
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="summary"
                    filename="Period_Report"
                    sheet="tablexls"
                    buttonText="Download Summary Report"/>
                    </div>

  <div id="tableOverflow" style={{ marginBottom: "2%" }}>
          <h3 className="centerAlign" style={{ textAlign: "center" }}>Summary</h3>

          <table class="table" id="summary" >


          </table>

        </div>
        </div>



        <div id="tableOverflow">
              <h3 className="centerAlign" style={{ textAlign: "center" }}>Detailed Report List</h3>
          <table class="table" id="tableHeadings"  style={{ marginBottom: "10%" }}>

          </table>

        </div>
      

      </div>
    );
  }

}

export default PeriodOrganizationAttendanceReportDisplay;
//style={{ marginBottom: "10%" }}