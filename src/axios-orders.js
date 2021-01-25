import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-a83db-default-rtdb.firebaseio.com/',
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials":true
    }
});

export default instance;