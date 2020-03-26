import axios from 'axios';

/* 
method = HTTP verb
path = api endpoint
data = data (in json) to send in post request (optional)
*/

export function apiCall(method, path, data){
    return new Promise( (resolve, reject) => {
        return axios[method](path, data)
        .then( res => {
            return resolve(res.data)
        })
        .catch( err => {
            return reject(err.response.data.error);
        });
    });
}