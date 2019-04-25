import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import Maintenance from './Maintenance';
import AddNewDepartment from './AddNewDepartment';
import RemoveDepartment from './RemoveDepartment';
import FooterText from './FooterText';
import EmployeeMenuPage from './EmployeeMenuPage';
import AddDevice from './AddDevice';
import EditDevicePage from './EditDevicePage';
import AllDeviceReport from './AllDeviceReport';

class DeviceMenuPage extends Component {

    constructor() {
        super()
        this.state = {

        };
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.AddDeviceFunc();
    }
    AddDeviceFunc() {
        ReactDOM.render(
            <Router>
                <div>
                      <Route path="/" component={DeviceMenuPage} />
                    <Route path="/" component={AddDevice} />
                  </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }

    RemoveDeviceFunc() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={DeviceMenuPage} />
                    <Route path="/" component={EditDevicePage} />
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

    AllDeviceReport(){
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={DeviceMenuPage} />
                    <Route path="/" component={AllDeviceReport} />
                 </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }

    render() {
        return (
            <div className="container"
                style={{ backgroundColor: "#edf5e1" }}>
              {/*   <ul class="previous disabled" id="backbutton"
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
                <div id='horMenunew' >
                    <ul id='horMenunew'  class="ulmenubar"  style={{ backgroundColor: "#8811d6" }}>
                        <li><a className="active"  onClick={() => this.AddDeviceFunc()} ><span class="glyphicon glyphicon-plus"></span>Add</a></li>
                        <li><a  onClick={() => this.RemoveDeviceFunc()}><span class="glyphicon glyphicon-minus"></span>Edit</a></li>
                        <li><a  onClick={() => this.AllDeviceReport()}><span class="fa fa-file"></span>Report </a></li>
                  
                                   </ul>

                </div>
            </div>




        );
    }

}


export default DeviceMenuPage;