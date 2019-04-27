import EmployeeMenuHeader from './EmployeeMenuHeader';
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import './LoginPage.css';
import EmployeeMenuPage from './EmployeeMenuPage';
import 'timepicker/jquery.timepicker.css';
import timepicker from 'timepicker/jquery.timepicker';
import TimePicker from 'react-bootstrap-time-picker';
import Switch from 'react-toggle-switch';
import BackGroundColorSettings from './BackGroundColorSettings';
import HolidayConfig from './HolidayConfig';
import '../node_modules/react-toggle-switch/dist/css/switch.min.css';
import CreatingNewShift from './CreatingNewShift';
import ExistingShiftDetails from './ExistingShiftDetails';
import ShiftUpdatePage from './ShiftUpdatePage';
import ShiftMode from './ShiftMode';
import HolidayMenuPage from './HolidayMenuPage';
import FooterText from './FooterText';
import MessageMenuPage from './MessageMenuPage';
import React, {
  Component
} from 'react';
import EmailPage from './EmailPage';
import StaffSubjectConfiguration from './StaffSubjectConfiguration';
import SubStaffMenuPage from './SubStaffMenuPage';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ConfigurationPage from './ConfigurationPage';
import $ from 'jquery';
import CryptoJS from 'crypto-js';
import AddTimeTableTime from './AddTimeTableTime';
import UpdateTimeTableTime from './UpdateTimeTableTime';
import RemoveTimeTableTime from './RemoveTimeTableTime';
import EditDataTableTime from './EditDataTableTime';
import AddNewPeriodTableTime from './AddNewPeriodTableTime';

var newPeriodsArray = [];
var newPeriod = [];
class AddPeriodToTimeTable extends Component {

  constructor() {
    super()
    this.state = {

    };
  }

  componentDidMount() {

    $("#PeriodTable").hide();
    $("#newPeriodsBox").hide();
    $("#periodaLabel").hide();
    $("#startTimeDiv").hide();
    $("#endTimeDiv").hide();
    $("#selectOption").hide();


    var self = this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    //  var employeeId= CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.schoolId = companyId;
    //   self.state.teacherId=employeeId;
    this.setState({
      schoolId: companyId,
      // teacherId:employeeId,
    });
      $.ajax({
        type: 'POST',
        data: JSON.stringify({

          schoolId: this.state.schoolId.toString(),

        }),
        // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/TimeTable/timetableinsert",
        //url: "http://localhost:8080/EmployeeAttendenceAPI/TimeTable/GetClassesList",
        url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/TimeTable/GetClassesList",

        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {

          console.log("class List" + data[0].clss);
          var clss;
          clss += '<option disabled selected hidden >Select a class</option>';
          $.each(data, function (i, item) {
            if(item.clss!="Staff")
            clss += '<option value="' + item.clss + '">' + item.clss + '</option>'
          });
          $("#clss").append(clss);
        },
        error: function (data) {
          confirmAlert({
            title: 'No Internet',                        // Title dialog
            message: 'Network Connection Problem',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });


        },
      });


    var desireFeature;
    desireFeature += '<option disabled selected hidden >Select a Value</option>'
    desireFeature += '<option value="Subject">Subject</option>'
    desireFeature += '<option value="Lunch">Lunch</option>'
    desireFeature += '<option value="Break">Break</option>'

    $(".desireClass").append(desireFeature);

    $("#PeriodTable").on('click', '#edit', function () {


      var currentRow = $(this).closest("tr");

      self.state.periods = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
      //  self.state.timings = currentRow.find("td:eq(1)").text(); // get current row 1st TD value
      // self.state.oldData=currentRow.find("td:eq(2)").text();
      //   self.state.data = currentRow.find("td:eq(2)").text(); // get current row 2nd TD


      var schoolId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

      self.state.reportingManagerId = employeeId
      self.state.schoolId = schoolId;

      self.setState({
        schoolId: self.state.schoolId,
        periods: self.state.periods,
        clss: self.state.clss,
        //  data:self.state.data,
        //   timings:self.state.timings,

      });
    });

    $("#PeriodTable").on('click', '#remove', function () {


      var currentRow = $(this).closest("tr");

      currentRow.remove();

    });





    $('#startTime').timepicker({
      onSelect: function (time) {
        $("#endTime").timepicker('option', 'minTime', time);

        self.state.startTime = time;
        self.setState({
          startTime: time,
        });

      },

      timeFormat: 'H:i:s',
    });


    $('#endTime').timepicker({
      onSelect: function (time) {
        $("#startTime").timepicker('option', 'maxTime', time);

        self.state.endTime = time;
        self.setState({
          endTime: time,
        });

      },

      timeFormat: 'H:i:s',

    });



  }

