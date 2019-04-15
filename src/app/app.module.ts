import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BlockUIModule } from 'ng-block-ui';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { UsersComponent } from './components/users/users.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from "./shared/services/auth.service";
import { AuthHttpInterceptor } from "./shared/http/auth-http-interceptor";
import { ToastService } from './shared/services/toaster.service';
import { ModalDataService } from './shared/services/modal.service';
import { UsersService } from './shared/services/users.service';

import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    UsersComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BlockUIModule.forRoot()
  ],
  providers: [
    ModalDataService,
    UsersService,
    ToastService,
    AuthService,
    AuthGuard,
    AuthHttpInterceptor
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }