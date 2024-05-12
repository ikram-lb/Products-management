import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient){ }
  public getProducts(keyword:string,page:number,perPage:number): Observable<HttpResponse<any>> {
    const offset = (page - 1) * perPage;
    console.log(offset);

    return this.http.get(`http://localhost:8089/products?name_like=${keyword}&_page=${page}&_per_page=${perPage}`,{observe:"response"})
  }

  public checkProduct(product: Product):Observable<Product>{

    return this.http.patch<Product>(
      `http://localhost:8089/products/${product.id}`,
      {checked:!product.checked})
  }
  public deleteProduct(product: Product){

    return this.http.delete<Product>(
      `http://localhost:8089/products/${product.id}`);
  }

  saveProduct(product: Product):Observable<Product> {

    return this.http.post<Product>(
      `http://localhost:8089/products`,product);
  }
 /* public searchProducts(keyword:string,page:number=1, size:number=4):Observable<Array<Product>>{
    return this.http.get<Array<Product>>(`http://localhost:8089/products?name_like=${keyword}&_page=${page}&_per_page=${size}`);

  }*/
  getProductsById(productId: number):Observable<Product> {
    return this.http.get<Product>(`http://localhost:8089/products/${productId}`)

  }

  updateProduct(product: Product):Observable<Product> {
    return this.http.put<Product>(`http://localhost:8089/products/${product.id}`,product);
  }
}
