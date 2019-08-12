import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tokenHelper=new JwtHelperService();
  constructor(
    private auth: AuthService
  ) {}
  ngOnInit() {
 
    var token = localStorage.getItem('token');
    const user :User =JSON.parse( localStorage.getItem('user'));
    if (token) {
      this.auth.decodedToken = this.tokenHelper.decodeToken(token);
      

    }
    if(user){
      this.auth.currentUser=user;
      this.auth.changeMemberPhoto(user.photoUrl);
    }
  }
}
