
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import AddEmployee from './AddEmployee';
import RemoveEmployee from './RemoveEmployee';
import SearchEmployee from './SearchEmployee';
import UpdateEmployee from './UpdateEmployee';
import NoSearchResult from './NoSearchResult';
import EmployeeAddRemUpdMenu from './EmployeeAddRemUpdMenu';
import './Maintenance.css';
import AddNewDepartment from './AddNewDepartment';
import AddNewRole from './AddNewRole';
import DepartmentAddRemove from './DepartmentAddRemove';
import RoleAddRemove from './RoleAddRemove';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import EmployeeMenuPage from './EmployeeMenuPage';
import CryptoJS from 'crypto-js';
import FooterText from './FooterText';
import StaffSubjectConfiguration from './StaffSubjectConfiguration';
import UpdateStaffSubConfiguration from './UpdateStaffSubConfiguration';
import ConfigurationPage from './ConfigurationPage';

class SubStaffMenuPage extends Component {

	constructor() {
		super()
		var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
       
        if(companyType=="Office"){
            companyType="Employee";
        }
        else{
            companyType="Student/Staff";
        }
		this.state = {

			search: '',
			companyId: '',
			companyType:companyType,

		}
	}
	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value },
		);
	}

    componentDidMount(){
        this.AssignFunc();
    }
	AssignFunc() {
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

	

	UpdateFunc() {
		ReactDOM.render(
			<Router >
				<div>
					<Route path="/" component={SubStaffMenuPage} />
					<Route path="/" component={UpdateStaffSubConfiguration} />
				
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



			<div className="container" style={{
				marginBottom: "0%",
				backgroundColor: " #ffffff"
			}} >

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
 
				<div className="row" id="Employeemenu" >
					<div id="Employeesearchtab " className="col-xs-2">
						{/* <h4>  <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i></a>
						</h4> */}
					</div>
					

					</div>
				

				<div id='horMenu'	>
					<ul id='horMenunew' class="ulmenubar" >
						<li><a className="active" onClick={() => this.AssignFunc()}><span class="glyphicon glyphicon-user"></span>Assign </a></li>
						<li><a onClick={() => this.UpdateFunc()}><span class="glyphicon glyphicon-th-large"></span>Update</a></li>
					</ul>



				</div>

			</div>

		);
	}

}


export default SubStaffMenuPage;
