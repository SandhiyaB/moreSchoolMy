
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import EmployeeMenuPage from './EmployeeMenuPage';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import WeekEndConfig from './WeekEndConfig';
import ConfigurationPage from './ConfigurationPage';
import LeaveType from './LeaveType';
import HolidayConfig from './HolidayConfig';
import FooterText from './FooterText';

class HolidayMenuPage extends Component {

  constructor() {
    super()
    this.state = {

    }
  }


  componentDidMount() {

    window.scrollTo(0, 0);
    var self = this;
    self.WeekEndFunc();
  }


  WeekEndFunc() {


    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={HolidayMenuPage} />

          <Route path="/" component={WeekEndConfig} />
          </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();

  }


  LeaveFunc() {

    ReactDOM.render(
      <Router>
        <div>
           <Route path="/" component={HolidayMenuPage} />
          <Route path="/" component={LeaveType} />
     
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();

  }

  GeneralHolidayFunc() {

    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={HolidayMenuPage} />
          <Route path="/" component={HolidayConfig} />
      
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();

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


        <div id='horMenu'>
          <ul  id='horMenunew' class="ulmenubar"  style={{ backgroundColor: "#8811d6" }}>
            <li><a style={{ fontSize:"medium",fontStyle:"bold"}} className="active" onClick={() => this.WeekEndFunc()}><span class="glyphicon glyphicon-calendar"></span>WeekEnd </a></li>
            <li><a style={{ fontSize:"medium",fontStyle:"bold"}} onClick={() => this.GeneralHolidayFunc()}><span class="glyphicon glyphicon-calendar"></span>General Holiday</a></li>
            <li><a style={{ fontSize:"medium",fontStyle:"bold"}} className="active" onClick={() => this.LeaveFunc()}><span class="glyphicon glyphicon-calendar"></span>General Leave</a></li>


          </ul>

        </div>
      </div>

    );
  }

}


export default HolidayMenuPage;
