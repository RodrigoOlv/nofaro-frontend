import axios from 'axios'

export const http = axios.create ({
    baseURL: 'http://5c9d09be3be4e30014a7d331.mockapi.io/nofaro/api/v1/'
})