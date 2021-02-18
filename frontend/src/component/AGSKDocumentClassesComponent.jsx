import React, { Component } from 'react'
import AGSKDocumentClassService from '../service/AGSKDocumentClassService';
import { connect } from 'react-redux';
import AdminNavBar from '../elements/adminNavbar';
import { getAllDocumentClasses } from '../actions/AGSKDocumentClassesActions';
import Footer from '../elements/footer';
import { FaEdit, FaTrashAlt, FaFolderPlus } from "react-icons/fa";
import { Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
class AGSKDocumentClassesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            //documentClasses: [],
            message: null,
            selectedClass: {
                id: -1,
                name: '',
              
            }
        }
        // this.deleteDocumentClassClicked = this.deleteDocumentClassClicked.bind(this)
        // this.editDocumentClassClicked = this.editDocumentClassClicked.bind(this)
        // this.addDocumentClassClicked = this.addDocumentClassClicked.bind(this)
        // this.refreshDocumentClasses = this.refreshDocumentClasses.bind(this)
    }

    componentDidMount() {
        this.props.fetchData();
        //this.refreshDocumentClasses();
    }

    // refreshDocumentClasses() {
    //     AGSKDocumentClassService.getAll()
    //         .then(
    //             response => {
    //                 this.setState({ documentClasses: response.data })
    //             }
    //         )
    // }

    deleteDocumentClassClicked = (name) => {
        const id=this.state.selectedClass.id;

        if ( !id || id === -1) {
            this.setState({ message: 'Необходимо выбрать запись!' });
            return;               
        }
        AGSKDocumentClassService.deleteById(id)
            .then(
                response => {
                    this.setState({ message: `Класс "${name}" удален.` })
                    this.props.fetchData();
                    //this.refreshDocumentClasses()
                }
            )

    }    

    editDocumentClassClicked = () => {
        const id=this.state.selectedClass.id;

        if ( !id || id === -1) {
            this.setState({ message: 'Необходимо выбрать запись!' });
            return;               
        }
        this.props.history.push(`/agsk-document-classes/${id}`)
    }    


    addDocumentClassClicked = () => {
        this.props.history.push(`/agsk-document-classes/-1`)
    }

    onRowSelect = (row, isSelected, e) => {
         this.setState({ selectedClass: {id: row.id, name: row.name }});
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
            dataField: 'name',
            text: 'Наименование',
            sort:true
            //filter: textFilter({placeholder: 'Введите Код'})
        }];
        
        const options = {
            custom: true,
            totalSize:  this.props.documentClasses.length
        };        
        
        return (
            <div className="wrapperFull">
                <div className="TopMenu"><AdminNavBar/></div>
                <div className="FullPanel container-fluid">
                    <h4>Классы документов АГСК</h4>
                    {this.state.message && <div className="alert alert-success">{this.state.message}</div>}

                    <div  className="minimalTable " id="displayCenter-doc">       

                        <div>
                            <Button  className="btnDefaultStyle "  color="success">
                                <FaFolderPlus  className="iconNew"  onClick={this.addDocumentClassClicked} /> 
                            </Button>
                            <Button  className="btnDefaultStyle" color="info" >
                                <FaEdit className="iconAdd"  onClick={this.editDocumentClassClicked}/>
                            </Button>            
                            <Button  className="btnDefaultStyle" color="danger">
                                <FaTrashAlt className="iconDelete" onClick={() => this.deleteDocumentClassClicked(this.state.selectedClass.name)}/>
                            </Button>
                        </div>                 

                        <PaginationProvider pagination={ paginationFactory(options) } >
                                {
                                                ({ paginationProps, paginationTableProps }) => (
                                                    <div> <PaginationListStandalone { ...paginationProps } />
                                                    

                                                    <BootstrapTable
                                                    bootstrap4
                                                    keyField="id"
                                                    data={ this.props.documentClasses}
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
                <div className="FooterPanel">
                    <div><Footer/></div>
                </div>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        documentClasses: state.agskDocumentClasses,
        hasErrored: state.agskDocumentClassesHasErrored,
        isLoading: state.agskDocumentClassesIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(getAllDocumentClasses())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AGSKDocumentClassesComponent);