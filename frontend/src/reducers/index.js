import { combineReducers } from 'redux';
import { agskDocumentTypes, agskDocumentTypesHasErrored, agskDocumentTypesIsLoading } from './agskDocumentTypesReducer';
import { agskDocuments, agskDocumentsHasErrored, agskDocumentsIsLoading } from './agskDocumentsReducer';
import { agskDocumentClasses, agskDocumentClassesHasErrored, agskDocumentClassesIsLoading } from './agskDocumentClassesReducer';

export default combineReducers({
    agskDocuments,
    agskDocumentsHasErrored,
    agskDocumentsIsLoading,

    agskDocumentTypes,
    agskDocumentTypesHasErrored,
    agskDocumentTypesIsLoading,

    agskDocumentClasses,
    agskDocumentClassesHasErrored,
    agskDocumentClassesIsLoading    
   
});