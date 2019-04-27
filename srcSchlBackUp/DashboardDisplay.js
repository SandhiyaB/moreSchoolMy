import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './datepicker.css';
import { Pie, Chart, Bar, HorizontalBar, Doughnut, Bubble, Line } from 'react-chartjs-2';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import CryptoJS from 'crypto-js';
//import Chart from 'chart.js';


//jsfile


/* import AdminAddUser from './AdminAddUser';
import AddRole from './AddRole';
import AddProduct from './AddProduct';
import VendorEntryForm from './VendorEntryForm';
import SaleOrder from './SaleOrder';
import GSTQuotation from './GSTQuotation'; 
import Expense from './Expense';*/


//import ChangePassword1 from './ChangePassword1';

//css
/* import './gstdashboard.css';
 */

//import './gstdashboard.css';
import './Gstdashboard1css.css';

class DashboardDisplay extends Component {

  constructor() {
    super()
    var today = new Date();
    var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    this.state = {

      date: today1,
      current_Month: '',
      current_Year: '',

      SaleInvoice_Total_Amt: '',
      monthly_Purchase: '',
      monthly_Expense: '',
      monthly_Profit: '',
      monthly_PurchaseInvoice: '',
      monthly_ExpenseInvoice: '',
      total_No_of_Vendors: '',
      total_No_of_ProductList: '',
      total_No_of_SaleInvoice: '',
      total_No_of_WithGST_Quotation: '',
      total_No_of_SaleInvoice_Qty: '',
      total_No_of_SaleInvoice_Qty_Estimate: '',
      total_No_of_Salary_paid: '',

      total_Sales_Amount_Annually: '',
      total_Purchase_Amount_Annually: '',



      chartData: {
        title: {
          display: true,
          text: "Website Traffic Sources"
        },
        title: "graph",
        labels: ['Employee', 'Present', 'Absent', 'Leave'],

        datasets: [{
          label: ' Teacher',
          data: ['50', '38', '10', '2'],
          backgroundColor: [
            '#005792',
            '#1fe5bd',
            '#ff1f5a',
            '#fff8a1',

          ],
        },
          /*       {
                  label: ' Students',
                  data:['150','138','10','2'],
                  backgroundColor: [
                    'rgb(51, 133, 255)',
                    'rgb(101, 189, 56)',
                    'rgb(255, 51, 51)',
                    '#fbf309',
                  ],
        
                } */
        ]
      },

      studentData: {
        title: {
          display: true,
          text: "Website Traffic Sources"
        },
        title: "graph",
        labels: ['Employee', 'Present', 'Absent', 'Leave'],

        datasets: [{
          label: ' Teacher',
          data: ['50', '40', '8', '2'],
          backgroundColor: [
            '#00136c',
            '#00a8b5',
            '#ff1f5a',
            '#f87d42',

          ],
        },
          /*       {
                  label: ' Students',
                  data:['150','138','10','2'],
                  backgroundColor: [
                    'rgb(51, 133, 255)',
                    'rgb(101, 189, 56)',
                    'rgb(255, 51, 51)',
                    '#fbf309',
                  ],
        
                } */
        ]
      },
      DevicechartData: {

        labels: ['Total Device', 'Online', 'Offline', 'Deactivated'],

        datasets: [{
          label: ' Device Status',
          // data: ['6', '3', '2', '1'],
          backgroundColor: [
            '#665c84',
            '#ff7657',
            '#ffba5a',
            '#fbeed7',

          ],
        },

        ]
      },


      staffMorningChartData: {

        labels: ['6-7', '7-8', '8-9', '9-10', '10-11', '11-12'],

        datasets: [{
          label: ' Teacher',
          data: ['50', '38', '10', '2', '50', '38'],
          backgroundColor: [
            '#ffe98a',
            '#e61c5d',
            '#930077',
            '#3a0088',
            '#ff8484',
            '#ff8484'


          ],
        },
        ]
      },
      staffAfternoonChartData: {


        labels: ['12-13', '13-14', '14-15', '15-16', '16-17', '17-18', ' After 18'],

        datasets: [{
          label: ' Teacher',
          data: ['50', '38', '10', '2', '38', '10', '10'],
          backgroundColor: [
            '#1a3263',
            '#f5564e',
            '#fab95b',
            '#2470a0',
            '#1abb9c',
            '#2470a0',
            '#3b0944'


          ],
        },
        ]
      },



      doughnutData: {

        labels: ['Sale Qty', 'Paid Salary', 'Total Expense'],
        datasets: [{
          label: 'Statistics',
          data: ['20', '20', '20'],
          backgroundColor: [
            '#ca2374',
            '#13abc4',
            '#36622b'

          ],

        },

        ]
      },
      LinechartData: {

      /*   labels: ['Teacher', 'Staff', 'Principal','HM','Ju.Teacher', 'Non-Teaching_Staff', 'Vice-Principal','AHM',],
       */  labels: ['Role Wise'],
        datasets: [{
          label: ' Teacher',
          data: ['8', '9.30', '10', '11', '8', '9.30', '10', '11'],
          backgroundColor: [
            'rgb(51, 133, 255)',
            'rgb(101, 189, 56)',
            'rgb(255, 51, 51)',
            '#fbf309',
            'rgb(51, 133, 255)',
            'rgb(101, 189, 56)',
            'rgb(255, 51, 51)',
            '#fbf309',

          ],
        },
          /*         {
                    label: ' Students',
                    data:['8','8.30','10','13'],
                    backgroundColor: [
                      'rgb(51, 133, 255)',
                      'rgb(101, 189, 56)',
                      'rgb(255, 51, 51)',
                      '#fbf309',
                    ],
          
                  } */
        ]
      },
      formErrors: { passwordValid: '', },
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    /*  this.DashboardDisplayFunc();
 */
    this.state.monthly_Profit = ((Number(this.state.SaleInvoice_Total_Amt) + Number(this.state.monthly_PurchaseInvoice)) - Number(this.state.monthly_ExpenseInvoice));

    console.log("", this.state.monthly_Profit, this.state.SaleInvoice_Total_Amt, this.state.monthly_PurchaseInvoice, this.state.monthly_ExpenseInvoice);

    /*   var ctx = document.getElementById("#myChart");
*/
    this.DeviceDetailRequest();
    this.AttendanceList();
/* 

     $(".demo").bootstrapNews({
    
      newsPerPage: 4,
      navigation: true,
      autoplay: true,
      direction:'up', // up or down
      animationSpeed: 'normal',
      newsTickerInterval: 4000, //4 secs
      pauseOnHover: true,
      onStop: null,
      onPause: null,
      onReset: null,
      onPrev: null,
      onNext: null,
      onToDo: null
      
      });  */

  }

  DeviceDetailRequest() {
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    var self = this;
    $.ajax({
      type: 'POST',
      // url:"http://localhost:8080/EmployeeAttendenceAPI/device/AllDeviceReport",
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/device/AllDeviceReport",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        //  console.log("data",data);
        if (data.length != 0) {
          var tab = '<thead><tr class="headcolor"  class="headcolor" style="color: white; background-color: #486885;" ><th>DeviceId</th><th>CompanyId</th><th>Org Name</th><th>Device Key Status</th><th>Device Status</th><th>LastOnlineTime</th><th>LastOfflineTime</th><th>Device State</th><th>DeActived Time</th></tr></thead>';
          var online = 0;
          var offline = 0;
          var active = 0;
          var deactive = 0;
          var noDevice = 0;
          $.each(data, function (i, item) {

            if (companyId == item.companyId) {
              noDevice = noDevice + 1;
              if (item.deviceStatus == "Online") {
                online = online + 1;
              } else {
                offline = offline + 1;
              }
              if (item.activeStatus == "Active") {
                active = active + 1;

              } else {
                deactive = deactive + 1;
              }
            }
          });
          console.log("dt", noDevice, online, offline, active, deactive);
          self.state.DevicechartData.datasets[0].data[0] = noDevice;

          self.state.DevicechartData.datasets[0].data[1] = online;
          self.state.DevicechartData.datasets[0].data[2] = offline;

          self.state.DevicechartData.datasets[0].data[3] = deactive;
          self.setState({
            DevicechartData: self.state.DevicechartData,
          });

        } else {
          $("#deviceStatus").hide();

        }

      }
    });
  }

