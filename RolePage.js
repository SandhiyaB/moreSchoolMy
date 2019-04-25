import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import registerServiceWorker from './registerServiceWorker';


//js
import FooterText from './FooterText';
import Maintenance from './Maintenance';
import Case from 'case';
import SchoolMaintenance from './SchoolMaintenance';
import { confirmAlert } from 'react-confirm-alert'; // Import
import EmployeeMenuHeader from './EmployeeMenuHeader';
import EmployeeMaintenance from './EmployeeMaintenance';

var currentRow;
var today = new Date();
today = today.getFullYear();
var lastnum;
class RolePage extends Component {

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
    $("#roleTable").on('click', "#delete", function () {
      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

      self.state.companyId = companyId;

      currentRow = $(this).closest("tr");

      // get current row 1st table cell TD value
      self.state.role = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value

      self.setState({
        role: self.state.role,
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
    $("#roleTable").on('click', "#update", function () {

      var currentRow = $(this).closest("tr");
      var role = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value
      self.setState({
        role: role,
        oldRole: role,
      })

      $("#role").val(role);

      self.state.role = role;
      self.state.oldRole = role;
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

    var Role = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
    var role;
    var self = this;
    var num = 1;
    if (Role.length != 0) {
      role = ' <thead><tr class="headcolor"><th class="headcolor">SNo</th><th class="headcolor">Role</th><th colSpan="2"  style="text-align:center;">Action</th></tr></thead>';

      $.each(Role, function (i, item) {

        role += '<tbody id= "myTable" ><tr class="success"><td>' + num + '</td><td>' + item.role + '</td><td ><a id="update"><span class="glyphicon glyphicon-pencil" style="color:black"></span>Update</a></td><td ><a id="delete"><span class="fa fa-trash"style="color:black"></span>Delete</a></td></tr></tbody >';
        num = num + 1;
        lastnum = num;
      });
      $("#roleTable").append(role);
    } else {
      $("#roleTable").append('<h3 align="center">No Data</h3>');
    }

  }

  AddRoleFunc() {

    if (this.state.role.trim().length > 0) {
      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      this.state.companyId = companyId;
      this.state.role = Case.capital(this.state.role);
      this.setState({
        companyId: companyId,
        role: this.state.role,
        superiorId: this.state.superiorId,
      });

      var self = this;
      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          role: this.state.role,
          companyId: this.state.companyId,
          superiorId: this.state.superiorId,

        }),
        url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/addRole",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
          if (data.authorization == "DUPLICATE") {
            confirmAlert({
              title: 'Adding New Role Failed ',                        // Title dialog
              message: 'The Role ' + data.role + ' Already Exist',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm


            })

          }
          else {

            var Role = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
            Role.push({ role: self.state.role });
            localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(Role), "shinchanbaby"));
            $("#roleTable").append('<tbody id= "myTable" ><tr class="success"><td>' + lastnum + '</td><td>' + self.state.role + '</td><td ><a id="update"><span class="glyphicon glyphicon-pencil" style="color:black"></span>Update</a></td><td ><a id="delete"><span class="fa fa-trash"style="color:black"></span>Delete</a></td></tr></tbody>');
            confirmAlert({
              title: 'Adding New Role Success',                        // Title dialog
              message: 'Added The New Role ' + self.state.role + ' Successfully',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm
            })

          }
          self.state.role = "";
          self.setState({
            role: "",
          });

          if (self.state.companyType == "Employee") {
            ReactDOM.render(
              <Router>
                <div>


                  <Route path="/" component={EmployeeMaintenance} />
                  <Route path="/" component={RolePage} />

                </div>
              </Router>,
              document.getElementById('contentRender'));
          } else {
            ReactDOM.render(
              <Router>
                <div>


                  <Route path="/" component={SchoolMaintenance} />
                  <Route path="/" component={RolePage} />

                </div>
              </Router>,
              document.getElementById('contentRender'));
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
    } else {
      confirmAlert({
        title: 'Error',                        // Title dialog
        message: 'Enter Role Name.',               // Message dialog
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
        role: this.state.role,
        companyId: this.state.companyId,
        superiorId: this.state.superiorId,
      })),
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/deleterole",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        if (data.authorization == "DELETED") {

          var role = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
          var del = self.state.role;
          var key;
          var i = role.length;

          while (i--) {
            if (del == role[i].role) {
              key = i;
              var remRole;
              role.splice(i, 1);
            }

          }
          $('#roleTable').empty();

          localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(role), "shinchanbaby"));
          self.GetData();
          confirmAlert({
            title: 'Removal Of Role Succeded', // Title dialog
            message: 'Successfully Removed Role ' + self.state.role, // Message dialog
            confirmLabel: 'Ok', // Text button confirm


          })
        }
        else {

          confirmAlert({
            title: 'Removal Of  Role Failed ',                        // Title dialog
            message: 'Cannot Remove Role ' + self.state.role + ' Because Employee Exist In The Role ',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          })
        }
        self.state.role = "";

