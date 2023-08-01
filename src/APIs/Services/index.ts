import { UserAuthService } from "./UserAuth";
import {UserService} from "./User"

export const useService = () =>{
    const services = {
        userAuthService: new UserAuthService(),
        userService: new UserService()
    };

    return services;
};