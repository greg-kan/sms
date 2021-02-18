import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AGSKDocumentTypeService from '../service/AGSKDocumentTypeService';
import AdminNavBar from '../elements/adminNavbar';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import Footer from '../elements/footer';

class AGSKDocumentType extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,                           
            code: '',
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

        AGSKDocumentTypeService.getById(this.state.id)               
            .then(response => this.setState({
                code: response.data.code,
                name: response.data.name                
        }))
    }


    handleChange = (e) => {
        const target = e.target;
        const targetValue = target.type === 'checkbox' ? target.checked : target.value;
        const targetName = target.name;

        switch(targetName) {
            case 'code':
                this.setState({ code: targetValue })
                break; 
            case 'name':
                this.setState({ name: targetValue })
                break;                
            default:
                break;
        }
    }        

    validate(values) {
        let errors = {}

        if (!values.code) {
            errors.code = 'Введите Код'
        } else if (!/^[1-9][0-9]*$/i.test(values.code)) {
            errors.code = 'Код не должен начинаться с 0 и быть больше 32767.';
        } else if ( (parseInt(values.code, 10) > 32767) || (parseInt(values.code, 10) < 1) ) {
            errors.code = 'Код не должен начинаться с 0 и быть больше 32767.';
        }
            
        if (!values.name) {
            errors.name = 'Введите наименование'
        } 

        return errors
    }    

    onSubmit(values) {
        let documentType = {
            id: this.state.id,
            code: values.code,
            name: values.name
        }

        if (this.state.id === -1) {
            AGSKDocumentTypeService.create(documentType)
                .then(() => this.props.history.push('/agsk-document-types'))
        } else {
            AGSKDocumentTypeService.update(this.state.id, documentType)
                .then(() => this.props.history.push('/agsk-document-types'))
        }
    }  
    
    render() {
        return (
            <div className="wrapperFull">
                <div className="TopMenu"><AdminNavBar/></div>
                <div className="FullPanel container-fluid">
                    <Toast id="displayCenter-doc">
                        <ToastHeader >Тип документа</ToastHeader>
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
                                                <ErrorMessage name="code" component="div"
                                                    className="alert alert-warning" />
                                                <ErrorMessage name="name" component="div"
                                                    className="alert alert-warning" />                                        
                                                <fieldset className="form-group">
                                                    <label>Код</label>
                                                    <Field className="form-control" type="text" name="code" value={this.state.code || ''} onChange={this.handleChange}/>
                                                </fieldset>                                    
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
                <div className="FooterPanel">
                    <div><Footer/></div>
                </div>                
            </div>
        )
    }    
}

export default AGSKDocumentType