import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService{
  public productsState:any= {
     products :[],
     keyword:"",
     totalPages:0,
     perPage:4,
     currentPage:1,
     totalProducts :0,
     status : "",
     errorMessage :""
  }
  public authState:any={
    isAuthentificated:false,
    username : undefined,
    roles:undefined,
    token:undefined

  }
  constructor() { }
  public setProductState(state :any):void{
    this.productsState = {... this.productsState,... state}
  }
  public setAuthState(state:any):void{
    this.authState={... this.authState,... state};
  }

}
