
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import AttendanceRegulation from './AttendanceRegulation';
import AttendanceDisplay from './AttendanceDisplay';
import EmployeeMenuPage from './EmployeeMenuPage';
import AttendanceRegulationSupervisor from './AttendanceRegulationSupervisor';
import './Maintenance.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import LeaveManagement from './LeaveManagement';
import CryptoJS from 'crypto-js';
import EmployeeAttendanceRequest from './EmployeeAttendanceRequest';
import EmployeeLeaveRequest from './EmployeeLeaveRequest';
import FooterText from './FooterText';

class EmployeeRequestAcceptReject extends Component {

    constructor() {
        super()
        this.state = {

        }
    }

    AttendanceRequest() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeRequestAcceptReject} />
                    <Route path="/" component={EmployeeAttendanceRequest} />
                 
                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }



    LeaveRequest() {

        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeRequestAcceptReject} />
                    <Route path="/" component={EmployeeLeaveRequest} />
               
                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }
    componentDidMount() {
        this.AttendanceRequest();
        window.scrollTo(0, 0);

    }
    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuPage} />
                 
                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }


    render() {
        return (

            <div className="container">
               
                <div id='horMenu'>
                    <ul  id='horMenunew' class="ulmenubar">
                        <li><a className="active" onClick={() => this.AttendanceRequest()}><span  class="glyphicon glyphicon-envelope"></span>Attendance Regularization Request</a></li>
                        <li><a onClick={() => this.LeaveRequest()}><span class="glyphicon glyphicon-envelope"></span> Leave Request</a></li>

                    </ul>

                </div>
              


            </div>




        );
    }

}


export default EmployeeRequestAcceptReject;
