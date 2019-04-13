import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { UsersComponent } from './components/users/users.component';
import { UsersHeaderComponent } from './components/users/users-header/users-header.component';
import { UsersListingComponent } from './components/users/users-listing/users-listing.component';

import { ModalDataService } from './shared/modal.service';
import { UsersService } from './shared/users.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LoginFormComponent,
    UsersComponent,
    UsersHeaderComponent,
    UsersListingComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    ModalDataService,
    UsersService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }