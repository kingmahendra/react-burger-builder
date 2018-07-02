import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://mk-react-buger.firebaseio.com/'
});

export default instance;

