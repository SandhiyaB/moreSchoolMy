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
import RemoveTimeTableTime from './RemoveTimeTableTime';
import EditDataTableTime from './EditDataTableTime';
import AddNewPeriodTableTime from './AddNewPeriodTableTime';

var tableDataArray = [];
class UpdateTimeTableTime extends Component {

  constructor() {
    super()
    this.state = {
      tableArray: '',
    };
  }


  componentDidMount() {

    $("#PeriodTable").hide();
    $("#nodata").hide();
    $("#edit").hide();
    
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
        //url: "http://localhost:8080/EmployeeAttendenceAPI/TimeTable/GetClassesList",
        url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/TimeTable/GetClassesList",

        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {

          console.log("class List" + data[0].clss);
          var clss;
          clss += '<option value="" disabled selected hidden >Select a class</option>';
          $.each(data, function (i, item) {

            if(item.clss!="Staff"){
              clss += '<option value="' + item.clss + '">' + item.clss + '</option>'
         
            } });
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
      // url: "http://localhost:8080/EmployeeAttendenceAPI/TimeTableConfig/GetClassPeriods",
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/TimeTableConfig/GetClassPeriods",

      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        var self = this;
       // console.log("DATA" + data[0].periods);

        console.log("DATA LENGTH" + data.length);
        console.log("DATA " , data);
        $("#PeriodTable").show();
        $("#nodata").hide();
        $("#edit").show();
        
        $("#PeriodTable").empty();

        var optedData;
        var tableData;


        tableData = '<thead><tr>'
          + '<th>Period</th>'
          + '<th>Timings</th>'
          + '<th>Opted Option</th>'
          + '</tr></thead>';

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

              tableData += '<tr class="success"><td>' + item.periods + '</td><td>' + item.timings + '</td><td>' + optedData + '</td></tr>';

            }
          }
        });

        $("#PeriodTable").append(tableData);
       var len=$('#PeriodTable').find('tr').length;
        if(len==1){
          $("#PeriodTable").hide();
          $("#nodata").show();
          $("#edit").hide();

        }

      },
      error: function (data) {
        confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });


      },
    });

  }


  EditFunc() {

    if(this.state.clss!=""){
    var self = this;

    confirmAlert({
      title: 'Time Updation Confirmation ',                        // Title dialog
      message: 'Are You  Sure Do You Want To Edit Timings Opted For ' + self.state.clss + '? This Will Lead To Time Configuration Again.',               // Message dialog
      confirmLabel: 'Confirm',                           // Text button confirm
      cancelLabel: 'Cancel',                             // Text button cancel    
      onConfirm: () => { self.EditConfirm() },    // Action after Confirm
      onCancel: () => { self.NoAction() },      // Action after Cancel

    })
  }else{
    confirmAlert({
      title: 'Error',                        // Title dialog
      message: 'Please Select the Class',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });
  }
  }

  NoAction(){
    ReactDOM.render(
      <Router>
        <div>
           <Route path="/" component={UpdateTimeTableTime} />
          </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  EditConfirm() {

   var self = this;
    tableDataArray = [];

    $("#PeriodTable  tr td").each(function () {

      // Within tr we find the last td child element and get content
      var tableData = $(this).html();

      if (tableData != "") {


        if (tableData.charAt(0) == "P") {

          if (tableDataArray.length == 0) {
            tableDataArray.push(tableData);
          } else {
            tableData = "$" + tableData;
            tableDataArray.push(tableData);
          }

        } else {
          tableData = tableData;
          tableDataArray.push(tableData);
        }

        // tableDataArray.push(tableData);
        var arrayData = tableDataArray.toString();
        self.state.tableArray = arrayData.toString();

        self.setState({

          tableArray: self.state.tableArray,

        });
      }

    });

    console.log("AJAX CALL DATA " + JSON.stringify({

      schoolId: self.state.schoolId,
      clss: self.state.clss,
      tableArray: self.state.tableArray.toString(),

    }));

    $.ajax({
      type: 'POST',
      data: JSON.stringify({

        schoolId: this.state.schoolId.toString(),
        clss: this.state.clss,
        tableArray: self.state.tableArray.toString(),

      }),
      // url: "http://localhost:8080/EmployeeAttendenceAPI/TimeTableConfig/UpdatePeriodTime",
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/TimeTableConfig/UpdatePeriodTime",

      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        confirmAlert({
          title: 'Success',                        // Title dialog
          message: 'Now You Can add New Timing in Configuration.',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });
        $('[name=clss]').val('');
        $("#PeriodTable").empty();


      },
      error: function (data) {
        confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });


      },
    });


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

      {/*   <div id='horMenu'>
          <ul id='horMenunew' style={{ backgroundColor: "#8811d6" }}>
            <li><a className="active" onClick={() => this.AddFunc()}><span class="glyphicon glyphicon-plus">Add</span></a></li>
            <li><a onClick={() => this.UpdateFunc()}><span class="glyphicon glyphicon-retweet"> Update</span></a></li>
            <li><a onClick={() => this.RemoveFunc()}><span class="glyphicon glyphicon-minus">Remove</span> </a></li>
          </ul>
        </div> */}

        <h3>Update Table Time</h3>

        <div id='horMenu'>
          <ul id='horMenunew'  class="ulmenubar">
            <li><a style={{ fontSize: "medium", fontStyle: "bold" }} className="active" onClick={() => this.EditTime()}><span class="glyphicon glyphicon-calendar"></span>Edit Time </a></li>
            <li><a style={{ fontSize: "medium", fontStyle: "bold" }} onClick={() => this.EditData()}><span class="glyphicon glyphicon-calendar"></span>Edit Data</a></li>
            <li><a style={{ fontSize: "medium", fontStyle: "bold" }} className="active" onClick={() => this.AddNewPeriod()}><span class="glyphicon glyphicon-calendar"></span>Add New Period</a></li>


          </ul>

        </div>
        <div style={{    marginBottom:" 25px"}}  >
        <label  style={{paddingRight:"50px" }}  for="class">Select The Class</label>
        
          <select name="clss" style={{ width: "20%" ,marginBottom:"2%"}} id="clss"
            onChange={this.handleUserInputClass} required>
          </select>
        </div>

          <div class="table-responsive" style={{marginBottom:"5%"}}>
        <table class="table"id="PeriodTable" name="PeriodTable" style={{ overflowX: "auto", overflowY: "auto" }}>
        </table>
        <button class ="btn btn-primary btn-md" id="edit" onClick={() => this.EditFunc()} >Edit</button>    
        </div>
        <div id="nodata">
                    <h3 style={{textAlign:"center"}}>No Data</h3>
                </div>
      </div>

    );
  }

}


export default UpdateTimeTableTime;