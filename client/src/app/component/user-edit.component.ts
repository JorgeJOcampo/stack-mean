import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.services';
import { User } from '../models/user';

@Component({
    selector: 'user-edit',
    templateUrl: '../views/user-edit.html',
    providers: [UserService]
})

export class UserEditComponent implements OnInit{
    titulo: String;
    user: User;
    identity;
    token;

    constructor(private _userService: UserService){
        this.titulo = 'Actualizar los datos';
    }

    ngOnInit(){
        console.log('user-edit cargado');
    }

}