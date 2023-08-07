import {  ILoginUser, IUserInfo } from "../../models";
import { HttpClient } from "../HTTPClients";

export class UserAuthService extends HttpClient{
    constructor() {
        super("http://localhost:3001");
    }


    async registerUser(body:IUserInfo){
        return await this.post(`register`,body)
    }

    async loginUser(body:ILoginUser){
        return await this.post(`login`,body).then(({data})=>{
            localStorage.setItem("token",data.token);
            localStorage.setItem("user",JSON.stringify(data.user));
        }
        )
    }
    
    // async userVerify(){
    //     return await this.get(`check-token`)
    // }

    async logout() {
        return await this.get('logout')
        // .then(()=>localStorage.clear())
    }
} 