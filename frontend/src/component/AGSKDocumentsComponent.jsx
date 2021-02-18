import React, { Component } from 'react'
import AGSKDocumentService from '../service/AGSKDocumentService';
import AGSKDocumentTypeService from '../service/AGSKDocumentTypeService';
import NavBar from '../elements/navbar';
import Footer from '../elements/footer';
import { FaEdit, FaTrashAlt, FaFolderPlus, /*FaDownload,*/ FaLink, FaFilter} from "react-icons/fa";
import { connect } from 'react-redux';
import { getMultiFilteredDocuments } from '../actions/AGSKDocumentsActions';

import { Formik, Form, Field } from 'formik';
import DropdownComponent from './DropdownComponent';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
class AGSKDocumentsComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            message: '',

            typeId: -1,
            nameKaz: '',
            displayCancelled: false,                 
            
            types: [],

            selectedDocument: {
                id: -1,
                code: '',
                attachedFileName: ''
            }
        }
        this.deleteDocumentClicked = this.deleteDocumentClicked.bind(this)
        this.editDocumentClicked = this.editDocumentClicked.bind(this)
        this.addDocumentClicked = this.addDocumentClicked.bind(this)
        //this.downloadFileClicked = this.downloadFileClicked.bind(this)

        this.applyFilters = this.applyFilters.bind(this)
    }

    componentDidMount() {
        AGSKDocumentTypeService.getAll()
            .then(response => {
                this.setState({ types: response.data })
            }
        )
        this.props.fetchData(null);
    }

    deleteDocumentClicked() {
        const id = this.state.selectedDocument.id
        if ( !id || +id === -1) {
            this.setState({ message: 'Необходимо выбрать запись!' });
            return;               
        }

        AGSKDocumentService.deleteById(id)
            .then((response) => {
                this.setState({ message: `Документ "${this.state.selectedDocument.code}" удален.` })
                this.props.fetchData();

                this.setState({
                    selectedDocument: {
                        id: -1,
                        code: '',
                        attachedFileName: ''
                    }
                })
            }).catch((error) => {
                    if (error.response) {
                        this.setState({ message: 'Ошибка удаления. HTTP error/status code = ' + error.response.status });
                    } else {
                        this.setState({ message: 'Ошибка  удаления: ' + error.message })
                    }
            });
    }    

    editDocumentClicked() {
        const id = this.state.selectedDocument.id
        if ( !id || id === -1) {
            this.setState({ message: 'Необходимо выбрать запись!' });
            return;               
        }

        this.props.history.push(`/agsk-documents/${id}`)
    }    

    addDocumentClicked() {
        this.props.history.push(`/agsk-documents/-1`)
    }


    // downloadFileClicked() {
    //     const id = this.state.selectedDocument.id
    //     if ( !id || id === -1) {
    //         this.setState({ message: 'Необходимо выбрать запись!' });
    //         return;               
    //     }

    //     const nameOfFile = this.state.selectedDocument.attachedFileName
    //     if (!nameOfFile) {
    //         this.setState({ message: 'Файл не связан с документом!' });
    //         return;               
    //     }

    //     UploadDownloadFileService.downloadFileFromServer(nameOfFile)
    //         .then((response) => {
    //             const url = window.URL.createObjectURL(new Blob([response.data]));
    //             const link = document.createElement('a');
    //             link.href = url;
    //             link.setAttribute('download', nameOfFile);
    //             document.body.appendChild(link);//1
    //             link.click();
    //             window.URL.revokeObjectURL(url);//2
    //         }).catch(function (error) {
    //             //console.log(error);
    //             if (error.response) {
    //                 console.log('Ошибка загрузки. HTTP error/status code = ' + error.response.status);
    //                 //this.setState({ message: 'Ошибка загрузки. HTTP error/status code = ' + error.response.status });
    //             } else {
    //                 console.log("Upload error. HTTP error/status code=", error.message);
    //             //this.setState({message: 'Ошибка загрузки. HTTP error/status code = ' + error.message});
    //             }
    //         });
    // }

    linkClassesClicked() {
        const id = this.state.selectedDocument.id
        if ( !id || id === -1) {
            this.setState({ message: 'Необходимо выбрать запись!' });
            return;               
        }

        this.props.history.push(`/agsk-document-classes-linker/${id}`)
    }    

    handlerClickCleanFiltered() {
        this.props.fetchData(null);
      }    


    handleInputChange = (e) => {
        const target = e.target;
        const targetValue = target.type === 'checkbox' ? target.checked : target.value;
        const targetName = target.name;

        switch(targetName) {
            case 'typeDropdown':
                this.setState({typeId: targetValue === '' ? -1 : targetValue })
                break; 
            case 'nameKaz':
                this.setState({ nameKaz: targetValue })
                break;                
            case 'displayCancelled':
                this.setState({ displayCancelled: targetValue })
                break;
        
            default:
                break;
        }
    }    
  

    applyFilters() {
        let documentAttributes = {
            id: this.state.typeId,//In this, actually, we place type.id, not a document.id
            nameKaz: this.state.nameKaz,
            cancelled: this.state.displayCancelled
        }

        this.props.fetchData(documentAttributes);
    }      

    onRowSelect(row, isSelected, e) {
        this.setState({ selectedDocument: {id: row.id, code: row.code, attachedFileName: row.attachedFileName }});
    }

    render() {
        const selectRowProp = {
            mode: 'radio',
            bgColor: '#63a2f9', // you should give a bgcolor, otherwise, you can't regonize which row has been selected
            hideSelectColumn: true,  // enable hide selection column.
            clickToSelect: true,  // you should enable clickToSelect, otherwise, you can't select column.
            onSelect: this.onRowSelect.bind(this)
        };

        if (this.props.hasErrored) {
            return <p>Произошла ошибка при загрузке страницы!</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }


        const columns = [{
            dataField: 'code',
            text: '',
            filter: textFilter({placeholder: 'Код'}),
            sort:true,
            headerStyle: (colum, colIndex) => {
                return { width: '9%', textAlign: 'center' };
              }
          },
          {
            dataField: 'complex',
            text: '',
            //text: 'Комплекс',
            filter: textFilter({placeholder: 'Комплекс'}),
            sort:true,
            headerStyle: (colum, colIndex) => {
                return { width: '12%', textAlign: 'center' };
              }
          }, 
          {
            dataField: 'year',
            text: '',
            //text: 'Год',
            filter: textFilter({placeholder: 'Год'}),
            sort:true,
            headerStyle: (colum, colIndex) => {
                return { width: '9%', textAlign: 'center' };
              }
          }, 
          {
            dataField: 'nameRus',
            text: '',
            //text: 'Наименование',
            filter: textFilter({placeholder: 'Наименование'}),
            sort:true,
            headerStyle: (colum, colIndex) => {
                return { width: '70%', textAlign: 'left' };
              }
          }];
          
          const options = {
            custom: true,
            totalSize: this.props.documents.length
          };

          const defaultSorted = [{
            dataField: 'code',
            order: 'desc'
          }];
        return (
            <div className="wrapper">
                <div className="TopMenu container-fluid"><NavBar/></div>
                
                <div className="FilterPanel container-fluid">
                    {/* <AGSKDocumentsFilter/> */}
                    
                    <h4>Фильтры</h4>

                    <Formik
                            initialValues={this.state}
                            onSubmit={false}
                            validateOnChange={false}
                            validateOnBlur={false}
                            validate={false}
                            enableReinitialize={true}
                        >
                            {
                                (props) => (
                                    <Form>
                                        <fieldset >
                                            <DropdownComponent  type="select" id="exampleSelect" name="typeDropdown" selectableData={this.state.types}
                                                handleInputChange={this.handleInputChange}>
                                            </DropdownComponent>
                                        </fieldset> 

                                        <br></br>

                                        <fieldset className="form-group">
                                            <label>Наименование (Каз)</label>
                                            <Field className="form-control" type="text" name="nameKaz" component="textarea" onChange={this.handleInputChange}/>
                                        </fieldset>

                                        <br></br>

                                        <fieldset className="form-group">
                                            <label>Показать только отмененные</label>
                                            <Field name="displayCancelled" component="input" type="checkbox" onClick={this.handleInputChange} id="Checkbox" />
                                        </fieldset>

                                        <button className="btn btn-success" type="button" onClick={this.applyFilters}>Применить</button>                                                        
                                    </Form>
                                )
                            }
                        </Formik>                    
                </div>
                
                <div className="MainPanel container-fluid">
                    <h4>Документы АГСК</h4>
                    {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                    <div>

                        <div> 
                            <Button  className="btnDefaultStyle" color="primary">
                                <FaFilter className="iconFilter" onClick={ this.handlerClickCleanFiltered.bind(this) }></FaFilter>
                            </Button>                 
                                       
                            <Button  className="btnDefaultStyle "  color="success">
                                <FaFolderPlus  className="iconNew"  onClick={this.addDocumentClicked} /> 
                            </Button>
                            <Button  className="btnDefaultStyle" color="info" >
                                <FaEdit className="iconAdd"  onClick={this.editDocumentClicked}></FaEdit>
                            </Button>            
                        
                            <Button  className="btnDefaultStyle" color="danger">
                                <FaTrashAlt className="iconDelete" onClick={this.deleteDocumentClicked}></FaTrashAlt>
                            </Button>

                            {/* <Button  className="btnDefaultStyle" color="warning">
                                <FaDownload className="iconDownload"  onClick={this.downloadFileClicked}></FaDownload>
                            </Button>             */}
                        
                            <Button  className="btnDefaultStyle" outline color="primary">
                                <FaLink className="" onClick={this.linkClassesClicked.bind(this)}></FaLink>
                            </Button>                
                    
                        </div>

                        <div>

                            <PaginationProvider pagination={ paginationFactory(options)} >
                                {
                                    ({paginationProps, paginationTableProps}) => (
                                    <div>
                                        <PaginationListStandalone { ...paginationProps }/>
                                            <BootstrapTable 
                                                bootstrap4
                                                keyField="id"
                                                data={ this.props.documents}
                                                columns={ columns }
                                                { ...paginationTableProps }
                                                selectRow={ selectRowProp }
                                                filter={ filterFactory() }
                                                striped
                                                hover
                                                condensed
                                                defaultSorted={ defaultSorted } 
                                            />
                                    </div>
                                                )
                                }
                            </PaginationProvider>
                             
                        </div>
                    </div>
                </div>
                
                <div className="FooterPanel">
                    <div><Footer/></div>
                </div>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        documents: state.agskDocuments,
        hasErrored: state.agskDocumentsHasErrored,
        isLoading: state.agskDocumentsIsLoading,
        posts: state.filterReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (val) => dispatch(getMultiFilteredDocuments(val))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AGSKDocumentsComponent);
