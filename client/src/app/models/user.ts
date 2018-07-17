export class User{
    constructor(
        public _id: string,
        public name: string,
        public surname: string,
        public password: string,
        public rol: string,
        public image: string
    ){}
}