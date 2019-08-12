import { Injectable} from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { of, Observable } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User>
{
    constructor(private userService: UserService ,private router: Router,private alrtify: AlertifyService, private auth: AuthService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<User>{
        return this.userService.getUser(this.auth.decodedToken.nameid).pipe(
            catchError(error =>{
                    this.alrtify.error(error);
                    this.router.navigate(['/members']);
                    return of(null);
                })
        );
    }

}