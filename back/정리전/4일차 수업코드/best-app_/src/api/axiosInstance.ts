import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:`http://localhost:7777/api`,
    headers:{
        'Content-Type':'applcation/json'
    }
})
export default axiosInstance;