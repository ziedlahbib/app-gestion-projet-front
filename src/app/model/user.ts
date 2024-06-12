import { FileDB } from "./fileDB";
import { Role } from "./role";
import { UserCompetence } from "./userCompetence";

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
    rating:number;
    status:string;
    userCompetences:UserCompetence[];
    file:FileDB;

}
