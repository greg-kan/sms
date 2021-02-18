import React, { Component } from 'react';
import '../App.css';
import {  Form, FormGroup, Label, Input } from 'reactstrap';
class Checkbox extends Component {
  render() {
    return (
        // <Card body>
        //   <CardTitle>Special Title Treatment</CardTitle>
        //   <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
        //   <button>Go somewhere</button>
        // </Card>
        <div className="container">
        <Form>
             <FormGroup>
                <Label for="exampleSearch">Search</Label>
                <Input
                    type="search"
                    name="search"
                    id="exampleSearch"
                    placeholder="search placeholder"
                />
            </FormGroup>
        </Form>
        </div>

    )}}
    export default Checkbox;