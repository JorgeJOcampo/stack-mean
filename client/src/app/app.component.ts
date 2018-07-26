import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.services';
import { User } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})

export class AppComponent implements OnInit {
  public title = 'Optima Navegacion';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;

  constructor(private _userService: UserService) {
    this.user = new User('', '', '', '', 'ROLE_USER', '');
    this.user_register = new User('', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  public onSubmit() {
    this._userService.signup(this.user).subscribe(
      response => {
        console.log('response', response);
        this.identity = response.user;
        localStorage.setItem('identity', this.identity);
        this._userService.signup(this.user, 'true').subscribe(
          response => {
            console.log('response', response);
            this.token = response.token;
            localStorage.setItem('token', this.token);
            this.user = new User('', '', '', '', 'ROLE_USER', '');
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

  onSubmitRegister() {
    this._userService.register(this.user_register).subscribe(
      response => {
        let user = response.user;
        this.user_register = user;
        this.alertRegister = 'Registro exitoso';
        this.user_register = new User('', '', '', '', 'ROLE_USER', '');
      }, error => {
        this.alertRegister = error.message;
        console.log(error);
      }
    );
  }

  logout() {
    localStorage.clear();
    this.identity = undefined;
    this.token = undefined;
  }
}
