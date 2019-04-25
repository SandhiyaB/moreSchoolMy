import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Homework.css';
import $ from 'jquery';
import CryptoJS from 'crypto-js';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import Maintenance from './Maintenance';
import AddNewDepartment from './AddNewDepartment';
import RemoveDepartment from './RemoveDepartment';
import FooterText from './FooterText';

import EmployeeMenuPage from './EmployeeMenuPage';
import AddHomeWork from './AddHomeWork';
import ExamSchedule from './ExamSchedule';

import HomeWorkEvaluationPage from './HomeWorkEvalutionPage';
import StudentHistory from './StudentHistory'
import ClassHistory from './ClassHistory'
class Calendar extends Component {

    constructor() {

        super()
        var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      
        this.state = {
            shift1:'',
            shift2:'',
            shift3:'',
            shift4:'',
            shift5:'',
            shift6:'',
            shift7:'',
            shift8:'',
            monday:'',
            tuesday:'',
            wednesday:'',
            thursday:'',
            friday:'',
            saturday:'',
            shift1From: '',
            shift2From: '',
            shift3From: '',
            shift4From: '',
            shift5From: '',
            shift6From: '',
            shift7From: '',
            shift8From: '',
            shift1To:'',
            shift2To:'',
            shift3To:'',
            shift4To:'',
            shift5To:'',
            shift6To:'',
            shift7To:'',
            shift8To:'',
            shiftTime: '',
            from: '',
            to: '',
            companyId: '',
            totalNoOfShift: '',
            superiorId:superiorId,
        };
    }

