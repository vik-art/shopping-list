import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from 'src/app/common/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products: Array<Product> = [];
  total: number = 0;
  openProductPage: boolean = false;
  product!: Product;

  unSubscriber = new Subscription();

  constructor(
    public productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.initList();
    this.productsService.total$
      .subscribe((res) => {
      this.total = res;
    })
  }

  ngOnDestroy(): void {
    this.unSubscriber.unsubscribe();
  }

  initList() {
   this.unSubscriber.add(
      this.productsService.getListOfProducts()
        .subscribe((res) => {
        this.products = res;
    })
   )}

  buyItem(product: Product) {
    this.unSubscriber.add(
   this.productsService.addProduct(product)
      .subscribe(() => {
        this.total = this.total + product.price;
        this.productsService.total$.next(this.total);
   }))
  }
showItem(product: Product) {
  this.openProductPage = true;
  this.product = product;
}
onClose() {
  this.openProductPage = false;
}
}