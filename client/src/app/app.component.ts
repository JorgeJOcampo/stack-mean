import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.services';
import {User} from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ UserService ]
})

export class AppComponent implements OnInit{
  public title = 'Optima Navegacion';
  public user: User;
  public identity;
  public token;
  public errorMessage;
  
  constructor(private _userService: UserService){
    this.user = new User('','','','','ROLE_USER','');
  }

  ngOnInit(){
    var texto = this._userService.signup(User, false);
    console.log(texto);
  }

  public onSubmit(){
    this._userService.signup(this.user).subscribe(
      response => {
        this.identity = response.user;
        this._userService.signup(this.user, 'true').subscribe(
          response => {
            this.token = response.token;
            console.log(this.identity);
            console.log(this.token);
          }, error => {
            this.errorMessage = error.message;
            console.log(error);
          }
        )
      }, error => {
        this.errorMessage = error.message;
        console.log(error);
      }
    );
  }
}
