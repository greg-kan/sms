import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import AGSKTermService from '../service/AGSKTermService';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import NavBar from '../elements/navbar';
import Footer from '../elements/footer';

class AGSKTerm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,                           
            main: false
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        if (this.state.id === -1) {                                    
            return
        }

        AGSKTermService.getById(this.state.id)               
            .then(response => this.setState({
                main: response.data.main                
            }))
    }

    onSubmit(values) {
        console.log(values.main);
        let term = {
            id: this.state.id,
            main: values.main
        }

        if (this.state.id === -1) {
            AGSKTermService.create(term)
                .then(() => this.props.history.push('/agsk-terms'))
        } else {
            AGSKTermService.update(this.state.id, term)
                .then(() => this.props.history.push('/agsk-terms'))
        }
    }  
    
    render() {
        return (
            <div className="wrapperFull">
                <div className="TopMenu"><NavBar/></div>
                <div className="FullPanel container-fluid">

                    <Toast id="displayCenter-doc" >
                        <ToastHeader >Документ</ToastHeader>
                        <ToastBody>

                            <div className="">
                                <Formik
                                    initialValues={this.state}
                                    onSubmit={this.onSubmit}
                                    validateOnChange={false}
                                    validateOnBlur={false}
                                    validate={this.validate}
                                    enableReinitialize={true}
                                >
                                    {
                                        (props) => (
                                            <Form>
                                                <fieldset className="form-group">
                                                    <label>Главный</label>
                                                    <Field name="main" component="input" type="checkbox" checked={props.values.main} id="Checkbox"/>
                                                </fieldset>
                                                <button className="btn btn-success" type="submit">Сохранить</button>
                                            </Form>
                                        )
                                    }
                                </Formik>
                            </div>

                        </ToastBody>
                    </Toast>
                </div>
                <div className="FooterPanel">
                    <div><Footer/></div>
                </div>                
            </div>
        )
    }    
}

export default AGSKTerm