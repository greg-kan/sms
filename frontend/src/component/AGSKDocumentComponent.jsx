import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AGSKDocumentService from '../service/AGSKDocumentService';
import AGSKDocumentTypeService from '../service/AGSKDocumentTypeService';
import DropdownComponent from './DropdownComponent';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import NavBar from '../elements/navbar';
import Footer from '../elements/footer';
import UploadDownloadFileService from '../service/UploadDownloadFileService.jsx';
import { Button } from 'reactstrap';
import { FaTrashAlt, FaDownload} from "react-icons/fa";

const maxFileSize = 104857600 //100*1024*1024

class AGSKDocument extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            code: '',
            docCode: '',
            nameRus: '',
            nameKaz: '',
            cancelled: false,
            
            attachedFileName: '',
            file: '',
            fileError: '',
            fileMsg: '',

            files: [],
            fileLastId: 0,
            
            typeName: '',
            typeId: -1,
            types: [],

            //message: '',
        }
        
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.handleUploadFile = this.handleUploadFile.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.downloadFileClicked = this.downloadFileClicked.bind(this)
        this.deleteFileClicked = this.deleteFileClicked.bind(this)
    }

    componentDidMount() {
        AGSKDocumentTypeService.getAll()
            .then(response => {
                this.setState({ types: response.data })
            })

        if (this.state.id === -1) {
            return
        }

        AGSKDocumentService.getById(this.state.id)
            .then(response => {

                let fileNewId = 0
                let documentFilesList = []
                let documentFiles = response.data.documentFiles

                if (documentFiles) {
                    
                    documentFiles.forEach(e => { 
                        fileNewId ++

                        let fileNew = {
                            id: fileNewId,
                            filePath: e.filePath
                        }

                        documentFilesList.push(fileNew)
                                        
                    })                        
                }

                let documentType = response.data.documentType
                if (documentType) {
                    this.setState({
                        code: response.data.code,
                        docCode: response.data.docCode,
                        nameRus: response.data.nameRus,                            
                        nameKaz: response.data.nameKaz,  
                        cancelled: response.data.cancelled,  
                        attachedFileName: response.data.attachedFileName,  
                        files: documentFilesList,
                        fileLastId: fileNewId,
                        typeName: response.data.documentType.name,
                        typeId: response.data.documentType.id                            
                    })
                } else {
                    this.setState({     
                        code: response.data.code,
                        docCode: response.data.docCode,
                        nameRus: response.data.nameRus,                            
                        nameKaz: response.data.nameKaz,  
                        cancelled: response.data.cancelled,
                        attachedFileName: response.data.attachedFileName,  
                        files: documentFilesList,
                        fileLastId: fileNewId
                    })
                }
            })
        
    }

    handleInputChange = (e) => {
        const target = e.target;
        const targetValue = target.type === 'checkbox' ? target.checked : target.value;
        const targetName = target.name;

        switch(targetName) {
            case 'FirstDropdown':
                this.setState({ typeId: targetValue });
                break;            
            case 'code':
                this.setState({ code: targetValue })
                break; 
            case 'docCode':
                this.setState({ docCode: targetValue })
                break;
            case 'nameRus':
                this.setState({ nameRus: targetValue })
                break;                
            case 'nameKaz':
                this.setState({ nameKaz: targetValue })
                break;                
            case 'cancelled':
                this.setState({ cancelled: targetValue })
                break;
            case 'attachedFileName':
                this.setState({ attachedFileName: targetValue })
                break;
            default:
                break;
        }
    }

    validate(values) {
        let errors = {}

        if (!values.code) {
            errors.code = 'Введите Код'
        } else if (values.code.length < 5) {
            errors.code = 'Введите как минимум 5 символов в поле Код'
        }

        
        if (!values.nameRus) {
            errors.nameRus = 'Введите наименование'
        } else if (values.nameRus.length < 5) {
            errors.nameRus = 'Введите как минимум 5 символов в поле Наименование'
        }

        return errors
    }    

    onSubmit(values) {

        let documentTypes = this.state.types.filter(type => {
            return +type.id === +this.state.typeId
        })

        let filesList = []

        this.state.files.forEach(e => {
            filesList.push(e.filePath)  
        })

        let document = {
            id: this.state.id,
            code: values.code,
            docCode: values.docCode,
            nameRus: values.nameRus,
            nameKaz: values.nameKaz,
            cancelled: values.cancelled,
            attachedFileName: values.attachedFileName,
            documentFilesList: filesList,
            //documentFiles: this.state.files,
            documentType: documentTypes[0] 
        }

        if (+this.state.id === -1) {
            AGSKDocumentService.create(document)
                .then(() => this.props.history.push('/agsk-documents'))
        } else {
            AGSKDocumentService.update(this.state.id, document)
                .then(() => this.props.history.push('/agsk-documents'))
        }
    }  
    
    onFileChange = (event) => {
        this.setState({
            file: event.target.files[0]
        });
    }

    handleUploadFile = (event) => {

        event.preventDefault();

        this.setState({fileError: '', fileMsg: ''});
    
        if(!this.state.file) {
            this.setState({fileError: 'Пожалуйста, выбирите файл.'})
            return;
        }
    
        if(this.state.file.size > maxFileSize) {
            this.setState({fileError: 'Размер выбранного файла = ' + this.state.file.size + ' byte. Он не должен превышать ' + maxFileSize + ' byte.'})
            return;
        }

        const data = new FormData();
        //using File API to get chosen file
        //let file = event.target.files[0];
        let file = this.state.file;
        let fileType = '*.docx';
        //console.log("Uploading file", file);
        data.append('file', file);
        data.append('fileType', fileType);
        data.append('description', 'Здесь можно поместить описание и передать на backend!! Пока не используется');
        //let self = this;
        //calling async Promise and handling response or error situation
        UploadDownloadFileService.uploadFileToServer(data)
        .then((response) => {
            this.setState({fileError: '', fileMsg: 'Файл "' + file.name + '" успешно связан с документом.' });
            this.setState({attachedFileName: file.name});

            let filesNew = this.state.files
            let fileNewId = this.state.fileLastId
            fileNewId ++
            
            let fileNew = {
                id: fileNewId,
                filePath: file.name
            }            

            filesNew.push(fileNew)

            this.setState({ files: filesNew })
            this.setState({ fileLastId: fileNewId});

        }).catch((error) => {
            if (error.response) {
                //console.log("Upload error. HTTP error/status code=", error.response.status);
                this.setState({fileError: 'Ошибка загрузки. HTTP error/status code = ' + error.response.status});
            } else {
                //console.log("Upload error. HTTP error/status code=", error.message);
                this.setState({fileError: 'Ошибка загрузки: ' + error.message })
            }
        });
    }

    downloadFileClicked(filePath) {
        //console.log('download ' + filePath)

        UploadDownloadFileService.downloadFileFromServer(filePath)
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filePath);
            document.body.appendChild(link);//1
            link.click();
            window.URL.revokeObjectURL(url);//2
        }).catch((error) => {
            if (error.response) {
                //console.log('download error: ' + error.response.status)
                this.setState({fileError: 'Ошибка загрузки. HTTP error/status code = ' + error.response.status})
                //this.setState({ message: 'Ошибка загрузки. HTTP error/status code = ' + error.response.status });
            } else {
                this.setState({fileError: 'Ошибка загрузки: ' + error.message })
                //this.setState({ message: 'Ошибка загрузки: ' + error.message });
            }
        });        
    }

    deleteFileClicked(id) {
        let filesNew = this.state.files
        filesNew = filesNew.filter(item => {
            return +item.id !== +id })     
        this.setState({ files: filesNew })
    }

    render() {

        let { typeId } = this.state
        return (
            <div className="wrapperFull">
                <div className="TopMenu"><NavBar/></div>
                <div className="FullPanel container-fluid">
                
                    <Toast id="displayCenter-doc">
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
                                                <ErrorMessage name="code" component="div"
                                                    className="alert alert-warning" />
                                                <ErrorMessage name="nameRus" component="div"
                                                    className="alert alert-warning" />                                        
                                                
                                                <fieldset className="form-group">
                                                    <label>Тип документа</label>
                                                    <DropdownComponent name="FirstDropdown" selectableData={this.state.types} selectedId = {typeId}
                                                                       handleInputChange={this.handleInputChange}>
                                                    </DropdownComponent>
                                                </fieldset> 
                                                <fieldset className="form-group"  >
                                                    <label>Код</label>
                                                    <Field className="form-control" type="text" name="code" value={this.state.code || ''}
                                                           onChange={this.handleInputChange}/>
                                                </fieldset>
                                                <fieldset className="form-group"  >
                                                    <label>Шифр</label>
                                                    <Field className="form-control" type="text" name="docCode" component="textarea" value={this.state.docCode || ''}
                                                           onChange={this.handleInputChange}/>                                                    
                                                </fieldset>                                                                        
                                                <fieldset className="form-group">
                                                    <label>Наименование (Рус)</label>
                                                    <Field className="form-control" type="text" name="nameRus" component="textarea" value={this.state.nameRus || ''}
                                                           onChange={this.handleInputChange}/>                                                    
                                                </fieldset>
                                                <fieldset className="form-group">
                                                    <label>Наименование (Каз)</label>
                                                    <Field className="form-control" type="text" name="nameKaz" component="textarea" value={this.state.nameKaz || ''}
                                                           onChange={this.handleInputChange}/>                                                    
                                                </fieldset>
                                                <fieldset className="form-group">
                                                    <label>Отменен</label>
                                                    <Field type="checkbox" name="cancelled" component="input" checked={props.values.cancelled || false}
                                                           id="Checkbox" onChange={this.handleInputChange}/>                                                    
                                                </fieldset>
                                                <fieldset className="form-group">
                                                    <label>Связанные файлы:</label>
                                                    {/* <Field className="form-control" type="text" name="attachedFileName" value={this.state.attachedFileName || ''}
                                                           onChange={this.handleInputChange}/>                                                     */}
                                                </fieldset>

                                                <table className="table table-striped table-bordered table-hover table-sm">
                                                    <thead>
                                                        <tr>            
                                                            <th className="file-id">№</th>
                                                            <th className="file-filePath">Имя файла</th>
                                                            <th className="file-btn">Действия</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.files.map(
                                                                file =>
                                                                    <tr key={file.id}>
                                                                        <td>{file.id}</td>
                                                                        <td>{file.filePath}</td>
                                                                        <td>
                                                                            <Button className="btnDefaultStyleSmall" type="button" color="warning" size="sm">
                                                                                <FaDownload className="iconDownloadSmall" onClick={() => this.downloadFileClicked(file.filePath)}></FaDownload>
                                                                            </Button>  {' '}
                                                                            <Button  className="btnDefaultStyleSmall" type="button" color="danger" size="sm">
                                                                                <FaTrashAlt className="iconDeleteSmall" onClick={() => this.deleteFileClicked(file.id)}></FaTrashAlt>
                                                                            </Button>
                                                                        </td>
                                                                    </tr>
                                                            )
                                                        }
                                                    </tbody>
                                                </table>

                                                <div className="App-intro">
                                                    <p>Связать с файлом:</p>
                                                    <input onChange={this.onFileChange} type="file"></input>
                                                    <button onClick={this.handleUploadFile}>Связать</button> 
                                                    <br/> 
                                                    <br/>
                                                    <p style={{color: 'red'}}>{this.state.fileError}</p>
                                                    <p style={{color: 'green'}}>{this.state.fileMsg}</p>                                                     
                                                </div>

                                                <br></br>
                                                <br></br>

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

export default AGSKDocument