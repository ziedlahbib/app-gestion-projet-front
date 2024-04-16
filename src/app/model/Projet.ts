import { User } from "./user";

export class Projet {
    id:Number;
    nom_projet:String;
    startDate:Date;
    endDate:Date;
    chefDeProjet:User;
    color;
}