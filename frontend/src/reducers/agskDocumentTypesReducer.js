export function agskDocumentTypesHasErrored(state = false, action) {
    switch (action.type) {
        case 'AGSK_DOCUMENT_TYPES_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function agskDocumentTypesIsLoading(state = false, action) {
    switch (action.type) {
        case 'AGSK_DOCUMENT_TYPES_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function agskDocumentTypes(state = [], action) {
    switch (action.type) {
        case 'AGSK_DOCUMENT_TYPES_FETCH_DATA_SUCCESS':
            return action.agskDocumentTypes;

        default:
            return state;
    }
}