import React, { Component } from 'react'
import AGSKDocumentTypeService from '../service/AGSKDocumentTypeService';
import { connect } from 'react-redux';
import { getAllDocumentTypes } from '../actions/AGSKDocumentTypesActions';
import AdminNavBar from '../elements/adminNavbar';
import Footer from '../elements/footer';

// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { Button } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaFolderPlus} from "react-icons/fa";

class AGSKDocumentTypesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: '',
           
            selectedTypeDocument: {
                id: -1,
                name:''
            }   
          
          
        }
        // this.deleteDocumentTypeClicked = this.deleteDocumentTypeClicked.bind(this)
        // this.editDocumentTypeClicked = this.editDocumentTypeClicked.bind(this)
        // this.addDocumentTypeClicked = this.addDocumentTypeClicked.bind(this)
    }

    componentDidMount() {
        this.props.fetchData();
    }

    deleteDocumentTypeClicked=(row)=> {
        const id=this.state.selectedTypeDocument.id;
       
        if ( !id || id === -1) {
            this.setState({ message: 'Необходимо выбрать запись!' });
            return;               
        }

        AGSKDocumentTypeService.deleteById(id)
            .then(
                response => {
                    this.setState({ message: `Тип "${this.state.selectedTypeDocument.name}" удален.` });
                    this.props.fetchData();
                }
            )

    }    

    editDocumentTypeClicked=(row)=> {
        const id=this.state.selectedTypeDocument.id;
        if ( !id || id === -1) {
            this.setState({ message: 'Необходимо выбрать запись!' });
            return;               
        }

        this.setState({ selectedTypeDocument: {id: row.id, name: row.name}});
       

        this.props.history.push(`/agsk-document-types/${id}`)
    }    


    addDocumentTypeClicked=()=> {
        this.props.history.push(`/agsk-document-types/-1`)
    }


    onRowSelect(row, isSelected, e) {
        this.setState({ selectedTypeDocument: {id: row.id, name: row.name}});
    }
   
    render() {
        const selectRowProp = {
            mode: 'radio',
            bgColor: '#63a2f9', // you should give a bgcolor, otherwise, you can't regonize which row has been selected
            hideSelectColumn: true,  // enable hide selection column.
            clickToSelect: true,  // you should enable clickToSelect, otherwise, you can't select column.
            onSelect: this.onRowSelect.bind(this)
        }; 
        
        const columns = [{
            dataField: 'name',
            text: 'Наименование',
            sort: true
            //filter: textFilter({placeholder: 'Введите Код'})
        }];
          
        const options = {
            custom: true,
            totalSize: this.props.documentTypes.length
        };

        if (this.props.hasErrored) {
            return <p>Sorry! Здесь должно быть сообщение об ошибке!</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }  

        return (
            <div className="wrapperFull">
                <div className="TopMenu"><AdminNavBar/></div>
                <div className="FullPanel container-fluid">
                    <h4>Типы документов АГСК</h4>
                    {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                    <div>
                        <div className="minimalTable " id="displayCenter-doc">

                        <div> 
                            <Button  className="btnDefaultStyle "  color="success">
                                <FaFolderPlus  className="iconNew"  onClick={this.addDocumentTypeClicked} /> 
                            </Button>
                            <Button  className="btnDefaultStyle" color="info" > 
                                <FaEdit className="iconAdd"  onClick={this.editDocumentTypeClicked} /> 
                            </Button>            
                            <Button  className="btnDefaultStyle" color="danger">
                                <FaTrashAlt className="iconDelete" onClick={this.deleteDocumentTypeClicked} /> 
                            </Button>
                        </div>


                            
                            <PaginationProvider pagination={ paginationFactory(options) } >
                                {
                                    ({ paginationProps, paginationTableProps }) => (
                                        <div> <PaginationListStandalone { ...paginationProps } />
                                            <BootstrapTable
                                                bootstrap4
                                                keyField="id"
                                                data={ this.props.documentTypes}
                                                columns={ columns }
                                                selectRow={ selectRowProp }
                                                { ...paginationTableProps }
                                                striped
                                                hover
                                                condensed
                                            />
                                        </div>
                                    )
                                }
                            </PaginationProvider>

                        </div>

                    </div>
                </div>
                
                <div  className="FooterPanel">
                    <div><Footer/></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        documentTypes: state.agskDocumentTypes,
        hasErrored: state.agskDocumentTypesHasErrored,
        isLoading: state.agskDocumentTypesIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(getAllDocumentTypes())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AGSKDocumentTypesComponent);