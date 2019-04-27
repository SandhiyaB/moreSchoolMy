
import React, { Component } from 'react';
import LoginPage from './LoginPage';
import { FormErrors } from './FormErrors';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import registerServiceWorker from './registerServiceWorker';
import NoAttendanceRequest from './NoAttendanceRequest';
import EmployeeMenuPage from './EmployeeMenuPage';
import EmployeeRequestAcceptReject from './EmployeeRequestAcceptReject';
import FooterText from './FooterText';
import { isFunction } from 'util';

class DeviceListForMap extends Component {

    constructor() {
        super()

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        this.state = {
            companyId: companyId,
        };
    }

    Request() {

        var self = this;
        $.ajax({
            type: 'POST',
            // url:"http://localhost:8080/EmployeeAttendenceAPI/device/CompanyDeviceList",
            data: JSON.stringify({
                companyId: this.state.companyId
            }),
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/device/CompanyDeviceList",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                //  console.log("data",data);
                if (data.length != 0) {
                    var bio;
                    var sms;
                    var rfid;
                    var num = 1;
                    var tab = '<thead><tr class="headcolor"  class="headcolor" style="color: white; background-color: #486885;" ><th>SNo</th><th>DeviceId</th><th>Action</th></tr></thead>';
                    $.each(data, function (i, item) {

                        tab += '<tr class="success" ><td>' + num + '</td><td>' + item.deviceId + '</td><td><input type="button" class="view" id="view" value="View"></input></td><td class="hiddenDetails">' + item.trackLocation + '</td><td class="hiddenDetails">' + item.locationName + '</td><td class="hiddenDetails">' + item.latLongArray + '</td></tr>';
                        num = num + 1;
                    });
                    $("#tableHeadings").append(tab);

                } else {
                    $("#tableHeadings").append('<h3 align="center">No Devices</h3>');
                }
                $(".hiddenDetails").hide();

            }
        });
    }

    componentDidMount() {
        this.Request();
        window.scrollTo(0, 0);

        // code to read selected table row cell data (values).
        $("#tableHeadings").on('click', '.view', function () {
            // get the current row
            var currentRow = $(this).closest("tr");
            var deviceId = currentRow.find("td:eq(1)").text();
            var trackLocation = currentRow.find("td:eq(3)").text();
            var locationName = currentRow.find("td:eq(4)").text();
            var latLongArray = currentRow.find("td:eq(5)").text();

            console.log("Location Detials", deviceId, " tl ", trackLocation, " ln ", locationName);
            if (trackLocation == 0) {
                confirmAlert({
                    title: 'Location Tracking',                        // Title dialog
                    message: 'Location Tracking is Disabled for this Device ' + deviceId + ' ' +
                        'And the default Location is ' + locationName,               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                });
            } else {

                var array = latLongArray.split(',');
                var url;
                if (/Android/i.test(navigator.userAgent)) {
                    url = "http://maps.google.com/maps?saddr=";
                    for (var i = 0; i < array.length; i = i + 2) {
                        if (i == 0) {
                            url += array[i].trim() + ',' + array[i + 1].trim() + '&daddr=';
                        }
                        else {
                            if (i == 2) {
                                url += array[i].trim() + ',' + array[i + 1].trim();
                                console.log("i=", i);
                            }
                            else {
                                url += '+to:' + array[i].trim() + ',' + array[i + 1].trim();
                                console.log("i =", );
                            }
                        }

                    }
                } else if (/iPhone/i.test(navigator.userAgent)) {

                    //  url = "maps://maps.google.com/maps?saddr=";
                    url = "http://maps.apple.com/?saddr="
                    for (var i = 0; i < array.length; i = i + 2) {
                        if (i == 0) {
                            url += array[i].trim() + ',' + array[i + 1].trim() + '&daddr=';
                        }
                        else {
                            if (i == 2) {
                                url += array[i].trim() + ',' + array[i + 1].trim();
                                console.log("i=", i);
                            }
                            else {
                                url += '+to:' + array[i].trim() + ',' + array[i + 1].trim();
                                console.log("i =", );
                            }
                        }

                    }
                    url += "&amp;ll=";
                } else {
                    //url = "https://www.google.com/maps/dir/?api=1&origin=";
                    url = "https://www.google.es/maps/dir/'"

                    for (var i = 0; i < array.length; i = i + 2) {

                        if (i == 0) {
                            url += array[i].trim() + ',' + array[i + 1].trim() + '\'/\'';
                        }
                        else {
                            if (i == 2) {
                                url += array[i].trim() + ',' + array[i + 1].trim() + '\'/\'';
                                console.log("i=", i);
                            }
                            else {
                                url += array[i].trim() + ',' + array[i + 1].trim() + '\'/\'';
                                console.log("i =", );
                            }
                        }
                    }
                }
                url+="&travelmode=driving";
                console.log("url", url);
                //     +lat+','+lng+'&daddr='+lat+','+lng+'+to:12.9010,80.2279&zoom=14&views=traffic';
                  var inAppBrowser = window.open(url, '_blank', 'location=yes');
               
            }
            /*  var url = 'http://www.google.com/maps/place/?saddr=';
              console.log("array len ",array.length);
              for (var i = 0; i < array.length; i=i+2) {
                  console.log("l",array[i].trim());
                  if(i==0){
                  url+=array[i].trim()+','+array[i+1].trim()+'&daddr=';
                  }
                  else{
                      if(i==2){
                          url+=array[i].trim()+','+array[i+1].trim();
                      }
                      else{
                          url+='+to:'+array[i].trim()+','+array[i+1].trim();
                      }

                  }
              }
              url+='&views=traffic';
              console.log("url",url);
       //     +lat+','+lng+'&daddr='+lat+','+lng+'+to:12.9010,80.2279&zoom=14&views=traffic';
              var inAppBrowser = window.open(url, '_blank', 'location=yes');
             // window.open("http://www.google.com/maps/place/"+array);
         */

        });

    }
    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={EmployeeMenuPage} />
                    <Route path="/" component={FooterText} />
                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }
    render() {
        return (

            <div className="container" style={{ marginBottom: '20%' }}>
                {/*    <ul class="previous disabled" id="backbutton"
                    style={{
                        backgroundColor: "#f1b6bf",
                        float: "none",
                        display: "inline-block",
                        marginLeft: "5px",
                        borderRadius: "5px",
                        padding: "3px 7px 3px 7px"
                    }}>
                    <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i></a></ul> */}
                <h3 className="centerAlign" style={{ textAlign: "center" }}>Device Navigation</h3>
                <div id="tableOverflow">
                    <table class="table" id="tableHeadings" style={{ marginBottom: "5%" }}>
                    </table>

                </div>
            </div>


        );
    }

}
export default DeviceListForMap;