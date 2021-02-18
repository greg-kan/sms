//import FileService from './FileService.js';
import axios from 'axios';

const MAIN_API_URL = 'http://localhost:8080'

//export class UploadDownloadFileService {
class UploadDownloadFileService { 
    
    uploadFileToServer(data){
        //returns Promise object
        //return FileService.getRestClient().post('/files/upload', data);

        return axios({
                        url: MAIN_API_URL + '/files/upload',
                        method: 'post',
                        data: data,
                        timeout: 10000,
                        headers: { 'Content-Type': 'application/json' },
                        // config: { headers: {'Content-Type': 'multipart/form-data' }},

                    });
    }

    downloadFileFromServer(fileName){

        return axios({
                        url: MAIN_API_URL + '/files/download/' + fileName,
                        method: 'GET',
                        responseType: 'blob', // important
                    })


    }
}
export default new UploadDownloadFileService()///