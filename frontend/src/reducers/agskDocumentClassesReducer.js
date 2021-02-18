export function agskDocumentClassesHasErrored(state = false, action) {
    switch (action.type) {
        case 'AGSK_DOCUMENT_CLASSES_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function agskDocumentClassesIsLoading(state = false, action) {
    switch (action.type) {
        case 'AGSK_DOCUMENT_CLASSES_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function agskDocumentClasses(state = [], action) {
    switch (action.type) {
        case 'AGSK_DOCUMENT_CLASSES_FETCH_DATA_SUCCESS':
            return action.agskDocumentClasses;

        default:
            return state;
    }
}