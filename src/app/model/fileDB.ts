import { User } from "./user";

export class FileDB {
    id?:number;
    name?:String;
    type?:String;
    data?:Int32Array[];
    user?:User;
}