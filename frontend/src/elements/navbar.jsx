import React from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
  
import ModalExample from './modalexample';
import logo from '../elements/images/logo.png';
 
  class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div className=" ">
         <Navbar color=""  expand="lg"   >
         <NavbarBrand href="/" className="hide-mobile " >
            <img src={logo} alt="Logo" width="60" height="60"/>
             <b className="px-3">SMS | SEMANTIC MODELLING SHELL</b>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            
              <NavItem id="textShadow">
                <NavLink href="/"><b>ДОКУМЕНТЫ</b></NavLink>
              </NavItem>

              {/* <NavItem id="textShadow">
                <NavLink href="/agsk-terms"><b>ТЕРМИНЫ</b></NavLink>
              </NavItem> */}

              <NavItem id="textShadow">
                <NavLink href="/agsk-document-types"><b>АДМИНИСТРИРОВАНИЕ</b></NavLink>
              </NavItem>

              <NavItem id="textShadow">
                <b><ModalExample/></b>
              </NavItem>

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default NavBar;