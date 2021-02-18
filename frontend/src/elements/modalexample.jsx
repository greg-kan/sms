/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Checkbox from './search';
// import { FaSistrix } from 'react-icons/fa';
import { NavLink } from 'reactstrap';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <NavLink href="#" onClick={this.toggle}>{this.props.buttonLabel}  ПОИСК 
        {/* <FaSistrix />
         */}
        </NavLink>
        {/* <button className="btn btn-success " size="sm" onClick={this.toggle}>{this.props.buttonLabel}  Search</button> */}

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Поиск</ModalHeader>
          <ModalBody>
            <Checkbox />
          </ModalBody>
          <ModalFooter>
            <button color="primary" onClick={this.toggle}>Найти</button>{' '}
            <button color="secondary" onClick={this.toggle}>Закрыть</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;