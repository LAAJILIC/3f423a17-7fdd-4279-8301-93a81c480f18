import axios from 'axios';
//this is a local axios

const instance = axios.create({
    baseURL: 'https://teclead-ventures.github.io/data/london-events.json',
})

export default instance;