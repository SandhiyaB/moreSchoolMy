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
import UpdateTimeTableTime from './UpdateTimeTableTime';
import RemoveTimeTableTime from './RemoveTimeTableTime';

class AddTimeTableTime extends Component {

  constructor() {
    super()
    this.state = {
      startTime1: '',
      endTime1: '',
      startTime2: '',
      endTime2: '',
      startTime3: '',
      endTime3: '',
      startTime4: '',
      endTime4: '',
      period1: [],
      period2: [],
      period3: [],
      period4: [],
      periods: '',
      clss: '',
    };
  }

  componentDidMount() {

    $("#PeriodTable").hide();
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
        // url: "http://localhost:8080/EmployeeAttendenceAPI/TimeTable/GetClassesList",
        url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/TimeTable/GetClassesList",

        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {

          console.log("class List" + data[0].clss);
          var clss;
          clss += '<option value="" disabled selected hidden >Select a class</option>';
          $.each(data, function (i, item) {

            if (item.clss != "Staff") {
              clss += '<option value="' + item.clss + '">' + item.clss + '</option>'

            }
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
    desireFeature += '<option value="" disabled selected hidden >Select a Value</option>'
    desireFeature += '<option value="Subject">Subject</option>'
    desireFeature += '<option value="Lunch">Lunch</option>'
    desireFeature += '<option value="Break">Break</option>'


    $(".desireClass").append(desireFeature);

    var self = this;

    $('#startTime1').timepicker({
      onSelect: function (time) {
      //  $("#endTime1").timepicker('option', 'minTime', time);

        self.state.startTime1 = time;
        self.setState({
          startTime1: time,
        });

      },

      timeFormat: 'H:i:s',
    });

    $('#startTime2').timepicker({
      onSelect: function (time) {
      //  $("#endTime2").timepicker('option', 'minTime', time);

        self.state.startTime2 = time;
        self.setState({
          startTime2: time,
        });

      },

      timeFormat: 'H:i:s',
    });


    $('#endTime1').timepicker({

      onSelect: function (time) {

        self.state.endTime1 = time;
        self.setState({
          endTime1: time,
        });
        $("#startTime1").timepicker('option', 'maxTime', time);

      },

      timeFormat: 'H:i:s',

    });



    $('#endTime2').timepicker({
      onSelect: function (time) {
        $("#startTime3").timepicker('option', 'minTime', time);

        $("#startTime2").timepicker('option', 'maxTime', time);

        self.state.endTime2 = time;
        self.setState({
          endTime2: time,
        });

      },

      timeFormat: 'H:i:s',

    });

    $('#startTime3').timepicker({
      onSelect: function (time) {
        $("#endTime3").timepicker('option', 'minTime', time);

        self.state.startTime3 = time;
        self.setState({
          startTime3: time,
        });

      },

      timeFormat: 'H:i:s',
    });


    $('#endTime3').timepicker({
      onSelect: function (time) {
        $("#startTime3").timepicker('option', 'maxTime', time);

        self.state.endTime3 = time;
        self.setState({
          endTime3: time,
        });

      },

      timeFormat: 'H:i:s',

    });


    $('#startTime4').timepicker({
      onSelect: function (time) {
        $("#endTime4").timepicker('option', 'minTime', time);

        self.state.startTime4 = time;
        self.setState({
          startTime4: time,
        });

      },

      timeFormat: 'H:i:s',
    });


    $('#endTime4').timepicker({
      onSelect: function (time) {
        $("#startTime4").timepicker('option', 'maxTime', time);

        self.state.endTime4 = time;
        self.setState({
          endTime4: time,
        });

      },

      timeFormat: 'H:i:s',

    });


    $("#submit").click(function () {


      self.state.period1 = [];
      self.state.period2 = [];
      self.state.period3 = [];
      self.state.period4 = [];

      $('.1').find("input").each(function () {
        const period1Input = this.value;
        if (period1Input != '') {
          self.state.period1.push(period1Input);
        }

      })

      $('.1').find("select").each(function () {

        const period1Select = this.value;
        if (period1Select != '') {
          self.state.period1.push(period1Select);
        }

      })

      console.log("PERIOD-1" + self.state.period1.toString());


      $('.2').find("input").each(function () {
        const period2Input = this.value;
        if (period2Input != '') {
          self.state.period2.push(period2Input);
        }

      })

      $('.2').find("select").each(function () {

        const period2Select = this.value;
        if (period2Select != '') {
          self.state.period2.push(period2Select);
        }

      })

      console.log("PERIOD-2" + self.state.period2.toString());

      $('.3').find("input").each(function () {
        const period3Input = this.value;
        if (period3Input != '') {
          self.state.period3.push(period3Input);
        }

      })

      $('.3').find("select").each(function () {

        const period3Select = this.value;
        if (period3Select != '') {
          self.state.period3.push(period3Select);
        }

      })

      console.log("PERIOD-3" + self.state.period3.toString());


      $('.4').find("input").each(function () {
        const period4Input = this.value;
        if (period4Input != '') {
          self.state.period4.push(period4Input);
        }

      })

      $('.4').find("select").each(function () {

        const period4Select = this.value;
        if (period4Select != '') {
          self.state.period4.push(period4Select);
        }

      })

      console.log("PERIOD-4" + self.state.period4.toString());

      self.state.schoolId = self.state.schoolId;
      self.state.periods = self.state.periods;
      self.state.period1 = self.state.period1.toString();
      self.state.period2 = self.state.period2.toString();
      self.state.period3 = self.state.period3.toString();
      self.state.period4 = self.state.period4.toString();

      self.setState({
        schoolId: self.state.schoolId,
        periods: self.state.periods,
        period1: self.state.period1,
        period2: self.state.period2,
        period3: self.state.period3,
        period4: self.state.period4,

      });
        console.log("AJAX CALL DATA " + JSON.stringify({

          schoolId: self.state.schoolId,
          periods: self.state.periods,
          period1: self.state.period1.toString(),
          period2: self.state.period2.toString(),
          period3: self.state.period3.toString(),
          period4: self.state.period4.toString(),

        }));

if((self.state.clss!="" )&&(self.state.periods!="")){

      $.ajax({
        type: 'POST',
        data: JSON.stringify({

          schoolId: self.state.schoolId,
          periods: self.state.periods,
          clss: self.state.clss,
          period1: self.state.period1.toString(),
          period2: self.state.period2.toString(),
          period3: self.state.period3.toString(),
          period4: self.state.period4.toString(),
          oldData: '',

        }),
        //url: "http://localhost:8080/EmployeeAttendenceAPI/TimeTableConfig/InsertTime",
        url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/TimeTableConfig/InsertTime",

        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {

          confirmAlert({
            title: 'Success',                        // Title dialog
            message: 'Added Time Table Timing Successfully.',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });
          $("#PeriodTable").hide();
        
          self.state.clss='';
          self.state.startTime1='';
          self.state.startTime2='';
          self.state.startTime3='';
          self.state.startTime4='';
          self.state.endTime1='';
          self.state.endTime2='';
          self.state.endTime3='';
          self.state.endTime4='';
          $('[name=clss]').val('');
          $('[name=periods]').val('');
          

          //console.log("class List" +data[0].clss);

        },
        error: function (data) {
          confirmAlert({
            title: 'No Internet',                        // Title dialog
            message: 'Network Connection Problem',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });


        },
      });

    }else{
      confirmAlert({
        title: 'Error',                        // Title dialog
        message: 'Please Select the Details',               // Message dialog
        confirmLabel: 'Ok',                           // Text button confirm
      });

    }
    })



  }

  BackbtnFunc() {

    ReactDOM.render(
      <Router>
        <div>
         <Route path="/" component={ConfigurationPage} />
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
      // url: "http://localhost:8080/EmployeeAttendenceAPI/TimeTableConfig/CheckClass",
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/TimeTableConfig/CheckClass",

      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        var self = this;
        console.log("DATA" + data.schoolId);

        if (data.schoolId == "Timetable Exist") {

          confirmAlert({
            title: 'Time Cannot Be Added',                        // Title dialog
            message: 'Time Cannot Be Added For The Class' + " " + classNew + " " + "Since It Is Added Already Try UPDATE Option If You Want To Do Any Changes",               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });
          $('#Period').attr('disabled', true);
          $('[name=clss]').val('');
         

        } else {


          $('#Period').attr('disabled', false);

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


  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
    );


    console.log(name + ":" + value);

    if (value == "1") {
      $("#PeriodTable").show();

      $(".1").show();
      $(".2").hide();
      $(".3").hide();
      $(".4").hide();


    }

    if (value == "2") {
      $("#PeriodTable").show();
      $(".1").show();
      $(".2").show();
      $(".3").hide();
      $(".4").hide();
    }

    if (value == "3") {
      $("#PeriodTable").show();
      $(".1").show();
      $(".2").show();
      $(".3").show();
      $(".4").hide();
    }

    if (value == "4") {
      $("#PeriodTable").show();
      $(".1").show();
      $(".2").show();
      $(".3").show();
      $(".4").show();
    }
  }

  handleStartTime = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    var name1 = name.replace(/[^0-9]/gi, '')
    var textdata = parseInt(name1);
    this.setState({
      [name]: value,
      [name + "Valid"]: true
      // startTime1Valid:true
    });
    $("#endTime" + textdata).timepicker('option', 'minTime', value);

  }

  handleEndTime = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      [name + "Valid"]: true
      // endTime1Valid:true
    });
    var name1 = name.replace(/[^0-9]/gi, '')
    var textdata = parseInt(name1);
    textdata=textdata+1;
    console.log("textdata"+textdata);
    $("#startTime"+ textdata).timepicker('option', 'minTime', value);

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


        <div id='horMenu'>
          <ul id='horMenunew'  class="ulmenubar" style={{ backgroundColor: "#8811d6" }}>
            <li><a className="active" onClick={() => this.AddFunc()}><span class="glyphicon glyphicon-plus"> </span>Add</a></li>
            <li><a onClick={() => this.UpdateFunc()}><span class="glyphicon glyphicon-retweet"> </span> Update</a></li>
            <li><a onClick={() => this.RemoveFunc()}><span class="glyphicon glyphicon-minus"></span> Remove </a></li>
          </ul>
        </div>

        <h3>Add Time For Table Time</h3>


        <div style={{ marginBottom: " 25px" }} >
          <label for="class" style={{ paddingRight: "50px" }}>Select The Class</label>

          <select name="clss" style={{ width: "20%" }} id="clss"
            onChange={this.handleUserInputClass} required>
          </select>
        </div>

        <div style={{ marginBottom: " 25px" }} >
          <label for="period" style={{ paddingRight: "35px" }}> Number of Periods</label>
          <select name="periods" style={{ width: "20%" }} id="Period"
            disabled onChange={this.handleUserInput} required>
            <option value="" disabled selected hidden>select periods</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            {  /*
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
               
                    <option value="8">8</option>
                    */}
          </select>
        </div>

        <div style={{ overflowX: "auto", overflowY: "auto" }} >
          <table class="table" id="PeriodTable" name="PeriodTable" style={{ overflowX: "auto", overflowY: "auto" }}>
            <tr class="success" className="1">
              <td><th>Period-1</th></td>
              <td>
                <input style={{ width: "auto" }} class="startTime " type="text" data-step="5" value={this.state.startTime1} required name="startTime1" onSelect={this.handleStartTime} className="form-control" id="startTime1" placeholder="Enter Start Time" />
              </td>
              <td>
                <input style={{ width: "auto" }} class="endTime " type="text" data-step="5" value={this.state.endTime1} required name="endTime1" onSelect={this.handleEndTime} className="form-control" id="endTime1" placeholder="Enter End Time" />
              </td>
              <td><select style={{ width: "auto" }} class="desireClass" id="desire"> </select> </td>
            </tr>

            <tr class="success" className="2">
              <td><th>Period-2</th></td>
              <td>
                <input style={{ width: "auto" }} class="startTime " type="text" data-step="5" value={this.state.startTime2} required name="startTime2" onSelect={this.handleStartTime} className="form-control" id="startTime2" placeholder="Enter Start Time" />
              </td>
              <td>
                <input style={{ width: "auto" }} class="endTime " type="text" data-step="5" value={this.state.endTime2} required name="endTime2" onSelect={this.handleEndTime} className="form-control" id="endTime2" placeholder="Enter End Time" />
              </td>
              <td><select style={{ width: "auto" }} class="desireClass" id="desire"> </select> </td>
            </tr>

            <tr class="success" className="3">
              <td><th>Period-3</th></td>
              <td>
                <input style={{ width: "auto" }} class="startTime " type="text" data-step="5" value={this.state.startTime3} required name="startTime3" onSelect={this.handleStartTime} className="form-control" id="startTime3" placeholder="Enter Start Time" />
              </td>
              <td>
                <input style={{ width: "auto" }} class="endTime " type="text" data-step="5" value={this.state.endTime3} required name="endTime3" onSelect={this.handleEndTime} className="form-control" id="endTime3" placeholder="Enter End Time" />
              </td>
              <td><select style={{ width: "auto" }} class="desireClass" id="desire"> </select> </td>
            </tr>

            <tr class="success" className="4">
              <td><th>Period-4</th></td>
              <td>
                <input style={{ width: "auto" }} class="startTime " type="text" data-step="5" value={this.state.startTime4} required name="startTime4" onSelect={this.handleStartTime} className="form-control" id="startTime4" placeholder="Enter Start Time" />
              </td>
              <td>
                <input style={{ width: "auto" }} class="endTime " type="text" data-step="5" value={this.state.endTime4} required name="endTime4" onSelect={this.handleEndTime} className="form-control" id="endTime4" placeholder="Enter End Time" />
              </td>
              <td><select style={{ width: "auto" }} class="desireClass" id="desire"> </select> </td>
            </tr>

          </table>
        </div>
        <button class="btn btn-primary btn-md" style={{ marginBottom: "10%" }} id="submit">Submit</button>





      </div>

    );
  }

}


export default AddTimeTableTime;