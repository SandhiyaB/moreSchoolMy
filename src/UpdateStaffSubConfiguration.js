import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader'
import Maintenance from './Maintenance'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import FooterText from './FooterText';
import AddNewDepartment from './AddNewDepartment';
import DepartmentAddRemove from './DepartmentAddRemove';
import SubStaffMenuPage from './SubStaffMenuPage';


class UpdateStaffSubConfiguration extends Component {

  constructor() {
    super()
    var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    this.state = {

      department: '',
      superiorId: superiorId,
      valid: false,
      companyId: '',
    };
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
  componentDidMount() {
    this.GetDep();
    window.scrollTo(0, 0);

  }

  GetDep() {

    var department = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Departments'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
    var dept;
    dept += '<option  value="" disabled selected hidden>Select a Class</option>';
    $.each(department, function (i, item) {

      dept += '<option value="' + item.department + '">' + item.department + '</option>'

    });
    $("#department").append(dept);

  }

  SubmitFunc(){
    ReactDOM.render(
        <Router >
            <div>
                 <Route path="/" component={SubStaffMenuPage} />
                <Route path="/" component={UpdateStaffSubConfiguration} />
              </div>
        </Router>, document.getElementById('contentRender'));
  }

  render() {
    return (

      <div class="container"
        style={{
          marginBottom: "30%",
          backgroundColor: "rgb(242, 242, 242)",
          color: "#232f3c"
        }}>
        

        <form style={{ paddingBottom: '20px', position: 'inline-block' }}>


          <div className="col-xs-12 col-sm-12 col-lg-12"  style={{ marginTop: "20px", marginBottom: "20px"}} >
            <label>
              Class*
 <select
                id="department"
                className="form-control"
                onChange={this.handleUserInput}

                name="department"
                style={{ marginBottom: "15px" }}
              >
              </select>
            </label>



            <button
              type="button"

              style={{
                marginLeft: "20px",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "20px",
                marginBottom: "50px",
                display: "block"
              }}
              disabled={!this.state.valid}
              className="btn btn-danger"
              onClick={() => this.SubmitFunc()}
            >Submit</button>

          </div>


        </form>
      </div>


    );
  }

}

export default UpdateStaffSubConfiguration;