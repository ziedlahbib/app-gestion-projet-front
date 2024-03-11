import { Role } from "./role";

export class User {
    id:Number;
    username:String;
    nom:String;
    prenom:String;
    email:String;
    password:String;
    resetToken:String;
    active:Boolean;
    roles:Role;
    rating:Number;


}
