import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader'
import SubjectAddRemove from './SubjectAddRemove';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import FooterText from './FooterText';

import Case from 'case';

class AddNewSubject extends Component {

  constructor() {
    super()
    var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    this.state = {
        subject: '',
    
      companyId: '',
      superiorId: superiorId,
    };
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    this.setState({ [name]: value },
    );
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  AddSubjectFunc() {
    var self=this;
if(this.state.subject.trim().length>0){
    this.state.subject= Case.capital(this.state.subject);
    
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
      subject:this.state.subject,
    });

    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify(this.state),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/addSubject",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        if (data.authorization == "DUPLICATE") {
          confirmAlert({
            title: 'Adding New Subject Failed ',                        // Title dialog
            message: 'The Subject ' +data.subject + ' Already Exist',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          })

        }
        else {

          var Subject = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Subjects'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
          Subject.push({ subject: self.state.subject });

          localStorage.setItem('Subjects', CryptoJS.AES.encrypt(JSON.stringify(Subject), "shinchanbaby"));

          confirmAlert({
            title: 'Adding New Subject Success',                        // Title dialog
            message: 'Added The New Subject '+self.state.subject+' Successfully',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          })

        }
        self.state.subject ="";
        self.setState({
          subject:"",
        });

        ReactDOM.render(
          <Router >
            <div>
            
              <Route path="/" component={SubjectAddRemove} />
              <Route path="/" component={AddNewSubject} />
             

            </div>
          </Router>, document.getElementById('contentRender'));


      },
      error: function (data) {
        confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });


      },
    });
  }else{
    confirmAlert({
      title: 'Error',                        // Title dialog
      message: 'Enter Subject Name.',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });
  }
  }


  render() {
    return (

      <div class="container" style={{
        marginBottom: "30%",
       
        backgroundColor: "rgb(242, 242, 242)",
        color: "rgb(35, 47, 60)"
        
      }}>
        <h2>Add New Subject</h2>
        <form style={{ paddingBottom: '20px', position: 'inline-block' }}>
       
<div className="col-xs-12 col-sm-12 col-lg-12" style={{ marginTop: "20px", marginBottom: "20px" }} >
            <label>
              New Subject Name*
      <input
                type="text"
                value={this.state.subject}
                required name="subject"
                onChange={this.handleUserInput}
                className="form-control"
                id="subject"
                placeholder="Enter New Subject Name"
              />
            </label>


            <button
              type="button"

              style={{
                marginLeft: "20px",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "20px",
                marginBottom: "25px",
                display: "block"
              }}

              className="btn btn-success"
              onClick={() => this.AddSubjectFunc()}
            >Add</button>

          </div>


        </form>
      </div>


    );
  }

}

export default AddNewSubject;

