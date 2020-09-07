import axios from "axios"

export const instance = axios.create({
    baseURL: process.env.VUE_APP_SERVER_URI + "/api"
})