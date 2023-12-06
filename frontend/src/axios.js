import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8181'
})


export default instance;