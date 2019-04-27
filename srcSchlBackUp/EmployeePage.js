import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';

import registerServiceWorker from './registerServiceWorker';

//js
import { confirmAlert } from 'react-confirm-alert'; // Import
import FooterText from './FooterText';
import Case from 'case';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import AddEmployee from './AddEmployee';
import AddStudentStaffPage from './AddStudentStaffPage';
import EditEmployeeDetails from './EditEmployeeDetails';
import EditStudentStaffPage from './EditStudentStaffPage';
import EmployeeMaintenance from './EmployeeMaintenance';
import ViewEmployeeProfile from './ViewEmployeeProfile';

var currentRow;
var today = new Date();
today = today.getFullYear();
var lastnum;
class EmployeePage extends Component {

    constructor() {
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

        if (companyType == "Office") {
            companyType = "Employee";
        }
        else {
            companyType = "Student/Staff";
        }
        super()
        this.state = {

            department: '',
            companyId: companyId,
            superiorId: superiorId,
            companyType: companyType

        };
    }


    componentDidMount() {

        var self = this;
        var tab;
        $("#employeeTable").on('click', "#delete", function () {
            var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

            self.state.companyId = companyId;

            currentRow = $(this).closest("tr");

            // get current row 1st table cell TD value
            self.state.employeeId = currentRow.find("td:eq(0)").html(); // get current row 2nd table cell TD value
            self.state.employeeName = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value
            self.state.role = currentRow.find("td:eq(2)").html(); // get current row 2nd table cell TD value
            self.state.department = currentRow.find("td:eq(3)").html(); // get current row 2nd table cell TD value

            self.setState({
                employeeId: self.state.employeeId,
                employeeName: self.state.employeeName,
                role: self.state.role,
                department: self.state.department,
                companyId: self.state.companyId,
            });

            confirmAlert({
                title: self.state.companyType + ' Deletion Confirmation  ',                        // Title dialog
                message: 'Are You Sure Do You Want To Remove ' + self.state.employeeId + " " + self.state.employeeName + "  " + self.state.role + "  from department " + self.state.department,               // Message dialog
                confirmLabel: 'Confirm',                           // Text button confirm
                cancelLabel: 'Cancel',                             // Text button cancel
                onConfirm: () => { self.Delete(currentRow) },    // Action after Confirm
                onCancel: () => { self.NoAction() },      // Action after Cancel
            })

        })
        self.GetData();
        window.scrollTo(0, 0);

        var self = this;
        //FUNCTION ON CLICKING UPDATE BUTTON
        $("#employeeTable").on('click', "#update", function () {

            var currentRow = $(this).closest("tr");
            var employeeId = currentRow.find("td:eq(0)").html(); // get current row 2nd table cell TD value
            self.setState({
                employeeId: employeeId
            })
            self.UpdateEmployee();
        });

        //FUNCTION ON CLICKING view BUTTON
        $("#employeeTable").on('click', "#view", function () {

            var currentRow = $(this).closest("tr");
            var employeeId = currentRow.find("td:eq(0)").html(); // get current row 2nd table cell TD value
            self.setState({
                employeeId: employeeId
            })
            self.ViewEmployee();
        });

        $(document).ready(function () {
            $("#myInput").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $("#myTable tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });
        $(document).ready(function () {
            $("#myInput").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $("#myTable tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });
    }


    handleUserInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
            valid: true,
        },
        );
    }


    GetData() {
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });
        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({

                companyId: this.state.companyId,

            }),
            //url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/EmployeeList",
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeshiftmanagement/SelectAllEmployee",

            contentType: "application/json",
            dataType: 'json',
            async: false,
            crossDomain: true,

            success: function (data, textStatus, jqXHR) {

                console.log("data", data);
                var emp;
                var self = this;
                var num = 1;
                if (data.length != 0) {
                    emp = ' <thead><tr class="headcolor"><th class="headcolor">Id</th><th class="headcolor">Name</th><th class="headcolor">Role</th><th class="headcolor">Department</th><th  colSpan=2 style="text-align:center;">Action</th></tr></thead>';

                    $.each(data, function (i, item) {
                        if (item.employeeId != "0001") {
                            emp += '<tbody id= "myTable" ><tr class="success"><td>' + item.employeeId + '</td><td>' + item.employeeName + '</td><td>' + item.role + '</td><td>' + item.department + '</td><td ><a id="view"><span class="glyphicon glyphicon-eye-open" style="color:black"></span>View</a></td><td ><a id="update"><span class="glyphicon glyphicon-pencil" style="color:black"></span>Update</a></td><td ><a id="delete"><span class="fa fa-trash"style="color:black"></span>Delete</a></td></tr></tbody >';
                            num = num + 1;
                            lastnum = num;
                        }
                    });
                    $("#employeeTable").append(emp);
                } else {
                    $("#employeeTable").append('<h3 align="center">No Data</h3>');
                }
            }
        });
    }


    AddEmployee() {

        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMaintenance} />
                    <Route path="/" component={AddEmployee} />
                </div>
            </Router>,
            document.getElementById('contentRender'));


    }

    UpdateEmployee() {
        var self = this;

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;

        this.setState({
            companyId: companyId,
        });

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                employeeId: this.state.employeeId,
                companyId: this.state.companyId,
            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/updateEmployeeDetails",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

                if (data.firstName) {
                    ReactDOM.render(
                        <Router >
                            <div>
                                <Route path="/" component={EmployeeMaintenance} />
                                <Route path="/" component={() => <EditEmployeeDetails data={data} />} />

                            </div>
                        </Router>, document.getElementById('contentRender'));
                }
                else {

                    confirmAlert({
                        title: 'Invalid EmployeeId',                        // Title dialog
                        message: 'Enter Valid Employee Id',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm


                    })
                }
            },
        });


    }

    ViewEmployee() {
        var self = this;

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;

        this.setState({
            companyId: companyId,
        });

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                employeeId: this.state.employeeId,
                companyId: this.state.companyId,
            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/updateEmployeeDetails",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

                if (data.firstName) {
                    ReactDOM.render(
                        <Router >
                            <div>
                                <Route path="/" component={EmployeeMaintenance} />
                                <Route path="/" component={() => <ViewEmployeeProfile data={data} />} />

                            </div>
                        </Router>, document.getElementById('contentRender'));
                }
                else {

                    confirmAlert({
                        title: 'Invalid EmployeeId',                        // Title dialog
                        message: 'Enter Valid Employee Id',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm


                    })
                }
            },
        });
    }
    Delete(currentRow) {

        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                employeeId: this.state.employeeId,
                companyId: this.state.companyId,
                superiorId: this.state.superiorId,
            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/deleteemployee",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                var employeeId = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('EmpList'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
                var del = self.state.employeeId;
                var key;
                var i = employeeId.length;

                while (i--) {
                    if (del == employeeId[i].employeeId) {
                        key = i;
                        employeeId.splice(i, 1);
                    }

                }

                localStorage.setItem('EmpList', CryptoJS.AES.encrypt(JSON.stringify(employeeId), "shinchanbaby"));

                $("#employeeTable").empty();
                self.GetData();
                confirmAlert({
                    title: 'Employee Removal Success ',                        // Title dialog
                    message: 'The Employee Id ' + data.employeeId + ' Is Removed Successfully',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                })

                self.state.employeeId = "";
                self.setState({
                    employeeId: "",
                })

                $('[name=employeeId]').val(' ');
                ReactDOM.render(
                    <Router>
                        <div>
                            <Route path="/" component={EmployeeMaintenance} />
                            <Route path="/" component={EmployeePage} />

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

    }

    NoAction() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMaintenance} />
                    <Route path="/" component={EmployeePage} />

                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();

    }

    render() {

        return (
            <div className="container" style={{ marginBottom: '30%' }}>

                <div id="tableOverflow" style={{ marginTop: "20px", marginBottom: "20px" }} >

                    <button class="btn btn-primary" style={{ marginBottom: "20px", marginLeft: "15px", marginTop: "10px" }} id="submit" onClick={() => this.AddEmployee()} >+ Add</button>

                    <br />

                    <input style={{ color: "black" }} type="text" id="myInput" placeholder="Search.." title="Type in a name" />

                    <table id="employeeTable" class="table">

                    </table>

                </div>
            </div>

        );
    }

}
export default EmployeePage;

