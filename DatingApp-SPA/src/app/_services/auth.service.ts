import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import {BehaviorSubject} from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  decodedToken:any;
 jwtHelper=new JwtHelperService();
 currentUser:User;
 photoUrl=new BehaviorSubject<string>('.../../../../assets/user.png');
 currentPhotoUrl =this.photoUrl.asObservable();

  constructor(private http: HttpClient) {}

  changeMemberPhoto(photoUrl:string){
    this.photoUrl.next(photoUrl);
  }

  login(model: User) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
     
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user',JSON.stringify(user.currentUser))
          this.decodedToken=this.jwtHelper.decodeToken(user.token);
          this.currentUser=user.currentUser;
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }
  loggedIn(){
    const token=localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  register(model:User){
    return this.http.post(this.baseUrl+"register",model);
  }
}
