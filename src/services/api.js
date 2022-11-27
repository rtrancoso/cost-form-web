import axios from 'axios';

import LoadingControl from '../utilities/loading-control';
import NotifyControl from '../utilities/notify-control';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use(request => {
    LoadingControl.add();
    return request;
}, error => {
    Promise.reject(error);
});

api.interceptors.response.use(response => {
    LoadingControl.rem();
    return response.data;
}, error => {
    LoadingControl.rem();
    if (!error.response) {
        NotifyControl.danger('Error', 'Unexpected error');
    } else {
        NotifyControl.danger('Error', JSON.stringify(error.response.data));
    }
    throw new Error(error);
})

export default api;