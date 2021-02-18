import AGSKDocumentService from '../service/AGSKDocumentService';

export function agskDocumentsHasErrored(bool) {
    return {
        type: 'AGSK_DOCUMENTS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function agskDocumentsIsLoading(bool) {
    return {
        type: 'AGSK_DOCUMENTS_IS_LOADING',
        isLoading: bool
    };
}

export function agskDocumentsFetchDataSuccess(agskDocuments) {
    return {
        type: 'AGSK_DOCUMENTS_FETCH_DATA_SUCCESS',
        agskDocuments
    };
}

export function getAllDocuments() {
    return (dispatch) => {
        dispatch(agskDocumentsIsLoading(true));

        AGSKDocumentService.getAll()
        .then((response) => {
            dispatch(agskDocumentsIsLoading(false));
            dispatch(agskDocumentsFetchDataSuccess(response.data));
        })
        .catch((error) => {
            dispatch(agskDocumentsHasErrored(true))
            if (error.response) {
            } else if (error.request) {
            } else {
            }
        });
    };    
}

export function applyMultiFilters(documentAttributes) {
    return (dispatch) => {
        dispatch(agskDocumentsIsLoading(true));

        AGSKDocumentService.getMultiFiltered(documentAttributes)
        .then((response) => {
            dispatch(agskDocumentsFetchDataSuccess(response.data));
            dispatch(filterChanged(documentAttributes.id));///
        })
        .catch((error) => {
            dispatch(agskDocumentsIsLoading(false));
            dispatch(agskDocumentsHasErrored(true))
            if (error.response) {
            } else if (error.request) {
            } else {
            }
        });

        dispatch(agskDocumentsIsLoading(false));
    };
}

export function getMultiFilteredDocuments(documentAttributes) {
    if (!documentAttributes) {
        return (dispatch) => {
            dispatch(getAllDocuments());
        }    
    } 
    else {
        return (dispatch) => {
            dispatch(applyMultiFilters(documentAttributes));
        }
    }    
}

export function filterChanged(valueId) {
    return {
        type: 'FILTER_CHANGED',
        valueId
    };
}
