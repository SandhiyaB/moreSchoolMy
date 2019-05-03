import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import EmployeeMenuHeader from './EmployeeMenuHeader'
import Maintenance from './Maintenance';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import EmployeeAddRemUpdMenu from './EmployeeAddRemUpdMenu';
import FooterText from './FooterText';
import ConfigurationPage from './ConfigurationPage';
import SelectSearch from 'react-select';

class StaffSubjectConfiguration extends Component {

	constructor() {
		super()
		var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

		this.state = {

			employeeId: '',
			superiorId: superiorId,
			companyId: '',
			department:'',
			staffId:'',
			subject:'',

		}
	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value,

		},
		);
		this.state[name] = value;
		if(name=="department")
		this.GetClassDetails();


	}

	componentDidMount() {
		this.Initialize();

		window.scrollTo(0, 0);
		$("#myInput").hide();
		$(document).ready(function () {
			$("#myInput").on("keyup", function () {
				var value = $(this).val().toLowerCase();
				$("#myTable tr").filter(function () {
					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
				});
			});
		});
	}


	Initialize() {
		var Subject = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Subjects'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
		var subject;

		subject += '<option value ="" disabled selected hidden >Select a Subject</option>';
		$.each(Subject, function (i, item) {

			subject += '<option value="' + item.subject + '">' + item.subject + '</option>'

		});
		$("#subject").append(subject);

		var department = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Departments'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
		var dept;
		dept += '<option  value="" disabled selected hidden>Select a Class</option>';
		$.each(department, function (i, item) {

			if (item.department != "Staff")
				dept += '<option value="' + item.department + '">' + item.department + '</option>'

		});
		$("#department").append(dept);

		var emp = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('ReportingManagerList'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		/* var employeeId = '';

		employeeId += '<option value="" disabled selected hidden >Select a Staff Id</option>';
		$.each(emp, function (i, item) {

			employeeId += '<option value="' + item.employeeId + '">' + item.employeeId + '</option>'

		});
		$("#staffId").append(employeeId); */
		this.GetEmpId();
	}
	GetEmpId() {
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
			url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/TeacherList",

			contentType: "application/json",
			dataType: 'json',
			async: false,
			crossDomain: true,

			success: function (data, textStatus, jqXHR) {

				var options = [];
				//employeeId += '<option value=" " disabled selected hidden >Select a '+self.state.companyType+' Id</option>';
				$.each(data.slice(1), function (i, item) {

					//employeeId += '<option value="' + item.employeeId + '">' + item.employeeId + '</option>'

					options.push({ label: item.employeeId + " " + item.employeeName + " " + item.role, value: item.employeeId }, );
					//  tab += '<option value= "' + item.employeeId + '">' + item.employeeId + " " + item.employeeName + " " + item.mobileNo + '</option>';

					//	console.log(options);

				});
				self.state.options = options;
				self.setState({
					options: options,
				})
				//console.log("options",self.state.options);
				//	$("#employeeId").append(employeeId);
			}
		});
	}

	handleStaff = (e) => {
		//const name = e.target.name;
		const value = e.value;
		this.setState({ staffId: e.value },
		);

		this.state.staffId = e.value;

		var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
		this.state.companyId = companyId;
		this.setState({
			companyId: companyId,
		});
		var self = this;
		$.ajax({
			type: 'POST',
			data: JSON.stringify({
				employeeId: this.state.staffId,
				companyId: this.state.companyId,
			}),
			url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/ReportingManagerDetails",
			contentType: "application/json",
			dataType: 'json',
			async: false,
			success: function (data, textStatus, jqXHR) {
				self.state.staffName = data.employeeName;
				self.state.role = data.role;
				self.state.qualification = data.qualification;
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
	GetClassDetails() {
	
		$.ajax({
			type: 'POST',
			data: JSON.stringify({
				className: this.state.department,
				companyId: this.state.companyId,
			}),
			url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/HomeWork/GetClassConfigDetails",
			contentType: "application/json",
			dataType: 'json',
			async: false,
			success: function (data, textStatus, jqXHR) {
				console.log("details config ", data);
				if(data.length!=0){
				$("#staffSubTable").empty();
				var num = 1;
				var staffData = ' <thead><tr class="headcolor"><th class="headcolor">SNo</th><th class="headcolor">Staff Name</th><th class="headcolor">Staff Role</th><th class="headcolor">Subject Handling</th><th style={{ colSpan: "2" }}>Action</th></tr></thead>';
				$.each(data, function (i, item) {

					staffData += '<tbody id= "myTable" ><tr class="success"><td>' + num + '</td><td>' + item.employeeName + '</td><td>' + item.role + '</td><td>' + item.subjectName + '</td><td ><button id="update">' + "Update" + '</button></td><td ><button id="delete">' + "Delete" + '</button></td></tr></tbody >';
					num = num + 1;
				});
				$("#myInput").show();
				$("#staffSubTable").append(staffData);
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
	Assign() {
		var self = this;
		var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
		var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

		this.state.companyId = companyId;
		this.state.superiorId = employeeId;
		this.setState({
			companyId: companyId,
			superiorId: employeeId,
		});
		if ((this.state.department.trim().length >0) && (this.state.subject.trim().length >0) && (this.state.staffId.trim().length >0)) {
			$.ajax({
				type: 'POST',
				data: JSON.stringify({
					superiorId: this.state.superiorId,
					className: this.state.department,
					employeeId: this.state.staffId,
					subjectName: this.state.subject,
					companyId: this.state.companyId,
					employeeName: this.state.staffName,
					role: self.state.role,
				}),
				url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/HomeWork/StaffSubjectConfiguration",
				contentType: "application/json",
				dataType: 'json',
				async: false,
				success: function (data, textStatus, jqXHR) {
					if (data.description == "ASSIGNED") {
						$("#staffSubTable").empty();
						$("#myInput").hide();

						confirmAlert({
							title: 'Staff Assigned',                        // Title dialog
							message: 'Already Staff Has been assigned to ' + self.state.department + ' For the Subject ' + self.state.subject,               // Message dialog
							confirmLabel: 'Ok',                           // Text button confirm


						})
					
					}
					else {
						confirmAlert({
							title: 'Success',                        // Title dialog
							message: 'Successfully Assigned Staff for the Subject ' + self.state.subject,               // Message dialog
							confirmLabel: 'Ok',                           // Text button confirm


						})
						$("#staffSubTable").empty();
						$("#myInput").hide();

					}
					self.state.department = '';
					self.state.staffId = 'e';
					self.state.subject = '';
					self.state.staffName = '';
					self.state.role = '';
					self.state.qualification = '';
					self.state.selectedStaffId = 'e';
					$('[name=subject]').val('');
					$('[name=department]').val('');

					self.setState({
						department: '',
						selectedStaffId: 'e',
						subject: '',
						staffName: '',
						role: '',
						qualification: '',
						staffId: '',
					})

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
				message: 'Please Fill All the Fields',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm


			})
		}

	}


	NoAction() {
		ReactDOM.render(
			<Router>
				<div>

				
					<Route path="/" component={Maintenance} />
			
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

	render() {
		return (

			<div className="container"  style={{paddingTop:"20px"}}>
				{/*  <ul class="previous disabled" id="backbutton"
					style={{
						backgroundColor: "#f1b6bf",
						float: "none",
						display: "inline-block",
						marginLeft: "5px",
						borderRadius: "5px",
						padding: "3px 7px 3px 7px"
					}}>
					<a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i></a></ul>

  */}
				<div className="jumbotron" style={{ backgroundColor: "#f2f2f2" }} >
					<h3 style={{
						marginTop: "-25px",
						marginBottom: " 40px"
					}}>
						Assign Subject To Staff </h3>
					<div className="" >
						<input style={{ color: "black" }} type="text" id="myInput" placeholder="Search.." title="Type in a name" />

						<table id="staffSubTable" class="table">

						</table>
						<div style={{ display: "inline-flex" }} className="col-xs-12 col-sm-12 col-lg-6" >
							<label class="align-middle" style={{margin:"10px 0px",paddingRight: "40px" }}>
								Class	</label>
							<select
								id="department"
								className="form-control"
								onChange={this.handleUserInput}
								name="department"
								style={{ marginBottom: "15px", width: "auto" }}
							>
							</select>

						</div>
						<div className="col-xs-12 col-sm-12 col-lg-6" style={{ marginTop: "0px", marginBottom: "20px", display: "inline-flex" }} >

							<label style={{ margin:"10px 0px",paddingRight: "26px" }}>
								Subject	</label>
							<select
								id="subject"
								className="form-control"
								onChange={this.handleUserInput}
								name="subject"
								style={{ marginBottom: "15px", width: "auto" }}
							>
							</select>

						</div>
					</div>

					<div className="col-xs-12 col-sm-12 col-lg-12" style={{ marginTop: "0px", marginBottom: "20px" }} >

						<label>
							Staff
	                       {/*  <select
								id="staffId"
								className="form-control"
								onChange={this.handleStaff}

								name="staffId"
								style={{ marginBottom: "15px" }}
							>
							</select> */}

						</label>
						<SelectSearch style={{ width: "auto"}} options={this.state.options} value={this.state.selectedStaffId} onChange={(e) => this.handleStaff(e)} name="staffId" placeholder="Select Staff " />

						<div className="row" style={{ display: "inline!important",paddingTop:"30px"}}>

							<div className="col-xs-12 col-sm-4 col-md-4 col-lg-4" style={{ display: "inline!important" }}>
								<input type="text"

									value={this.state.staffName}
									id="staffName"
									name="staffName"
									maxlength="50"
									readOnly
									placeholder="Name.." required />
							</div>
							<div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">

								<input type="text"
									className="col-xs-4"
									value={this.state.qualification}
									id="qualification"
									name="qualification"
									maxlength="50"
									readOnly
									placeholder="qualification.." required />
							</div>
							<div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
								<input type="text"
									className="col-xs-4"
									value={this.state.role}
									id="role"
									name="role"
									maxlength="50"
									readOnly
									placeholder=" Role.." required />
							</div>

						</div>
					</div>

					<button type="button" onClick={() => this.Assign()} className="btn btn-primary" style={{ marginLeft: "10px", display: "block" }}>Assign</button>


				</div>

			</div >


		);
	}

}


export default StaffSubjectConfiguration;