    componentDidMount() {
        
        window.scrollTo(0, 0);
        $("#shiftNo1").hide();
        $("#shiftNo2").hide();
        $("#shiftNo3").hide();
        $("#shiftNo4").hide();
        $("#shiftNo5").hide();
        $("#shiftNo6").hide();
        $("#shiftNo7").hide();
        $("#shiftNo8").hide();
        $("#monday").hide();
        $("#tuesday").hide();
        $("#wednesday").hide();
        $("#thursday").hide();
        $("#friday").hide();
        $("#saturday").hide();
        $("#ShiftTable").hide();
        this.TimePicker();
       // window.scrollTo(0, 0);
    
            }
            TimePicker(){
                $('#shift1From').timepicker({
                   onSelect: function(time) {
                    $("#shift1To").timepicker('option', 'minTime', time);
    
                  this.state.shift1From=time;
                  this.setState({
                    shift1From:time,
                   });
                  },
    
                  timeFormat: 'H:i:s',
                 });
    
                $('#shift1To').timepicker({ onSelect: function(time) {
                    $("#shift1From").timepicker('option', 'maxTime', time);
    
                  this.state.shift1To=time;
                  this.setState({
                    shift1To:time,
                   });
    
                  },
    
                  timeFormat: 'H:i:s',
    
                 });
            $('#shift2From').timepicker({
                   onSelect: function(time) {
                    $("#shift2To").timepicker('option', 'minTime', time);
    
                  this.state.shift2From=time;
                  this.setState({
                    shift2From:time,
                   });
                  },
    
                  timeFormat: 'H:i:s',
                 });
    
                $('#shift2To').timepicker({ onSelect: function(time) {
                    $("#shift2From").timepicker('option', 'maxTime', time);
    
                  this.state.shift2To=time;
                  this.setState({
                    shift2To:time,
                   });
    
                  },
    
                  timeFormat: 'H:i:s',
    
                 });
    
                $('#shift3From').timepicker({
                   onSelect: function(time) {
                    $("#shift3To").timepicker('option', 'minTime', time);
    
                  this.state.shift3From=time;
                  this.setState({
                    shift3From:time,
                   });
                  },
    
                  timeFormat: 'H:i:s',
                 });
    
                $('#shift3To').timepicker({ onSelect: function(time) {
                    $("#shift3From").timepicker('option', 'maxTime', time);
    
                  this.state.shift3To=time;
                  this.setState({
                    shift3To:time,
                   });
    
                  },
    
                  timeFormat: 'H:i:s',
    
                 });
                 
                 $('#shift4From').timepicker({
                    onSelect: function(time) {
                     $("#shift4To").timepicker('option', 'minTime', time);
     
                   this.state.shift1From=time;
                   this.setState({
                     shift1From:time,
                    });
                   },
     
                   timeFormat: 'H:i:s',
                  });
     
                 $('#shift4To').timepicker({ onSelect: function(time) {
                     $("#shift4From").timepicker('option', 'maxTime', time);
     
                   this.state.shift1To=time;
                   this.setState({
                     shift1To:time,
                    });
     
                   },
     
                   timeFormat: 'H:i:s',
     
                  });
                  $('#shift5From').timepicker({
                    onSelect: function(time) {
                     $("#shift5To").timepicker('option', 'minTime', time);
     
                   this.state.shift1From=time;
                   this.setState({
                     shift1From:time,
                    });
                   },
     
                   timeFormat: 'H:i:s',
                  });
     
                 $('#shift5To').timepicker({ onSelect: function(time) {
                     $("#shift5From").timepicker('option', 'maxTime', time);
     
                   this.state.shift1To=time;
                   this.setState({
                     shift1To:time,
                    });
     
                   },
     
                   timeFormat: 'H:i:s',
     
                  });
                  $('#shift6From').timepicker({
                    onSelect: function(time) {
                     $("#shift6To").timepicker('option', 'minTime', time);
     
                   this.state.shift1From=time;
                   this.setState({
                     shift1From:time,
                    });
                   },
     
                   timeFormat: 'H:i:s',
                  });
     
                 $('#shift6To').timepicker({ onSelect: function(time) {
                     $("#shift6From").timepicker('option', 'maxTime', time);
     
                   this.state.shift1To=time;
                   this.setState({
                     shift1To:time,
                    });
     
                   },
     
                   timeFormat: 'H:i:s',
     
                  });
                  $('#shift7From').timepicker({
                    onSelect: function(time) {
                     $("#shift7To").timepicker('option', 'minTime', time);
     
                   this.state.shift1From=time;
                   this.setState({
                     shift1From:time,
                    });
                   },
     
                   timeFormat: 'H:i:s',
                  });
     
                 $('#shift7To').timepicker({ onSelect: function(time) {
                     $("#shift7From").timepicker('option', 'maxTime', time);
     
                   this.state.shift1To=time;
                   this.setState({
                     shift1To:time,
                    });
     
                   },
     
                   timeFormat: 'H:i:s',
     
                  });
                  $('#shift8From').timepicker({
                    onSelect: function(time) {
                     $("#shift8To").timepicker('option', 'minTime', time);
     
                   this.state.shift1From=time;
                   this.setState({
                     shift1From:time,
                    });
                   },
     
                   timeFormat: 'H:i:s',
                  });
     
                 $('#shift8To').timepicker({ onSelect: function(time) {
                     $("#shift8From").timepicker('option', 'maxTime', time);
     
                   this.state.shift1To=time;
                   this.setState({
                     shift1To:time,
                    });
     
                   },
     
                   timeFormat: 'H:i:s',
     
                  });
            }
            handleDayInput = (e) =>{
                
                const name = e.target.name;
                const value = e.target.value;
                this.setState({
                    [name]: value,
                });
                if ((value == "a")||(value == "b")||(value == "c")||(value == "d")||(value == "e")||(value == "f") ){
                    window.scrollTo(0, 0);       
                    $("#shift").val('');
                    $("#ShiftTable").hide();
                    $("#monday").show();
                }
                else{
                    $("#monday").hide();
                }
              /*  if (value == "a") {
                    window.scrollTo(0, 0);
                    $("#Shift").val(' ');
                    $("#monday").show();
                                     
                } else if (value == "b") {
                    window.scrollTo(0, 0);
                    $("#Shift").val(' ');
                    $("#monday").show();
                                     
                   

                }else if (value == "c") {
                    window.scrollTo(0, 0);
                    $("#Shift").val(' ');
                    $("#monday").show();
                                     
            
                }
                else if (value == "d") {
                    window.scrollTo(0, 0);
                    $("#Shift").val(' ');
                    $("#monday").show();                                    

                }
                else if (value == "e") {
                    window.scrollTo(0, 0);
                    $("#Shift").val(' ');
                    $("#monday").show();
                                     
                }
                else {
                    window.scrollTo(0, 0);
                    $("#Shift").val(' ');
                    $("#monday").show();                                  
            
                }*/
             

            }
            handleShiftInput = (e) => {
                const name = e.target.name;
                const value = e.target.value;
                this.setState({
                    [name]: value,
                });
              
                if (value == 1) {
                    $("#ShiftTable").show();
                    $("#shiftNo1").show();
                    $("#shiftNo2").hide();
                    $("#shiftNo3").hide();
                    $("#shiftNo4").hide();
                    $("#shiftNo5").hide();
                    $("#shiftNo6").hide();
                    $("#shiftNo7").hide();
                    $("#shiftNo8").hide();
                    
                } else if (value == "2") {
                    $("#ShiftTable").show();        
                    $("#shiftNo1").show();
                    $("#shiftNo2").show();
                    $("#shiftNo3").hide();
                    $("#shiftNo4").hide();
                    $("#shiftNo5").hide();
                    $("#shiftNo6").hide();
                    $("#shiftNo7").hide();
                    $("#shiftNo8").hide();
                }else if (value == 3) {
                    $("#ShiftTable").show();        
                    $("#shiftNo1").show();
                    $("#shiftNo2").show();
                    $("#shiftNo3").show();
                    $("#shiftNo4").hide();
                    $("#shiftNo5").hide();
                    $("#shiftNo6").hide();
                    $("#shiftNo7").hide();
                    $("#shiftNo8").hide();
                }
                else if (value == 4) {
                    $("#ShiftTable").show();        
                    $("#shiftNo1").show();
                    $("#shiftNo2").show();
                    $("#shiftNo3").show();
                    $("#shiftNo4").show();
                    $("#shiftNo5").hide();
                    $("#shiftNo6").hide();
                    $("#shiftNo7").hide();
                    $("#shiftNo8").hide();
                }
                else if (value == 5) {
                    $("#ShiftTable").show();        
                    $("#shiftNo1").show();
                    $("#shiftNo2").show();
                    $("#shiftNo3").show();
                    $("#shiftNo4").show();
                    $("#shiftNo5").show();
                    $("#shiftNo6").hide();
                    $("#shiftNo7").hide();
                    $("#shiftNo8").hide();
                }
                else if (value == 6) {
                    $("#ShiftTable").show();        
                    $("#shiftNo1").show();
                    $("#shiftNo2").show();
                    $("#shiftNo3").show();
                    $("#shiftNo4").show();
                    $("#shiftNo5").show();
                    $("#shiftNo6").show();
                    $("#shiftNo7").hide();
                    $("#shiftNo8").hide();
                }
                else if (value == 7) {
                    $("#ShiftTable").show();        
                    $("#shiftNo1").show();
                    $("#shiftNo2").show();
                    $("#shiftNo3").show();
                    $("#shiftNo4").show();
                    $("#shiftNo5").show();
                    $("#shiftNo6").show();
                    $("#shiftNo7").show();
                    $("#shiftNo8").hide();
                }
                else {
                    $("#ShiftTable").show();
                    $("#shiftNo1").show();
                    $("#shiftNo2").show();
                    $("#shiftNo3").show();
                    $("#shiftNo4").show();
                    $("#shiftNo5").show();
                    $("#shiftNo6").show();
                    $("#shiftNo7").show();
                    $("#shiftNo8").show();           
        
                }
              
            }
        
