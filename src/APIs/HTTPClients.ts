import axios from 'axios'

export class HttpClient {
    baseUrl:string;
    constructor(url:string){
        this.baseUrl = url;
    }

    async get(endpoint:string){
        const token = localStorage.getItem("token");
        const header = `Bearer ${token}`
        return await axios.get(`${this.baseUrl}/${endpoint}`,{ headers: {"Authorization":header} });
    }

    async put(endpoint:string,body:any){
        const token = localStorage.getItem("token");
        const header = `Bearer ${token}`
        return await axios.put(`${this.baseUrl}/${endpoint}`,body,{ headers: {"Authorization":header} });
    }

    async post(endpoint:string,body:any){
        const token = localStorage.getItem("token");
        const header = `Bearer ${token}`
        return await axios.post(`${this.baseUrl}/${endpoint}`,body,{ headers: {"Authorization":header} });
    }

    async delete(endpoint:string){
        const token = localStorage.getItem("token");
        const header = `Bearer ${token}`
        return await axios.delete(`${this.baseUrl}/${endpoint}`,{ headers: {"Authorization":header} });
    }
} 