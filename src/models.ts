import { EUserRoles } from "./enums";

export interface IUserInfo {
    _id:string
    id:number|string,
    firstName:string,
    lastName:string,
    email:string,
    age? :number,
    password:string,
    roles: EUserRoles[],
    result:any;
}


export interface ILoginUser {
    email:string,
    password:string
}

export interface IEditUser {
    firstName:string,
    lastName:string,
    email:string
}

export interface INewUser {
    firstName:string,
    lastName:string,
    email:string
    roles:string
}