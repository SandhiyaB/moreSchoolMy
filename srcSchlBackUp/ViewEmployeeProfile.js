import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import ReportMenuPage from './ReportMenuPage';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import DailyIndividualAttendanceReport from './DailyIndividualAttendanceReport';
import CryptoJS from 'crypto-js';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import FooterText from './FooterText';
import './ViewProfile.css';
import profile from './image/profilegirl.png';
var report;
class ViewEmployeeProfile extends Component {

    constructor(data) {
        super(data)
        var today = new Date();
        var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

        if (companyType == "Office") {
            companyType = "Employee";
        }
        else {
            companyType = "Student/Staff";
        }
        this.state = {
            date: today1,
            companyId: '',
            employeeId: '',
            companyName: '',
            companyType: companyType
        };
    }

    componentDidMount() {
        var name = this.props.data.firstName + " " + this.props.data.lastName;
        this.setState({
            userName: name,
            dob: this.props.data.dob,
            department: this.props.data.department,
            emailId: this.props.data.emailId,
            employeeType: this.props.data.employeeType,
            mobileNo: this.props.data.mobileNo,
            proofNo: this.props.data.proofNo,
            role: this.props.data.role,
            address: this.props.data.address,
            employeeId: this.props.data.employeeId,
            proofType: this.props.data.proofType,
            fingerPrint: this.props.data.fingerPrint,
            reportingManagerId: this.props.data.reportingManagerId,
            reportingManagerName: this.props.data.reportingManagerName,
            reportingManagerRole: this.props.data.reportingManagerRole,
            qualification: this.props.data.qualification,
            doj: this.props.data.doj,
            doexp: this.props.data.doexp,
            maritialStatus: this.props.data.maritialStatus,
            gender: this.props.data.gender,
            salary: this.props.data.salary,
        });
        
    }

    render() {

        return (

            <div className="container" id="containerbody" >

                <div class="tab-content no-border padding-24">
                    <div id="home" class="tab-pane in active">
                        <div class="row">
                            <div class="col-xs-12 col-sm-3 center">
                               {(this.state.gender === "Female"
                               ?  <img  alt="David Palms's avatar" src={profile}/>
                               :  <img  alt=" Avatar1" id="avatar1" src="http://bootdey.com/img/Content/avatar/avatar6.png" />  	
                                )}
                                <div class="space space-4"></div>
                                <span> <h4 ><b>{this.state.userName}</b></h4></span>
                                <div class="space space-4"></div>

                                <span >{this.state.role}</span>

                            </div>

                            <div class="col-xs-12 col-sm-9">
                                <div class="profile-user-info">
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"> ID </div>

                                        <div class="profile-info-value">
                                            <span>{this.state.employeeId}</span>
                                        </div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"> Department </div>

                                        <div class="profile-info-value">
                                            <span>{this.state.department}</span>
                                        </div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"> Qualification </div>

                                        <div class="profile-info-value">
                                            <span>{this.state.qualification}</span>
                                        </div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"> EmailId </div>

                                        <div class="profile-info-value">
                                            <span>{this.state.emailId}</span>
                                        </div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"> Mobile No </div>

                                        <div class="profile-info-value">
                                            <span>{this.state.mobileNo}</span>
                                        </div>
                                    </div>

                                    <div class="profile-info-row">
                                        <div class="profile-info-name"> DOB </div>

                                        <div class="profile-info-value">
                                            <span>{this.state.dob}</span>
                                        </div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"> Maritial Status </div>

                                        <div class="profile-info-value">
                                            <span>{this.state.maritialStatus}</span>
                                        </div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"> Basic Salary </div>

                                        <div class="profile-info-value">
                                            <span>{this.state.salary}</span>
                                        </div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"> Joined </div>

                                        <div class="profile-info-value">
                                            <span>{this.state.doj}</span>
                                        </div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"> Date Of Expiry </div>

                                        <div class="profile-info-value">
                                            <span>{this.state.doexp}</span>
                                        </div>
                                    </div>

                                    <div class="profile-info-row">
                                        <div class="profile-info-name"> Location </div>

                                        <div class="profile-info-value">
                                            <p class="fa fa-map-marker light-orange bigger-110">&nbsp;</p>
                                            <span>{this.state.address}</span>
                                        </div>
                                    </div>

                                    <div class="profile-info-row">
                                        <div class="profile-info-name"> Reporting Manager Name </div>

                                        <div class="profile-info-value">
                                            <span>{this.state.reportingManagerName}</span>
                                        </div>
                                    </div>
                                    
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"> Reporting Manager Role </div>

                                        <div class="profile-info-value">
                                            <span>{this.state.reportingManagerRole}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </div>

        );
    }

}

export default ViewEmployeeProfile;
