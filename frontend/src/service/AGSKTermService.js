import axios from 'axios'

const MAIN_API_URL = 'http://localhost:8080'
const AGSK_TERMS_API_URL = `${MAIN_API_URL}/agsk-terms`

class AGSKTermService {

    getAll() {
        return axios.get(`${AGSK_TERMS_API_URL}`);
    }

    deleteById(id) {
        return axios.delete(`${AGSK_TERMS_API_URL}/${id}`);
    }    

    getById(id) {
        return axios.get(`${AGSK_TERMS_API_URL}/${id}`);                    
    }  
    
    update(id, term) {
        return axios.put(`${AGSK_TERMS_API_URL}/${id}`, term);
    }
  
    create(term) {
        return axios.post(`${AGSK_TERMS_API_URL}`, term);
    }    
}

export default new AGSKTermService()