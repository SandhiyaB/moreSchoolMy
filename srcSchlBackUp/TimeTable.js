import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Homework.css';
import $ from 'jquery';
import CryptoJS from 'crypto-js';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import TimeTableDisplay from './TimeTableDisplay';
import ConfigurationPage from './ConfigurationPage';
import ViewTimeTable from './ViewTimeTable';
import HomeWorkPageTeacherMenu from './HomeWorkPageTeacherMenu';
import EmployeeMenuPage from './EmployeeMenuPage';
import AddHomeWork from './AddHomeWork';
import ExamSchedule from './ExamSchedule';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import FooterText from './FooterText';


var subject = [];
var staffIdArray = [];
var stId;
var periodsArray = [];
var timingsArray = [];
var dataArray = [];

class TimeTable extends Component {

  constructor() {
    super()
    this.state = {
      schoolId: '',
      teacherId: '',
      //periods: '',
      timings: [],
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
      clss: '',
      mondayStaffId: [],
      tuesdayStaffId: [],
      wednesdayStaffId: [],
      thursdayStaffId: [],
      fridayStaffId: [],
      saturdayStaffId: [],
      sundayStaffId: [],
      periods: [],
    };
  }


  componentDidMount() {

    $("#PeriodTable").hide();
    $("#LunchSelect").hide();
    $("#BreakSelect").hide();
    $("#subjectSelect").hide();


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
        //   url: "http://localhost:8080/EmployeeAttendenceAPI/TimeTable/GetClassesList",
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

    var self = this;

    $("#submit").click(function () {

      $('.periods').find("td").each(function () {

        //   const period=this.value;
        const period = $(this).html();

        if (period != '') {
          self.state.periods.push(period);
        }

      })
      console.log("periods" + self.state.periods);


      $('.timing').find("td").each(function () {

        //    const time=this.value;
        const time = $(this).html();

        if (time != '') {
          self.state.timings.push(time);
        }

      })
      console.log("timings" + self.state.timings);

      $('.monday').find("select").each(function () {
        var monday = this.value;

        stId = "";
        if (monday != '') {

          for (var t = 0; t < subject.length; t++) {

            if (subject[t] == monday) {

              stId = staffIdArray[t];

              //     self.state.staffId1.push(stId);
              break;
            } else {
              stId = "Free";
            }
            //FOR LOOP ENDS
          }
          // self.state.monday.push(monday);
          self.state.monday.push(monday);
          self.state.mondayStaffId.push(stId);
        }

      })
      console.log("monday" + self.state.monday);
      console.log("StaffId" + self.state.mondayStaffId);

      $('.tuesday').find("select").each(function () {
        var tuesday = this.value;

        stId = "";
        if (tuesday != '') {

          for (var t = 0; t < subject.length; t++) {

            if (subject[t] == tuesday) {
              stId = staffIdArray[t];
              break;
            } else {
              stId = "Free";
            }
          }
          self.state.tuesday.push(tuesday);
          self.state.tuesdayStaffId.push(stId);
        }

      })
      console.log("tuesday" + self.state.tuesday);
      console.log("StaffId" + self.state.tuesdayStaffId);

      $('.wednesday').find("select").each(function () {
        var wednesday = this.value;

        stId = "";
        if (wednesday != '') {
          for (var t = 0; t < subject.length; t++) {

            if (subject[t] == wednesday) {
              stId = staffIdArray[t];
              break;
            } else {
              stId = "Free";
            }
          }
          self.state.wednesday.push(wednesday);
          self.state.wednesdayStaffId.push(stId);
        }

      })
      console.log("wednesday" + self.state.wednesday);
      console.log("StaffId" + self.state.wednesdayStaffId);

      $('.thursday').find("select").each(function () {
        var thursday = this.value;

        stId = "";
        if (thursday != '') {
          for (var t = 0; t < subject.length; t++) {

            if (subject[t] == thursday) {
              stId = staffIdArray[t];
              break;
            } else {
              stId = "Free";
            }
          }
          self.state.thursday.push(thursday);
          self.state.thursdayStaffId.push(stId);
        }

      })
      console.log("thursday" + self.state.thursday);
      console.log("StaffId" + self.state.thursdayStaffId);

      $('.friday').find("select").each(function () {
        var friday = this.value;

        stId = "";
        if (friday != '') {
          for (var t = 0; t < subject.length; t++) {

            if (subject[t] == friday) {
              stId = staffIdArray[t];
              break;
            } else {
              stId = "Free";
            }
          }
          self.state.friday.push(friday);
          self.state.fridayStaffId.push(stId);
        }

      })
      console.log("friday" + self.state.friday);
      console.log("StaffId" + self.state.fridayStaffId);

      $('.saturday').find("select").each(function () {
        var saturday = this.value;

        stId = "";
        if (saturday != '') {
          for (var t = 0; t < subject.length; t++) {

            if (subject[t] == saturday) {
              stId = staffIdArray[t];
              break;
            } else {
              stId = "Free";
            }
          }
          self.state.saturday.push(saturday);
          self.state.saturdayStaffId.push(stId);
        }

      })
      console.log("saturday" + self.state.saturday);
      console.log("StaffId" + self.state.saturdayStaffId);

      $('.sunday').find("select").each(function () {
        var sunday = this.value;

        stId = "";
        if (sunday != '') {
          for (var t = 0; t < subject.length; t++) {

            if (subject[t] == sunday) {
              stId = staffIdArray[t];
              break;
            } else {
              stId = "Free";
            }
          }
          self.state.sunday.push(sunday);
          self.state.sundayStaffId.push(stId);
        }

      })
      console.log("sunday" + self.state.sunday);
      console.log("StaffId" + self.state.sundayStaffId);

      //CHECKING CONDITION FOR AVOIDING EMPTY VALUES
      //if(  (self.state.timings.length)==self.state.periods && (self.state.monday.length)==self.state.periods && (self.state.tuesday.length)==self.state.periods && (self.state.wednesday.length)==self.state.periods && (self.state.thursday.length)==self.state.periods && (self.state.friday.length)==self.state.periods && (self.state.saturday.length)==self.state.periods && (self.state.sunday.length)==self.state.periods){

      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

      self.state.schoolId = companyId;
      self.state.teacherId = employeeId;
      self.state.periods = self.state.periods.toString();
      self.state.timings = self.state.timings.toString();
      self.state.monday = self.state.monday.toString();
      self.state.tuesday = self.state.tuesday.toString();
      self.state.wednesday = self.state.wednesday.toString();
      self.state.thursday = self.state.thursday.toString();
      self.state.friday = self.state.friday.toString();
      self.state.saturday = self.state.saturday.toString();
      self.state.sunday = self.state.sunday.toString();
      self.state.mondayStaffId = self.state.mondayStaffId.toString();
      self.state.tuesdayStaffId = self.state.tuesdayStaffId.toString();
      self.state.wednesdayStaffId = self.state.wednesdayStaffId.toString();
      self.state.thursdayStaffId = self.state.thursdayStaffId.toString();
      self.state.fridayStaffId = self.state.fridayStaffId.toString();
      self.state.saturdayStaffId = self.state.saturdayStaffId.toString();
      self.state.sundayStaffId = self.state.sundayStaffId.toString();
      self.state.clss = self.state.clss;

      self.setState({
        schoolId: companyId,
        teacherId: employeeId,
        periods: self.state.periods,
        timings: self.state.timings,
        monday: self.state.monday,
        tuesday: self.state.tuesday,
        wednesday: self.state.wednesday,
        thursday: self.state.thursday,
        friday: self.state.friday,
        saturday: self.state.saturday,
        sunday: self.state.sunday,
        mondayStaffId: self.state.mondayStaffId,
        tuesdayStaffId: self.state.tuesdayStaffId,
        wednesdayStaffId: self.state.wednesdayStaffId,
        thursdayStaffId: self.state.thursdayStaffId,
        fridayStaffId: self.state.fridayStaffId,
        saturdayStaffId: self.state.saturdayStaffId,
        sundayStaffId: self.state.sundayStaffId,
        clss: self.state.clss,
      });




        console.log("data" + JSON.stringify({
          schoolId: self.state.schoolId,
          teacherId: self.state.teacherId,
          periods: self.state.periods.toString(),
          timings: self.state.timings.toString(),
          monday: self.state.monday.toString(),
          tuesday: self.state.tuesday.toString(),
          wednesday: self.state.wednesday.toString(),
          thursday: self.state.thursday.toString(),
          friday: self.state.friday.toString(),
          saturday: self.state.saturday.toString(),
          sunday: self.state.sunday.toString(),
          mondayStaffId: self.state.mondayStaffId.toString(),
          tuesdayStaffId: self.state.tuesdayStaffId.toString(),
          wednesdayStaffId: self.state.wednesdayStaffId.toString(),
          thursdayStaffId: self.state.thursdayStaffId.toString(),
          fridayStaffId: self.state.fridayStaffId.toString(),
          saturdayStaffId: self.state.saturdayStaffId.toString(),
          sundayStaffId: self.state.sundayStaffId.toString(),
          clss: self.state.clss,

        }),
        );

      /*
      confirmAlert({
          title: 'Success',                        // Title dialog
          message: 'Added Time Table SuccessFully',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });
      */


      $.ajax({
        type: 'POST',
        data: JSON.stringify({

          schoolId: self.state.schoolId.toString(),
          teacherId: self.state.teacherId.toString(),
          clss: self.state.clss.toString(),
          periods: self.state.periods.toString(),
          timings: self.state.timings.toString(),
          monday: self.state.monday.toString(),
          tuesday: self.state.tuesday.toString(),
          wednesday: self.state.wednesday.toString(),
          thursday: self.state.thursday.toString(),
          friday: self.state.friday.toString(),
          saturday: self.state.saturday.toString(),
          sunday: self.state.sunday.toString(),
          mondayStaffId: self.state.mondayStaffId.toString(),
          tuesdayStaffId: self.state.tuesdayStaffId.toString(),
          wednesdayStaffId: self.state.wednesdayStaffId.toString(),
          thursdayStaffId: self.state.thursdayStaffId.toString(),
          fridayStaffId: self.state.fridayStaffId.toString(),
          saturdayStaffId: self.state.saturdayStaffId.toString(),
          sundayStaffId: self.state.sundayStaffId.toString(),

        }),

        // url: "http://localhost:8080/EmployeeAttendenceAPI/TimeTable/AddTimeTable",
        url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/TimeTable/AddTimeTable",

        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {

          confirmAlert({
            title: 'Success',                        // Title dialog
            message: 'Successfully Added TimeTable.',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });
          console.log("DATA");

          console.log(data.periodReponseList.periods);
          console.log(data.timingReponseList.timings);
          console.log(data.mondayResponseList.subject);
          /*  console.log(data.tuesdayList);
            console.log(data.wednesdayList);
            console.log(data.thursdayList);
            console.log(data.fridayList);
            console.log(data.saturdayList);
            console.log(data.sundayList);
       */

          $.each(data.periodReponseList, function (i, item) {
            console.log("PERIOD data" + item);
          });


          $.each(data.timingReponseList, function (i, item) {
            console.log("TIMING data" + item);
          });


          $.each(data.mondayResponseList, function (i, item) {
            console.log("mondaylist data" + item);
          });


          ReactDOM.render(
            <Router>
              <div>
                <Route path="/" component={() => <TimeTableDisplay data={data} />} />
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


        },
      });

      /*
      }else{
      
      
          confirmAlert({
              title: 'Process Failed',                        // Title dialog
              message: 'Adding TimeTable Operation Cannot Be Completed Due To Empty Field',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm
            });
            self.state.timings=[];
            self.state.monday=[];
            self.state.tuesday=[];
            self.state.wednesday=[];
            self.state.thursday=[];
            self.state.friday=[];
            self.state.saturday=[];
            self.state.sunday=[];
            self.state.mondayStaffId=[];
            self.state.tuesdayStaffId=[];
            self.state.wednesdayStaffId=[];
            self.state.thursdayStaffId=[];
            self.state.fridayStaffId=[];
            self.state.saturdayStaffId=[];
            self.state.sundayStaffId=[];
      
      
      
      
      }
      */
    })

  }


  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
    );

