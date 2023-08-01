import { HttpClient } from "../HTTPClients";


export class UserService extends HttpClient{
    constructor() {
        super("http://localhost:3001");
    }

    async getAllUsers(){
        return await this.get(`users`);
    }

    async getUserById(id:number|string){
        return await this.get(`users/${id}`);
    }

    async deleteUserById(id:number|string){
        return await this.get(`delete/${id}`);
    }

    async uptadeUserById(id:number|string,body:any){
        return await this.post(`edit/${id}`,body)
    }

}