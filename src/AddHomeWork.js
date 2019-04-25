import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Homework.css';
import $ from 'jquery';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';

import { FormErrors } from './FormErrors';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
//js
import Case from 'case';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import FooterText from './FooterText';
import EmployeeMenuPage from './EmployeeMenuPage';
import HomeWorkEvaluationPage from './HomeWorkEvalutionPage';
import ClassHistory from './ClassHistory';
import HomeWorkPageTeacherMenu from './HomeWorkPageTeacherMenu';

var testarray = [];
var inputarray = [];

class AddHomeWork1 extends Component {

    constructor() {
        super()
        var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var sms = CryptoJS.AES.decrypt(localStorage.getItem('SMS'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

        var mangId;
        var staff;
        var staffName;
        var staffRole;
        if (companyType == "Office") {
            companyType = "Employee";
            mangId = "Reporting Manager ID";
            staff = "Employee";
            staffName = "Reporting Manager Name.. ";
            staffRole = "Reporting Manager Role.. "
        }
        else {
            companyType = "Student/Staff";
            mangId = "Reporting Staff ID";
            staff = "Staff";
            staffName = "Reporting Staff Name.. ";
            staffRole = "Reporting Staff Role.. "


        }
        this.state = {
            companyType: companyType,
            subjectName: '',
            description: '',
            type: '',
            completionDate: '',
            department: '',
            additional: '',
            companyId: '',
            employeeId: '',
            sms: sms,
            superiorId: superiorId,


        };
    }

    componentDidMount() {

        window.scrollTo(0, 0);

        this.Initialize();
        var self = this;
        $('#completionDate').datepicker({
            onSelect: function (date) {
                var dt = new Date(date);
                self.setState({
                    completionDate: date,
                    dateValid: true,
                });

            },

            dateFormat: 'yy/mm/dd',
            minDate: 'M',
            maxDate: '+6M',
            numberOfMonths: 1
        });
    }



    pushNotificationFunc(data, subject, department) {
        if (data.length != 0) {
            var registration_ids = [];
            $.each(data, function (i, item) {
                if (item.tokenId != null) {
                    var tok = item.tokenId.split(',');
                    if (tok.length == 2) {
                        for (var i = 0; i < tok.length; i++) {
                            registration_ids.push(tok[i]);
                        }
                    } else {
                        registration_ids.push(item.tokenId);
                    }
                }
            });

            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    "notification": {
                        "title": "Tictok",
                        "body": "You have " + subject + " Home Work",
                        "click_action": "https://tictoks-v3.firebaseapp.com/HomeWork",
                        "icon": "%PUBLIC_URL%/favicon.ico"

                    },

                    // "to":item.tokenId,
                    "registration_ids": registration_ids,
                    /*  [
                      item.tokenId,
                      'fjd18p2i1yQ:APA91bHwD79d9GRcoDYvbvFfUXT-k4i-mSQ87KqXCfB7xUJl0KizuM37bEEr2wHBd7s1m-L-tG7sO39yjLhQr9XGeQFGURQavh8Pa1fp2Xt_-S0uK7bM5tmu3N1oiCwuvBsZNGIpuqTv',
                      'ejzIuta_Zdc:APA91bGcx9znKXZIoBVXADQCzpCAO2LYDisSPNiz_1P6dClibZW9y2ZkRyakYKfceNbIXifEL60sdmN4O65gOBTFtNKAwqZxqd4ZMm69EeMqPp4QOO5SCYXfOg40kIs1BbExIgHVmlVr'
                      ] */
                    "priority": 10,
                    "webpush": {
                        "headers": {
                            "Urgency": "high"
                        }
                    }
                }),

                crossDomain: true,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', "key=AAAA7WCGrro:APA91bFrFbV8snTxm1m5DLx0sAALMr8AKG4SsNkOK2Ow1ucxVMMtveRlOJ71ThmUROORA6YekB3Bc2SByCz1uTYIz4dy-KsH-SrR51d99xvnQlW84S19rCUUX2sMP2UufiPFq2yTVizr"

                    );
                },
                url: "https://fcm.googleapis.com/fcm/send",
                contentType: "application/json",
                async: false,
                success: function (data) {
                    console.log("tok", registration_ids);
                    console.log("succ", data);

                },
                error: function (data, textStatus, jqXHR) {
                    console.log("err", data, " t", textStatus, " j", jqXHR);

                }
            });
        }


        confirmAlert({
            title: 'Success',                        // Title dialog
            message: 'Successfully Assigned HomeWork to All the Students in ' + department,               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
        });
    }
    handleUserClass = (e) => {
        var count;
        const name = e.target.name;
        const value = e.target.value;

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        this.state.department = value;
        this.state.companyId = companyId;
        this.setState({
            companyId: this.state.companyId,
            employeeId: this.state.employeeId,
            className: this.state.department,


        })

        $('[name=subjectName]').val(' ');

        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                employeeId: this.state.employeeId,
                className: this.state.department,

            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/HomeWork/SubjectDetails",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                $('[name=subjectName]').val(' ');

                var sub;
                //  sub += '<option  value="" disabled selected hidden>Select a Subject Name</option>';
                $.each(data, function (i, item) {

                    sub += '<option value="' + item.subjectName + '">' + item.subjectName + '</option>'

                });
                $("#subjectName").append(sub);
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
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let subjectValid = this.state.subjectValid;
        let descriptionValid = this.state.descriptionValid;
        let typeValid = this.state.typeValid;



        switch (fieldName) {
            case 'subject':
                subjectValid = value.match(/^([a-zA-Z]+)([a-zA-Z ])*$/);
                fieldValidationErrors.subject = subjectValid ? '' : ' is InCorrect';
                break;
            case 'description':
                descriptionValid = value.match(/^([a-zA-Z]+)([a-zA-Z ])*$/);
                fieldValidationErrors.description = descriptionValid ? '' : ' is InCorrect';
                break;
            case 'type':
                typeValid = value.length >= 0;
                fieldValidationErrors.type = typeValid ? '' : ' is InValid';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            subjectValid: subjectValid,
            descriptionValid: descriptionValid,
            typeValid: typeValid,

        }, this.validateForm);
    }
    validateForm() {

        this.setState({
            formValid:
                this.state.proofType
                && this.state.subject
                && this.state.description
                && this.state.type
                && this.state.department

        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }




    Initialize() {
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.state.employeeId = employeeId;
        this.setState({
            companyId: companyId,
            employeeId: employeeId,
        });

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                employeeId: this.state.employeeId,

            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/HomeWork/ClassDetails",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                var dept;
                if (data.length > 0) {
                    dept += '<option  value="" disabled selected hidden>Select a Class</option>';
                    $.each(data, function (i, item) {

                        dept += '<option value="' + item.className + '">' + item.className + '</option>'

                    });
                    $("#department").append(dept);
                }
                else {
                    confirmAlert({
                        title: 'Error',                        // Title dialog
                        message: 'No Class has been assigned to you, Please check with Admin for granting access to this page.',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });
                    ReactDOM.render(
                        <Router >
                            <div>
                                <Route path="/" component={HomeWorkPageTeacherMenu} />
                            
                            </div>
                        </Router>, document.getElementById('contentRender'));

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



    AddHomeWorkFunc() {

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.state.employeeId = employeeId;
        this.setState({
            companyId: companyId,
            employeeId: employeeId,
        });
        var self = this;

        if (this.state.subjectName.trim().length > 0 && this.state.department.trim().length > 0 && this.state.description.trim().length > 0 && this.state.type.trim().length > 0 && this.state.completionDate.trim().length > 0) {
            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    subjectName: this.state.subjectName,
                    description: Case.capital(this.state.description),
                    type: this.state.type,
                    department: this.state.department,
                    companyId: this.state.companyId,
                    completionDate: this.state.completionDate,
                    superiorId: this.state.employeeId,
                    additional: Case.capital(this.state.additional),
                    sms: this.state.sms
                }),
                url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/HomeWork/AddHomeWork",
                contentType: "application/json",
                dataType: 'json',
                async: false,
                success: function (data, textStatus, jqXHR) {

                    console.log("data", data);
                    if (data.length != 0) {
                        self.pushNotificationFunc(data, self.state.subjectName, self.state.department);
                    }

                    self.state.subjectName = "";
                    self.state.description = "";
                    self.state.type = "";
                    self.state.completionDate = "";
                    self.state.department = "";
                    self.state.additional = "";
                    $('[name=department]').val('');
                    $('[name=type]').val('');
                    self.setState({
                        subjectName: '',
                        description: '',
                        type: '',
                        additional: '',
                        completionDate: '',
                        department: '',


                    });
                    ReactDOM.render(
                        <Router >
                            <div>
                                 <Route path="/" component={AddHomeWork1} />
                             </div>
                        </Router>, document.getElementById('contentRender'));


                },
                error: function (data) {
                    confirmAlert({
                        title: 'No Internet',                        // Title dialog
                        message: 'Network Connection Problem',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });


                },
            });

        } else {
            confirmAlert({
                title: 'Error',                        // Title dialog
                message: 'Please Fill all the Fields',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
            });
        }
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
            <div className="container"
            
                style={{ backgroundColor: "#edf5e1" }}>
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
      
        <h3 id='horMenunew' class="ulmenubar" style={{ color: "white", padding: "10px 0px",fontSize: "22px", textAlign: "center" }}> Add Homework</h3>
                 
</div>

                <div class="col-md-10 col-md-border">

                    <form>

                        <div class="form-group" style={{ width: "50%" }}>
                            

                            <label for="department"> Class *</label>

                            <select id="department" className="form-control dept"
                                value={this.state.department} onChange={this.handleUserClass} name="department"> </select><br />



                            <label for="subject">Subject Name</label>

                            <select id="subjectName" className="form-control dept"
                                value={this.state.subjectName} onChange={this.handleUserInput} name="subjectName">
                                <option value="" disabled selected hidden>Select a Subject </option>
                            </select><br />


                            <label for="description">Description</label>

                            <input onChange={this.handleUserInput} name="description" value={this.state.description} class="form-control" id="description" type="text" />

                            <label for="type">Type</label>

                            <select class="form-control" id="type" name="type" onChange={this.handleUserInput} value={this.state.type}>
                                <option value="" disabled selected hidden>Select a Home Work Type</option>
                                <option value="Homework">Homework</option>
                                <option value="Study">Study</option>
                                <option value="Presentation">Presentation</option>
                                <option value="Lab">Lab</option>
                                <option value="Quiz">Quiz</option>
                                <option value="Project">Project</option>
                                <option value="Other">Other</option>
                            </select>
                            <br />

                            <label for="date">Completion Date</label><br />
                            <input type="text" onChange={this.handleUserInput} style={{ width: "50%" }} value={this.state.completionDate} readOnly id="completionDate" name="completionDate" />
                            <br />

                            <label for="additional">Additional Info</label>

                            <textarea class="form-control rounded-0" onChange={this.handleUserInput} name="additional" value={this.state.additional} id="additional" rows="3"></textarea>

                        </div>
                        <button type="button" onClick={() => this.AddHomeWorkFunc()} className="btn btn-primary" style={{ marginBottom: "45px" }}>Add</button><br />


                    </form>

                </div>
            </div>







        );
    }

}
export default AddHomeWork1;