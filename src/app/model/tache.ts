import { User } from "./user";

export class Tache {
    id:Number;
    description:String;
    user:User[];
    date_debut:Date;
    date_fin:Date;
}