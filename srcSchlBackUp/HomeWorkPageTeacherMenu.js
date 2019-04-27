import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Homework.css';
import './HomeWorkPageTeacherMenu.css';
import $ from 'jquery';
import CryptoJS from 'crypto-js';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import './HomeWorkPageTeacherMenu.css';
//js
import EmployeeMenuPage from './EmployeeMenuPage';
import FooterText from './FooterText';
import AddHomeWork from './AddHomeWork';
import ExamSchedule from './ExamSchedule';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import HomeWorkEvalutionPage from './HomeWorkEvalutionPage';
import TimeTable from './TimeTable';
import Calendar from './Calendar';
import { confirmAlert } from 'react-confirm-alert';
import ClassHistory from './ClassHistory';
import ViewTimeTable1 from './ViewTimeTable';
import ViewTeacherTimeTable from './ViewTeacherTimeTable';

class HomeWorkPageTeacherMenu extends Component {

    constructor() {

        super()
        var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        this.state = {

            companyId: '',

        };
    }

    componentDidMount() {

    }

    openNav() {
        document.getElementById("mySidenav").style.width = "300px";
        document.getElementById("body").style.backgroundColor = "white";
        // document.getElementById("test").style.height = "100vh";


        /* document.getElementById("body").style.marginLeft = "250px";
        document.getElementById("body").style.backgroundColor  = "rgba(0,0,0,0.4)";
        */

    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("body").style.backgroundColor = "white";

        //document.getElementById("test").style.height = "0vh";

        /* document.getElementById("body").style.marginLeft = "0";
        document.getElementById("body").style.backgroundColor  = "white";
         */

    }



    AddHomeWork() {
        ReactDOM.render(
            <Router >
                <div>
                    <Route path="/" component={AddHomeWork} />
                </div>
            </Router>, document.getElementById('contentRender'));

    }
    AddTimeTable() {

        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={TimeTable} />

                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }

    TimeTable() {
        ReactDOM.render(
            <Router >
                <div>

                    <Route path="/" component={ViewTeacherTimeTable} />


                </div>
            </Router>, document.getElementById('contentRender'));
    }
    ExamSchedule() {
        confirmAlert({
            title: 'Service Message',                        // Title dialog
            message: 'Still In Progress',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
        });
    }

    SchoolReport() {
        ReactDOM.render(
            <Router >
                <div>

                    <Route path="/" component={ClassHistory} />

                </div>
            </Router>, document.getElementById('contentRender'));

    }
    Evaluation() {
        ReactDOM.render(
            <Router >
                <div>

                    <Route path="/" component={HomeWorkEvalutionPage} />

                </div>
            </Router>, document.getElementById('contentRender'));
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
    render() {
        return (
            <div className="container" id="body" style={{ display: "" }}

            >

                {/* 
                 <ul class="previous disabled" id="backbutton"
                    style={{
                        backgroundColor: "#f1b6bf",
                        float: "none",
                        display: "inline-block",
                        marginLeft: "5px",
                        borderRadius: "5px",
                        padding: "3px 7px 3px 7px"
                    }}>
                    <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i></a></ul> */}
         {/*        <li style={{ float: "right" }} ><a style={{ color: "white", backgroundColor: "#26425c" }}><span style={{ color: "white", backgroundColor: "#26425c" }} onClick={() => this.openNav()}>&#9776;</span></a></li>

               */} 
               <div id='horMenu'  >

                    <h3 id='horMenunew' class="ulmenubar" style={{ color: "white", padding: "10px 0px", textAlign: "center" }}>  School Management</h3>
                    <div>
                        <ul id="id01">
                            <li style={{cursor:"pointer"}}  onClick={() => this.TimeTable()}>View TimeTable</li>
                            <li  style={{cursor:"pointer"}}  onClick={() => this.AddTimeTable()}>Add TimeTable</li>
                            <li  style={{cursor:"pointer"}}  onClick={() => this.AddHomeWork()}>Assign Homework</li>
                            <li  style={{cursor:"pointer"}}  onClick={() => this.Evaluation()}>HomeWork Evaluation</li>
                            <li  style={{cursor:"pointer"}}  onClick={() => this.SchoolReport()}>HomeWork Report</li>
                            
                        </ul>
                    </div>

                   {/*  <div id="test" style={{ height: "100vh" }} onClick={() => this.closeNav()}>
                    </div>
                    <div id="mySidenav" class="sidenav">
                        <a href="javascript:void(0)" class="closebtn" onClick={() => this.closeNav()}>&times;</a>
                        <a href="#" onClick={() => this.TimeTable()} >View TimeTable</a>
                        <a href="#" onClick={() => this.AddTimeTable()} >Add TimeTable</a>
                        <a href="#" onClick={() => this.AddHomeWork()} >Assign Homework</a>
                        <a href="#" onClick={() => this.Evaluation()} >HomeWork Evaluation </a>
                        <a href="#" onClick={() => this.SchoolReport()}> HomeWork Report</a>

                    </div> */}

                </div>
            </div>







        );
    }

}


export default HomeWorkPageTeacherMenu;