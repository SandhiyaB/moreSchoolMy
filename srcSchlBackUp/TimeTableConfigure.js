import EmployeeMenuHeader from './EmployeeMenuHeader';
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import './LoginPage.css';
import EmployeeMenuPage from './EmployeeMenuPage';
import 'timepicker/jquery.timepicker.css';
import timepicker from 'timepicker/jquery.timepicker';
import TimePicker from 'react-bootstrap-time-picker';
import Switch from 'react-toggle-switch';
import BackGroundColorSettings from './BackGroundColorSettings';
import HolidayConfig from './HolidayConfig';
import '../node_modules/react-toggle-switch/dist/css/switch.min.css';
import CreatingNewShift from './CreatingNewShift';
import ExistingShiftDetails from './ExistingShiftDetails';
import ShiftUpdatePage from './ShiftUpdatePage';
import ShiftMode from './ShiftMode';
import HolidayMenuPage from './HolidayMenuPage';
import FooterText from './FooterText';
import MessageMenuPage from './MessageMenuPage';
import React, {
    Component
  } from 'react';
import EmailPage from './EmailPage';
import StaffSubjectConfiguration from './StaffSubjectConfiguration';
import SubStaffMenuPage from './SubStaffMenuPage';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ConfigurationPage from './ConfigurationPage';
import AddTimeTableTime from './AddTimeTableTime';

class TimeTableConfigure extends Component {

    constructor() {
        super()
        this.state = {

        };
    }

    componentDidMount() {


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


    TimeFunc(){

        ReactDOM.render(
            <Router>
              <div>
                <Route path="/" component={AddTimeTableTime} />
               </div>
            </Router>,
            document.getElementById('contentRender'));
          registerServiceWorker();
      
  }
    
    

    DataProlongDetailsFunc(){

    }





    render() {
        return (
            <div className="container">
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


           <h1>Time Table Configuration</h1>

 {/*
class as a multiple select 
total no of periods
period starttime end time
add the start and end time into staff time table as columns
insert the times into student timetable




 */}

        <div id='horMenu'>
          <ul  id='horMenunew'  class="ulmenubar">
            <li><a  className="active" onClick={() => this.TimeFunc()}><span class="glyphicon glyphicon-calendar"></span>Time </a></li>
            <li><a style={{wordSpacing: "-11px"}} onClick={() => this.DataProlongDetailsFunc()}><span class="glyphicon glyphicon-calendar"></span>Data Prolong Details</a></li>
          </ul>

        </div>

            </div>

);
}

}


export default TimeTableConfigure;