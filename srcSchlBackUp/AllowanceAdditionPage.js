
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

//js
import ConfigurationPage from './ConfigurationPage';
import CryptoJS from 'crypto-js';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import FooterText from './FooterText';
import EmployeeMenuPage from './EmployeeMenuPage';
import PayRollConfigMenuPage from './PayRollConfigMenuPage';

var currentRow;
class AllowanceAdditionPage extends Component {

  constructor() {
    super()
    this.state = {

      catagoryName:'',

    };
  }

  componentDidMount() {

    $("#CategoryTable").hide();


    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.schoolId = companyId;

    this.setState({
      schoolId: companyId,

    })

    /* console.log("data" + JSON.stringify({
       schoolId: this.state.schoolId,
     })); */

    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({

        schoolId: this.state.schoolId.toString(),

      }),

      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/payrollconfig/SelectadditionCategory",
      // url: "http://localhost:8080/EmployeeAttendenceAPI/payrollconfig/SelectadditionCategory",

      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        // alert("SUCCESS");
        // console.log("DATA" + data.length);
        if (data.length != 0) {

          $("#CategoryTable").show();
          var tab;
          $.each(data, function (i, item) {
            tab += '<tr class="success" ><td>' + item.catagoryName + '</td><td><button class="Update" data-toggle="modal" data-target="#myModal" > Update </button></td><td><button class="Delete"> Delete</button></td></tr>';
          });
          $("#CategoryTable").append(tab);
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


    $("#CategoryTable").on('click', '.Update', function () {
      // get the current row
      currentRow = $(this).closest("tr");

      self.state.catagoryName = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
      self.state.newCategoryName = currentRow.find("td:eq(0)").text();

      self.setState({

        catagoryName: self.state.catagoryName,
        newCategoryName: self.state.newCategoryName,

      })

    });


    $("#CategoryTable").on('click', '.Delete', function () {
      // get the current row
      currentRow = $(this).closest("tr");

      self.state.catagoryName = currentRow.find("td:eq(0)").text(); // get current row 1st TD value

      confirmAlert({
        title: 'Delete Confirmation ',                        // Title dialog
        message: 'Are You  Sure Do You Want To Delete' + self.state.catagoryName + '?',               // Message dialog
        confirmLabel: 'Confirm',                           // Text button confirm
        cancelLabel: 'Cancel',                             // Text button cancel    
        onConfirm: () => { self.DeleteConfirm(currentRow) },    // Action after Confirm
        onCancel: () => { self.NoAction() },      // Action after Cancel

      })




    });


  }



  handleUserInput = (e) => {

    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    },
    );

  }


  submit() {

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.schoolId = companyId;
    this.state.catagoryName = this.state.catagoryName;

    this.setState({
      schoolId: companyId,
      catagoryName: this.state.catagoryName,

    })

    var self = this;
    /*
    console.log("AJAX DATA AT MENU PAGE"+JSON.stringify({
            
      schoolId: self.state.schoolId,
      catagoryName:self.state.catagoryName,
     
     }));
    */
   if(this.state.catagoryName.trim().length>0){
    $.ajax({
      type: 'POST',
      data: JSON.stringify({

        schoolId: this.state.schoolId.toString(),
        catagoryName: this.state.catagoryName,

      }),

      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/payrollconfig/AddadditionCategory",
      // url: "http://localhost:8080/EmployeeAttendenceAPI/payrollconfig/AddadditionCategory",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        /*
          alert("SUCCESS");
               console.log("DATA" +data.schoolId);
*/

        if (data.schoolId == "Category_Not_Added") {

          confirmAlert({
            title: 'Adding Category Failed',                        // Title dialog
            message: 'The Category You Are Trying To Add Already Exist.Hence Addition Failed',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });

        } else {
          $("#CategoryTable").show();
          var tab;

          tab += '<tr class="success" ><td>' + self.state.catagoryName + '</td><td><button class="Update" data-toggle="modal" data-target="#myModal" > Update </button></td><td><button class="Delete"> Delete</button></td></tr>';

          $("#CategoryTable").append(tab);

        }

        self.state.catagoryName = "";

        self.setState({

          catagoryName: self.state.catagoryName,

        })
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
      message: 'Please Enter Valid Name',               // Message dialog
      confirmLabel: 'Ok',                           // Text button confirm
    });
  }

  }

  UpdateSubmit() {

    var self = this;

    if (self.state.catagoryName == self.state.newCategoryName) {

      confirmAlert({
        title: 'Updation Failed',                        // Title dialog
        message: 'Category Name Have Not Be Changed,Hence Cannot Be Updated.',               // Message dialog
        confirmLabel: 'Ok',                           // Text button confirm
      });


    } else {

      $.ajax({
        type: 'POST',
        data: JSON.stringify({

          schoolId: this.state.schoolId.toString(),
          catagoryName: this.state.catagoryName,
          newCategoryName: self.state.newCategoryName

        }),

        url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/payrollconfig/UpdateadditionCategory",
        // url: "http://localhost:8080/EmployeeAttendenceAPI/payrollconfig/UpdateadditionCategory",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
          /*
            alert("SUCCESS");
                 console.log("DATA" +data[0].schoolId);
 */
          confirmAlert({
            title: 'Updation Success',                        // Title dialog
            message: 'Category Name is Updated Successfully.',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });

          var tab;

          tab += '<tr class="success" ><td>' + self.state.newCategoryName + '</td><td><button class="Update" data-toggle="modal" data-target="#myModal" > Update </button></td><td><button class="Delete"> Delete</button></td></tr>';

          $("#CategoryTable").append(tab);

          currentRow.remove();

        },
        error: function (data) {
          confirmAlert({
            title: 'No Internet',                        // Title dialog
            message: 'Network Connection Problem',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });


        },
      });

      self.state.catagoryName = "";
      self.state.newCategoryName = "";

      self.setState({

        catagoryName: self.state.catagoryName,
        newCategoryName: self.state.newCategoryName

      })

    }



  }


  DeleteConfirm(currentRow) {

    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({

        schoolId: this.state.schoolId.toString(),
        catagoryName: this.state.catagoryName,

      }),

      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/payrollconfig/DeleteadditionCategory",
      // url: "http://localhost:8080/EmployeeAttendenceAPI/payrollconfig/DeleteadditionCategory",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        confirmAlert({
          title: 'Deletion Success',                        // Title dialog
          message: 'Category Name is Deleted Successfully.',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });

        currentRow.remove();

      },
      error: function (data) {
        confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });


      },
    });

    self.state.catagoryName = "";

    self.setState({
      catagoryName: self.state.catagoryName,
    })

  }



  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={AllowanceAdditionPage} />
         
        </div>
      </Router>, document.getElementById('contentRender'));


  }
  BackbtnFunc() {

    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={PayRollConfigMenuPage} />
          <Route path="/" component={ConfigurationPage} />
         </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }


  render() {
    return (
      <div className="container" style={{ marginBottom: "20%" }}>


        <h3 className="centerAlign" style={{ marginBottom: "30px", textAlign: "center" }}>Allowance Category</h3>

        <label style={{ paddingRight: "30px" }} for="class">Category Name</label>
        {/*add validation text only */}
    <input type="text"
          style={{ width: "50%" }}
          onChange={this.handleUserInput}
          value={this.state.catagoryName}
          id="catagoryname"
          name="catagoryName" />
        <br />
        <button class="btn btn-primary" style={{ marginBottom: "20px" }} id="submit" onClick={() => this.submit()}  >Submit</button>

        <table class="table" id="CategoryTable" name="CategoryTable" style={{ overflowX: "auto", overflowY: "auto" }}>
          <tr><th>Category Name</th><th colspan="2" style={{ textAlign: "center" }}>Action</th></tr>
        </table>


        <div class="modal fade" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header" style={{backgroundColor: "rgb(7, 70, 119)",color:"white"}}>
                <h4 class="modal-title">Allowance Category Updation</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>

              <div class="modal-body" style={{ display: "grid" }}>

                <label for="NewCategoryName"> Category Name</label>

                <input type="text"
                  onChange={this.handleUserInput}
                  value={this.state.newCategoryName}
                  id="newcategory"
                  name="newCategoryName" />

              </div>

              <div class="modal-footer" style={{backgroundColor: "rgb(200, 204, 208)"}}>
                <button type="button" class="btn btn-info" onClick={() => this.UpdateSubmit()}
                  data-dismiss="modal">Submit</button>

                <button type="button" class="btn btn-danger" data-dismiss="modal">cancel</button>
              </div>
            </div>
          </div>
        </div>


      </div>

    );
  }

}


export default AllowanceAdditionPage;