            handleFrom = (e) => {
                const name = e.target.name;
                const value = e.target.value;
                const id = e.target.id;
                var no;
                this.setState({
                    [name]: value,
                   /*  [id]: true */
                },
                );
        
                if (id == "shift1From") {
                    no = "shift1";
                } else if (id == "shift2From") {
                    no = "shift2";
                }else if (id == "shift3From") {
                    no = "shift3";
                }
                else if (id == "shift4From") {
                    no = "shift4";
                }
                else if (id == "shift5From") {
                    no = "shift5";
                }
                else if (id == "shift6From") {
                    no = "shift6";
                }
                else if (id == "shift7From") {
                    no = "shift7";
                }
                 else {
                    no = "shift8";
                }
        
                $("#"+ no +"To").timepicker('option','minTime', value);
                var statename= no + "To";
                if(value>this.state[statename]){
                    this.setState({
                       [statename]:'',
                    })
                }
        
            }
            handleTo = (e) => {
                const name = e.target.name;
                const value = e.target.value;
                const id = e.target.id;
                this.setState({
                    [name]: value,
        
                },
               );
                //$("#shift1").timepicker('option', 'maxTime', value);
                var totalshift = this.state.totalNoOfShift;
                var no;
                if (id == "shift1To") {
                    no = "shift2";
                    this.state.shift1="1";
                    this.setState({
                        shift1:this.state.shift1,
                    })
                } else if (id == "shift2To") {
                    no = "shift3";
                    this.state.shift2="2";
                    this.setState({
                        shift2:this.state.shift2,
                    })
        
                }else if (id == "shift3To") {
                    no = "shift4";
                    this.state.shift3="3";
                    this.setState({
                        shift3:this.state.shift3,
                    })
        
                }
                else if (id == "shift4To") {
                    no = "shift5";
                    this.state.shift4="4";
                    this.setState({
                        shift4:this.state.shift4,
                    })
        
                }else if (id == "shift5To") {
                    no = "shift6";
                    this.state.shift5="5";
                    this.setState({
                        shift5:this.state.shift5,
                    })
        
                }
                else if (id == "shift6To") {
                    no = "shift7";
                    this.state.shift6="6";
                    this.setState({
                        shift6:this.state.shift6,
                    })
        
                }
                else if (id == "shift7To") {
                    no = "shift8";
                    this.state.shift7="7";
                    this.setState({
                        shift7:this.state.shift7,
                    })
        
                }
                 else {
                    no = "shift1";
                    this.state.shift8="8";
                    this.setState({
                        shift8:this.state.shift8,
                    })
        
                }
                 
            }
            
