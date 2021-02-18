import React, { Component } from 'react';
import AGSKDocumentsComponent from './AGSKDocumentsComponent';
import AGSKDocumentComponent from './AGSKDocumentComponent';
import AGSKDocumentTypesComponent from './AGSKDocumentTypesComponent';
import AGSKDocumentTypeComponent from './AGSKDocumentTypeComponent';
import AGSKDocumentClassesComponent from './AGSKDocumentClassesComponent';
import AGSKDocumentClassComponent from './AGSKDocumentClassComponent';
import AGSKTermsComponent from './AGSKTermsComponent';
import AGSKTermComponent from './AGSKTermComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminPanel from '../component/adminPanel';
import AGSKDocumentClassesLinkerComponent from './AGSKDocumentClassesLinkerComponent';

class InstructorApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <Switch>
                        <Route path="/" exact component={AGSKDocumentsComponent} />
                        <Route path="/agsk-documents" exact component={AGSKDocumentsComponent} />
                        <Route path="/agsk-documents/:id" component={AGSKDocumentComponent} />
                        <Route path="/agsk-document-types" exact component={AGSKDocumentTypesComponent} />
                        <Route path="/agsk-document-types/:id" component={AGSKDocumentTypeComponent} />  
                        <Route path="/agsk-document-classes" exact component={AGSKDocumentClassesComponent} />  
                        <Route path="/agsk-document-classes/:id" component={AGSKDocumentClassComponent} />
                        <Route path="/agsk-terms" exact component={AGSKTermsComponent} />  
                        <Route path="/agsk-terms/:id" component={AGSKTermComponent} />  
                        <Route path="/agsk-document-classes-linker/:id" component={AGSKDocumentClassesLinkerComponent} />
                        <Route path="/agsk-adminPanel" exact component={AdminPanel} />  
                        
                    </Switch>
                </>
            </Router>
        )
    }
}

export default InstructorApp