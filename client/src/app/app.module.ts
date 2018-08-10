import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { routing } from './app.routing'
import { AppComponent } from './app.component';
import { UserEditComponent } from './component/user-edit.component';
 
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  declarations: [
    AppComponent,
    UserEditComponent,
  ],

  bootstrap: [AppComponent]
})
 
export class AppModule { }