import { Component } from '@angular/core';
import { Product, ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products:Product[]=[];
  
  product:Product={
  "id": 101,
  "title": "Laptop",
  "price": 50000,
  "description": "Good Laptop",
  "category": "Electronics",
  "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
}


 newProduct:Product={
  "id": 101,
  "title": "Laptop Updated",
  "price": 50000,
  "description": "Good Laptop",
  "category": "Electronics",
  "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
}
  constructor(private productService:ProductService)
  {

  }

  ngOnInit()
  {
       this.productService.getProducts()
       .subscribe({
        next:(products)=>this.products=products
       })
  }


  addProducts()
  {
    this.productService.addProduct(this.product)
    .subscribe({
      next:(value)=>{alert(value.title+ " Added")
        console.log(value,"Has been added")
      }
    })
  }

  getProductDataById(productId:number)
  {
    this.productService.getProductById(productId)
    .subscribe({
      next:(value)=>{this.product=value;
        console.log(value);
      }
    })
  }

  deleteProductById(productId:number)
  {
      this.productService.deleteById(productId)
      .subscribe({next:(value)=>alert(value.title+" deleted")})
  }

  updateProduct(productId:number,product:Product)
  {
    this.productService.updateProductById(productId,product)
    .subscribe({next:(value)=>{alert(value.title+" updated")}})
  }


  

}
