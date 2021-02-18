import React, { Component } from 'react'
import { Formik, Form } from 'formik';
import AGSKDocumentClassService from '../service/AGSKDocumentClassService';
import AGSKDocumentService from '../service/AGSKDocumentService';
import NavBar from '../elements/navbar';
import Footer from '../elements/footer';
import '../assets/classes_linker.css'
import arrow_right from '../assets/arrow_right.png'
import arrow_left from '../assets/arrow_left.png'
import { Button } from 'reactstrap';
class AGSKDocumentClassesLinkerComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            allClasses: [],
            allClassesList: [],
            documentClassesList: [],
            selectedClasses: [],
            selectedDocumentClasses: [],
            document: {}
        }
        
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        if (this.state.id !== -1) {

            let documentClasses = []
            let allClasses = []

            AGSKDocumentService.getById(this.state.id)
            .then(response => {
                let document = response.data
                documentClasses = document.documentClasses

                let documentClassesIds = []
                documentClasses.forEach(e => {
                    documentClassesIds.push(e.id)
                })

                AGSKDocumentClassService.getAll()
                .then(response => {
                    let allClassesTemp = response.data
                    allClasses = allClassesTemp.filter(item => {
                            return documentClassesIds.indexOf(item.id) === -1;
                    }) 
                        
                    this.setState({ 
                        allClassesList: allClasses,
                        allClasses: allClassesTemp,
                        documentClassesList: documentClasses,
                        document: document
                    })
                })
            })
        }
    }

    // Событие возникает при клике на элементе в левом списке
    onAllClassesListClick = (e)=> {
        let itemId = e.target.id

        if( !(itemId > 0) ) {
            return
        }

        let selectedClassesNew = this.state.selectedClasses

        const element = selectedClassesNew.find(item => {
            return +item.id === +itemId
        })  

        if (!element) {
            selectedClassesNew.push(e.target)
        } else {
            selectedClassesNew = selectedClassesNew.filter(item => {
                return +item.id !== +element.id
            })
        }       

        this.setState({
            selectedClasses: selectedClassesNew
        })
    }  
    
    // Событие возникает при клике на элементе в правом списке
    onDocumentClassesListClick= (e)=> {
        let itemId = e.target.id

        if( !(itemId > 0) ) {
            return
        }

        let selectedDocumentClassesNew = this.state.selectedDocumentClasses

        const element = selectedDocumentClassesNew.find(item => {
            return +item.id === +itemId
        })        

        if (!element) {
            selectedDocumentClassesNew.push(e.target)
        } else {
            selectedDocumentClassesNew = selectedDocumentClassesNew.filter(item => {
                return +item.id !== +element.id
            })
        }

        this.setState({
            selectedDocumentClasses: selectedDocumentClassesNew
        })

    }

    // Событие, происходящее при нажатие на стрелку
    arrowMoveToLinkedClick = () => {

        if ( !(this.state.selectedClasses.length > 0) ) {
            return
        }

        //классы, выделенные для переноса вправо (для добавления к классам документа)
        let selectedClassesNew = this.state.selectedClasses

        //классы, уже связаные с документом (в процессе операции добавления к классам документа)
        let documentClassesListNew = this.state.documentClassesList

        //все классы, доступные для выделения и переноса вправо (для добавления к классам документа)
        let allClassesListNew = this.state.allClassesList

        selectedClassesNew.forEach(e => {

            // в массиве всех классов находим выбранный элемент
            const selectedElem = allClassesListNew.find(item => {
                return +item.id === +e.id
            })

            if (!selectedElem) {
                return
            }

            // Добавляем найденный элемент в массив
            documentClassesListNew.push(selectedElem)

            // Удаляем с исходного массива выбранный элемент
            allClassesListNew = allClassesListNew.filter(item => {
                return +item.id !== +e.id
            })
        })

        //Устанавливаем в state новые массивы
        this.setState({ 
            documentClassesList: documentClassesListNew,
            allClassesList: allClassesListNew,
            selectedClasses: []
        })
    }
    
    arrowMoveToAllClick = ()=> {//

        if ( !(this.state.selectedDocumentClasses.length > 0) ) {
            return
        }        

        //классы, выделенные для переноса влево (для добавления ко всем классам)
        let selectedDocumentClassesNew = this.state.selectedDocumentClasses

        //классы, уже связаные с документом (в процессе операции добавления к классам документа)
        let documentClassesListNew = this.state.documentClassesList

        //все классы, доступные для выделения и переноса вправо (для добавления к классам документа)
        let allClassesListNew = this.state.allClassesList

        selectedDocumentClassesNew.forEach(e => {

            // в массиве классов документа находим выбранный элемент
            const selectedElem = documentClassesListNew.find(item => {
                return +item.id === +e.id
            })

            if (!selectedElem) {
                return
            }

            // Добавляем найденный элемент в массив
            allClassesListNew.push(selectedElem)

            // Удаляем с исходного массива выбранный элемент
            documentClassesListNew = documentClassesListNew.filter(item => {
                return +item.id !== +e.id
            })
        })

        //Устанавливаем в state новые массивы
        this.setState({ 
            documentClassesList: documentClassesListNew,
            allClassesList: allClassesListNew,
            selectedDocumentClasses: []
        })
    }

    onSubmit(values) {

        let documentClassesIds = []
        this.state.documentClassesList.forEach(e => {
            documentClassesIds.push(e.id)
        })

        let documentClasses = this.state.allClasses.filter(e => {
            return documentClassesIds.indexOf(e.id) !== -1;
        })

        let document = this.state.document
        document.documentClasses = documentClasses

        AGSKDocumentService.update(this.state.id, document)
        .then(() => this.props.history.push('/agsk-documents'))
    }

    render() {
        if(this.state.allClassesList) {
            var listAllClasses = this.state.allClassesList.map(data=> {
                return (
                    <li key={data.id} id={data.id} className={`${this.state.selectedClasses.find(item => {
                        return +item.id === +data.id
                    }) ? 'selected-item': 'deselected-item'}`}>
                        {data.name}
                    </li>
            )})
        } else {
            return
        }

        if(this.state.documentClassesList) {
            var listDocumentClasses = this.state.documentClassesList.map(data=> {
                return (
                    <li key={data.id} id={data.id} className={`${this.state.selectedDocumentClasses.find(item => {
                        return +item.id === +data.id
                    }) ? 'selected-item': 'deselected-item'}`}>
                        {data.name}
                    </li>
            )})
        } else {
            return
        }
        
        
        // if(this.state.allClassesList) {
        //     var listAllClasses = this.state.allClassesList.map(data=> {
        //         return (
        //             <li className={'list-item'} key={data.id}>
        //                 <span id={data.id} className={`${this.state.selectedClasses.find(item => {
        //                                                         return +item.id === +data.id
        //                                                     }) ? 'selected-item': 'deselected-item'}`}>
        //                     {data.name}
        //                 </span>
        //             </li>
        //     )})
        // } else {
        //     return
        // }

        // if(this.state.documentClassesList) {
        //     var listDocumentClasses = this.state.documentClassesList.map(data=> {
        //         return (
        //             <li className={'list-item'} key={data.id}>
        //                 <span id={data.id} className={`${this.state.selectedDocumentClasses.find(item => {
        //                                                         return +item.id === +data.id
        //                                                     }) ? 'selected-item': ''}`}>
        //                     {data.name}
        //                 </span>
        //             </li>
        //     )})
        // } else {
        //     return
        // }        

        return (
            <div className="wrapperFull">
                  <div className="TopMenu">
                      <NavBar/>
                      </div>
                <div className="FullPanel " >
                
                   <>
                        <h4 >Документ</h4>
                        <div>
                            <div className="container">
                                <Formik
                                    initialValues={this.state}
                                    onSubmit={this.onSubmit}
                                    validateOnChange={false}
                                    validateOnBlur={false}
                                    validate={false}
                                    enableReinitialize={true}
                                >
                                    {
                                        (props) => (
                                            <Form>
                                                <div className={"box-container"}>
                                                    
                                                    <div className={"box-all"} >
                                                        <ul className="striped-list" onClick = {this.onAllClassesListClick} >
                                                            {listAllClasses}
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <div className={"arrow"} onClick={this.arrowMoveToLinkedClick}>
                                                            <img src={arrow_right} alt="arrow"></img>
                                                        </div>
                                                        <br></br>
                                                        <div className={"arrow"} onClick={this.arrowMoveToAllClick}>
                                                            <img src={arrow_left} alt="arrow"></img>
                                                        </div>
                                                    </div>

                                                    <div className={"box-all"}>
                                                        <ul className="striped-list" onClick = {this.onDocumentClassesListClick}>
                                                            {listDocumentClasses}
                                                        </ul>
                                                    </div>

                                                </div>                                                

                                                <Button className="btn btn-success p-2" type="submit" >Сохранить</Button>                                                        
                                            </Form>
                                        )
                                    }
                                </Formik>
                            </div>
                        </div>
                        </>
                  
                </div>
                
                <div className="FooterPanel">
                    <div><Footer/></div>
                </div>


           
            </div>
        )
    }

}

export default AGSKDocumentClassesLinkerComponent