        if (self.state.companyType == "Employee") {
          ReactDOM.render(
            <Router>
              <div>


                <Route path="/" component={EmployeeMaintenance} />
                <Route path="/" component={RolePage} />

              </div>
            </Router>,
            document.getElementById('contentRender'));
        } else {
          ReactDOM.render(
            <Router>
              <div>


                <Route path="/" component={SchoolMaintenance} />
                <Route path="/" component={RolePage} />

              </div>
            </Router>,
            document.getElementById('contentRender'));
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


  UpdateRow() {
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    if (this.state.role.trim().length > 0) {
      if (this.state.role != this.state.oldRole) {
        this.state.companyId = companyId;
        this.setState({
          role: this.state.date,
          oldRole: this.state.description,
          companyId: this.state.companyId,

        });

        var self = this;
        $.ajax({
          type: 'POST',
          data: JSON.stringify({
            role: this.state.role,
            oldRole: this.state.oldRole,
            companyId: this.state.companyId,
            superiorId: this.state.superiorId,

          }),
          url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/updateRole",
          contentType: "application/json",
          dataType: 'json',
          success: function (data, textStatus, jqXHR) {
            console.log("data", data);
            if (data.authorization == "DUPLICATE") {
              confirmAlert({
                title: 'Adding New Role Failed ',                        // Title dialog
                message: 'The Role ' + data.role + ' Already Exist',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
              })
              self.state.role = "";
            }
            else {
              console.log("data", data);
              localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(data.roleList), "shinchanbaby"));


              $("#roleTable").empty();
              self.state.role = "";
              self.setState({
                role: '',
              })

              $('#addrow').show();
              $('#updaterow').hide();
              $('#cancelUpdate').hide();
              self.GetData();
            }
            if (self.state.companyType == "Employee") {
              ReactDOM.render(
                <Router>
                  <div>


                    <Route path="/" component={EmployeeMaintenance} />
                    <Route path="/" component={RolePage} />

                  </div>
                </Router>,
                document.getElementById('contentRender'));
            } else {
              ReactDOM.render(
                <Router>
                  <div>
                    <Route path="/" component={SchoolMaintenance} />
                    <Route path="/" component={RolePage} />

                  </div>
                </Router>,
                document.getElementById('contentRender'));
            }

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
          message: 'No change Role Name.',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });
      }
    } else {
      confirmAlert({
        title: 'Error',                        // Title dialog
        message: 'Enter Role Name.',               // Message dialog
        confirmLabel: 'Ok',                           // Text button confirm
      });
    }

  }
  CancelUpdate() {
    this.state.role = "";
    this.setState({
      role: this.state.role,
    })

    $('#addrow').show();
    $('#updaterow').hide();
    $('#cancelUpdate').hide();


    $("#roleTable").empty();
    this.GetData();
  }

  NoAction() {
    this.state.role = "";
    if (this.state.companyType == "Employee") {
      ReactDOM.render(
        <Router>
          <div>


            <Route path="/" component={EmployeeMaintenance} />
            <Route path="/" component={RolePage} />

          </div>
        </Router>,
        document.getElementById('contentRender'));
    } else {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={SchoolMaintenance} />
            <Route path="/" component={RolePage} />

          </div>
        </Router>,
        document.getElementById('contentRender'));
    }


  }

  render() {

    return (
      <div className="container" style={{ marginBottom: '30%' }}>
        <div>
          <label style={{ paddingRight: "20px" }} for="class">Role *</label>
          {/*add validation text only */}
          <input type="text"
            style={{ width: "40%", paddingRight: "40px" }}
            onChange={this.handleUserInput}
            value={this.state.role}
            id="role"
            name="role"
            placeholder="Enter New Role Name" />

          <button class="btn btn-primary btn-sm" style={{ marginBottom: "30px", marginLeft: "20px", marginTop: "10px" }} id="addrow" onClick={() => this.AddRoleFunc()} >Add</button>
          <br />
          <br />
          <button type="button" id="updaterow" onClick={() => this.UpdateRow()} style={{ display: "none", marginBottom: "10px" }} class="btn btn-primary btn-sm">Update</button>
          <button type="button" id="cancelUpdate" onClick={() => this.CancelUpdate()} style={{ display: "none", marginLeft: "20px", marginBottom: "10px" }} class="btn btn-danger btn-sm">Cancel</button>
          <br />
          <input style={{ color: "black" }} type="text" id="myInput" placeholder="Search.." title="Type in a name" />

          <table id="roleTable" class="table">

          </table>

        </div>
      </div>

    );
  }

}
export default RolePage;

