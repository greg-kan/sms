import AGSKDocumentClassService from '../service/AGSKDocumentClassService';

export function agskDocumentClassesHasErrored(bool) {
    return {
        type: 'AGSK_DOCUMENT_CLASSES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function agskDocumentClassesIsLoading(bool) {
    return {
        type: 'AGSK_DOCUMENT_CLASSES_IS_LOADING',
        isLoading: bool
    };
}

export function agskDocumentClassesFetchDataSuccess(agskDocumentClasses) {
    return {
        type: 'AGSK_DOCUMENT_CLASSES_FETCH_DATA_SUCCESS',
        agskDocumentClasses
    };
}

export function getAllDocumentClasses() {
    return (dispatch) => {
        dispatch(agskDocumentClassesIsLoading(true));

        AGSKDocumentClassService.getAll()
        .then((response) => {
            dispatch(agskDocumentClassesIsLoading(false));
            dispatch(agskDocumentClassesFetchDataSuccess(response.data));
        })
        .catch((error) => {
            dispatch(agskDocumentClassesHasErrored(true))
            if (error.response) {
                /*
                * The request was made and the server responded with a
                * status code that falls out of the range of 2xx
                */
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                /*
                * The request was made but no response was received, `error.request`
                * is an instance of XMLHttpRequest in the browser and an instance
                * of http.ClientRequest in Node.js
                */
                // console.log(error.request);
            } else {
                // Something happened in setting up the request and triggered an Error
                // console.log('Error', error.message);
            }
            // console.log(error.config);
        });
    };  
}      