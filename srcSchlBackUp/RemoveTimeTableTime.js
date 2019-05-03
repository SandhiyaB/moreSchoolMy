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
import TimeTableConfigure from './TimeTableConfigure';

class RemoveTimeTableTime extends Component {

    constructor() {
        super()
        this.state = {
            periods: '',
            timings: '',
            data: '',
            clss: '',
            schoolId: '',
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
                    clss += '<option disabled selected hidden >Select a class</option>';
                    $.each(data, function (i, item) {

                
              if(item.clss!="Staff"){
                clss += '<option value="' + item.clss + '">' + item.clss + '</option>'
           
              }   });
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

        $("#PeriodTable").on('click', '.Delete', function () {
            // get the current row


            var currentRow = $(this).closest("tr");

            self.state.periods = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
            self.state.timings = currentRow.find("td:eq(1)").text(); // get current row 1st TD value
            self.state.data = currentRow.find("td:eq(2)").text(); // get current row 2nd TD

            var schoolId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

            self.state.reportingManagerId = employeeId;
            self.state.schoolId = schoolId;

            self.setState({
                schoolId: self.state.schoolId,
                periods: self.state.periods,
                clss: self.state.clss,
                data: self.state.data,
                timings: self.state.timings,
            });

            confirmAlert({
                title: 'Period Deletion Confirmation ',                        // Title dialog
                message: 'Are You  Sure Do You Want To Delete  ' + self.state.periods + ' Of Timings ' + self.state.timings + ' Opted For ' + self.state.data + '?',               // Message dialog
                confirmLabel: 'Delete',                           // Text button confirm
                cancelLabel: 'Cancel',                             // Text button cancel    
                onConfirm: () => { self.DeleteConfirm(currentRow) },    // Action after Confirm
                onCancel: () => { self.NoAction() },      // Action after Cancel

            })

        });


    }

    DeleteConfirm(currentRow) {
        var self = this;

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                schoolId: self.state.schoolId,
                periods: self.state.periods,
                clss: self.state.clss,
                data: self.state.data,
                timings: self.state.timings,

            }),
            // url: "http://localhost:8080/EmployeeAttendenceAPI/TimeTableConfig/DeleteClassPeriods",
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/TimeTableConfig/DeleteClassPeriods",


            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                confirmAlert({
                    title: 'Deleted The Period',                        // Title dialog
                    message: 'The Period Opted For Deletion Is Deleted Successfully',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm

                })

                currentRow.remove();

                ReactDOM.render(
                    <Router>
                        <div>
                            <Route path="/" component={RemoveTimeTableTime} />
                        

                        </div>
                    </Router>,
                    document.getElementById('contentRender'));
                registerServiceWorker();

            },
            error: function (data, textStatus, jqXHR) {
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
                 
                    <Route path="/" component={TimeTableConfigure} />

                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();

    }

    NoAction() {
        ReactDOM.render(
            <Router>
                <div>

                 
                    <Route path="/" component={RemoveTimeTableTime} />
                   

                </div>
            </Router>, document.getElementById('contentRender'));


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
                console.log("DATA" + data[0].periods);
                var tableData="<thead> <tr><td>Period</td><td>Timings</td><td>Opted Option</td><td>Action</td></tr></thead>";

                var optedData;

                $("#PeriodTable").show();
                $("#periodaLabel").show();
                $("#PeriodTable").empty();

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

                            tableData += '<tr class="success"><td>' + item.periods + '</td><td>' + item.timings + '</td><td>' + optedData + '</td><td><button class="Delete">Delete</button></td></tr>';

                        }
                    }

                });
                $("#PeriodTable").append(tableData);

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

                <div id='horMenu'>
                    <ul id='horMenunew' class="ulmenubar" style={{ backgroundColor: "#8811d6" }}>
                        <li><a className="active" onClick={() => this.AddFunc()}><span class="glyphicon glyphicon-plus"></span>Add</a></li>
                        <li><a onClick={() => this.UpdateFunc()}><span class="glyphicon glyphicon-retweet"></span> Update</a></li>
                        <li><a onClick={() => this.RemoveFunc()}><span class="glyphicon glyphicon-minus"></span>Remove </a></li>
                    </ul>
                </div>
                <h3>Remove Time Table Time</h3>
                <div  style={{    marginBottom:" 25px"}} >
                <label style={{paddingRight:"50px" }} for="class">Select The Class</label>
              
                    <select name="clss" style={{ width: "20%" }} id="clss"
                        onChange={this.handleUserInputClass} required>
                    </select>
                </div>
                <div style={{overflow:"auto"}}>
                <table class="table" id="PeriodTable" name="PeriodTable" style={{ overflowX: "auto", overflowY: "auto" }}>
                   
                </table>
                </div>
            </div>

        );
    }

}


export default RemoveTimeTableTime;
