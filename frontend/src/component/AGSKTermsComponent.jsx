import React, { Component } from 'react'
import AGSKTermService from '../service/AGSKTermService';
import NavBar from '../elements/navbar';

import Footer from '../elements/footer';
import { FaEdit, FaTrashAlt, FaFolderPlus } from "react-icons/fa";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from 'reactstrap';
class AGSKTermsComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            terms: [],
            main:false,
            message: null,
            
            selectedTerm: {
                id: -1,
                main:''
            }   
            
        }
        this.deleteTermClicked = this.deleteTermClicked.bind(this)
        // this.editTermClicked = this.editTermClicked.bind(this)
        this.addTermClicked = this.addTermClicked.bind(this)
        this.refreshTerms = this.refreshTerms.bind(this)
    }

    componentDidMount() {
        this.refreshTerms();
    }

    refreshTerms() {
        AGSKTermService.getAll()
            .then(
                response => {
                    this.setState({ terms: response.data })
                }
            )
    }

    deleteTermClicked=(row)=> {
        const id=this.state.selectedTerm.id;
        AGSKTermService.deleteById(id)
            .then(
                response => {
                    this.setState({ message: `Термин "${id}" удален.` })
                    this.refreshTerms()
                }
            )

    }    

    editTermClicked=(row)=>{
        const id=this.state.selectedTerm.id;

        if ( !id || id === -1) {
            this.setState({ message: 'Необходимо выбрать запись!' });
            return;               
        }
        // this.setState({ selectedTerm: {id: row.id, main: row.main}});
        this.props.history.push(`/agsk-terms/${id}`)
    }    

    // editDocumentTypeClicked=(row)=> {
    //     const id=this.state.selectedTypeDocument.id;
    //     if ( !id || id === -1) {
    //         this.setState({ message: 'Необходимо выбрать запись!' });
    //         return;               
    //     }

    //     this.setState({ selectedTypeDocument: {id: row.id, name: row.name}});
       

    //     this.props.history.push(`/agsk-document-types/${id}`)
    // }    

    addTermClicked=()=>  {
        this.props.history.push(`/agsk-terms/-1`)
    }

    onRowSelect(row, isSelected, e) {
        
        console.log("this is row",row.id,row.main)
        this.setState({ selectedTerm: {id: row.id, main: row.name}});
        // console.log("selectedTypeDocument",this.state.selectedTypeDocument)
    }
   
    render() {
      
          
        const selectRowProp = {
            mode: 'radio',
            bgColor: '#63a2f9', // you should give a bgcolor, otherwise, you can't regonize which row has been selected
            hideSelectColumn: true,  // enable hide selection column.
            clickToSelect: true,  // you should enable clickToSelect, otherwise, you can't select column.
            onSelect: this.onRowSelect.bind(this)
          }; 
          
         
          const columns = [
           
            {
              dataField: 'main',
              text: 'Действия'
            }
          ];
          
        return (
            <div className="wrapperFull">
                <div className="TopMenu"><NavBar/></div>
                <div className="FullPanel container-fluid " >
                    <h4>Термины АГСК</h4>
                    {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                    <div  className="minimalTable " id="displayCenter-doc"> 
                    
                        <div>
                            <Button className="btnDefaultStyle btn-success" onClick={this.addTermClicked} >
                                <FaFolderPlus/> 
                            </Button>
                            <Button  className="btnDefaultStyle" color="info" > 
                                <FaEdit className="iconAdd"  onClick={this.editTermClicked} /> 
                            </Button>            
                        
                            <Button  className="btnDefaultStyle" color="danger">
                                <FaTrashAlt className="iconDelete" onClick={this.deleteTermClicked}></FaTrashAlt>
                            </Button>

                        </div>
                        
                        

                        <BootstrapTable 
                            keyField='id'
                            data={ this.state.terms }
                            columns={ columns }
                            selectRow={ selectRowProp }
                           
                            />

                        {/* <>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Главный</th>
                                        <th>Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                
                                    {
                                        this.state.terms.map(                                   
                                            term =>
                                                <tr key={term.id}>
                                                    <td><p>{term.id.toString()}</p></td>
                                                    <td><p>{term.main.toString()}</p></td>

                                                    <td>
                                                        <div>
                                                            <button  color="primary" size="sm" onClick={() => this.editTermClicked(term.id)}
                                                                     className="mrgn"> <FaEdit/>
                                                            </button>
                                                            <button  color="danger" size="sm" onClick={() => this.deleteTermClicked(term.id)}
                                                                     className="mrgn"> <FaTrashAlt/>
                                                            </button>
                                                        </div>
                                                    </td>


                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table >
                        </> */}

                    </div>
                </div>
                <div className="FooterPanel">
                    <div><Footer/></div>
                </div>                
            </div>
        )
    }
}

export default AGSKTermsComponent