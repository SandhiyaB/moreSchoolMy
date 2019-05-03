import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Homework.css';
import $ from 'jquery';
import CryptoJS from 'crypto-js';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import Maintenance from './Maintenance';
import AddNewDepartment from './AddNewDepartment';
import RemoveDepartment from './RemoveDepartment';
import FooterText from './FooterText';
import EmployeeRequestAcceptReject from './EmployeeRequestAcceptReject';

import EmployeeMenuPage from './EmployeeMenuPage';
import AddHomeWork from './AddHomeWork';
import ExamSchedule from './ExamSchedule';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class TimeTableDisplay extends Component {

    constructor(data) {
        super(data)
        this.state = {

        };
    }

    componentDidMount() {

        var periods;
        //=  <tr><td>Periods</td></tr>

        /*
for(var i=1;i<=this.props.data.periods;i++){
    console.log("period value"+i);
    periods += '<td>' +i+ '</td>';

}
*/
        if (this.props.data.periodReponseList.length != 0) {
            $.each(this.props.data.periodReponseList, function (i, item) {
                console.log("timingList Data" + item);
                periods += '<td>' + item + '</td>;'
            });
            $("#periods").append(periods);
        }


        var timings;
        if (this.props.data.timingReponseList.length != 0) {
            $.each(this.props.data.timingReponseList, function (i, item) {
                console.log("timingList Data" + item);
                timings += '<td>' + item + '</td>;'
            });
            $("#timings").append(timings);
        }


        var monday;
        if (this.props.data.mondayResponseList.length != 0) {
            $.each(this.props.data.mondayResponseList, function (i, item) {
                console.log("mondayList Data" + item);
                monday += '<td>' + item + '</td>;'
            });
            $("#monday").append(monday);
        }


        var tuesday;
        if (this.props.data.tuesdayResponseList.length != 0) {
            $.each(this.props.data.tuesdayResponseList, function (i, item) {
                console.log("tuesdayList Data" + item);
                tuesday += '<td>' + item + '</td>;'
            });
            $("#tuesday").append(tuesday);
        }

        var wednesday;
        if (this.props.data.wednesdayResponseList.length != 0) {
            $.each(this.props.data.wednesdayResponseList, function (i, item) {
                console.log("wednesdayList Data" + item);
                wednesday += '<td>' + item + '</td>;'
            });
            $("#wednesday").append(wednesday);
        }

        var thursday;
        if (this.props.data.thursdayResponseList.length != 0) {
            $.each(this.props.data.thursdayResponseList, function (i, item) {
                console.log("thursdayList Data" + item);
                thursday += '<td>' + item + '</td>;'
            });
            $("#thursday").append(thursday);
        }

        var friday;
        if (this.props.data.fridayResponseList.length != 0) {
            $.each(this.props.data.fridayResponseList, function (i, item) {
                console.log("fridayList Data" + item);
                friday += '<td>' + item + '</td>;'
            });
            $("#friday").append(friday);
        }

        var saturday;
        if (this.props.data.saturdayResponseList.length != 0) {
            $.each(this.props.data.saturdayResponseList, function (i, item) {
                console.log("saturdayList Data" + item);
                saturday += '<td>' + item + '</td>;'
            });
            $("#saturday").append(saturday);
        }

        var sunday;
        if (this.props.data.sundayResponseList.length != 0) {
            $.each(this.props.data.sundayResponseList, function (i, item) {
                console.log("sundayList Data" + item);
                sunday += '<td>' + item + '</td>;'
            });
            $("#sunday").append(sunday);
        }

    }
    render() {
        return (
            <div className="container">
                <h1>Time Table</h1>
                <table class="table" id="TimeTableResponseTabel" style={{ overflowX: "auto", overflowY: "auto" }}>
                    <thead><tr class="success" id="periods">Periods</tr></thead>
                    <thead><tr class="success" id="timings">Timings</tr></thead>
                    <thead><tr class="success" id="monday">Monday</tr></thead>
                    <thead><tr class="success" id="tuesday">Tuesday</tr></thead>
                    <thead><tr class="success" id="wednesday">Wednesday</tr></thead>
                    <thead><tr class="success" id="thursday">Thursday</tr></thead>
                    <thead><tr class="success" id="friday">Friday</tr></thead>
                    <thead><tr class="success" id="saturday">Saturday</tr></thead>
                    <thead><tr class="success" id="sunday">Sunday</tr></thead>
                </table>







            </div>

        );
    }

}


export default TimeTableDisplay;