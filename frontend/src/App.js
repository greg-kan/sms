import React, { Component } from 'react';
import './App.css';
import SmsApp from './component/SmsApp';
import 'bootstrap/dist/css/bootstrap.min.css';

//import 'node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
// import './assets/react-bootstrap-table-all.min.css'
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class App extends Component {
  render() {
    return (
        <SmsApp />
    )
  }
}

export default App;
