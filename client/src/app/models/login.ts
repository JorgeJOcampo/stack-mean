import { User } from "./user";

export class Login{
    constructor(
        public user: User,
        public token: string
    ){}
}