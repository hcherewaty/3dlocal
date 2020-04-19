import axios from 'axios';

/* 
method = HTTP verb
path = api endpoint
data = data (in json) to send in post request (optional)
*/

export function setHeader(token){
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

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