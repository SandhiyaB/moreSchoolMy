import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Homework.css';
import $ from 'jquery';
import CryptoJS from 'crypto-js';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import EmployeeMenuPage from './EmployeeMenuPage';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import EmployeeMenuHeader from './EmployeeMenuHeader';
import FooterText from './FooterText';
import HomeWorkPageTeacherMenu from './HomeWorkPageTeacherMenu';

class ViewTeacherTimeTable extends Component {

    constructor() {
        super()
        this.state = {

        };
    }


    componentDidMount() {

        $("#tableDisplayId").hide();
        $("#nodata").hide();

        var teacherId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var schoolId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var clss = CryptoJS.AES.decrypt(localStorage.getItem('Department'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        //var clss="Admin";
        this.state.teacherId = teacherId;
        this.state.role = role;
        this.state.schoolId = schoolId;
        this.state.clss = clss;

        this.setState({

            schoolId: this.state.schoolId,
            teacherId: this.state.teacherId,
            role: this.state.role,
            clss: this.state.clss

        })

        console.log("AJAX DATA" +
            JSON.stringify({

                schoolId: this.state.schoolId,
                teacherId: this.state.teacherId,
                role: this.state.role,
                clss: this.state.clss

            }),
        );

        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({

                schoolId: this.state.schoolId,
                teacherId: this.state.teacherId,
                role: this.state.role,
                clss: this.state.clss

            }),

            // url: "http://localhost:8080/EmployeeAttendenceAPI/TimeTable/SelectTimeTable",
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/TimeTable/SelectTimeTable",

            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

                console.log("DATA" + data.timingReponseList.length);
                console.log("DATA" + data);

                console.log("bDta ",data);
             
                if (data.timingReponseList.length != 0) {
                    var otherThanNullSun = data.mondayResponseList.some(function (el) {
                        return ((el !== null)&&(el !== "NULL"));
                    });
                    var otherThanNullMon = data.mondayResponseList.some(function (el) {
                        return ((el !== null)&&(el !== "NULL"));
                    });
                    var otherThanNullTues = data.tuesdayResponseList.some(function (el) {
                        return ((el !== null)&&(el !== "NULL"));
                    });
                    var otherThanNullWed = data.wednesdayResponseList.some(function (el) {
                        return ((el !== null)&&(el !== "NULL"));
                    });
                    var otherThanNullThu = data.thursdayResponseList.some(function (el) {
                        return ((el !== null)&&(el !== "NULL"));
                    });
                    var otherThanNullFri = data.fridayResponseList.some(function (el) {
                        return ((el !== null)&&(el !== "NULL"));
                    });
                    var otherThanNullSat = data.saturdayResponseList.some(function (el) {
                        return ((el !== null)&&(el !== "NULL"));
                    });

                    

                    console.log("sun ",otherThanNullSun," mon ",otherThanNullMon," tue ",otherThanNullTues," wed ",otherThanNullWed," thu ",otherThanNullThu," fri ",otherThanNullFri," sata ",otherThanNullSat)

                    $("#tableDisplayId").show();
                    $("#nodata").hide();

                    //  var tab='<tr><th>Days/Timings<th></tr>'

                    var periods;
                    var length;
                    if (data.periodReponseList.length != 0) {
                        $.each(data.periodReponseList, function (i, item) {
                            length = i;
                            console.log("timingList Data" + item);
                            periods += '<td>' + item + '</td>;'
                        });
                        $("#periods").append(periods);
                    } else {
                        $("#periods").hide();
                    }


                    var timings;
                    if (data.timingReponseList.length != 0) {
                        $.each(data.timingReponseList, function (i, item) {

                            console.log("timingList Data" + item);
                            timings += '<td>' + item + '</td>;'

                        });
                        $("#timings").append(timings);
                    }


                    var monday;
                    if (data.mondayResponseList.length != 0) {
                        $.each(data.mondayResponseList, function (i, item) {
                            console.log("mondayList Data" + item);

                            if (item == null || item == "NULL") {
                                item = "-";

                              }
                              monday += '<td>' + item + '</td>;'
                        
                        });
                        $("#monday").append(monday);
                    }


                    var tuesday;
                    if (data.tuesdayResponseList.length != 0) {
                        $.each(data.tuesdayResponseList, function (i, item) {
                            console.log("tuesdayList Data" + item);

                            if (item == null || item == "NULL") {
                                item = "-";
                            }
                            tuesday += '<td>' + item + '</td>;'

                        });
                        $("#tuesday").append(tuesday);
                    }

                    var wednesday;
                    if (data.wednesdayResponseList.length != 0) {
                        $.each(data.wednesdayResponseList, function (i, item) {
                            console.log("wednesdayList Data" + item);

                            if (item == null || item == "NULL") {
                                item = "-";
                            }
                            wednesday += '<td>' + item + '</td>;'

                        });
                        $("#wednesday").append(wednesday);
                    }

                    var thursday;
                    if (data.thursdayResponseList.length != 0) {
                        $.each(data.thursdayResponseList, function (i, item) {
                            console.log("thursdayList Data" + item);

                            if (item == null || item == "NULL") {
                                item = "-";
                            }
                            thursday += '<td>' + item + '</td>;'

                        });
                        $("#thursday").append(thursday);
                    }

                    var friday;
                    if (data.fridayResponseList.length != 0) {
                        $.each(data.fridayResponseList, function (i, item) {
                            console.log("fridayList Data" + item);

                            if (item == null || item == "NULL") {
                                item = "-";
                            }
                            friday += '<td>' + item + '</td>;'

                        });
                        $("#friday").append(friday);
                    }

                    var saturday;
                    if (data.saturdayResponseList.length != 0) {
                        $.each(data.saturdayResponseList, function (i, item) {
                            console.log("saturdayList Data" + item);

                            if (item == null || item == "NULL") {
                                item = "-";
                            }
                            saturday += '<td>' + item + '</td>;'

                        });
                        $("#saturday").append(saturday);
                    }

                    var sunday;
                    if (data.sundayResponseList.length != 0) {
                        $.each(data.sundayResponseList, function (i, item) {
                            console.log("sundayList Data" + item);

                            if (item == null || item == "NULL") {
                                item = "-";
                            }
                            sunday += '<td>' + item + '</td>;'

                        });
                        $("#sunday").append(sunday);
                    }


                } else {

                    $("#tableDisplayId").hide();
                    $("#nodata").show();

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
                <div class="table-responsive" id="tableDisplayId">
                  

                    <table class="table success" id="TimeTableResponseTabel" style={{ overflowX: "auto", overflowY: "auto" }}>
                        <thead style={{ backgroundColor: "darkslategrey", color: " white" }}><tr id="periods"><th>Periods</th></tr></thead>
                        <thead style={{ backgroundColor: "cadetblue" }} > <tr id="timings"><th class="primary"  >Timings</th></tr></thead>
                        <thead> <tr class="success" id="monday"><th  >Monday</th></tr></thead>
                        <thead> <tr class="success" id="tuesday"><th >Tuesday</th></tr></thead>
                        <thead> <tr class="success" id="wednesday"><th  >Wednesday</th></tr></thead>
                        <thead> <tr class="success" id="thursday"><th  >Thursday</th></tr></thead>
                        <thead><tr class="success" id="friday"><th >Friday</th></tr></thead>
                        <thead> <tr class="success" id="saturday"><th  >Saturday</th></tr></thead>
                        <thead> <tr class="success" id="sunday"><th>Sunday</th></tr></thead>
                    </table>
                </div>

                <div id="nodata">
                    <h3 style={{textAlign:"center"}}>No Data</h3>
                </div>

            </div>
        );
    }

}


export default ViewTeacherTimeTable;