import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import {BsDropdownModule} from 'ngx-bootstrap'
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ValueComponent } from "./value/value.component";
import { NavComponent } from "./nav/nav.component";
import { FormsModule } from "@angular/forms";
import { AuthService } from "./_services/auth.service";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { ErrorInterceptorProvider } from "./_services/error.interceptor";
import { AlertifyService } from "./_services/alertify.service";
import { MemberListComponent } from "./member-list/member-list.component";
import { ListsComponent } from "./lists/lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { AuthGuard } from './_gurds/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule,BsDropdownModule.forRoot()],
  providers: [AuthService, ErrorInterceptorProvider, AlertifyService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
