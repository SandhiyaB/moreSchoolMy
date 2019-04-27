import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import CryptoJS from 'crypto-js';
import idb from 'idb';

//css
import './Gstdashboard1css.css';
import './Tictoksheader.css';
import './gstdashboard.css';
import './submenubarcss.css';
//pages

import registerServiceWorker from './registerServiceWorker';
import LoginPage from './LoginPage';
import Dashboardoverall from './Dashboardoverall';
import TaskMapping from './TaskMapping';
import LeaveManagement from './LeaveManagement';
import Attendence from './Attendence';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import Maintenance from './Maintenance';
import Charts from './Charts';
import ReportMenuPage from './ReportMenuPage';
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import EmployeeAttendanceRequest from './EmployeeAttendanceRequest';
import EmployeeRequestAcceptReject from './EmployeeRequestAcceptReject';
import ConfigurationPage from './ConfigurationPage';
import FooterText from './FooterText';
import EmailPage from './EmailPage';
import Calendar from './Calendar';
import HomeWorkPageStudent from './HomeWorkPageStudent';
import HomeWorkStudentMenuPage from './HomeWorkStudentMenuPage';
import HomeWorkPageTeacherMenu from './HomeWorkPageTeacherMenu';
import DashboardDisplay from './DashboardDisplay';
import SchoolMaintenance from './SchoolMaintenance';
import GenerateWorkingDaysPaySlip from './GenerateWorkingDaysPaySlip';
import GenerateMonthlyPaySlip from './GenerateMonthlyPaySlip';
import DeviceMapMenuPage from './DeviceMapMenuPage';
import Help from './Help';
import ResetPassword from './ResetPassword';
import ExcelExport from './ExcelExport';
import AdminLoginPage from './AdminLoginPage';
import EmployeeMaintenance from './EmployeeMaintenance';
import SchoolEmployeePage from './SchoolEmployeePage';
import EmployeePage from './EmployeePage';

class Gstdashboard1 extends Component {
	constructor() {
		super()
		var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
		var Type;
		if (companyType == "Office") {
			Type = "Office"
			companyType = "Employee";

		}
		else {
			companyType = "Student/Staff";

		}
		this.state = {
			date: '',
			Type: Type,
			companyId: '',
		};
	}

