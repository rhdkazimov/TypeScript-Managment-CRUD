import axios from 'axios'

export class HttpClient {
    baseUrl:string;
    constructor(url:string){
        this.baseUrl = url;
    }

    async get(endpoint:string){
        return await axios.get(`${this.baseUrl}/${endpoint}`);
    }

    async put(endpoint:string,id:number|string){
        return await axios.get(`${this.baseUrl}/${endpoint}/${id}`);
    }

    async post(endpoint:string,body:any){
        return await axios.post(`${this.baseUrl}/${endpoint}`,body);
    }

    async delete(endpoint:string){
        return await axios.delete(`${this.baseUrl}/${endpoint}`);
    }
} 