import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  private totalItems: number=0;
  constructor(private productService:ProductService,
              private  router :Router,
              public appState:AppStateService,
              private loadingService : LoadingService) { }

  ngOnInit() {
    this.getProducts();
  }

/*  getProducts() {
    this.productService.getProducts(this.currentPage, this.perPage)
      .subscribe({
        next: (resp) => {
          this.products = resp.body as Product[];
          // Vérifier l'en-tête Link pour obtenir les liens de pagination
          const linkHeader = resp.headers.get('Link');
          if (linkHeader) {
            const links = this.parseLinkHeader(linkHeader);
            if (links['last']) {
              const lastPageUrl = links['last'];
              const lastPageParams = new URLSearchParams(lastPageUrl.split('?')[1]);
              this.totalItems = parseInt(lastPageParams.get('_page') || '0') * this.perPage;
              console.log(this.totalItems);
              this.totalPages =Math.floor(this.totalItems / this.perPage);
              console.log(this.totalPages);
              if(this.totalItems % this.perPage !=0){
               this.totalPages = this.totalPages+1;
              }
            }
          }
        },
        error: err => {
          console.error("Error fetching products:", err);
        }
      });
  }*/

 /* parseLinkHeader(header: string): { [key: string]: string } {
    const links: { [key: string]: string } = {};
    const parts = header.split(',');
    parts.forEach(part => {
      const section = part.split(';');
      const url = section[0].replace(/<(.*)>/, '$1').trim();
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
    });
    return links;
  }*/

   getProducts(){
    /* this.appState.setProductState({
       status : "LOADING"
     });*/
     this.loadingService.showLoadingSpinner()
     this.productService.getProducts(this.appState.productsState.keyword,this.appState.productsState.currentPage,this.appState.productsState.perPage)
       .subscribe({
         next: (resp) => {
           //this.products = resp.body as Product[];
            //let totalProducts= parseInt(resp.headers.get('X-Total-Count')!);
            //console.log(totalProducts)

            //this.totalPages =Math.floor(totalProducts / this.perPage);
            //console.log(this.totalPages);
            //if(totalProducts % this.perPage !=0){
            //  this.totalPages = this.totalPages+1;
            //}
           let products = resp.body.data as Product[];

           //this.appState.productsState.totalProducts=resp.body.items;
           //this.appState.productsState.totalPages = resp.body.pages;
           let totalPages = resp.body.pages;
           let totalProducts = resp.body.items;
           this.appState.setProductState({
             products :products,
             totalProducts :totalProducts,
             totalPages :totalPages,
             status:"LOADED"
           })
           this.loadingService.hideLoadingSpinner()
           //console.log(this.appState.productsState.totalPages);

     //console.log(this.totalPages);
     }, error: err => {
           this.appState.setProductState({
             status: "ERROR",
             errorMessage:err
           })
     console.error("Error fetching products:", err);}
     })
 //this.products$ = this.productService.getProducts();
 }

handleCheckProduct(product: Product) {
this.productService.checkProduct(product).subscribe({
next:updatedProduct =>{
//this.getProducts();
product.checked = !product.checked;
}
})

}

  handleDelete(product: Product) {
    if (confirm("etes vous sure ??"))
    this.productService.deleteProduct(product).subscribe({
    next:value => {
    //this.getProducts();
    //this.appState.productsState.products = this.appState.productsState.products.filter((p:any)=>p.id!=product.id)
    this.getProducts();
    }
    });

  }

/*searchProducts() {
 this.productService.searchProducts(this.keyword).subscribe({
  next:value => {
  this.products = value;
  console.log(value);
  console.log(this.keyword);
  },error:err => {
  console.log(err);
  }
  })
}*/

handleGotoPage(page: number) {
  console.log(page);
  this.appState.productsState.currentPage=page;
  console.log(this.appState.productsState.currentPage);
  this.getProducts();
  console.log(this.appState.productsState.products
  )
  console.log("HAAAAAAAAAAAAAAAAAAAAAAAAAANDEL  Paaaaaaage")

}

  handleUpdate(product: Product) {
  this.router.navigateByUrl(`/admin/editProduct/${product.id}`)

  }
}
