import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-93be9-default-rtdb.firebaseio.com/'
});

export default instance;