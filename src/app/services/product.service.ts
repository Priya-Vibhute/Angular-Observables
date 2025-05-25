import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Product 
{
   id:number,
   title:string,
   price:number,
   description:string,
   category:string,
   image:string,
   rating?:{rate:number,count:number}
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

 

  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<Product[]>
  {
     return  this.httpClient.get<Product[]>("https://fakestoreapi.com/products")
  }

  addProduct(product:Product):Observable<Product>
  {
      return this.httpClient.post<Product>("https://fakestoreapi.com/products",product)
  }

  getProductById(productId:number):Observable<Product>
  {
         return  this.httpClient.get<Product>(`https://fakestoreapi.com/products/${productId}`)
  }

  updateProductById(productId:number,product:Product):Observable<Product>
  {
      return this.httpClient.put<Product>(`https://fakestoreapi.com/products/${productId}`,product)
  }


  deleteById(productId:number):Observable<Product>
  {
    return this.httpClient.delete<Product>(`https://fakestoreapi.com/products/${productId}`)
  }
}
