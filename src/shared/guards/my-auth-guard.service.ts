import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class MyAuthGuard implements CanActivate, CanActivateChild {

  constructor( private auth: AuthenticationService,
               private router: Router) {
  }

   canActivate(route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot): boolean | Observable<boolean> {
      const logged = this.auth.isLogged;
      if ( !logged ) {
        console.log(logged);
        this.router.navigate(['authorization']);
        console.log('Can activate child hit');
        return false;
      }
      return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
                  state: RouterStateSnapshot): Observable<boolean> | boolean{
      return false;
  }
}