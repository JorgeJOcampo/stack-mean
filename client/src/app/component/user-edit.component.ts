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
    alertUpdate: String;

    constructor(private _userService: UserService){
        this.titulo = 'Actualizar los datos';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;
    }

    ngOnInit(){
        console.log('user-edit cargado');
    }

    onSubmit(){
        this._userService.updateUser(this.user).subscribe(
            response => {
                this.user = response.user;
                localStorage.setItem('identity', JSON.stringify(this.identity));
            },error => {
            this.alertUpdate = error.message;
            console.log(error);
          }
        );
    }

}