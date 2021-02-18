import AGSKDocumentTypeService from '../service/AGSKDocumentTypeService';

export function agskDocumentTypesHasErrored(bool) {
    return {
        type: 'AGSK_DOCUMENT_TYPES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function agskDocumentTypesIsLoading(bool) {
    return {
        type: 'AGSK_DOCUMENT_TYPES_IS_LOADING',
        isLoading: bool
    };
}

export function agskDocumentTypesFetchDataSuccess(agskDocumentTypes) {
    return {
        type: 'AGSK_DOCUMENT_TYPES_FETCH_DATA_SUCCESS',
        agskDocumentTypes
    };
}

export function getAllDocumentTypes() {
    return (dispatch) => {
        dispatch(agskDocumentTypesIsLoading(true));

        AGSKDocumentTypeService.getAll()
        .then((response) => {
            dispatch(agskDocumentTypesIsLoading(false));
            dispatch(agskDocumentTypesFetchDataSuccess(response.data));
        })
        .catch((error) => {
            dispatch(agskDocumentTypesHasErrored(true))
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