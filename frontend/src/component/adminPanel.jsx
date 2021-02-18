import React, { Component } from 'react';
import '../App.css';
import AdminNavbar from '../elements/adminNavbar';
import Footer from '../elements/footer';

class AdminPanel extends Component {
    render() {
        return (
            <div className="wrapperFull">
               
                <div className="TopMenu">
                    <AdminNavbar/>
                </div>
                <div className="FullPanel">
                    <h2>Пользователи</h2>
                </div>
                           
                <div className="FooterPanel">
                    <div>
                        <Footer/>
                    </div>
                </div>
                  
                  
            </div>
                  
        );}}
        export default AdminPanel;
    