    console.log(name + ":" + value);

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
    var self = this;
    periodsArray = [];
    staffIdArray = [];
    subject = [];
    timingsArray = [];
    dataArray = [];

    $(".periods td").empty()
    $(".timing td").empty()


    $("#LunchSelect").show();
    $("#BreakSelect").show();
    $("#subjectSelect").show();

    $("#allselect").hide();

    $.ajax({
      type: 'POST',
      data: JSON.stringify({

        schoolId: this.state.schoolId.toString(),
        clss: this.state.clss,

      }),
      // url: "http://localhost:8080/EmployeeAttendenceAPI/TimeTable/CheckClass",
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/TimeTable/CheckClass",

      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        console.log("DATA" + data.oldData);
        console.log("DATA" + data.oldTimings);
        /*
           console.log("DATA" +data.subjectList[0].subject);
          console.log("DATA" +data.subjectList[0].staffId);
          console.log("DATA" +data.periodList[0].periods);
          console.log("DATA" +data.periodList[0].timings);
          console.log("DATA" +data.periodList[0].data);
         */


        if (data.oldData == "Timetable Exist") {

          confirmAlert({
            title: 'Time Table Cannot Be Added',                        // Title dialog
            message: 'Time Table Cannot Be Added For The Class' + " " + classNew + " " + "Since It Is Added Already Try UPDATE Option If You Want To Do Any Changes",               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });

        }



        if (data.oldTimings == "Timings Not Allocated") {

          confirmAlert({
            title: 'Time Table Cannot Be Added',                        // Title dialog
            message: 'Time Table Cannot Be Added For The Class' + " " + classNew + " " + "Since No Configuration Is Done For The Class . Kindly Do The Configuration",               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });

          ReactDOM.render(
            <Router>
              <div>
                  <Route path="/" component={ConfigurationPage} />
                </div>
            </Router>,
            document.getElementById('contentRender'));
          registerServiceWorker();
          //   $('#Period').attr('disabled', true);
        }



        if (data.oldData == "New Timetable" && data.oldTimings == "Timings Allocated") {

          console.log("Getting Subjects");


          $.each(data.subjectList, function (i, item) {

            console.log("DATA IN LOOP" + item.subject);
            subject.push(item.subject);
            console.log("DATA IN LOOP" + item.staffId);
            staffIdArray.push(item.staffId);


          });

          $.each(data.periodList, function (i, item) {

            console.log("DATA IN LOOP" + item.periods);
            console.log("DATA IN LOOP" + item.timings);
            console.log("DATA IN LOOP" + item.data);

            if (item.timings == null || item.timings == "NULL" || item.timings == "") {

            } else {
              periodsArray.push(item.periods);
              timingsArray.push(item.timings);
              dataArray.push(item.data);
            }

          });

          console.log("NOT NULL PERIODS " + periodsArray);
          console.log("PERIODS ARRAY LENGTH" + periodsArray.length);
          console.log("NOT NULL PERIODS TIMINGS " + timingsArray);
          console.log("NOT NULL PERIODS DATA " + dataArray);

          var subjectDropdown;

          $(".selectBoxText").empty()

          subjectDropdown += '<option  value="" disabled selected hidden>Select a Subject</option>';

          for (var i = 0; i < subject.length; i++) {

            console.log("DROPDOWN LIST" + subject[i]);
            subjectDropdown += '<option value="' + subject[i] + '">' + subject[i] + '</option>'
          }

          //  subjectDropdown += '<option value="Break">'  +"Break "+ '</option>'
          //subjectDropdown += '<option value="Lunch">' +"Lunch "+ '</option>'
          subjectDropdown += '<option value="Holiday">' + "Holiday " + '</option>'

          $(".selectBoxText").append(subjectDropdown);

          var j;

          for (var i = 0; i < periodsArray.length; i++) {
            j = i + 1;

            $("#period" + j).append(periodsArray[i]);
            $(".time" + j).append(timingsArray[i]);

          }


          for (var i = 0; i < dataArray.length; i++) {
            j = i + 1;
         
            if (dataArray[i] == "Lunch") {

              $("#LunchSelect").clone().appendTo("." + j);

            }
            if (dataArray[i] == "Break") {
              $("#BreakSelect").clone().appendTo("." + j);
            }
          }


          for (var i = 0; i < dataArray.length; i++) {

            j = i + 1;
           
            if (dataArray[i] != "Lunch" && dataArray[i] != "Break") {
              console.log("Subject " + j);
              $("#subjectSelect").clone().appendTo("." + j);

            }

          }


          if (periodsArray.length == 1) {

            $("#PeriodTable").show();

            $(".1").show();
            $("period1").show();
            $(".2").hide();
            $("period2").hide();
            $(".3").hide();
            $("period3").hide();
            $(".4").hide();
            $("period4").hide();

          }

          if (periodsArray.length == 2) {

            $("#PeriodTable").show();

            $(".1").show();
            $("period1").show();
            $(".2").show();
            $("period2").show();
            $(".3").hide();
            $("period3").hide();
            $(".4").hide();
            $("period4").hide();

          }

          if (periodsArray.length == 3) {

            $("#PeriodTable").show();

            $(".1").show();
            $("period1").show();
            $(".2").show();
            $("period2").show();
            $(".3").show();
            $("period3").show();
            $(".4").hide();
            $("period4").hide();

          }

          if (periodsArray.length == 4) {

            $("#PeriodTable").show();

            $(".1").show();
            $("period1").show();
            $(".2").show();
            $("period2").show();
            $(".3").show();
            $("period3").show();
            $(".4").show();
            $("period4").show();

          }

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
  BackbtnFunc() {
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={HomeWorkPageTeacherMenu} />

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
     
            <div >
      
        <h3 id='horMenunew' class="ulmenubar" style={{ color: "white", padding: "10px 0px",fontSize: "22px", textAlign: "center" }}>  Time Table</h3>
                 
</div>
       

        <label for="class">Select The Class</label>
        <div  style={{paddingBottom:"20px" }} >
          <select name="clss" style={{ width: "20%" }} id="clss"
            onChange={this.handleUserInputClass} required>
          </select>
        </div>



        {/*
                <label for="period">Select Total Number of Periods</label>
                <div ><select name="periods" style={{ width: "20%" }} id="Period"
                 disabled   onChange={this.handleUserInput}  required>
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
                    
                </select>
                </div>
*/}

        <table class="table" id="PeriodTable" name="PeriodTable" style={{ overflowX: "auto", overflowY: "auto" }}>
          <thead class="success" ><tr class="periods" style={{ backgroundColor:"darkslategrey",color:"white"}} >Period<td className="period1" id="period1"></td><td className="period2" id="period2"></td>
            <td className="period3" id="period3"></td><td className="period4" id="period4"></td></tr></thead>


          { /*
                    <tr class="timing "><td><th>Timing</th></td><td className="1" id="1">< input type="text" name="time1" placeholder="Start and EndTime "></input></td>
                        <td className="2" id="2">< input type="text" name="time2" placeholder="Start and EndTime "></input></td>
                        <td className="3" id="3">< input type="text" name="time3" placeholder="Start and EndTime "></input></td>
                        <td className="4" id="4">< input type="text" name="time4" placeholder="Start and EndTime "></input></td></tr>
       */}

         <thead style={{ backgroundColor: "cadetblue"}}> <tr class="timing "><th>Timing</th>
            <td className="time1" id="1">

            </td>

            <td className="time2" id="2">
            </td>

            <td className="time3" id="3">
            </td>

            <td className="time4" id="4">
            </td>
          </tr></thead>

          {/*
                    <tr class="monday"><th>MonDay</th><td className="1" id="1">< input type="text" name="monday1"   onChange={this.handleUserPeriod} placeholder="Subject"></input> <span style={{color:"red",fontSize:"12px"}} id="errormessage"> </span></td>
                        <td className="2" id="2">< input type="text" name="monday2" onChange={this.handleUserPeriod} placeholder="Subject"></input><span style={{color:"red",fontSize:"12px"}} id="errormessage"> </span></td>
                        <td className="3" id="3">< input type="text" name="monday3" onChange={this.handleUserPeriod} placeholder="Subject"></input><span style={{color:"red",fontSize:"12px"}} id="errormessage"> </span></td>
                        <td className="4" id="4">< input type="text" name="monday4" onChange={this.handleUserPeriod} placeholder="Subject"></input><span style={{color:"red",fontSize:"12px"}} id="errormessage"> </span></td></tr>
*/}

          <tr class="monday success"><th>MonDay</th><td className="1" id="1"></td>
            <td className="2" id="2"></td>
            <td className="3" id="3"></td>
            <td className="4" id="4"></td></tr>


          <tr class="tuesday success"><th>TuesDay</th><td className="1" id="1"></td>
            <td className="2" id="2"></td>
            <td className="3" id="3"></td>
            <td className="4" id="4"></td></tr>

          <tr class="wednesday success"><th>WednesDay</th><td className="1" id="1"></td>
            <td className="2" id="2"></td>
            <td className="3" id="3"></td>
            <td className="4" id="4"></td></tr>

          <tr class="thursday success"><th>ThursDay</th><td className="1" id="1"></td>
            <td className="2" id="2"></td>
            <td className="3" id="3" ></td>
            <td className="4" id="4"></td></tr>

          <tr class="friday success"><th>FriDay</th><td className="1" id="1"></td>
            <td className="2" id="2" ></td>
            <td className="3" id="3"></td>
            <td className="4" id="4"></td></tr>

          <tr class="saturday success"><th>SaturDay</th><td className="1" id="1"></td>
            <td className="2" id="2"></td>
            <td className="3" id="3"></td>
            <td className="4" id="4"></td></tr>

          <tr class="sunday success"><th>SunDay</th><td className="1" id="1"></td>
            <td className="2" id="2"></td>
            <td className="3" id="3"></td>
            <td className="4" id="4"></td></tr>
        </table>


        <button id="submit"  style={{ marginBottom: "10%"}}  >Submit</button>

        <div id="allselect" >
          <div id="LunchSelect">
            <select style={{width: "auto", marginBottom: "10px"}}><option>Lunch</option></select>
          </div>

          <div id="BreakSelect">
            <select style={{width: "auto", marginBottom: "10px"}}   ><option>Break</option></select>
          </div>


          <div id="subjectSelect">
            <select style={{width: "auto", marginBottom: "10px"}} className="selectBoxText" id="selectBoxOption"> </select>
          </div>

        </div>
      </div>
    );
  }

}


export default TimeTable;