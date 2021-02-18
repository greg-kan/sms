import axios from 'axios'

const MAIN_API_URL = 'http://localhost:8080'
const AGSK_DOCUMENT_CLASSES_API_URL = `${MAIN_API_URL}/agsk-document-classes`

class AGSKDocumentClassService {

    getAll() {
        return axios.get(`${AGSK_DOCUMENT_CLASSES_API_URL}`);
    }

    deleteById(id) {
        return axios.delete(`${AGSK_DOCUMENT_CLASSES_API_URL}/${id}`);
    }    

    getById(id) {
        return axios.get(`${AGSK_DOCUMENT_CLASSES_API_URL}/${id}`);
    }  
    
    update(id, documentClass) {
        return axios.put(`${AGSK_DOCUMENT_CLASSES_API_URL}/${id}`, documentClass);
  
    }
  
    create(documentClass) {
        return axios.post(`${AGSK_DOCUMENT_CLASSES_API_URL}`, documentClass);
    }    
}

export default new AGSKDocumentClassService()