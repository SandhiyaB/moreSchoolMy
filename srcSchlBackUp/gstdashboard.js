import React, { Component } from 'react';
import logo from './logo.svg';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Website from './Website';
import './gstdashboard.css';
import $ from 'jquery';




class Gstdashboard extends Component {


    componentDidMount() {
        window.scrollTo(0, 0);      
   
        $(document).ready(function () {

            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
            });

        });
    }


    render() {
        return (


            <div>
                {/*  <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">

                        <button type="button" id="sidebarCollapse" class="btn btn-info">
                            <i class="fas fa-align-left"></i>
                            <span>Toggle Sidebar</span>
                        </button>

                        <button type="button" id="sidebarCollapse" class="btn btn-right">
                            <a href="#"><i class="fa fa-fw fa-user"></i> Login</a>
                        </button>

                    </div>
                </nav> */}


                <div class="wrapper">

                    {/* <!-- Sidebar --> */}
                    <nav id="sidebar">
                        {/*   <h2> ...hihiii</h2> */}
                        <nav id="sidebar">
                            <div class="sidebar-header">
                                <h3>DASHBOARD</h3>
                            </div>

                            <ul class="list-unstyled components">
                                <p>Dummy Heading</p>
                                <li class="active">
                                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Home</a>
                                    <ul class="collapse list-unstyled" id="homeSubmenu">
                                        <li>
                                            <a href="#">Home 1</a>
                                        </li>
                                        {/*  <li class="active treeview"> <a href="#"><i class="fa fa-key" aria-hidden="true"></i><span>Master</span> <span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i> </span> </a>
                                            <ul class="treeview-menu" style={{display: "none"}}>
                                                <li><a href="../Master/add_customer.aspx"><i class="fa fa-angle-right"></i> Add Customer</a></li>
                                                <li><a href="../Master/list_of_customer.aspx"><i class="fa fa-angle-right"></i> List of Customer</a></li>
                                                <li><a href="../Master/add_vendor.aspx"><i class="fa fa-angle-right"></i> Add Vendor</a></li>
                                                <li><a href="../Master/list_of_vendor.aspx"><i class="fa fa-angle-right"></i> List of Vendor</a></li>
                                                <li><a href="../Master/add_product.aspx"><i class="fa fa-angle-right"></i> Add Product</a></li>
                                                <li><a href="../Master/list_of_product.aspx"><i class="fa fa-angle-right"></i> List of Product</a></li>
                                            </ul>
                                        </li> */}
                                        <li>
                                            <a href="#">Home 2</a>
                                        </li>
                                        <li>
                                            <a href="#">Home 3</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">About</a>
                                </li>
                                <li>
                                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Pages</a>
                                    <ul class="collapse list-unstyled" id="pageSubmenu">
                                        <li>
                                            <a href="#">Page 1</a>
                                        </li>
                                        <li>
                                            <a href="#">Page 2</a>
                                        </li>
                                        <li>
                                            <a href="#">Page 3</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">Portfolio</a>
                                </li>
                                <li>
                                    <a href="#">Contact</a>
                                </li>
                                <div class="dropdown">
                                    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Dropdown Example
    <span class="caret"></span></button>
                                    <ul class="dropdown-menu">
                                        <li><a href="#">HTML</a></li>
                                        <li><a href="#">CSS</a></li>
                                        <li><a href="#">JavaScript</a></li>
                                    </ul>
                                </div>
                                <button class="dropdown-btn">Dropdown
                                <i class="fa fa-caret-down"></i>
                                </button>
                                <div class="dropdown-container">
                                    <a href="#">Link 1</a>
                                    <a href="#">Link 2</a>
                                    <a href="#">Link 3</a>
                                </div>
                            </ul>
                        </nav>


                    </nav>

                    {/* <!-- Page Content --> */}
                    <div id="content">


                        {/*   <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">

            <button type="button" id="sidebarCollapse" class="btn btn-info">
                <i class="fas fa-align-left"></i>
                <span>Toggle Sidebar</span>
            </button>
          
            <button type="button" id="sidebarCollapse" class="btn btn-right">
             <a href="#"><i class="fa fa-fw fa-user"></i> Login</a>
             </button>

        </div>
        <ul class="nav navbar-nav navbar-right">
      <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
      <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
    </ul>
    </nav> */}

                        <nav class="navbar navbar-inverse">
                            <div class="container-fluid">
                                <div class="navbar-header">
                                    <a class="navbar-brand" id="sidebarCollapse" href="#">Company Name</a>
                                </div>

                                {/*    <ul class="nav navbar-nav navbar-right">
     
      <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
    </ul> */}
                            </div>
                        </nav>





                        {/*   <!-- We'll fill this with dummy content --> */}
                    </div>

                </div>

            </div>

        );
    }
}

export default Gstdashboard;

/* 
<nav class="navbar navbar-inverse">
<div class="container-fluid">
    <div class="navbar-header">
        <a class="navbar-brand" href="#">WebSiteName</a>
    </div>
    <ul class="nav navbar-nav">
        <li class="active"><a href="#">Home</a></li>
        <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Page 1 <span class="caret"></span></a>
          {/*   <ul class="dropdown-menu">
                 <li><a href="#">Page 1-1</a></li>
                <li><a href="#">Page 1-2</a></li>
                <li><a href="#">Page 1-3</a></li> 
            </ul> *--
        </li>
        <li><a href="#">Page 2</a></li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
        <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
        <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
    </ul>
</div>
</nav>
<div class="wrapper">
{/* <!-- Sidebar --> *
<nav id="sidebar">
<div class="sidebar-header">
<h3>Bootstrap Sidebar</h3>
</div>

<ul class="list-unstyled components">
<p>Dummy Heading</p>
<li class="active">
<a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Home</a>
<ul class="collapse list-unstyled" id="homeSubmenu">
<li>
    <a href="#">Home 1</a>
</li>
<li>
    <a href="#">Home 2</a>
</li>
<li>
    <a href="#">Home 3</a>
</li>
</ul>
</li>
<li>
<a href="#">About</a>
</li>
<li>
<a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Pages</a>
<ul class="collapse list-unstyled" id="pageSubmenu">
<li>
    <a href="#">Page 1</a>
</li>
<li>
    <a href="#">Page 2</a>
</li>
<li>
    <a href="#">Page 3</a>
</li>
</ul>
</li>
<li>
<a href="#">Portfolio</a>
</li>
<li>
<a href="#">Contact</a>
</li>
</ul>
</nav>

</div>

<div class="container">

<h3>Right Aligned Navbar</h3>
<p>The .navbar-right class is used to right-align navigation bar buttons.</p>
</div> */