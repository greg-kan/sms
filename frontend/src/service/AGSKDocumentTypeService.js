import axios from 'axios'

const MAIN_API_URL = 'http://localhost:8080'
const AGSK_DOCUMENT_TYPES_API_URL = `${MAIN_API_URL}/agsk-document-types`

class AGSKDocumentTypeService {

    getAll() {
        return axios.get(`${AGSK_DOCUMENT_TYPES_API_URL}`);
    }

    deleteById(id) {
        return axios.delete(`${AGSK_DOCUMENT_TYPES_API_URL}/${id}`);
    }    

    getById(id) {
        return axios.get(`${AGSK_DOCUMENT_TYPES_API_URL}/${id}`);
    }  
    
    update(id, documentType) {
        return axios.put(`${AGSK_DOCUMENT_TYPES_API_URL}/${id}`, documentType);
  
    }
  
    create(documentType) {
        return axios.post(`${AGSK_DOCUMENT_TYPES_API_URL}`, documentType);
    }    
}

export default new AGSKDocumentTypeService()