            ClassHomeWorkHistory(){

              
                
                      ReactDOM.render(
                        <Router>
                          <div>
                            <Route path="/" component={ClassHistory} />
                 
                          </div>
                        </Router>,
                        document.getElementById('contentRender'));
                      registerServiceWorker();
                    
                }

   
    AddHomeWork() {
		ReactDOM.render(
			<Router >
				<div>
						<Route path="/" component={AddHomeWork} />
			   
				</div>
			</Router>, document.getElementById('contentRender'));

	}

    AddTimeTable(){
        ReactDOM.render(
			<Router >
				<div>
					<Route path="/" component={Calendar} />
			    
				</div>
			</Router>, document.getElementById('contentRender'));
    }
    ExamSchedule()
    {
        ReactDOM.render(
			<Router >
				<div>
					<Route path="/" component={ExamSchedule} />
			    
				</div>
			</Router>, document.getElementById('contentRender'));
    }
    Evaluation(){
        ReactDOM.render(
			<Router >
				<div>
					<Route path="/" component={HomeWorkEvaluationPage} />
			     	
				</div>
			</Router>, document.getElementById('contentRender'));
    }
    render() {
        return (
            <div className="container"
                style={{ backgroundColor: "#edf5e1" }}>
                   <div >
    
   
                <h3><b>TimeTable</b></h3>
    <label for="day">Select Day </label>
      <div ><select name="day" style={{width:"50%"}} id="day"
                            onChange={this.handleDayInput} required>
                            <option value="" disabled selected hidden>Select Day</option>
                            <option value="a">Monday</option>
                            <option value="b">Tuesday</option>
                            <option value="c">Wednesday</option>
                            <option value="d">Thursday</option>
                            <option value="e">Friday</option>
                            <option value="f">Saturday</option>                           
                        </select>
                    </div>
    </div>
    <div class="col-md-10 col-md-border" id="monday">
  
    <label for="shift">Total Number of Periods</label>
      <div ><select name="totalNoOfShift" style={{width:"50%"}} id="shift"
                            onChange={this.handleShiftInput} required>
                            <option value="" disabled selected hidden>select #periods</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </div>
       <table id="ShiftTable" style={{ overflowX: "auto",overflowY:"auto"}}>
          <tr><div ><td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><th >Period</th> </td><td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><th >Name</th></td><td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><th >From</th></td><td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><th>To</th></td></div></tr>
             <tr id="shiftNo1">
             <div id="Shift1">
                  <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><label for="shift1" >Period-1</label></td>
                  <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input class="form-control" id="inputdefault" type="text" /></td>
                  <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"> <input type="text" id="shift1From" name="shift1From" style={{ width: "65%" }}
                                data-step="5" value={this.state.shift1From} onSelect={this.handleFrom}
                                        className="form-control"
                                        placeholder="Enter Start Time" />
                                </td>                  
                  <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input type="text" style={{ width: "65%" }} data-step="5"
                                        value={this.state.shift1To}
                                        required
                                        name="shift1To"
                                        onSelect={this.handleTo}
                                        className="form-control"
                                        id="shift1To"
                                        placeholder="Enter End Time"/></td>
                            </div>
                        </tr>

               <tr id="shiftNo2">
               <div id="Shift2">
                 <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><label for="shift2" >Period-2</label></td>
                 <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input class="form-control" id="inputdefault" type="text" /></td>                   
                 <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input type="text" id="shift2From" name="shift2From" style={{ width: "65%" }}
                            data-step="5" value={this.state.shift2From} required
                                        onSelect={this.handleFrom}
                                        className="form-control"
                                        placeholder="Enter Start Time" /></td>
                  <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input  type="text"  style={{ width: "65%" }}
                                      data-step="5"
                                      value={this.state.shift2To}
                                      required
                                      name="shift2To"
                                      onSelect={this.handleTo}
                                      className="form-control"
                                      id="shift2To"
                                      placeholder="Enter End Time" /></td>
                            </div>
                        </tr>

          <tr id="shiftNo3">
          <div id="Shift3">
          <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><label for="shift3" > Period-3</label> </td>
          <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input class="form-control" id="inputdefault" type="text" /></td>  
          <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input type="text" id="shift3From" name="shift3From" style={{ width: "65%" }}
                       data-step="5" value={this.state.shift3From}  required
                       onSelect={this.handleFrom} className="form-control"
                                        placeholder="Enter Start Time"/>  </td>
          <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"> <input type="text" style={{ width: "65%" }} data-step="5"
                                       value={this.state.shift3To}
                                       required
                                       name="shift3To"
                                       onSelect={this.handleTo}
                                       className="form-control"
                                       id="shift3To"
                                       placeholder="Enter End Time" />
                                </td>
                            </div>
                        </tr>

<tr id="shiftNo4">
<div id="Shift4">
    <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><label for="shift4" >Period-4:</label></td>
    <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input class="form-control" id="inputdefault" type="text" /></td>  
    <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input type="text" id="shift4From" name="shift4From" style={{ width: "65%" }}
          data-step="5" value={this.state.shift4From} required
            onSelect={this.handleFrom}
            className="form-control"
            placeholder="Enter Start Time"/>
    </td>
    <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input type="text" style={{ width: "65%" }} data-step="5" value={this.state.shift4To}
           required name="shift4To"
           onSelect={this.handleTo}
           className="form-control"
           id="shift4To"
           placeholder="Enter End Time" />
    </td>
</div>
</tr>
<tr id="shiftNo5">
<div id="Shift5">
    <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><label for="shift5" >Period-5:</label></td>
    <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input class="form-control" id="inputdefault" type="text" /></td>  
    <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input type="text" id="shift5From" name="shift5From" style={{ width: "65%" }}
          data-step="5" value={this.state.shift5From} required
            onSelect={this.handleFrom}
            className="form-control"
            placeholder="Enter Start Time"/>
    </td>
    <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input type="text" style={{ width: "65%" }} data-step="5" value={this.state.shift5To}
           required name="shift5To"
           onSelect={this.handleTo}
           className="form-control"
           id="shift5To"
           placeholder="Enter End Time" />
    </td>
</div>
</tr>
<tr id="shiftNo6">
<div id="Shift6">
    <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><label for="shift6" >Period-6:</label></td>
    <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input class="form-control" id="inputdefault" type="text" /></td>  
    <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input type="text" id="shift6From" name="shift6From" style={{ width: "65%" }}
          data-step="5" value={this.state.shift6From} required
            onSelect={this.handleFrom}
            className="form-control"
            placeholder="Enter Start Time"/>
    </td>
    <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input type="text" style={{ width: "65%" }} data-step="5" value={this.state.shift6To}
           required name="shift6To"
           onSelect={this.handleTo}
           className="form-control"
           id="shift6To"
           placeholder="Enter End Time" />
    </td>
</div>
</tr>
<tr id="shiftNo7">
<div id="Shift7">
    <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><label for="shift7" >Period-7:</label></td>
    <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input class="form-control" id="inputdefault" type="text" /></td>  
    <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input type="text" id="shift7From" name="shift7From" style={{ width: "65%" }}
          data-step="5" value={this.state.shift7From} required
            onSelect={this.handleFrom}
            className="form-control"
            placeholder="Enter Start Time"/>
    </td>
    <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input type="text" style={{ width: "65%" }} data-step="5" value={this.state.shift7To}
           required name="shift7To"
           onSelect={this.handleTo}
           className="form-control"
           id="shift7To"
           placeholder="Enter End Time" />
    </td>
</div>
</tr>
<tr id="shiftNo8">
<div id="Shift8">
    <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><label for="shift8" >Period-8:</label></td>
    <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input class="form-control" id="inputdefault" type="text" /></td>  
    <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input type="text" id="shift8From" name="shift8From" style={{ width: "65%" }}
          data-step="5" value={this.state.shift8From} required
            onSelect={this.handleFrom}
            className="form-control"
            placeholder="Enter Start Time"/>
    </td>
    <td class="col-xl-3 col-lg-3 col-md-3 col-sm-3"><input type="text" style={{ width: "65%" }} data-step="5" value={this.state.shift8To}
           required name="shift8To"
           onSelect={this.handleTo}
           className="form-control"
           id="shift8To"
           placeholder="Enter End Time" />
    </td>
</div>
</tr></table>
<button type="button" className="btn btn-primary" style={{ marginBottom: "45px",marginLeft:"20px"}}>Add</button><br />
    </div>

   

 

            </div>
    



        );
    }

}


export default Calendar;