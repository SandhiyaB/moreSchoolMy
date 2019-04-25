import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import registerServiceWorker from './registerServiceWorker';

import { confirmAlert } from 'react-confirm-alert'; // Import
//js
import FooterText from './FooterText';
import Case from 'case';
import SchoolMaintenance from './SchoolMaintenance';
import EmployeeMenuHeader from './EmployeeMenuHeader';

var currentRow;
var today = new Date();
today = today.getFullYear();
var lastnum;
class SubjectPage extends Component {

  constructor() {
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    if (companyType == "Office") {
      companyType = "Employee";
    }
    else {
      companyType = "Student/Staff";
    }
    super()
    this.state = {

      role: '',
      companyId: companyId,
      superiorId: superiorId,
      companyType: companyType

    };
  }


  componentDidMount() {

    var self = this;
    var tab;
    $("#subjectTable").on('click', "#delete", function () {
      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

      self.state.companyId = companyId;

      currentRow = $(this).closest("tr");

      // get current row 1st table cell TD value
      self.state.role = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value

      self.setState({
        subject: self.state.role,
        companyId: self.state.companyId,

      });

      confirmAlert({
        title: 'Deleting Role Confirmation',                        // Title dialog
        message: 'Are You Sure Do You Want To Remove Role ' + self.state.role + ' That Is Being Declared  ',            // Message dialog
        confirmLabel: 'Confirm',                           // Text button confirm
        cancelLabel: 'Cancel',                             // Text button cancel
        onConfirm: () => { self.Delete(currentRow) },    // Action after Confirm
        onCancel: () => { self.NoAction() },      // Action after Cancel
      })



    })

    //FUNCTION ON CLICKING UPDATE BUTTON
    $("#subjectTable").on('click', "#update", function () {

      var currentRow = $(this).closest("tr");
      var subject = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value
      self.setState({
        subject: subject,
        oldSubject: subject,
      })

      $("#subject").val(subject);

      self.state.subject = subject;
      self.state.oldSubject = subject;
      $('#addrow').hide();
      $('#updaterow').show();
      $('#cancelUpdate').show();
    });
    self.GetData();
    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
    window.scrollTo(0, 0);
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

  GetData() {
    var Subject = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Subjects'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
    var subject;
    var self = this;
    var num = 1;
    subject = ' <thead><tr class="headcolor"><th class="headcolor">SNo</th><th class="headcolor">Subject</th><th style={{ colSpan: "2" }}>Action</th></tr></thead>';

    $.each(Subject, function (i, item) {

      subject += '<tbody id= "myTable" ><tr class="success"><td>' + num + '</td><td>' + item.subject + '</td><td ><a id="delete"><span class="fa fa-trash"style="color:black"></span>Delete</a></td></tr></tbody >';
      num = num + 1;
      lastnum = num;
    });
    $("#subjectTable").append(subject);

  }

  AddSubjectFunc() {
    var self = this;
    if (this.state.subject.trim().length > 0) {
      this.state.subject = Case.capital(this.state.subject);

      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      this.state.companyId = companyId;
      this.setState({
        companyId: companyId,
        subject: this.state.subject,
        superiorId: this.state.superiorId,
      });

      var self = this;
      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          companyId: companyId,
          subject: this.state.subject,
          superiorId: this.state.superiorId,
        }),
        url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/addSubject",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
          if (data.authorization == "DUPLICATE") {
            confirmAlert({
              title: 'Adding New Subject Failed ',                        // Title dialog
              message: 'The Subject ' + data.subject + ' Already Exist',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm


            })

          }
          else {

            var Subject = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Subjects'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
            Subject.push({ subject: self.state.subject });

            localStorage.setItem('Subjects', CryptoJS.AES.encrypt(JSON.stringify(Subject), "shinchanbaby"));
            $("#subjectTable").append('<tbody id= "myTable" ><tr class="success"><td>' + lastnum + '</td><td>' + self.state.subject + '</td><td ><a id="delete"><span class="fa fa-trash"style="color:black"></span>Delete</a></td></tr></tbody>');

            confirmAlert({
              title: 'Adding New Subject Success',                        // Title dialog
              message: 'Added The New Subject ' + self.state.subject + ' Successfully',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm


            })

          }
          self.state.subject = "";
          self.setState({
            subject: "",
          });

          ReactDOM.render(
            <Router >
              <div>
            
                <Route path="/" component={SchoolMaintenance} />
                <Route path="/" component={SubjectPage} />
               

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
    } else {
      confirmAlert({
        title: 'Error',                        // Title dialog
        message: 'Enter Subject Name.',               // Message dialog
        confirmLabel: 'Ok',                           // Text button confirm
      });
    }
  }

