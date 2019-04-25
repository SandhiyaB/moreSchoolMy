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
//css
import './LoginPage.css';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import 'timepicker/jquery.timepicker.css';
import timepicker from 'timepicker/jquery.timepicker';
import TimePicker from 'react-bootstrap-time-picker';
import Switch from 'react-toggle-switch';
import '../node_modules/react-toggle-switch/dist/css/switch.min.css';
//js
import StaffSubjectConfiguration from './StaffSubjectConfiguration';
import SubStaffMenuPage from './SubStaffMenuPage';
import TimeTableConfigure from './TimeTableConfigure';
import EmployeeMenuPage from './EmployeeMenuPage';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import HolidayConfig from './HolidayConfig';
import CreatingNewShift from './CreatingNewShift';
import ExistingShiftDetails from './ExistingShiftDetails';
import ShiftUpdatePage from './ShiftUpdatePage';
import ShiftMode from './ShiftMode';
import HolidayMenuPage from './HolidayMenuPage';
import FooterText from './FooterText';
import BackGroundColorSettings from './BackGroundColorSettings';
import PayRollConfigMenuPage from './PayRollConfigMenuPage';

class ConfigurationPage extends Component {

  constructor(props) {
    super(props)
    var biometric = CryptoJS.AES.decrypt(localStorage.getItem('BiometricValue'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var shiftSwitched = CryptoJS.AES.decrypt(localStorage.getItem('ShiftMode'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var sms = CryptoJS.AES.decrypt(localStorage.getItem('SMS'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    if (shiftSwitched == 0) {
      shiftSwitched = false;
    } else {
      shiftSwitched = true;
    }
    if (biometric == 0) {
      biometric = false;
    } else {
      biometric = true;
    }
    if (sms == 0) {
      sms = false;
    } else {
      sms = true;
    }
    this.state = {
      date: '',
      shift: '1',

      employeeId: '',
      companyId: '',
      dateValid: false,

      switched: false,
      editsave: 'edit',
      workingHours: '',
      biometric: biometric,
      shiftSwitched: shiftSwitched,
      superiorId: superiorId,
      sms: sms,

    }
  }

  componentDidMount() {
    var self = this;
    self.WorkingHours();
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

    $('#workingHours').timepicker({

      timeFormat: 'H:i:s',
      interval: 30,
      minTime: '00:00:00',
      maxTime: '24:00:00',

    });


  }


  biometricChange = () => {

    if (this.state.biometric == 0) {
      this.state.biometric = 1;

      this.setState({
        biometric: 1,
      })
    } else {
      this.state.biometric = 0;

      this.setState({
        biometric: 0,
      })
    }

    this.biometricFunc();
  };

  biometricFunc() {
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    this.state.companyId = companyId;

    this.setState({
      companyId: companyId,


    });

    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({

        companyId: this.state.companyId,
        biometricValue: this.state.biometric,
        superiorId: this.state.superiorId,
      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeConfig/BiometricSettings",
      contentType: "application/json",

      async: false,

      success: function (data, textStatus, jqXHR) {

        self.state.biometric = data.biometricValue;

        var key = "shinchanbaby";
        localStorage.setItem('Bio', data.biometricValue.toString());
        localStorage.setItem('BiometricValue', CryptoJS.AES.encrypt(data.biometricValue.toString(), key));
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
  SmsChange = () => {

    if (this.state.sms == 0) {
      this.state.sms = 1;

      this.setState({
        sms: 1,
      })
    } else {
      this.state.sms = 0;

      this.setState({
        sms: 0,
      })
    }

    this.smsFunc();
  };

  smsFunc() {
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    this.state.companyId = companyId;

    this.setState({
      companyId: companyId,


    });

    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({

        companyId: this.state.companyId,
        sms: this.state.sms,
        superiorId: this.state.superiorId,
      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeConfig/SmsSettings",
      contentType: "application/json",

      async: false,

      success: function (data, textStatus, jqXHR) {

        self.state.sms = data.sms;

        var key = "shinchanbaby";
        localStorage.setItem('SMS', CryptoJS.AES.encrypt(data.sms.toString(), key));
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

  toggleSwitch = () => {
    this.setState(prevState => {
      return {
        switched: !prevState.switched
      };
    });
  };

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


  handleWorkingHour = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      workingHours: value,
    });


  }


  WorkingHours() {

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
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
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeConfig/WorkingHours",
      contentType: "application/json",

      async: false,

      success: function (data, textStatus, jqXHR) {

        self.state.workingHours = data;
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

  BackGroundColorFunc() {

    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={BackGroundColorSettings} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }

  edit() {

    $("#workingHours").prop('disabled', false);
    this.setState({
      editsave: 'save',

    })
  }

  SaveBtn() {

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
        workingHours: this.state.workingHours,
        superiorId: this.state.superiorId,
      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeConfig/UpdateWorkingHours",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {


        confirmAlert({
          title: 'Saved Working Hours', // Title dialog
          message: 'Suceessfully updated The New Minimum Working Hours', // Message dialog
          confirmLabel: 'Ok', // Text button confirm


        })

        self.setState({ editsave: 'edit' });
        $("#workingHours").prop('disabled', true);
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


  Shift() {
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,

    });
    $.ajax({
      type: 'POST',
      data: JSON.stringify({

        companyId: this.state.companyId,
      }),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeshiftconfig/getshiftconfigdata",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {

        if (data.shiftData.length == 0) {
          ReactDOM.render(
            <Router>
              <div>
                 <Route path="/" component={CreatingNewShift} />
              
              </div>
            </Router>,
            document.getElementById('contentRender'));
          registerServiceWorker();

        } else {
          ReactDOM.render(
            <Router>
              <div>
                 <Route path="/" component={() => <ExistingShiftDetails data={data} />} />
             
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
  }
  ShiftMigration() {


    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={ShiftUpdatePage} />
        

        </div>
      </Router>,
      document.getElementById('contentRender'));

  }

  HolidayFunc() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={HolidayMenuPage} />
        

        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();

  }

  toggleShiftMode() {

    if (this.state.shiftSwitched == 0) {
      this.state.shiftSwitched = 1;

      this.setState({
        shiftsSwitched: 1,
      })

      $("#mode").attr("checked", false);
    } else {
      this.state.shiftSwitched = 0;

      this.setState({
        shiftSwitched: 0,
      })

    }


    if (this.state.shiftSwitched == 1) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={ShiftMode} />
          

          </div>
        </Router>,
        document.getElementById('contentRender'));
      registerServiceWorker();

    } else {
      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      var switchdata = this.state.shiftSwitched;

      this.state.companyId = companyId;
      this.state.hours = "0";
      this.setState({
        companyId: this.state.companyId,
        hours: this.state.hours,
        shiftSwitched: this.state.shiftSwitched,
        superiorId: this.state.superiorId,
      })
      var self = this;
      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          companyId: this.state.companyId,
          hours: this.state.hours,
          shiftSwitched: this.state.shiftSwitched,
          superiorId: this.state.superiorId,
        }),
        url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeshiftconfig/shiftstrictmode",
        contentType: "application/json",
        dataType: 'json',
        async: false,

        success: function (data, textStatus, jqXHR) {
          self.state.shiftSwitched = 0;
            self.setState({
              shiftSwitched: self.state.shiftSwitched,
            });
          localStorage.setItem('ShiftMode', CryptoJS.AES.encrypt("0", "shinchanbaby"));

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

  };

  SubConfig() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={SubStaffMenuPage} />
          <Route path="/" component={StaffSubjectConfiguration} />
         
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }

  TimeTable() {
    ReactDOM.render(
      <Router>
        <div>
           <Route path="/" component={TimeTableConfigure} />
       

        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  PayRoll(){
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={PayRollConfigMenuPage} />
        

        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();

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

      <div className="container" style={{ marginBottom: '0%' }}>
     {/*    <ul class="previous disabled" id="backbutton"
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
        <div class="jumbotron" style={{ marginTop: "-55px" }}>
          <h3>Configuration Details</h3>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/*   <tr>

                  <td>Background-Theme</td>
                  <td><button type="button" onClick={() => this.BackGroundColorFunc()} class="btn btn-default">Select</button> </td>
                </tr> */}

                <tr>
                  <td>Assign Subject To Staffs</td>
                  <td><button type="button" onClick={() => this.SubConfig()} class="btn btn-default">Subject Configuration</button> </td>
                </tr>
                <tr>
                  <td>Time Table Details</td>
                  <td><button type="button" onClick={() => this.TimeTable()} class="btn btn-default">Time Table Details</button>
                  </td>
                </tr>
                <tr>

                  <td>PayRoll</td>
                  <td><button type="button" onClick={() => this.PayRoll()} class="btn btn-default">PayRoll Details</button>
                  </td>
                </tr>
                <tr>
                  <td>Minimum Working Hour</td>

                  <td>
                    <input
                      style={{ width: "75%" }}

                      type="text"
                      // data-step="5"
                      value={this.state.workingHours}
                      required
                      name="workingHours"
                      className="form-control"
                      id="workingHours"
                      disabled
                      onSelect={this.handleWorkingHour}
                    />
                  </td>

                  {/*  <td>
                    {(this.state.editsave === 'edit'
                      ? <button className="stop-btn" onClick={() => this.edit()}>edit</button>
                      : <button className="stop-btn" onClick={() => this.SaveBtn()} >save</button>
                    )}

                  </td> */}

                </tr>
                <tr>
                  <td>Strict Mode</td>
                  <td><Switch id="mode" onClick={() => this.toggleShiftMode()} on={this.state.shiftSwitched} /> </td>
                </tr>

                <tr>

                  <td>Shift</td>
                  <td> <button type="button" onClick={() => this.Shift()} class="btn btn-default">Shift Details</button>
                  </td>
                </tr>
                <tr>
                  <td>Migration</td>
                  <td> <button type="button" onClick={() => this.ShiftMigration()} class="btn btn-default">Migrate Shift</button>
                  </td>
                </tr>
                <tr>
                  <td>Holiday Details</td>
                  <td><button type="button" onClick={() => this.HolidayFunc()} class="btn btn-default">Holiday Details</button> </td>
                </tr>
                {/*  <tr>
                  <td>Message </td>
                  <td><button type="button" onClick={() => this.MessageFunc()} class="btn btn-default">message</button> </td>
                </tr>
                */} <tr>

                  <td>SMS</td>
                  <td> <Switch onClick={this.SmsChange} on={this.state.sms} />
                  </td>
                </tr>
                {/* <tr>

                  <td>OTP-Enable</td>
                  <td><Switch onClick={this.toggleSwitch} on={this.state.switched} /> </td>
                </tr> */}
                <tr>

                  <td>Biometric-Enable</td>
                  <td> <Switch onClick={this.biometricChange} on={this.state.biometric} />
                  </td>
                </tr>
              </tbody>
            </table>

            {(this.state.editsave === 'edit'
              ? <button className="btn btn-primary" style={{
                marginLeft: "20px",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "20px",
                marginBottom: "25px",
                display: "block"
              }} onClick={() => this.edit()}>edit</button>
              : <button style={{
                marginLeft: "20px",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "20px",
                marginBottom: "25px",
                display: "block"
              }} className="btn btn-success" onClick={() => this.SaveBtn()} >save</button>
            )}


          </div>
        </div>
      </div>

    );
  }

}
export default ConfigurationPage;
