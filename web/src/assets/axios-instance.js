import axios from "axios"

export const instance = axios.create({
    baseURL: process.env.VUE_APP_SERVER_URI + "/api",
    headers: {
        'x-api-key': process.env.VUE_APP_API_SECRET
    },
    validateStatus: status => {
        return [ 
            200, 
            201, 
            405, 
            404, 
            501,
        ].indexOf(status) != -1
    }
})