    componentDidMount() {
        window.scrollTo(0, 0);      
   
		this.Dashboard();
        $(document).ready(function () {
	/* 		$('#sidebarCollapse').on('click', function (e) {
				$('#sidebar').toggleClass('open');
				
				e.stopPropagation();
				return false;
			  });
			  
			  $('*:not(#sidebarCollapse)').on('click', function () {
				$('#sidebar').removeClass('open');
			  }); */

            $('#sidebarCollapse').on('click', function () {
				$('#sidebar').toggleClass('open');
				$('#sidebar').toggleClass('active');
			/* 	$(this).toggleClass('active');
			 */	$('#sidebar').show();
			
				//$('#sidebar').css("background-color", "#6d7fcc");
            });
			$('#contentRender').on('click', function () {
				 $('#sidebar').hide();
				$('#sidebarCollapse').removeClass('active');
				//$('#sidebar').css("background-color", "yellow");
				

            });
		});
		
		if (localStorage.getItem('isLoggedIn')) {
			var login = CryptoJS.AES.decrypt(localStorage.getItem('isLoggedIn'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
			if (login == "true") {
				this.interval = setInterval(() => this.Refresh(), 200000);
				this.interval = setInterval(() => this.offlineData(), 2000);
			}
		}
		
		
	}
	Refresh() {
		var today = new Date();
		today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		this.state.date = today;
		var emailId = CryptoJS.AES.decrypt(localStorage.getItem('EmailId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
		var password = CryptoJS.AES.decrypt(localStorage.getItem('Password'), "shinchanbaby").toString(CryptoJS.enc.Utf8); var self = this;
		$.ajax({
			type: 'POST',
			data: JSON.stringify({
				emailId: emailId,
				password: password,

			}),
			url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeeLogin",
			contentType: "application/json",
			dataType: 'json',
			async: false,

			success: function (data, textStatus, jqXHR) {
				if (data.employeeId == "LOCKED") {
					localStorage.clear();
					ReactDOM.render(
						<Router>
							<div>

								<Route path="/" component={LoginPage} />
									</div>
						</Router>, document.getElementById('contentRender'));

				} else if (data.employeeId == "BLOCKED") {
					localStorage.clear();

					ReactDOM.render(
						<Router>
							<div>

								<Route path="/" component={LoginPage} />
								<Route path="/" component={FooterText} />
							</div>
						</Router>, document.getElementById('contentRender'));

				} else if (data.employeeId == "PASSWORD_INCORRECT") {

					localStorage.clear();
					ReactDOM.render(
						<Router>
							<div>

								<Route path="/" component={LoginPage} />
								<Route path="/" component={FooterText} />
							</div>
						</Router>, document.getElementById('contentRender'));

				}
				else {

					if(navigator.onLine){
          
						if (navigator.geolocation) {
						  navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
					  } else{
						//alert("Geolocation is Not supported by this Browser");
					  }
					}
					//Get the latitude and the longitude;
					function successFunction(position) {
						var lat = position.coords.latitude;
						var lng = position.coords.longitude;
						//console.log("succ",position)
						codeLatLng(lat, lng)
					}
					
					function errorFunction(){
						//alert("Geocoder failed");
					}
					
					  function codeLatLng(lat, lng) {
					
						$.ajax({
						type: "GET",
						url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng +"&sensor=true",
						success: function(data) {
						 // console.log("full",data,"status",data.status)
						  if(data.status=="OK"){ 
							//console.log("full address",data.results[0].formatted_address);
							//console.log("main Address",data.results[0].address_components[1].long_name,",",data.results[0].address_components[2].long_name);
							
							var loca=data.results[0].address_components[1].long_name +","+ data.results[0].address_components[2].long_name;
						localStorage.setItem('Location', loca);
						  }
						}
					});
					  }
					
					var key = "shinchanbaby";
					localStorage.setItem('isLoggedIn', CryptoJS.AES.encrypt("true".toString(), key));

					localStorage.setItem('Departments', CryptoJS.AES.encrypt(JSON.stringify(data.employeeDepartmentlist), key));
					localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(data.employeeRolelist), key));
					localStorage.setItem('Permissions', CryptoJS.AES.encrypt(JSON.stringify(data.employeePermisionlist), key));
					localStorage.setItem('Role', CryptoJS.AES.encrypt(data.role, key));
					localStorage.setItem('EmployeeId', CryptoJS.AES.encrypt(data.employeeId, key));
					localStorage.setItem('EmpList', CryptoJS.AES.encrypt(JSON.stringify(data.employeeList), key));
					localStorage.setItem('CompanyId', CryptoJS.AES.encrypt(data.companyId, key));
					localStorage.setItem('CompanyName', CryptoJS.AES.encrypt(data.companyName, key));
					localStorage.setItem('Department', CryptoJS.AES.encrypt(data.department, key));
					
					localStorage.setItem('LockList', CryptoJS.AES.encrypt(JSON.stringify(data.lockList), key));
					localStorage.setItem('ReportingManagerList', CryptoJS.AES.encrypt(JSON.stringify(data.reportingManagerList), key));
					localStorage.setItem('BiometricValue', CryptoJS.AES.encrypt(data.biometricValue.toString(), key));
					localStorage.setItem('ShiftMode', CryptoJS.AES.encrypt(data.shiftMode.toString(), key));
					localStorage.setItem('CompanyType', CryptoJS.AES.encrypt(data.companyType, key));
					localStorage.setItem('SMS', CryptoJS.AES.encrypt(data.sms.toString(), key));
					localStorage.setItem('Subjects', CryptoJS.AES.encrypt(JSON.stringify(data.subjectList), key));
					localStorage.setItem('SalarySelectionOption', CryptoJS.AES.encrypt(data.salarySelectionOption, key));
				
					
				}
			},


		});

	}

	offlineData() {

		if (navigator.onLine) {


			var dbPromise = idb.open('Attendance-db');

			dbPromise.then(function (db) {
				if (db.objectStoreNames.contains('checkInOut')) {
					var tx = db.transaction('checkInOut', 'readonly');
					var keyValStore = tx.objectStore('checkInOut');
					var count = keyValStore.openCursor().then(function cursorIterate(cursor) {
						if (!cursor) return;
						if (cursor.value.status == "CheckIn") {
							$.ajax({
								type: 'POST',
								data: cursor.value.data,
								url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeecheckin",
								contentType: "application/json",
								dataType: 'json',
								async: false,

								success: function (data, textStatus, jqXHR) {
									if (data.employeeName == "NOT_VAILD") {
										confirmAlert({
											title: 'Check In Failed',                        // Title dialog
											message: 'Enter Valid Employee Id',               // Message dialog
											confirmLabel: 'Ok',                           // Text button confirm
				
				
										})
									}
				
									else if (data.employeeName == "BLOCKED") {
										confirmAlert({
											title: 'Check In Failed',                        // Title dialog
											message:'The Employee Id '+ data.employeeId + '  has been BLOCKED',               // Message dialog
											confirmLabel: 'Ok',                           // Text button confirm
				
										})
				
				
									}
									else if (data.employeeName == "ALREADY_CHECKIN") {
										confirmAlert({
											title: 'Check In Failed',                        // Title dialog
											message: 'The Employee Id '+data.employeeId + ' Has already Checked In today',               // Message dialog
											confirmLabel: 'Ok',                           // Text button confirm
				
										})
				
				
									}
									else {
										confirmAlert({
											title: 'Check In Success',                        // Title dialog
											message: 'The Employee Id '+data.employeeId +' Checked In Successfully ' ,               // Message dialog
											confirmLabel: 'Ok',                           // Text button confirm
				
										})
				
				
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
							$.ajax({
								type: 'POST',
								data: cursor.value.data,
								url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeecheckout",
								contentType: "application/json",
								dataType: 'json',
								async: false,

								success: function (data, textStatus, jqXHR) {
									if (data.employeeName == "NOT_VAILD") {
										confirmAlert({
											title: 'CheckIn Failed',                        // Title dialog
											message: 'Entered An Invalid Employee Id Kindly Try Check In Again With A Valid Employee Id',               // Message dialog
											confirmLabel: 'Ok',                           // Text button confirm
										})
				
									}
									else if (data.employeeName == "NOT_CHECKED_IN") {
										confirmAlert({
											title: 'Not Checked In',                        // Title dialog
											message: data.employeeId + ' is not checked in today',               // Message dialog
											confirmLabel: 'Ok',                           // Text button confirm
				
										})
									}
									else if (data.employeeName == "ALREADY_CHECKOUT") {
										confirmAlert({
											title: 'Check Out Failed',                        // Title dialog
											message: 'The Employee Id '+data.employeeId + ' is already checked out today',               // Message dialog
											confirmLabel: 'Ok',                           // Text button confirm
				
				
										})
				
				
									} else {
										confirmAlert({
											title: 'Check Out Success',                        // Title dialog
											message: 'The Employee Id '+ data.employeeId+' Checked Out Successfully  ' ,               // Message dialog
											confirmLabel: 'Ok',                           // Text button confirm
										})
				
				
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
						dbPromise.then(function (db) {
							var tx = db.transaction('checkInOut', 'readwrite');
							var keyValStore = tx.objectStore('checkInOut');
							return keyValStore.delete(cursor.key);

						});
						return cursor.continue().then(cursorIterate);
					});
				}

			});
		}
	}
    
  /*   Dashboard() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={Dashboardoverall} />
                </div>
            </Router>,
            document.getElementById('contentRender'));

    }

 */


   
    AttendanceFunc() {
		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "attendance") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

			ReactDOM.render(
				<Router>
					<div>

						<Route path="/" component={Attendence} />
					
					</div>
				</Router>,
				document.getElementById('contentRender'));

		}
		else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm

			})
		}

	}

	LogoutFunc() {
		localStorage.clear();
		ReactDOM.render(
			<Router>
				<div>

					<Route path="/" component={LoginPage} />
				</div>
			</Router>, document.getElementById('root'));

	}


	MessageFunc() {
    
		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
	
			var flag = 1;//false
			var i = permission.length;
			$.each(permission, function (i, item) {
	
				if (item.permission == "messageCenter") {
					flag = 0;//true
				}
			});
	
			if (flag == 0) {
		ReactDOM.render(
		  <Router>
			<div>
			 
             
			  {/* <Route path="/" component={MessageMenuPage} /> */}
			  <Route path="/" component={EmailPage} />
	
			
	
			</div>
		  </Router>,
		  document.getElementById('contentRender'));
		registerServiceWorker();
		}
		else {
		  confirmAlert({
			title: 'Access Deined',                        // Title dialog
			message: 'You are not Allowed to Access this Page',               // Message dialog
			confirmLabel: 'Ok',                           // Text button confirm
	  
		  })
		}
	
	  }
	  
	  Dashboard() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={DashboardDisplay} />
                </div>
            </Router>,
            document.getElementById('contentRender'));

    }

      Dashboard1() {

		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {
			if (item.permission == "chart") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

			var today = new Date();
			today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
			this.state.date = today;
			this.setState(
				{
					date: today,
				});
			var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
			this.state.companyId = companyId;
			this.setState({
				companyId: companyId,
			});

			$.ajax({
				type: 'POST',
				data: JSON.stringify(this.state),
				url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeReport/employeeOrganizationAttendanceDailyReport",
				//url: "http://localhost:8080/EmployeeAttendenceAPI/EmployeeReport/employeeOrganizationAttendanceDailyReport",
				
				contentType: "application/json",
				dataType: 'json',
				async: false,
				success: function (data, textStatus, jqXHR) {
					//console.log("chart"+data.employeeRetrievelist);
					ReactDOM.render(
						<Router>
							<div>

							
								<Route path="/" component={() => <DashboardDisplay data={data} />} />
					
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


		}
		else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm

			})
		}

	}

	MaintenanceFunc() {
		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "maintenance") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

			if (this.state.Type == "Office") {
				ReactDOM.render(
					<Router>
						<div>

							
							<Route path="/" component={EmployeeMaintenance} />
							<Route path="/" component={EmployeePage} />
            
							</div>
					</Router>,
					document.getElementById('contentRender'));
			} else {
				ReactDOM.render(
					<Router>
						<div>

						
							<Route path="/" component={SchoolMaintenance} />
							<Route path="/" component={SchoolEmployeePage} />
            
						</div>
					</Router>,
					document.getElementById('contentRender'));
			}
		}
		else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm


			})
		}

	}