  Delete(currentRow) {


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
          $('#subjectTable').empty();

          localStorage.setItem('Subjects', CryptoJS.AES.encrypt(JSON.stringify(subject), "shinchanbaby"));
          self.GetData();
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
        self.state.subject = "";

        ReactDOM.render(
          <Router >
            <div>
               <Route path="/" component={SchoolMaintenance} />
              <Route path="/" component={SubjectPage} />
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

  UpdateRow() {
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    if (this.state.subject.trim().length > 0) {
      if (this.state.subject != this.state.oldSubject) {
        this.state.companyId = companyId;
      /*   alert(JSON.stringify({
          subject: this.state.subject,
          oldSubject: this.state.oldSubject,
          companyId: this.state.companyId,
          superiorId: this.state.superiorId,

        })); */
        this.setState({
          subject: this.state.subject,
          oldSubject: this.state.oldSubject,
           companyId: this.state.companyId,

        });

        var self = this;
        $.ajax({
          type: 'POST',
          data: JSON.stringify({
            subject: this.state.subject,
            oldSubject: this.state.oldSubject,
           companyId: this.state.companyId,
            superiorId: this.state.superiorId,

          }),
          url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/updateSubject",
          contentType: "application/json",
          dataType: 'json',
          success: function (data, textStatus, jqXHR) {
            console.log("data", data);
            if (data.authorization == "DUPLICATE") {
              confirmAlert({
                title: 'Adding New Subject Failed ',                        // Title dialog
                message: 'The Subject ' + data.subject + ' Already Exist',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
              })
            }
            else {
              console.log("data", data);
              localStorage.setItem('Subjects', CryptoJS.AES.encrypt(JSON.stringify(data.subjectList), "shinchanbaby"));
			
              $("#subjectTable").empty();
              self.state.subject = "";
              self.setState({
                subject: '',
              })

              $('#addrow').show();
              $('#updaterow').hide();
              $('#cancelUpdate').hide();
              self.GetData();
            }
            ReactDOM.render(
              <Router>
                <div>
                   <Route path="/" component={SchoolMaintenance} />
                  <Route path="/" component={SubjectPage} />
                   </div>
              </Router>,
              document.getElementById('contentRender'));
            registerServiceWorker();

          },

          error: function (data, textStatus, jqXHR) {

            confirmAlert({
              title: 'No Internet',                        // Title dialog
              message: 'Network Connection Problem',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm
            });

          },

        });
      } else {
        confirmAlert({
          title: 'Error',                        // Title dialog
          message: 'No change Subject Name.',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });
      }
    } else {
      confirmAlert({
        title: 'Error',                        // Title dialog
        message: 'Enter Subject Name.',               // Message dialog
        confirmLabel: 'Ok',                           // Text button confirm
      });
    }

  }
  CancelUpdate() {
    this.state.subject = "";
    this.setState({
      subject: this.state.subject,
    })

    $('#addrow').show();
    $('#updaterow').hide();
    $('#cancelUpdate').hide();


    $("#subejctTable").empty();
    this.GetData();
  }
  NoAction() {
    this.state.subject = "";
    this.setState({
      subject: this.state.subject,
    })
    ReactDOM.render(
      <Router>
        <div>
           <Route path="/" component={SchoolMaintenance} />
          <Route path="/" component={SubjectPage} />
        
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();

  }

  render() {

    return (
      <div className="container" style={{ marginBottom: '30%' }}>
        <div>
          <label style={{ paddingRight: "30px" }} for="class">Subject *</label>
          {/*add validation text only */}
          <input type="text"
            style={{ width: "40%", paddingRight: "30px" }}
            onChange={this.handleUserInput}
            value={this.state.subject}
            id="subject"
            name="subject"
            placeholder="Enter New Subject Name"
          />
          <button class="btn btn-primary btn-sm" style={{ marginBottom: "20px", marginLeft: "20px", marginTop: "10px" }} id="addrow" onClick={() => this.AddSubjectFunc()} >Add</button>

          <br />
         {/*  <button type="button" id="updaterow" onClick={() => this.UpdateRow()} style={{ display: "none", marginBottom: "10px" }} class="btn btn-primary btn-sm">Update</button>
          <button type="button" id="cancelUpdate" onClick={() => this.CancelUpdate()} style={{ display: "none", marginLeft: "20px", marginBottom: "10px" }} class="btn btn-danger btn-sm">Cancel</button>
          <br /> */}
          <input style={{ color: "black" }} type="text" id="myInput" placeholder="Search.." title="Type in a name" />

          <table id="subjectTable" class="table">

          </table>

        </div>
      </div>

    );
  }

}
export default SubjectPage;

