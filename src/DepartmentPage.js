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
import SchoolMaintenance from './SchoolMaintenance';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import EmployeeMaintenance from './EmployeeMaintenance';

var currentRow;
var today = new Date();
today = today.getFullYear();
var lastnum;
class DepartmentPage extends Component {

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
        $("#departmentTable").on('click', "#delete", function () {
            var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

            self.state.companyId = companyId;

            currentRow = $(this).closest("tr");

            // get current row 1st table cell TD value
            self.state.department = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value

            self.setState({
                department: self.state.department,
                companyId: self.state.companyId,

            });

            confirmAlert({
                title: 'Deleting Department Confirmation',                        // Title dialog
                message: 'Are You Sure Do You Want To Remove Role ' + self.state.department + ' That Is Being Declared  ',            // Message dialog
                confirmLabel: 'Confirm',                           // Text button confirm
                cancelLabel: 'Cancel',                             // Text button cancel
                onConfirm: () => { self.Delete(currentRow) },    // Action after Confirm
                onCancel: () => { self.NoAction() },      // Action after Cancel
            })

        })
        self.GetData();
        window.scrollTo(0, 0);
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
        var Department = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Departments'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
        var department;
        var self = this;
        var num = 1;
        if(Department.length!=0){
        department = ' <thead><tr class="headcolor"><th class="headcolor">SNo</th><th class="headcolor">Department</th><th style={{ colSpan: "2" }}>Action</th></tr></thead>';
        $.each(Department, function (i, item) {

            department += '<tbody id= "myTable" ><tr class="success"><td>' + num + '</td><td>' + item.department + '</td><td ><a id="delete"><span class="fa fa-trash"style="color:black"></span>Delete</a></td></tr></tbody >';
            num = num + 1;
            lastnum = num;
        });
        $("#departmentTable").append(department);
    }else{
        $("#departmentTable").append('<h3 align="center">No Data</h3>');
    }
    }
    AddDepartmentFunc() {


        if (this.state.department.trim().length > 0) {
            var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            this.state.companyId = companyId;
             this.state.department=Case.capital(this.state.department);
            this.state.department = this.state.department;
            this.setState({
                companyId: companyId,
                department: this.state.department,

            });

            var self = this;
            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    department: this.state.department,
                    companyId: this.state.companyId,
                    superiorId: this.state.superiorId,
                }),
                url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/addDepartment",
                contentType: "application/json",
                dataType: 'json',
                async: false,
                success: function (data, textStatus, jqXHR) {
                    if (data.authorization == "DUPLICATE") {
                        confirmAlert({
                            title: 'Adding New Department Failed',                        // Title dialog
                            message: 'The Department ' + data.department + ' Already Exist',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm


                        })

                    }
                    else {

                        var department = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Departments'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
                        department.push({ department: self.state.department });
                        localStorage.setItem('Departments', CryptoJS.AES.encrypt(JSON.stringify(department), "shinchanbaby"));
                        $("#departmentTable").append('<tbody id= "myTable" ><tr class="success"><td>' + lastnum + '</td><td>' + self.state.department + '</td><td ><a id="delete"><span class="fa fa-trash"style="color:black"></span>Delete</a></td></tr></tbody>');

                        confirmAlert({
                            title: 'Adding New Department Success ', // Title dialog
                            message: 'Added The Department ' + self.state.department + ' Successfully', // Message dialog
                            confirmLabel: 'Ok', // Text button confirm


                        })

                    }
                    self.state.department = "";
                    self.setState({
                        department: "",
                    })

                    self.state.department = "";
                if (self.state.companyType == "Employee") {
                    ReactDOM.render(
                        <Router>
                            <div>
    
                                
                                <Route path="/" component={EmployeeMaintenance} />
                                <Route path="/" component={DepartmentPage} />
                
                                </div>
                        </Router>,
                        document.getElementById('contentRender'));
                } else {
                    ReactDOM.render(
                        <Router>
                            <div>
    
                            
                                <Route path="/" component={SchoolMaintenance} />
                                <Route path="/" component={DepartmentPage} />
                
                            </div>
                        </Router>,
                        document.getElementById('contentRender'));
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
        } else {
            confirmAlert({
                title: 'Error',                        // Title dialog
                message: 'Enter Department Name',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
            });

        }
    }

    Delete(currentRow) {

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });
        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify(
                {

                    department: this.state.department,
                    superiorId: this.state.superiorId,
                    companyId: this.state.companyId,
                }
            ),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/deletedepartment",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                if (data.authorization == "DELETED") {
                    confirmAlert({
                        title: 'Removing Department Succeded ',                        // Title dialog
                        message: 'The Department ' + self.state.department + ' Is Removed Successfully',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm


                    })

                    var department = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Departments'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
                    var del = self.state.department;
                    var key;
                    var i = department.length;

                    while (i--) {
                        if (del == department[i].department) {
                            key = i;
                            department.splice(i, 1);
                        }

                    }
                    $('#departmentTable').empty();
                    localStorage.setItem('Departments', CryptoJS.AES.encrypt(JSON.stringify(department), "shinchanbaby"));
                    self.GetData();
                } else {

                    confirmAlert({
                        title: 'Removing Department  Failed',                        // Title dialog
                        message: 'Cannot Remove Department ' + self.state.department + ' Because Employee Exist In The Department ',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm


                    })

                }
                self.state.department = "";
                if (self.state.companyType == "Employee") {
                    ReactDOM.render(
                        <Router>
                            <div>
    
                                
                                <Route path="/" component={EmployeeMaintenance} />
                                <Route path="/" component={DepartmentPage} />
                
                                </div>
                        </Router>,
                        document.getElementById('contentRender'));
                } else {
                    ReactDOM.render(
                        <Router>
                            <div>
    
                            
                                <Route path="/" component={SchoolMaintenance} />
                                <Route path="/" component={DepartmentPage} />
                
                            </div>
                        </Router>,
                        document.getElementById('contentRender'));
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

    NoAction() {
        this.state.department = "";
               
        if (this.state.companyType == "Employee") {
            ReactDOM.render(
                <Router>
                    <div>

                        
                        <Route path="/" component={EmployeeMaintenance} />
                        <Route path="/" component={DepartmentPage} />
        
                        </div>
                </Router>,
                document.getElementById('contentRender'));
        } else {
            ReactDOM.render(
                <Router>
                    <div>

                    
                        <Route path="/" component={SchoolMaintenance} />
                        <Route path="/" component={DepartmentPage} />
        
                    </div>
                </Router>,
                document.getElementById('contentRender'));
        }

    }

    render() {

        return (
            <div className="container" style={{ marginBottom: '30%' }}>

                <div style={{ marginTop: "20px", marginBottom: "20px" }} >
                    <label style={{ paddingRight: "20px" }} for="class">Department *</label>
                    {/*add validation text only */}
                    <input type="text"
                        style={{ width: "40%", paddingRight: "0px" }}
                        onChange={this.handleUserInput}
                        value={this.state.department}
                        id="department"
                        name="department"
                        placeholder="Enter New Department Name" />
                    <button class="btn btn-primary" style={{ marginBottom: "20px", marginLeft: "15px", marginTop: "10px" }} id="submit" onClick={() => this.AddDepartmentFunc()} >Add</button>

                    <br />

                    <input style={{ color: "black" }} type="text" id="myInput" placeholder="Search.." title="Type in a name" />

                    <table id="departmentTable" class="table">

                    </table>

                </div>
            </div>

        );
    }

}
export default DepartmentPage;