  BackbtnFunc() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={AddTimeTableTime} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }

  AddFunc() {

    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={AddTimeTableTime} />
         </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();

  }

  UpdateFunc() {

    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={UpdateTimeTableTime} />
         </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();

  }

  RemoveFunc() {

    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={RemoveTimeTableTime} />
         </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();

  }

  EditTime() {

    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={UpdateTimeTableTime} />
         </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();

  }

  EditData() {

    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EditDataTableTime} />
          </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }

  AddNewPeriod() {

    ReactDOM.render(
      <Router>
        <div>
            <Route path="/" component={AddNewPeriodTableTime} />
          </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();

  }

  handleUserInputClass = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    },
    );

    this.state.clss = value;
    var classNew = value;

    console.log(name + ":" + value);

    $.ajax({
      type: 'POST',
      data: JSON.stringify({

        schoolId: this.state.schoolId.toString(),
        clss: this.state.clss,

      }),
      //url: "http://localhost:8080/EmployeeAttendenceAPI/TimeTableConfig/GetClassPeriods",
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/TimeTableConfig/GetClassPeriods",

      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        var self = this;
        console.log("DATA" + data[0].periods);

        $("#PeriodTable").show();
        $("#periodaLabel").show();
        $("#newPeriodsBox").show();
        $("#newPeriodsBox").empty();
        $("#PeriodTable").empty();

        var optedData;
        var tableData="<tbody>";
        newPeriodsArray = [];

        $.each(data, function (i, item) {
          if (item.timings != null) {
            optedData = item.data;
            if (item.timings != "NULL") {
              if (item.data == null || item.data == "NULL") {
                optedData = "Subject";
              }

              console.log("period" + item.periods);
              console.log("timings" + item.timings);
              console.log("data" + optedData);

              tableData += '<tr class="success"><td>' + item.periods + '</td><td>' + item.timings + '</td><td>' + optedData + '</td></td></tr>';

            } else {
              newPeriodsArray.push(item.periods);
            }
          } else {
            newPeriodsArray.push(item.periods);
          }
        });
        tableData+="</tbody>"
        $("#PeriodTable").append(tableData);

        var newperiods;

        newperiods = '<option disabled selected hidden >Select a Value</option>'

        for (var i = 0; i < newPeriodsArray.length; i++) {
          console.log("Periods Array" + newPeriodsArray[i]);
          newperiods += '<option value="' + newPeriodsArray[i] + '">' + newPeriodsArray[i] + '</option>'

        }

        $("#newPeriodsBox").append(newperiods);

      },
      error: function (data) {
        confirmAlert({
          title: 'No Internet', // Title dialog
          message: 'Network Connection Problem', // Message dialog
          confirmLabel: 'Ok', // Text button confirm
        });


      },
    });

  }

  handleUserInputNewPeriods = (e) => {



    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value,
    });


    var tab;
    tab += '<tr class="success"><td>' + value + '</td><td id="tdStartTime" ></td><td><input type="text" placeholder="Start Time" readonly /> </td>'
      + '<td><input type="text" placeholder="End Time"  readonly /></td>'
      + '<td><input type="text" placeholder="Select" readonly /></td><td>'
      + '<button type="button" class="btn btn-primary" id="edit" style={{marginLeft: "20px", marginLeft:'
      + '"auto", marginRight: "auto",  marginBottom: "45px",  marginTop: "20px",  display: "block"}} '
      + ' data-toggle="modal" data-target="#myModal">Edit</button></td>'
      + '<td><button type="button" class="btn btn-primary" id="remove" style={{marginLeft: "20px", marginLeft:'
      + '"auto", marginRight: "auto",  marginBottom: "45px",  marginTop: "20px",  display: "block"}} '
      + ' data-toggle="modal" >Remove</button></td>'
      + '</tr>';

    $("#PeriodTable").append(tab);


  }


  handleStartTime = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // var name1=name.replace(/[^0-9]/gi, '')
    // var textdata=parseInt(name1);
    this.setState({
      [name]: value,
      //[name]:true
      startTimeValid: true
    });
    $("#endTime").timepicker('option', 'minTime', value);

  }

  handleEndTime = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      // [name]:true
      endTimeValid: true
    });
    //$("#checkInTime").timepicker('option', 'maxTime', value);

  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    }, );

  }


  Submit() {

    var self = this;

    var timings = self.state.startTime + "-" + self.state.endTime;
    self.state.timings = timings;

    self.setState({
      timings: self.state.timings,
    })


    console.log("AJAX DATA AT MENU PAGE" + JSON.stringify({

      schoolId: self.state.schoolId,
      periods: self.state.periods,
      clss: self.state.clss,
      data: self.state.data,
      timings: self.state.timings,
      periods: '1',
      oldData: 'addNewPeriod',

    }));


    if (self.state.data != "" && self.state.timings != "" && self.state.periods != "") {



      $.ajax({
        type: 'POST',
        data: JSON.stringify({

          schoolId: self.state.schoolId,
          period1: self.state.periods,
          clss: self.state.clss,
          data: self.state.data,
          timings: self.state.timings,
          periods: '1',
          oldData: 'addNewPeriod',

        }),

        //url: "http://localhost:8080/EmployeeAttendenceAPI/TimeTableConfig/InsertTime",
        url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/TimeTableConfig/InsertTime",

        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
          var self = this;
          //  console.log("DATA" +data[0].periods);

        },

        error: function (data) {
          confirmAlert({
            title: 'No Internet', // Title dialog
            message: 'Network Connection Problem', // Message dialog
            confirmLabel: 'Ok', // Text button confirm
          });


        },
      });

    } else {
      confirmAlert({
        title: 'Updation Failed', // Title dialog
        message: 'You Haven`t Filled Data Completly ', // Message dialog
        confirmLabel: 'Ok', // Text button confirm
      });
    }




    ReactDOM.render(
      <Router>
        <div>
           <Route path="/" component={AddTimeTableTime} />
           </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
    //end if loop


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

        <h1>Time Table Time Configuration</h1>
        {/* 
    <div id='horMenu'>
          <ul id='horMenunew' style={{ backgroundColor: "#8811d6" }}>
                          <li><a className="active" onClick={() => this.AddFunc()}><span class="glyphicon glyphicon-plus">Add</span></a></li>
                          <li><a onClick={() => this.UpdateFunc()}><span class="glyphicon glyphicon-retweet"> Update</span></a></li>
                          <li><a onClick={() => this.RemoveFunc()}><span class="glyphicon glyphicon-minus">Remove</span> </a></li>
                                         </ul>
          </div> */}

        <h3>Update Table With New Period</h3>

        <div id='horMenu'>
          <ul id='horMenunew' class="ulmenubar">
            <li><a style={{ fontSize: "medium", fontStyle: "bold" }} className="active" onClick={() => this.EditTime()}><span class="glyphicon glyphicon-calendar"> </span>Edit Time</a></li>
            <li><a style={{ fontSize: "medium", fontStyle: "bold" }} onClick={() => this.EditData()}><span class="glyphicon glyphicon-calendar"> </span>Edit Data</a></li>
            <li><a style={{ fontSize: "medium", fontStyle: "bold" }} className="active" onClick={() => this.AddNewPeriod()}><span class="glyphicon glyphicon-calendar"> </span>Add New Period</a></li>


          </ul>

        </div>
        <div style={{ marginBottom: " 25px" }} >
          <label style={{ paddingRight: "50px" }} for="class">Select The Class</label>

          <select name="clss" style={{ width: "20%" }} id="clss"
            onChange={this.handleUserInputClass} required>
          </select>
        </div>

        <div style={{    marginBottom:" 25px"}} >
          <label  style={{paddingRight:"20px" }} for="newPeriods" id="periodaLabel">Periods To Be Added</label>

          <select name="newPeriodsBox" id="newPeriodsBox" style={{ width: "20%" }}
            onChange={this.handleUserInputNewPeriods} required>
          </select>
        </div>

        <table className="table" id="PeriodTable" name="PeriodTable" style={{ overflowX: "auto", overflowY: "auto" }}>


        </table>


        <div class="modal fade" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header" style={{backgroundColor: "rgb(7, 70, 119)",color:"white"}}>
                <h4 class="modal-title">TimeTable Configuration Updation</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>

              <div class="modal-body" style={{ display: "grid" }}>

                <label for="period"> Period</label>
                <input type="text"
                  onChange={this.handleUserInput}
                  value={this.state.periods}
                  id="Periods"
                  name="Periods" readOnly />

                <label for="timings">Timings</label>

                <input class="startTime " type="text" data-step="5" value={this.state.startTime} required name="startTime" onSelect={this.handleStartTime} className="form-control" id="startTime" placeholder="Enter Start Time" />
                <input class="endTime " type="text" data-step="5" value={this.state.endTime} required name="endTime" onSelect={this.handleEndTime} className="form-control" id="endTime" placeholder="Enter End Time" />


                <label for="data">Opted Option</label>

                <select class="desireClass"
                  onChange={this.handleUserInput}
                  value={this.state.data}
                  id="data"
                  name="data" >
                </select>


              </div>


              <div class="modal-footer" style={{backgroundColor: "rgb(200, 204, 208)"}}>
                <button type="button" class="btn btn-info" onClick={() => this.Submit()}
                  data-dismiss="modal">Submit</button>

                <button type="button" class="btn btn-danger" data-dismiss="modal">cancel</button>
              </div>
            </div>
          </div>
        </div>

        <div id="startTimeDiv">
          <input class="startTime " type="text" data-step="5" value={this.state.startTime} required name="startTime" onSelect={this.handleStartTime} className="form-control" id="startTime" placeholder="Enter Start Time" readOnly />
        </div>

        <div id="endTimeDiv">
          <input class="endTime " type="text" data-step="5" value={this.state.endTime} required name="endTime" onSelect={this.handleEndTime} className="form-control" id="endTime" placeholder="Enter End Time" readOnly />
        </div>

        <div id="selectOption">
          <select class="desireClass" id="desire" readOnly> </select>
        </div>




      </div>

    );
  }

}

export default AddPeriodToTimeTable;