	ReportFunc() {

		/* var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "report") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
 */
			ReactDOM.render(
				<Router>
					<div>

						

						<Route path="/" component={ReportMenuPage} />
				
					</div>
				</Router>,
				document.getElementById('contentRender'));
			registerServiceWorker();
			/*
				}
 else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm

			})
		}
 */
	}

	AttendanceRegulationsFunc() {
		/* var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "attendanceRegulation") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
		 */	ReactDOM.render(
				<Router>
					<div>
						
						<Route path="/" component={AttendanceRegulationMenuPage} />
				
					</div>
				</Router>,
				document.getElementById('contentRender'));
			registerServiceWorker();

	/* 	}
		else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm
			})
		}
 */


	}

	TaskMappingFunc() {

		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "taskMapping") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
			ReactDOM.render(
				<Router>
					<div>
						
						<Route path="/" component={TaskMapping} />
					
					</div>
				</Router>,
				document.getElementById('contentRender'));
			registerServiceWorker();

		}
		else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm

			})
		}

	}

	LeaveManagementFunc() {

		ReactDOM.render(
			<Router>
				<div>
					
					<Route path="/" component={LeaveManagement} />
				
				</div>
			</Router>,
			document.getElementById('contentRender'));
		registerServiceWorker();
	}

	ConfigurationFunc() {
		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "supervisorAuthority") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
		ReactDOM.render(
			<Router>
				<div>
					
					<Route path="/" component={ConfigurationPage} />
					
				</div>
			</Router>,
			document.getElementById('contentRender'));
		registerServiceWorker();
	}
	else {
		confirmAlert({
			title: 'Access Deined',                        // Title dialog
			message: 'You are not Allowed to Access this Page',               // Message dialog
			confirmLabel: 'Ok',                           // Text button confirm

		})
	}
	}


	EmployeeRequestFunc() {

		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "supervisorAuthority") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
			ReactDOM.render(
				<Router>
					<div>
						
						<Route path="/" component={EmployeeRequestAcceptReject} />
				
					</div>
				</Router>,
				document.getElementById('contentRender'));
			registerServiceWorker();


		}
		else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm

			})
		}


	}
	HomeWork() {
		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "supervisorAuthority") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
        ReactDOM.render(
            <Router >
                <div>
                   
                   
                    <Route path="/" component={HomeWorkPageTeacherMenu} />
                  
                </div>
			</Router>, document.getElementById('contentRender'));
				}
				else {
					ReactDOM.render(
						<Router >
							<div>
								
                                
								<Route path="/" component={HomeWorkStudentMenuPage} />
						
							</div>
						</Router>, document.getElementById('contentRender'));
				}

    }
	PayRollFunc(){

		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "supervisorAuthority") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

			var salarySelectionOption = CryptoJS.AES.decrypt(localStorage.getItem('SalarySelectionOption'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

			if(salarySelectionOption=="workingDays"){
			ReactDOM.render(
				<Router>
					<div>
						<Route path="/" component={GenerateWorkingDaysPaySlip} />
					</div>
				</Router>,
				document.getElementById('contentRender'));
			registerServiceWorker();
			}else{
				ReactDOM.render(
					<Router>
						<div>
							<Route path="/" component={GenerateMonthlyPaySlip} />
						
						</div>
					</Router>,
					document.getElementById('contentRender'));
				registerServiceWorker();
			}

		}
		else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm

			})
		}

	}
	DeviceMapFunc(){
		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "supervisorAuthority") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
        ReactDOM.render(
            <Router >
                <div>
                   
                   
                    <Route path="/" component={DeviceMapMenuPage} />
                  
                </div>
			</Router>, document.getElementById('contentRender'));
				}
				else {
					ReactDOM.render(
						<Router >
							<div>
								
                                
								<Route path="/" component={HomeWorkStudentMenuPage} />
						
							</div>
						</Router>, document.getElementById('contentRender'));
				}
	}

	HelpFunc() {
		ReactDOM.render(
			<Router>
				<div>
					<Route path="/" component={Help} />
				
				</div>
			</Router>,
			document.getElementById('contentRender'));
	}
	ResetFunc() {
		ReactDOM.render(
			<Router>
				<div>
				
					<Route path="/" component={() => <ResetPassword emailId={this.state.emailId} />} />
					
				</div>
			</Router>,
			document.getElementById('contentRender'));
	}

	ImportFunc() {
		var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
		this.state.companyId = companyId;
		var today = new Date();
		var today1 = today.getFullYear() + '_' + (today.getMonth() + 1) + '_' + today.getDate();

		var totalName = companyId + "_" + today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds() + "_" + today1 + ".xlsx";

		this.state.importFileName = totalName;

		/*
		var fileName=localStorage.getItem('ImportFileName');
				alert("AreadyFilename"+fileName);
				var fileName1;
				var file=[];
				if(fileName!=null){
					alert("FILE NAME ALEADY EXIST");
		fileName1=fileName+","+this.state.importFileName;
				//file.push(fileName1);
				var key = "shinchanbaby";
				localStorage.setItem('ImportFileName',fileName1);
		//localStorage.setItem('ImportFileName',file);
		}else {
			alert("NEW FILE NAME");
		//	file.push(this.state.importFileName);
			localStorage.setItem('ImportFileName',this.state.importFileName);
		
			//localStorage.setItem('ImportFileName',file);
		}
		
		
			//	localStorage.setItem('ImportFileName', CryptoJS.AES.encrypt(this.state.importFileName, key));
		*/

		this.setState({
			importFileName: this.state.importFileName,
			companyId: this.state.companyId,
		});

		$.ajax({
			type: 'POST',
			data: JSON.stringify({
				fileName: this.state.importFileName,
				companyId: this.state.companyId,
			}),

			// data:resultData,
			url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/excelexport/importfile",
			contentType: "application/json",
			dataType: 'json',
			async: false,
			success: function (data, textStatus, jqXHR) {

				confirmAlert({
					title: 'Download Succcess',                        // Title dialog
					message: 'The File Requested For Import Is Downloaded Successfully',               // Message dialog
					confirmLabel: 'Ok',                           // Text button confirm


				});

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

	ExportFunc() {

		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
		//console.log("permission" + permission);
		var flag = 1;//false
		var i = permission.length;
	//	console.log("permission length" + i);
		$.each(permission, function (i, item) {

			if (item.permission == "report") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
			ReactDOM.render(
				<Router>
					<div>
					
						<Route path="/" component={ExcelExport}  />
							</div>
				</Router>,
				document.getElementById('contentRender'));

		} else {

			confirmAlert({
				title: 'Access Denied',                        // Title dialog
				message: "You Are Not Authorized To Perform Export Operation",               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm


			});

		}

	}

	Admin(){
		ReactDOM.render(
			<Router>
				<div>
					<Route path="/" component={AdminLoginPage} />
						</div>
			</Router>,
			document.getElementById('contentRender'));
	}
    render() {
        return (


            <div class="" style={{
                paddingTop: "1px !important",
                paddingBottom: "1px !important",
                marginBottom: "25px !important"
            }}>


                <nav class="navbar navbar-inverse" style={{ marginBottom: "0px",padding:" 5px", backgroundColor: "#26425c" }}>
                    <div style={{paddingTop:"0px"}}class="container-fluid justify-content-center">
                        <div class="navbar-header">
                            <a class="navbar-brand btn btn-info navbar-btn glyphicon glyphicon-align-justify" style={{ backgroundColor: "#26425c" }} id="headerIcon" href="#" to="/" id="sidebarCollapse" >
                            </a>

                            {/*  <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Page 1 <span class="caret"></span></a>
        <ul class="dropdown-menu">
          <li><a href="#">Page 1-1</a></li>
          <li><a href="#">Page 1-2</a></li>
          <li><a href="#">Page 1-3</a></li>
        </ul>
      </li>
	  <li><a href="#">Page 2</a></li> */}
                            <span class="navbar-text "
                                id="headerName"
                                style={{
                                    float: "none",
                                    position: "absolute",
                                    color: "white",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    wordWrap: "break-word",
                                }} >
                              	{CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)}
                            </span>

                            <div class=" navbar-right"
                                style={{
                                    float: "none",
                                    position: "absolute",
                                    top: "35%",
                                    left: "88%",
                                    /* transform: "translate(-50%, -50%)", */
                                    wordWrap: "break-word",
                                    color: "red",


                                }}>
                                <a href="#" class="btn btn-md dropdown-toggle" type="button"  id="headerLogout"  data-toggle="dropdown">
                                 {/*    <span class="glyphicon glyphicon-cog"></span>  */}
        </a>
		<ul id="menulogoutbtn" class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu1">
									{/* style={{margin: "-24px 1px 2px 2px",padding:" 10px 6px 13px 0"}} */}
									<li><a href="#" style={{ backgroundColor: "#677785", color: "white" }}><span class="glyphicon glyphicon-hand-right" onClick={() => this.HelpFunc()} style={{ float: "left", backgroundColor: "#677785" }}><span  style={{ paddingLeft:"10px"}}>Help</span></span></a></li>
									<li className="divider"></li>
									<li><a href="#" style={{ backgroundColor: "#677785", color: "white" }}><span class="glyphicon glyphicon-eye-close" onClick={() => this.ResetFunc()} style={{ float: "left", backgroundColor: "#677785" }} ><span  style={{ paddingLeft:"10px"}}>ResetPassword</span></span></a></li>
									<li className="divider"></li>
									<li><a href="Import.xlsx" download={this.state.importFileName} onClick={() => this.ImportFunc()} style={{ backgroundColor: "#677785", color: "white" }}><span class="glyphicon glyphicon-download" style={{ float: "left", backgroundColor: "#677785" }}><span  style={{ paddingLeft:"10px"}}>Export</span></span></a></li>
									<li className="divider"></li>
									<li><a href="#" style={{ backgroundColor: "#677785", color: "white" }}><span class="glyphicon glyphicon-upload" onClick={() => this.ExportFunc()} style={{ float: "left", backgroundColor: "#677785" }}><span  style={{ paddingLeft:"10px"}}>Import</span></span></a></li>
									<li className="divider"></li>
									<li><a href="#" style={{ backgroundColor: "#677785", color: "white" }}><span class="fa fa-users" onClick={() => this.Admin()} style={{ float: "left", backgroundColor: "#677785" }}><span  style={{ paddingLeft:"10px"}}>Admin&ensp;Console</span></span></a></li>
									<li className="divider"></li>
									<li><a href="#" style={{ backgroundColor: "#677785", color: "white" }}><span class="glyphicon glyphicon-user" onClick={() => this.LogoutFunc()} style={{ float: "left", backgroundColor: "#677785" }}><span  style={{ paddingLeft:"10px"}}>LogOut</span></span></a></li>

								</ul>





                                {/*   <a href="#" 

                                    style={{
										/* marginTop: "5px",
										padding: "0px 2px 1px 2px", */
                                }


                                {/* <span class="glyphicon-glyphicon-cog"></span> *logout</a> */}

                                {/*    <ul id="menulogoutbtn" class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu1">
                                     <li><a href="#" style={{ backgroundColor: "#677785", color: "white" }}><span class="glyphicon glyphicon-user" onClick={() => this.LogoutFunc()} style={{ float: "left", backgroundColor: "#677785" }}><span style={{ paddingLeft: "10px" }}>LogOut</span></span></a></li>

                                </ul> */}

                            </div>

                        </div>


                    </div>
                </nav>


                {/* 
                <nav class="navbar navbar-expand-lg navbar-light bg-light headertop"  style={{marginBottom:"1px!important"}} >

                    <h4 className="text-center">Company Name </h4>
                    <div class="navbar-header" style={{ height: "10px" }} >
                        <button style={{ paddingTop: "0px", marginBottom: "5px" }} type="button" id="sidebarCollapse" class="btn btn-info navbar-btn">
                            <i class="glyphicon glyphicon-align-left"></i>
                            <span></span>
                        </button>
                        <button style={{ paddingTop: "0px", marginBottom: "5px" }} type="button" id="sidebarCollapse" class="btn btn-info navbar-btn">jeeva
                            <i class="glyphicon glyphicon-user-right"></i>
                            <span></span>
                        </button>
                    </div>

                </nav> */}

                <div class="wrapper">

                    <nav id="sidebar">
                        <div style={{paddingLeft:"15px",paddingTop:"0px",paddingBottom:"0px"}} class="sidebar-header">
                            <h3>School Managment</h3>

                        </div>
                        <ul class="list-unstyled components" style={{paddingTop:"0px"}}>
                            <p style={{    backgroundColor:" #485b82",fontSize:"21px" }}onClick={() => this.Dashboard()}><i class="fa fa-pie-chart" style={{fontSize:"30px",paddingRight:" 15px", border: "none"}}></i> DASHBOARD</p>
                        
                            
                            <li>
                                <a class="dashboardanchorcolor" style={{padding:"5px 10px "}}   href="#"onClick={() => this.AttendanceFunc()}><i class="fa fa-fa fa-id-card-o" style={{fontSize:"26px",paddingRight:" 19px", border: "none"}}></i> ATTENDANCE</a>
  
                            </li>
                            <li>
                                <a href="#SaleSubmenu"class="dashboardanchorcolor"   style={{padding:"5px 10px "}}   onClick={() => this.MaintenanceFunc()}><i class="fa fa-users" style={{fontSize:"26px",paddingRight:" 25px", border: "none"}}></i>MAINTENANCE</a>
                               
                            </li>
                            <li>
                                <a class="dashboardanchorcolor"   href="#InvoiceSubmenu" style={{padding:"5px 10px "}}    onClick={() => this.ReportFunc()}><i class="fa fa-pencil-square-o" style={{fontSize:"26px",paddingRight:" 25px", border: "none"}}></i>REPORT</a>
                              
                            </li>
                            <li>
                                <a class="dashboardanchorcolor"   href="#InvoiceSubmenu" style={{padding:"5px 10px "}}    onClick={() => this.AttendanceRegulationsFunc()}><i class="fa  fa-send-o" style={{fontSize:"26px",paddingRight:" 26px", border: "none"}}></i>REQUEST</a>
                              
                            </li>
                            <li>
                                <a class="dashboardanchorcolor"   href="#InvoiceSubmenu"  style={{padding:"5px 10px "}}   onClick={() => this.EmployeeRequestFunc()}><i class="fa fa-legal" style={{fontSize:"26px",paddingRight:" 25px", border: "none"}}></i>APPROVAL</a>
                              
                            </li>
                            <li>
                                <a class="dashboardanchorcolor"   href="#InvoiceSubmenu"   style={{padding:"5px 10px "}}  onClick={() => this.ConfigurationFunc()}><i class="fa  fa-cogs" style={{fontSize:"26px",paddingRight:" 24px", border: "none"}}></i>CONFIGURATION</a>
                              
                            </li>
                            <li>
                                <a class="dashboardanchorcolor"   href="#InvoiceSubmenu"  style={{padding:"5px 10px "}}   onClick={() => this.TaskMappingFunc()}><i class="fa  fa-institution" style={{fontSize:"26px",paddingRight:" 23px", border: "none"}}></i>TASKMAPPING</a>
                              
                            </li>
                            <li>
                                <a  class="dashboardanchorcolor"   style={{padding:"5px 10px "}}  onClick={() => this.MessageFunc()}><i class="fa fa-envelope" style={{fontSize:"26px",paddingRight:" 26px", border: "none"}}></i>MESSAGE</a>
                            </li>
							<li>
                                <a class="dashboardanchorcolor"  style={{padding:"5px 10px "}}   onClick={() => this.HomeWork()}><i class="fa fa-book" style={{fontSize:"26px",paddingRight:" 28px", border: "none"}}></i>HOMEWORK</a>
                            </li>
							<li>
                                <a  class="dashboardanchorcolor"  style={{padding:"5px 10px "}}   onClick={() => this.PayRollFunc()}><i class="fa fa-money" style={{fontSize:"26px",paddingRight:" 24px", border: "none"}}></i>PAYROLL</a>
                            </li>
							<li>
                                <a  class="dashboardanchorcolor"  style={{padding:"5px 10px "}}   onClick={() => this.DeviceMapFunc()}><i class="fa fa-map-marker" style={{fontSize:"26px",paddingRight:" 35px", border: "none"}}></i>NAVIGATION</a>
                            </li>
                            

                        </ul>


                    </nav>




                    <div style={{overflow:"hidden"}} id="contentRender">
                    </div>


                </div>


            </div>

        );
    }
}

export default Gstdashboard1;

