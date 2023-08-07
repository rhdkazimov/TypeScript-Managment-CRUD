import { useNavigate, useNavigation } from "react-router-dom";
import { IEditUser, INewUser } from "../../models";
import { HttpClient } from "../HTTPClients";
import { ROUTES } from "../../routes/consts";


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

    async uptadeUserById(id:number|string,body:IEditUser){
        return await this.put(`edit/${id}`,body)
    }

    async createNewUser(body:INewUser){
        return await this.post('user/create',body)
    }

    async userVerify(){
        return await this.get(`check-token`)
    }
}