  AttendanceList() {
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.state.employeeId = employeeId;
    this.state.companyName = companyName;
    this.setState({
      date: this.state.date,
      companyId: this.state.companyId,
      employeeId: this.state.employeeId,
      companyName: this.state.CompanyName,
    });

    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        date: this.state.date,
        companyId: this.state.companyId,
        employeeId: this.state.employeeId,
      }),
      //   url: "http://localhost:8080/EmployeeAttendenceAPI/EmployeeReport/employeeOrganizationAttendanceDailyReport",
      url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeReport/employeeOrganizationAttendanceDailyReport",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        var permanentcountAbsent = 0;
        var temporarycountAbsent = 0;
        var contractcountAbsent = 0;
        var permanentcountPresent = 0;
        var temporarycountPresent = 0;
        var contractcountPresent = 0;
        var permanentcountLeave = 0;
        var temporarycountLeave = 0;
        var contractcountLeave = 0;
        var noOfPermanentEmployee = 0;
        var noOfContractEmployee = 0;
        var noOfTemporaryEmployee = 0;
        var status;
        var color;
        // console.log("data",data);
        if (data.employeeRetrievelist.length != 0) {
          var j = 0;//no present
          var tab = '<thead><tr class="headcolor" style="color: white; background-color: #486885;" ><th>Id</th><th>Name</th><th>Dept</th><th>CheckIn</th><th>Location</th><th>CheckOut</th><th>Location</th></th><th>#WorkHour</th><th>Type</th></tr></thead>';
          $.each(data.employeeRetrievelist, function (i, item) {
            console.log("employee id", item.employeeId, " name", item.name, " chein", item.checkinTime);
            if (item.status == "P") {
              j = j + 1;

              status = "Present";
              tab += '<tr class="success" ><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>' + item.checkinTime + '</td><td>' + item.checkinLocation + '</td><td>' + item.checkoutTime + '</td><td>' + item.checkoutLocation + '</td><td>' + item.totalWorkHour + '</td><td>' + item.employeeType + '</td></tr>';
            }
          });
          if (j != 0) {
            $("#tableHeadings").append(tab);
          } else {
            $("#tableHeadings").append('<h3 align="center">No Data</h3>');

          }

        } else {
          $("#tableHeadings").append('<h3 align="center">No Data</h3>');
        }
      },
      error: function (data) {
        confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });

      }

    });

  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  /* 
    addProduct() {
      ReactDOM.render(
          <Router>
              <div>
  
                  <Route path="/" component={AddProduct} />
              </div>
          </Router>,
          document.getElementById('contentRender'));
  }
  addQuotation() {
    ReactDOM.render(
        <Router>
            <div>
  
                <Route path="/" component={GSTQuotation} />
            </div>
        </Router>,
        document.getElementById('contentRender'));
  }
  addSalesInvoice() {
    ReactDOM.render(
        <Router>
            <div>
  
                <Route path="/" component={SaleOrder} />
            </div>
        </Router>,
        document.getElementById('contentRender'));
  }
  addVendors() {
    ReactDOM.render(
        <Router>
            <div>
  
                <Route path="/" component={VendorEntryForm} />
            </div>
        </Router>,
        document.getElementById('contentRender'));
  }*/
  DashboardDisplayFunc(value) {

    var today = new Date();
    this.state.date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state.current_Month = today.getMonth() + 1;
    this.state.current_Year = today.getFullYear();


    var self = this;

    alert("this.state.date hi" + this.state.date + this.state.current_Month + this.state.current_Year);
    console.log("this.state.date", this.state.date + this.state.current_Month + this.state.current_Year);
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        date: this.state.date,
        current_Month: this.state.current_Month,
        current_Year: this.state.current_Year,

      }),
      url: "http://localhost:8080/EmployeeAttendenceAPI/Dashboard/SchoolDashboardDisplay",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        self.state.SaleInvoice_Total_Amt = data.monthly_SalesInvoice;
        self.state.monthly_PurchaseInvoice = data.monthly_PurchaseInvoice;
        self.state.monthly_ExpenseInvoice = data.monthly_ExpenseInvoice;
        self.state.total_No_of_Vendors = data.total_No_of_Vendors;
        self.state.total_No_of_ProductList = data.total_No_of_ProductList;
        self.state.total_No_of_SaleInvoice = data.total_No_of_SaleInvoice;
        self.state.total_No_of_WithGST_Quotation = data.total_No_of_WithGST_Quotation;
        self.state.total_No_of_SaleInvoice_Qty = data.total_No_of_SaleInvoice_Qty;
        self.state.total_No_of_SaleInvoice_Qty_Estimate = data.total_No_of_SaleInvoice_Qty_Estimate;
        self.state.total_No_of_Salary_paid = data.total_No_of_Salary_paid;
        self.state.total_Sales_Amount_Annually = data.total_Sales_Amount_Annually;
        self.state.total_Purchase_Amount_Annually = data.total_Purchase_Amount_Annually;

        self.state.doughnutData.datasets[0].data[0] = self.state.total_No_of_SaleInvoice_Qty;
        self.state.doughnutData.datasets[0].data[1] = self.state.total_No_of_Salary_paid;
        self.state.doughnutData.datasets[0].data[2] = self.state.monthly_ExpenseInvoice;


        var janvalue = 0;
        var febvalue = 0;
        var marvalue = 0;
        var aprvalue = 0;
        var mayvalue = 0;
        var junvalue = 0;
        var julvalue = 0;
        var augvalue = 0;
        var sepvalue = 0;
        var octvalue = 0;
        var novvalue = 0;
        var decvalue = 0;


        $.each(data.dashboard_LineChart_List, function (i, item) {
          if (item.current_Month == 1) {
            janvalue = item.monthly_SalesInvoice;


          }
          else if (item.current_Month == 2) {
            febvalue = item.monthly_SalesInvoice;

          } else if (item.current_Month == 3) {
            marvalue = item.monthly_SalesInvoice;

          } else if (item.current_Month == 4) {
            aprvalue = item.monthly_SalesInvoice;

          } else if (item.current_Month == 5) {
            mayvalue = item.monthly_SalesInvoice;

          } else if (item.current_Month == 6) {
            junvalue = item.monthly_SalesInvoice;

          } else if (item.current_Month == 7) {
            julvalue = item.monthly_SalesInvoice;

          } else if (item.current_Month == 8) {
            augvalue = item.monthly_SalesInvoice;

          } else if (item.current_Month == 9) {
            sepvalue = item.monthly_SalesInvoice;

          }
          else if (item.current_Month == 10) {
            octvalue = item.monthly_SalesInvoice;

          } else if (item.current_Month == 11) {
            novvalue = item.monthly_SalesInvoice;

          }
          else if (item.current_Month == 12) {
            decvalue = item.monthly_SalesInvoice;

          }
        });


        self.state.chartData.datasets[0].data[0] = janvalue;
        self.state.chartData.datasets[0].data[1] = febvalue;
        self.state.chartData.datasets[0].data[2] = marvalue;
        self.state.chartData.datasets[0].data[3] = aprvalue;
        self.state.chartData.datasets[0].data[4] = mayvalue;
        self.state.chartData.datasets[0].data[5] = junvalue;
        self.state.chartData.datasets[0].data[6] = julvalue;
        self.state.chartData.datasets[0].data[7] = augvalue;
        self.state.chartData.datasets[0].data[8] = sepvalue;
        self.state.chartData.datasets[0].data[9] = octvalue;
        self.state.chartData.datasets[0].data[10] = novvalue;
        self.state.chartData.datasets[0].data[11] = decvalue;

        $.each(data.dashboard_LineChart_List_purchase, function (i, item) {
          if (item.current_Month == 1) {
            janvalue = item.monthly_PurchaseInvoice;


          }
          else if (item.current_Month == 2) {
            febvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 3) {
            marvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 4) {
            aprvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 5) {
            mayvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 6) {
            junvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 7) {
            julvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 8) {
            augvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 9) {
            sepvalue = item.monthly_PurchaseInvoice;

          }
          else if (item.current_Month == 10) {
            octvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 11) {
            novvalue = item.monthly_PurchaseInvoice;

          }
          else if (item.current_Month == 12) {
            decvalue = item.monthly_PurchaseInvoice;

          }
        });


        self.state.chartData.datasets[1].data[0] = janvalue;
        self.state.chartData.datasets[1].data[1] = febvalue;
        self.state.chartData.datasets[1].data[2] = marvalue;
        self.state.chartData.datasets[1].data[3] = aprvalue;
        self.state.chartData.datasets[1].data[4] = mayvalue;
        self.state.chartData.datasets[1].data[5] = junvalue;
        self.state.chartData.datasets[1].data[6] = julvalue;
        self.state.chartData.datasets[1].data[7] = augvalue;
        self.state.chartData.datasets[1].data[8] = sepvalue;
        self.state.chartData.datasets[1].data[9] = octvalue;
        self.state.chartData.datasets[1].data[10] = novvalue;
        self.state.chartData.datasets[1].data[11] = decvalue;


        self.setState({
          SaleInvoice_Total_Amt: self.state.SaleInvoice_Total_Amt,
          monthly_PurchaseInvoice: self.state.monthly_PurchaseInvoice,
          monthly_ExpenseInvoice: self.state.monthly_ExpenseInvoice,
          total_No_of_Vendors: self.state.total_No_of_Vendors,
          total_No_of_ProductList: self.state.total_No_of_ProductList,
          total_No_of_SaleInvoice: self.state.total_No_of_SaleInvoice,
          total_No_of_WithGST_Quotation: self.state.total_No_of_WithGST_Quotation,
          total_No_of_SaleInvoice_Qty: self.state.total_No_of_SaleInvoice_Qty,
          total_No_of_SaleInvoice_Qty_Estimate: self.state.total_No_of_SaleInvoice_Qty_Estimate,
          total_No_of_Salary_paid: self.state.total_No_of_Salary_paid,
          total_Sales_Amount_Annually: self.state.total_Sales_Amount_Annually,
          total_Purchase_Amount_Annually: self.state.total_Purchase_Amount_Annually,


        });

        console.log("this.state.date", data, data.SaleInvoice_Total_Amt, self.state.SaleInvoice_Total_Amt, self.state.dashboard_LineChart_List);
        var no;
        var tab = '<thead><tr class="headcolor" style="background-color: #91c5f5;"><th>Sr.No</th><th>Invoice</th><th>Date</th><th>Name</th><th>Status</th><th>Total</th></tr></thead>';
        $.each(data.dailyInvoiceList, function (i, item) {
          no = parseInt(i) + 1;
          tab += '<tbody id= "myTable" ><tr class="success"  id="tabletextcol" ><td>' + no + '</td><td>' + item.invoiceNo + '</td><td>' + item.date + '</td><td>' + item.userName + '</td>'
            + '<td>' + item.status + '</td><td>' + item.subTotal + '</td></tr></tbody>';


          /*  tab += '<tbody id= "myTable" ><tr class="success"  id="tabletextcol" ><td>' + item.id + '</td><td>' + item.invoiceNo + '</td><td>' + item.date + '</td><td>' + item.userName + '</td><td>' + item.contact + '</td>'
            +'<td>'+item.status+'</td><td>'+item.balanceAmt+'</td><td>'+item.total+'</td>'
            +'<td><button id="delete">Delete</button></td>'
            +'<td><button id="view" class="Update" data-toggle="modal" data-target="#myModalview" >View</button></td>'
            +'<td><button id="edit" class="Update" data-toggle="modal" data-target="#myModaledit">Edit</button></td></tr></tbody>';
  */
        });
        $("#tableHeadings").append(tab);

      },
      error: function (data) {
        confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });

      }
    });



  }


  render() {


    return (
      <div style={{ backgroundColor: "#efebeb" }} class="container-fluid">
        <div class="content-wrapper" style={{ minHeight: "914px" }}>
          {/*   <!-- Content Header (Page header) --> */}
          <section class="content-header sty-one">
            <h1>Dashboard</h1>

          </section>
          {/*   <!-- Main content --> */}
          <section class="content">
            {/*  <h3>line graph yearly Earnings</h3> */}

            <div id="dispchart" className="chart">

            </div>

            <div class="row"  >
              <div class="col-lg-4 col-sm-12 col-xs-12 ">
                <div class="tile-progress tile-pink">
                  <div class="tile-header"
                    style={{
                      textAlign: "center",
                      backgroundColor: "#ec3b83",
                      padding: "20px 0px",
                      color: "white"
                    }}>

                    <h3>132 / 200<span id="ContentPlaceHolder1_Lbl_monthlysale">{this.state.SaleInvoice_Total_Amt}</span></h3>
                  </div>
                  {/*   <i class   = "material-icons" style = {{fontSize: "48px",color:        "red"}}>school</i>

 */}                  <div class="progress" style={{ height: "5px", marginBottom: "0px", backgroundColor: "rgb(250, 250, 250)" }}>
                    <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }}>

                    </div>    </div>
                  <div class="tile-footer"
                    style={{
                      textAlign: "center",
                      backgroundColor: "rgb(212, 53, 118)",
                      padding: "6px 0px",
                      color: "white",
                      marginBottom: "15px",
                    }}>
                    <h5>Active Staff / Registered Staff</h5>
                  </div>

                </div>
              </div>
              <div class="col-lg-4 col-sm-12 col-xs-12">
                <div class="tile-progress tile-red">
                  <div class="tile-header"
                    style={{
                      textAlign: "center",
                      backgroundColor: "#f56954",
                      padding: "20px 0px",
                      color: "white"
                    }}>

                    <h3> 75/ 80<span id="ContentPlaceHolder1_Lbl_monthlypurchase">{this.state.monthly_PurchaseInvoice}</span></h3>
                  </div>
                  <div class="progress" style={{ height: "5px", marginBottom: "0px", backgroundColor: "rgb(250, 250, 250)" }}>
                    <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }}>

                    </div>
                    {/* 
                    <div class="progress-bar" style={{ width: "55.50%", height: "20px", backgroundColor: "white" }}></div>
             */}      </div>
                  <div class="tile-footer"
                    style={{
                      textAlign: "center",
                      backgroundColor: "rgb(220, 94, 75)",
                      padding: "6px 0px",
                      color: "white",
                      marginBottom: "15px",

                    }}>
                    <h5>Active Non Teaching Staff / Registered Non Teaching Staff</h5>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-sm-12 col-xs-12">
                <div class="tile-progress tile-red">
                  <div class="tile-header"
                    style={{
                      textAlign: "center",
                      backgroundColor: "rgb(65, 170, 168)",
                      padding: "20px 0px",
                      color: "white"
                    }}>

                    <h3>554 / 750<span id="ContentPlaceHolder1_Lbl_monthlypurchase">{this.state.monthly_PurchaseInvoice}</span></h3>
                  </div>
                  <div class="progress" style={{ height: "5px", marginBottom: "0px", backgroundColor: "rgb(250, 250, 250)" }}>
                    <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }}>

                    </div>
                    {/* 
                    <div class="progress-bar" style={{ width: "55.50%", height: "20px", backgroundColor: "white" }}></div>
             */}      </div>
                  <div class="tile-footer"
                    style={{
                      textAlign: "center",
                      backgroundColor: "rgb(26, 113, 111)",
                      padding: "6px 0px",
                      color: "white",
                      marginBottom: "15px",

                    }}>
                    <h5>Active Student / Registered Student</h5>
                  </div>
                </div>
              </div>
              {/*   <div class="col-lg-3">
                <div class="tile-progress tile-aqua">
                  <div class="tile-header"
                    style={{
                      textAlign: "center",
                      backgroundColor: "rgb(0, 192, 239)",
                      padding: "5px 0px",
                      color: "white"
                    }}>

                    <h3>1000 <span id="ContentPlaceHolder1_Lbl_monthlyprofit">{this.state.monthly_Profit}</span></h3>
                  </div>
                  <div class="progress" style={{ height: "5px", marginBottom: "0px", backgroundColor: "rgb(0, 192, 239)" }}>
                  <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width:"80%"}}>
     
     </div>   </div>
                  <div class="tile-footer"
                    style={{
                      textAlign: "center",
                      backgroundColor: "rgb(0, 172, 215)",
                      padding: "6px 0px",
                      color: "white",
                      marginBottom: "15px",
                    }}>
                    <h6>Active Students</h6>
                  </div>
                </div>
              </div> */}

            </div>
            {/*   <!-- /.row -->
       */}


            <div style={{
              paddingTop: "`0px", backgroundColor: "#e6c9c90f",

              /*   boxShadow: "5px 15px 43px -7px #271616" */
            }} className="col-lg-12 col-sm-12 col-xs-12">

              <div id="dispchart"
                style={{
                  backgroundColor: "white",
                  padding: "25px 0px",
                  borderColor: "#efe9e9",
                  borderStyle: "solid",
                  borderWidth: "12px",
                  /*   boxShadow: "5px 15px 43px -7px #271616" */
                }}



                className="chart col-lg-4">

                <Pie data={this.state.chartData} width={50} height={200} options={{
                  maintainAspectRatio: false, title: {
                    display: true,
                    text: "STAFF STATISTICS",
                  }
                }} />

              </div>
              <div id="dispchart"
                style={{
                  backgroundColor: "white",
                  padding: "25px 0px",
                  borderColor: "#efe9e9",
                  borderStyle: "solid",
                  borderWidth: "12px",
                  /*   boxShadow: "5px 15px 43px -7px #271616" */
                }} className="chart col-lg-4">

                <Pie data={this.state.studentData} width={50} height={200} options={{
                  maintainAspectRatio: false, title: {
                    display: true,
                    text: "STUDENTS STATISTICS",
                  }
                }} />

              </div>

              <div id="dispchart"
                style={{
                  backgroundColor: "white",
                  padding: "25px 0px",
                  borderColor: "#efe9e9",
                  borderStyle: "solid",
                  borderWidth: "12px",
                  /*   boxShadow: "5px 15px 43px -7px #271616" */
                }} className="chart col-lg-4">
                {/*<h3>Device Status</h3>*/}
                <Pie id="deviceStatus" data={this.state.DevicechartData} width={50} height={200} options={{
                  maintainAspectRatio: false, title: {
                    display: true,
                    text: "DEVICE STATUS"
                  }
                }} />

              </div>
              {/*       <div id="dispchart" className="chart col-lg-4" > 
              {/*<h3>Role based Time</h3>*}
                 <Pie data={this.state.chartData} width={50} height={200} options={{
                maintainAspectRatio: false
            }}/>
                
                </div> */}
            </div>

            <div className="col-lg-12 col-sm-12 col-xs-12">

              <div id="dispchart"
                style={{
                  backgroundColor: "white",
                  padding: "25px 0px",
                  borderColor: "#efe9e9",
                  borderStyle: "solid",
                  borderWidth: "12px",
                  /*   boxShadow: "5px 15px 43px -7px #271616" */
                }}
                className="chart col-lg-6">

                <Doughnut data={this.state.staffMorningChartData} width={50} height={200} options={{
                  maintainAspectRatio: false, title: {
                    display: true,
                    text: "STAFF-ATTENDANCE MORNING SESSION",
                  }
                }} />

              </div>

              <div id="dispchart"
                style={{
                  backgroundColor: "white",
                  padding: "25px 0px",
                  borderColor: "#efe9e9",
                  borderStyle: "solid",
                  borderWidth: "12px",
                  /*   boxShadow: "5px 15px 43px -7px #271616" */
                }} className="chart col-lg-6">

                <Doughnut data={this.state.staffAfternoonChartData} width={50} height={200} options={{
                  maintainAspectRatio: false, title: {
                    display: true,
                    text: "STAFF-ATTENDANCE AFTERNOON SESSION",
                  }
                }} />

              </div>
            </div>







            {/*  <div class="col-lg-3">
            
                    <div class="col-xl-3 m-b-2 text-center">
                      <h6 class="f-14">sale qty.</h6>
                      <h4 id="Donut1">10020</h4>
                    </div>
                    <div class="col-xl-3 m-b-2 text-center">
                      <h6 class="f-14">Paid salary</h6>
                      <h4 id="Donut2">9000</h4>
                    </div>
                    <div class="col-xl-3 m-b-2 text-center">
                      <h6 class="f-14">Total exp.</h6>
                      <h4 id="Donut3">65</h4>
                    </div>
                  </div>  */}



            {/*  <div class="col-4">
                    <div class="d-flex flex-wrap">
                      <div>
                        <h5 class="m-b-15">Statistics</h5>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-xl-4 m-b-2 text-center">
                      <h6 class="f-14">sale qty.</h6>
                      <h4 id="Donut1">10020</h4>
                    </div>
                    <div class="col-xl-4 m-b-2 text-center">
                      <h6 class="f-14">Paid salary</h6>
                      <h4 id="Donut2">9000</h4>
                    </div>
                    <div class="col-xl-4 m-b-2 text-center">
                      <h6 class="f-14">Total exp.</h6>
                      <h4 id="Donut3">65</h4>
                    </div>
                  </div> */}






          </section>
          <section class="content-header sty-one">
            <h4 style={{ textAlign: "center" }}>Recent Attendance</h4>
            <div style={{ overflow: "auto" }}>          <table class="table" id="tableHeadings" style={{ marginBottom: "10%" }} >
            </table>
            </div>

          </section>

     {/*      <div class="panel panel-default">
            <div class="panel-heading"> <span class="glyphicon glyphicon-list-alt"></span><b>News</b></div>

            <div class="panel-body">

              <div class="row">

                <div class="col-xs-12">

                  <ul class="demo">

                    <li class="news-item">

                      <table cellpadding="4">

                        <tr>

                          <td><img src="images/1.png" width="60" class="img-circle" /></td>

                          <td> News 1<a href="#">Read more...</a></td>

                        </tr>

                      </table>

                    </li>

                    <li class="news-item">

                      <table cellpadding="4">

                        <tr>

                          <td><img src="images/2.png" width="60" class="img-circle" /></td>

                          <td> News 2<a href="#">Read more...</a></td>

                        </tr>

                      </table>

                    </li>

                    <li class="news-item">

                      <table cellpadding="4">

                        <tr>

                          <td><img src="images/3.png" width="60" class="img-circle" /></td>

                          <td> News 3<a href="#">Read more...</a></td>

                        </tr>

                      </table>

                    </li>

                  </ul>

                </div>

              </div>

            </div>

            <div class="panel-footer"> </div>

          </div> */}
        </div>

      </div >
    );
  }

}
export default DashboardDisplay;


//0000000000000000000000000
/* var ctx;

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
}); */