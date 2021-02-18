export function agskDocumentsHasErrored(state = false, action) {
    switch (action.type) {
        case 'AGSK_DOCUMENTS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function agskDocumentsIsLoading(state = false, action) {
    switch (action.type) {
        case 'AGSK_DOCUMENTS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function agskDocuments(state = [], action) {
    switch (action.type) {
        case 'AGSK_DOCUMENTS_FETCH_DATA_SUCCESS':
            return action.agskDocuments;

        default:
            return state;
    }
}

// export function filterReducer(state = [], action) {
//     switch (action.type) {
//         case 'FILTER_CHANGED':
//             return action.valueId;

//         default:
//             return state;
//     }
// }

// let documentTypes = this.state.types.filter(type => {
//   return +type.id === +this.state.typeId
