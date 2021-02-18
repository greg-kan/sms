import React from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import logo from './images/logo.png';
 
  class AdminNavBar extends React.Component {
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
          <NavbarBrand href="/" className="hide-mobile">
            <img src={logo} alt="Logo" width="60" height="60"/>
             <b className="px-3">SMS | SEMANTIC MODELLING SHELL</b>
          </NavbarBrand>
          
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>

            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <b>СПРАВОЧНИКИ</b>
                </DropdownToggle >
                <DropdownMenu >
                  <DropdownItem tag="a" href="/agsk-document-types">Типы документов</DropdownItem>
                  <DropdownItem tag="a" href="/agsk-document-classes">Классы документов</DropdownItem>
                  <DropdownItem divider />
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <b>БЕЗОПАСНОСТЬ</b>
                </DropdownToggle >
                <DropdownMenu >
                  <DropdownItem tag="a" href="#">Пользователи</DropdownItem>
                  <DropdownItem tag="a" href="#">Роли</DropdownItem>
                  <DropdownItem tag="a" href="#">Привилегии</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem> Прочие функции </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <NavItem id="textShadow">
                <NavLink href="/"><b>ГЛАВНАЯ</b></NavLink>
              </NavItem>

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default AdminNavBar;