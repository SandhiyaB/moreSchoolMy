import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import AddEmployee from './AddEmployee';
import RemoveEmployee from './RemoveEmployee';
import SearchEmployee from './SearchEmployee';
import UpdateEmployee from './UpdateEmployee';
import Maintenance from './Maintenance';
import AddNewRole from './AddNewRole';
import RemoveRole from './RemoveRole';
import FooterText from './FooterText';
import SchoolMaintenance from './SchoolMaintenance';
import CryptoJS from 'crypto-js';

class RoleAddRemove extends Component {

    constructor() {
        super()
        var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
       
        this.state = {
            companyType:companyType,
        };
    }


    AddRoleFunc() {
        ReactDOM.render(
            <Router>
                <div>
                      <Route path="/" component={RoleAddRemove} />
                    <Route path="/" component={AddNewRole} />
                   </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }

    RemoveRoleFunc() {
        ReactDOM.render(
            <Router>
                <div>
                     <Route path="/" component={RoleAddRemove} />
                    <Route path="/" component={RemoveRole} />
                   </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();

    }

    BackbtnFunc() {


        if(this.state.companyType=="Office"){
			ReactDOM.render(
				<Router>
					<div>
		<Route path="/" component={Maintenance} />
							</div>
				</Router>,
                document.getElementById('contentRender'));
                registerServiceWorker();
			}else{
				ReactDOM.render(
					<Router>
						<div>
	
								<Route path="/" component={SchoolMaintenance} />
								</div>
					</Router>,
                    document.getElementById('contentRender'));
                    registerServiceWorker();
			}
     
    }




    render() {
        return (



            <div className="container" style={{ backgroundColor: "#edf5e1" }}>
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

                <div id='horMenunew' >
                    <ul id='horMenunew' class="ulmenubar" style={{ backgroundColor: "#8811d6" }}>
                        <li><a className="active" onClick={() => this.AddRoleFunc()} ><span class="glyphicon glyphicon-plus"></span>Add</a></li>
                        <li><a onClick={() => this.RemoveRoleFunc()}><span class="glyphicon glyphicon-minus"></span> Remove</a></li>
                    </ul>

                </div>

                {/*    <div className="btn-group btn-group-justified" style={{ float: "none" }}>


                    <div class="btn-group active">

                        <button type="button" onClick={() => this.AddRoleFunc()} class="btn btn-info"><span class="glyphicon glyphicon-plus">Add</span></button>

                    </div>
                    <div class="btn-group">
                        <button type="button" class="btn btn-danger" onClick={() => this.RemoveRoleFunc()}><span class="glyphicon glyphicon-minus">Remove</span> </button>
                    </div>

                </div> */}

            </div>




        );
    }

}


export default RoleAddRemove;
