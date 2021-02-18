import axios from 'axios'

const MAIN_API_URL = 'http://localhost:8080'
const AGSK_DOCUMENT_FILES_API_URL = `${MAIN_API_URL}/agsk-document-files`

class AGSKDocumentFileService {

    deleteById(id) {
        return axios.delete(`${AGSK_DOCUMENT_FILES_API_URL}/${id}`);
    }    

    getById(id) {
        return axios.get(`${AGSK_DOCUMENT_FILES_API_URL}/${id}`);
    }  
    
    create(file) {
        return axios.post(`${AGSK_DOCUMENT_FILES_API_URL}`, file);
    }    
}

export default new AGSKDocumentFileService()