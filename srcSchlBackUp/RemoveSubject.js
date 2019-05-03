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
import SubjectAddRemove from './SubjectAddRemove';
import AddNewSubject from './AddNewSubject';
import FooterText from './FooterText';
const required = (value, props) => {
  if (!value || (props.isCheckable && !props.checked)) {
    return <span className="form-error is-visible">Required</span>;
  }
};


class RemoveSubject extends Component {

  constructor() {
    super()
    var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    this.state = {

      subject: '',
      valid: false,
      companyId: '',
      superiorId: superiorId,

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

    this.GetSubject();
    window.scrollTo(0, 0);

  }

  GetSubject() {
    var Subject = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Subjects'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
    var subject;

    subject += '<option value ="" disabled selected hidden >Select a Subject</option>';
    $.each(Subject, function (i, item) {

      subject += '<option value="' + item.subject + '">' + item.subject + '</option>'

    });
    $("#subject").append(subject);

  }




  RemoveSubjectFunc() {


    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;

    this.setState({
      companyId: companyId,
    });

    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify(({
        subject: this.state.subject,
        companyId: this.state.companyId,
        superiorId: this.state.superiorId,
      })),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/deleteSubject",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        if (data.authorization == "DELETED") {

          var subject = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Subjects'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
          var del = self.state.subject;
          var key;
          var i = subject.length;

          while (i--) {
            if (del == subject[i].subject) {
              key = i;
            
              subject.splice(i, 1);

            }

          }
          $('#subject').empty();

          localStorage.setItem('Subjects', CryptoJS.AES.encrypt(JSON.stringify(subject), "shinchanbaby"));
          $('[name=subject]').val('');
          self.GetSubject();
          confirmAlert({
            title: 'Removal Of Subject Succeded', // Title dialog
            message: 'Successfully Removed Subject ' + self.state.subject, // Message dialog
            confirmLabel: 'Ok', // Text button confirm


          })



        }
        else {

          confirmAlert({
            title: 'Removal Of  Subject Failed ',                        // Title dialog
            message: 'Cannot Remove Subject ' + self.state.subject + ' Because Teachers Assigned To this Subject ',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          })



        }

        $('[name=subject]').val('');
        self.state.subject = " ";

        ReactDOM.render(
          <Router >
            <div>
               <Route path="/" component={SubjectAddRemove} />
              <Route path="/" component={RemoveSubject} />
            
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
  }


  render() {
    return (

      <div class="container" style={{
        marginBottom: "30%",
        backgroundColor: "rgb(242, 242, 242)",
      color: "rgb(35, 47, 60)"
      }}>
        <h2>Remove Subject</h2>


        <form style={{ paddingBottom: '20px', position: 'inline-block' }}>



          <div className="col-xs-12 col-sm-12 col-lg-12" style={{ marginTop: "20px", marginBottom: "20px" }} >
            <label>
              Subject Name*
      <select
                id="subject"
                className="form-control"
                onChange={this.handleUserInput}

                name="subject"
                style={{ marginBottom: "15px" }}
              >
                <option value="" disabled selected hidden>Select your Subject</option>
              </select>
            </label>

          </div>
          <div>
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
              disabled={!this.state.valid}
              className="btn btn-danger"
              onClick={() => this.RemoveSubjectFunc()}
            >Remove</button>

          </div>


        </form>
      </div>


    );
  }

}

export default RemoveSubject;