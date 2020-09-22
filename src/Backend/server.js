// backend to be updated  !!!!
import axios from 'axios';

const instance=axios.create({
    baseURL: 'https://react-example-59018.firebaseio.com/'
});

export default instance;