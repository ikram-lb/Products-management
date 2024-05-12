import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from "rxjs";
import {AppStateService} from "../services/app-state.service";
import {Injectable} from "@angular/core";



export class AuthentificationGuard {
  constructor(private appState:AppStateService,private router:  Router) {
  }
  canActivate(
    route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot):Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree {

    if(this.appState.authState.isAuthentificated == true){
      return true;
    }else{
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
