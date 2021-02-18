import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AGSKDocumentClassService from '../service/AGSKDocumentClassService';
import AdminNavBar from '../elements/adminNavbar';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import Footer from '../elements/footer';

class AGSKDocumentClass extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,                          
            name: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (this.state.id === -1) {   
            return
        }

        AGSKDocumentClassService.getById(this.state.id)               
            .then(response => this.setState({
                name: response.data.name                
        }))
    }

    handleChange(e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({name: value});
    }

    validate(values) {
        let errors = {}

        if (!values.name) {
            errors.name = 'Введите наименование'
        } 

        return errors
    }    

    onSubmit(values) {
        let documentClass = {
            id: this.state.id,
            name: values.name
        }

        if (this.state.id === -1) {
            AGSKDocumentClassService.create(documentClass)
                .then(() => this.props.history.push('/agsk-document-Classes'))
        } else {
            AGSKDocumentClassService.update(this.state.id, documentClass)
                .then(() => this.props.history.push('/agsk-document-Classes'))
        }
    }  
    
    render() {
        return (
            <div className="wrapperFull">
                <div className="TopMenu"><AdminNavBar/></div>
                <div className="FullPanel ">  
                <div>              
                    <Toast id="displayCenter-doc" >
                    
                        <ToastHeader >Класс документа</ToastHeader>
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
                                                <ErrorMessage name="name" component="div"
                                                    className="alert alert-warning" /> 
                                                                                        
                                                <fieldset className="form-group">
                                                    <label>Наименование</label>
                                                    <Field className="form-control" type="text" name="name" value={this.state.name || ''} onChange={this.handleChange}/>
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
                </div>
                <div className="FooterPanel">
                    <div><Footer/></div>
                </div>                
            </div>
        )
    }    
}

export default AGSKDocumentClass