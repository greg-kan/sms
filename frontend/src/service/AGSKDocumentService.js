import axios from 'axios'

const MAIN_API_URL = 'http://localhost:8080'
const AGSK_DOCUMENTS_API_URL = `${MAIN_API_URL}/agsk-documents`
const AGSK_DOCUMENTS_FILTERED_API_URL = `${MAIN_API_URL}/agsk-documents/filter`

class AGSKDocumentService {
    getAll() {
        return axios.get(`${AGSK_DOCUMENTS_API_URL}`);
    }

    getFiltered(documentTypeId) {
        return axios.get(`${AGSK_DOCUMENTS_FILTERED_API_URL}/${documentTypeId}`);
    }

    getMultiFiltered(documentAttributes) {
        return axios.post(`${AGSK_DOCUMENTS_FILTERED_API_URL}`, documentAttributes);
    }

    deleteById(id) {
        return axios.delete(`${AGSK_DOCUMENTS_API_URL}/${id}`);
    }    

    getById(id) {
        return axios.get(`${AGSK_DOCUMENTS_API_URL}/${id}`);                    
    }  
    
    /*getByCode(id, code) {
        return axios.get(`${AGSK_DOCUMENTS_API_URL}/${id}/${code}`);
    }*/

    update(id, document) {
        return axios.put(`${AGSK_DOCUMENTS_API_URL}/${id}`, document);
    }
  
    create(document) {
        return axios.post(`${AGSK_DOCUMENTS_API_URL}`, document);
    }    
}

export default new AGSKDocumentService()