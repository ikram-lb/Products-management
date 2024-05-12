import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';

import {finalize, Observable} from 'rxjs';
import {Injectable} from "@angular/core";
import {AppStateService} from "./app-state.service";
import {LoadingService} from "./loading.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private appState : AppStateService,
              private loadingService:LoadingService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  this.loadingService.showLoadingSpinner()
    /*this.appState.setProductState({
    status:"LOADING"
  })*/

    let req  = request.clone();
    req.headers.set("Authorization","Bearer JWT");
    return next.handle(req).pipe(
      finalize(()=>{
        //this.appState.setProductState({
          //status :"LOADING "
        //})
        this.loadingService.hideLoadingSpinner();
      })
    );
    };


}
