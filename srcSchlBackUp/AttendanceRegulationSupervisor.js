
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
  FormErrors
} from './FormErrors';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import CryptoJS from 'crypto-js';
import AttendanceRegulation from './AttendanceRegulation';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import './LoginPage.css';
import './EmployeeMenuPage.css';
import timepicker from 'timepicker/jquery.timepicker';
import FooterText from './FooterText';


class AttendanceRegulationSupervisor extends Component {

  constructor(props) {
    super(props)
    var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    if (companyType == "Office") {
      companyType = "Employee";
    }
    else {
      companyType = "Student/Staff";
    }
    this.state = {
      date: '',
      checkInTime: '',
      checkOutTime: '',
      employeeId: '',
      companyId: '',
      dateValid: false,
      checkInTimeValid: false,
      checkOutTimeValid: false,
      employeeIdValid: false,
      superiorId: superiorId,
      companyType: companyType

    }
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      employeeIdValid: true
    });

  }

  handleUserInputDate = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      dateValid: true
    });

  }

  handleCheckIn = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      checkInTimeValid: true
    });
    $("#checkOutTime").timepicker('option', 'minTime', value);
  }
  handleCheckOut = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      checkOutTimeValid: true
    });

    //$("#checkInTime").timepicker('option', 'maxTime', value);
  }
  handleEmployeeId = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.state.employeeId = value;
    this.setState({
      [name]: value,
      employeeIdValid: true

    });
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
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeedetails",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        self.state.employeeName = data.employeeName;
        self.state.role = data.role;
        self.state.department = data.department;

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
  Submit() {

    if (this.state.checkInTime.trim().length > 0 && this.state.checkOutTime.trim().length > 0) {
      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

      this.state.companyId = companyId;
      this.setState({
        companyId: companyId,
      });
      var self = this;

      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          date: this.state.date,
          checkInTime: this.state.checkInTime,
          checkOutTime: this.state.checkOutTime,
          employeeId: this.state.employeeId,
          companyId: this.state.companyId,
        }),
        url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/mail/AttendanceRegularizationMail",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {

          if (data.status == "NOT_ASSIGNED") {

            confirmAlert({
              title: 'Attendance Regulation Request Failed',                        // Title dialog
              message: 'The ' + self.state.companyType + ' Id   ' + self.state.employeeId + '  Is Not Assigned With A Reporting Manger , Kindly Contact Admin',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm
            })


          } else if (data.status == "ALREADY_EXITS") {
            confirmAlert({
              title: 'Attendance Regulation Request Failed',                        // Title dialog
              message: 'The ' + self.state.companyType + ' Id  ' + self.state.employeeId + '   Has Already Sent Attendance Regularization Request for the Date ' + self.state.date,               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm
            })



          }
          else {
            self.pushNotificationFunc(data);

            confirmAlert({
              title: 'Attendance Regulation Request Sucess',                        // Title dialog
              message: 'Attendance Regularization Request For ' + self.state.companyType + ' Id  ' + self.state.employeeId + '   On ' + self.state.date + ' Is Sent Successfully',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm
            })



            ReactDOM.render(
              <Router>
                <div>

                  <Route path="/" component={AttendanceRegulationMenuPage} />
                  <Route path="/" component={AttendanceRegulationSupervisor} />

                </div>
              </Router>,
              document.getElementById('contentRender'));
            registerServiceWorker();

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
      $('[name=employeeId]').val('');
      self.state.employeeId = "";
      self.setState({
        employeeName: '',
        role: '',
        department: '',

      });
      this.setState({
        date: '',
        checkInTime: '',
        checkOutTime: '',
        employeeId: '',
        companyId: '',
        dateValid: false,
        checkInTimeValid: false,
        checkOutTimeValid: false,
        employeeIdValid: false,

      });
    } else if (this.state.checkInTime.trim().length == 0) {
      confirmAlert({
        title: 'Error',                        // Title dialog
        message: 'Please Select Check In Time.',               // Message dialog
        confirmLabel: 'Ok',                           // Text button confirm
      });
    } else {
      confirmAlert({
        title: 'Error',                        // Title dialog
        message: 'Please Select Check Out Time.',               // Message dialog
        confirmLabel: 'Ok',                           // Text button confirm
      });
    }
  }

  componentDidMount() {
    var self = this;
    window.scrollTo(0, 0);
    $('#date').datepicker({
      onSelect: function (date) {
        var dt = new Date(date);
        self.setState({
          date: date,
          dateValid: true,
        });

      },
      dateFormat: 'yy/mm/dd',
      minDate: '-3M',
      maxDate: '-1D',
      numberOfMonths: 1
    });
    $('#checkInTime').timepicker({
      onSelect: function (time) {
        $("#checkOutTime").timepicker('option', 'minTime', time);
        self.state.checkInTime = time;
        self.setState({
          checkInTime: time,
        });
      },

      timeFormat: 'H:i:s',
    });

    $('#checkOutTime').timepicker({
      onSelect: function (time) {
        $("#checkInTime").timepicker('option', 'maxTime', time);
        self.state.checkOutTime = time;
        self.setState({
          checkOutTime: time,
        });
      },

      timeFormat: 'H:i:s',

    });

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.companyId = companyId;
    this.state.employeeId = employeeId;

    this.setState({
      companyId: companyId,
      employeeId: employeeId,
    });
    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        employeeId: this.state.employeeId,
        companyId: this.state.companyId,
      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/ReportingManagerEmpList",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        var employeeId;
        employeeId += '<option  value="" disabled selected hidden >Select a ' + self.state.companyType + ' Id</option>';
        employeeId += '<option value="' + self.state.employeeId + '">' + self.state.employeeId + '</option>'
        $.each(data, function (i, item) {

          employeeId += '<option value="' + item.employeeId + '">' + item.employeeId + '</option>'

        });
        $("#employeeId").append(employeeId);

      },
      error: function (data) {
        confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });



      }
    });

  }


  pushNotificationFunc(data) {
    var registration_ids = [];
    if (data.tokenId != null) {
      var tok = data.tokenId.split(',');
      if (tok.length == 2) {
        for (var i = 0; i < tok.length; i++) {
          registration_ids.push(tok[i]);
        }
      } else {
        registration_ids.push(data.tokenId);
      }
    }

    if (registration_ids != []) {
      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          "notification": {
            "title": "Tictok",
            "body": "Attendance Regularization Request Received",
            "click_action": "https://tictoks-v3.firebaseapp.com/EmployeeAttendanceRequest",
            "icon": "%PUBLIC_URL%/favicon.ico"

          },
          "data": {
            "Nick": "Mario",
            "body": "Great match!",
            "Room": "PortugalVSDenmark"
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
          xhr.setRequestHeader('Authorization', "key=AAAA6yOU0DY:APA91bEP68B2ZNij3eLobj8a_-yc-bZ0Vl8KhSBpW1Qn32OTpzhSel788HgTXhrtLDNexyyoqhCJ39P9tY8DkfcppLiRG9c0VUaMLht9E9SnG4jgCpoOaT8cjc71MFn8V4SXYjkSfj4Y"
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
  }

  render() {

    return (

      <div className="container" style={{ marginBottom: '0%' }}>
        <div class="jumbotron">
          <h3 style={{ marginTop: '-40px' }}>Attendance Regularization </h3>

          <form style={{ paddingBottom: '20px', position: 'inline-block' }}>
            <div className="col-xs-12 col-sm-12 col-lg-12">
              <label htmlFor="fromDate"
                style={{ paddingRight: '20px', marginBottom: '14px' }}>
                Date:
            </label>
              <input
                style={{ width: '50%', padding: "5px" }}
                type="text"
                readOnly
                value={this.state.date}
                id="date"
                name="date"
                onChange={this.handleUserInputDate} />
            </div>
            <div className="col-xs-12 col-sm-12 col-lg-12" style={{ marginTop: "20px", marginBottom: "20px" }} >
              <label>
                {this.state.companyType} Id *
   <select
                  id="employeeId"
                  className="form-control"
                  onChange={this.handleEmployeeId}
                  name="employeeId"
                  style={{ marginBottom: "15px" }}
                >
                </select>

              </label>
            </div>
            <div className="row" style={{ display: "inline!important", marginLeft: "0px" }}>

              <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3" style={{ display: "inline!important" }}>
                <input type="text"

                  value={this.state.employeeName}
                  id="employeeName"
                  name="employeeName"
                  maxlength="50"
                  readOnly
                  placeholder="Name.." required />
              </div>

              <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                <input type="text"
                  className="col-xs-4"
                  value={this.state.role}
                  id="role"
                  name="role"
                  maxlength="50"
                  readOnly
                  placeholder=" Role.." required />
              </div>

              <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">

                <input type="text"
                  className="col-xs-4"
                  value={this.state.department}
                  id="department"
                  name="department"
                  maxlength="50"
                  readOnly
                  placeholder="Department.." required />
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <div class="form-group" >
                <div className="col-xs-12 col-sm-12 col-lg-12" >
                  <label style={{ marginBottom: '25px!important', marginTop: "5px" }} >
                    Check-In Time*
      <input
                      // class="form-control"
                      type="text"
                      data-step="5"
                      value={this.state.checkInTime}
                      required
                      name="checkInTime"
                      onSelect={this.handleCheckIn}
                      className="form-control"
                      id="checkInTime"
                      placeholder="Enter Check In"


                    />
                  </label>

                </div>

                <div className="col-xs-12 col-sm-12 col-lg-12">
                  <label>
                    Check-Out Time*
      <input
                      //class="form-control"
                      type="text"
                      data-step="5"

                      value={this.state.checkOutTime}
                      required
                      name="checkOutTime"
                      onSelect={this.handleCheckOut}
                      className="form-control"
                      id="checkOutTime"
                      placeholder="Enter checkOut"
                      style={{ marginTop: "5px!important" }}
                    />
                  </label>
                </div>

                {/*       <button type="button"
                  /*   id="submitAttendanceReg" 
                  disabled={!(this.state.employeeIdValid && this.state.dateValid && this.state.checkInTimeValid && this.state.checkOutTimeValid)}
                  style={{ marginBottom: "10px", marginLeft: "auto", marginRight: "auto", marginTop: "175px" }}
                  onClick={() => this.Submit()} class="btn btn-info">Submit</button>
               */}
                <button
                  disabled={!(this.state.employeeIdValid && this.state.dateValid && this.state.checkInTimeValid && this.state.checkOutTimeValid)}

                  type="button"

                  style={{
                    marginLeft: "20px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "20px",
                    marginBottom: "25px",
                    display: "block"
                  }}

                  onClick={() => this.Submit()} class="btn btn-info">Submit</button>


              </div>
            </div>


          </form>

        </div>

      </div>

    );
  }

}
export default AttendanceRegulationSupervisor;
