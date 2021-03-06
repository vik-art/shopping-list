import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from 'src/app/common/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})

export class BasketComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  total: number = 0;
  quantity: number = 1;

  @Output() closeBasketWindow = new EventEmitter();

  unSubscriber = new Subscription();

  constructor(
    public productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.initProducts(); 
   this.unSubscriber.add(
     this.productsService.total$
     .subscribe((res) => {
      this.total = res;
    })
    )
  }

  ngOnDestroy(): void {
    this.unSubscriber.unsubscribe();
  }

  initProducts() {
  this.unSubscriber.add(
    this.productsService.getProducts()
    .subscribe((res) => {
      res ? this.products = res : [];
    }))
  }

  onDelete(product: Product) {
    this.unSubscriber.add(
    this.productsService.deleteProduct(product.id)
        .subscribe(() => {
          this.products = this.products
              .filter((item) => item.id !== product.id);
              this.productsService.total$.next(this.total - product.price); 
    })) 
  }
  
  hideBasket() {
    this.closeBasketWindow.emit();
  }

add(product: Product, n: number) {
  const item = {
    ...product,
    quantity: product.quantity + n,
    price: product.price + (product.price / product.quantity)
  }
  this.unSubscriber.add(
  this.productsService.updateProduct(item).subscribe((res) => {
    this.products.map((el, index) => {
     if(el.id === res.id) {
        this.products[index] = res;
     }
    })
  this.productsService.total$.next(this.total + res.price - product.price);
  })
  )
}

remove(product: Product, n: number) {
  const item = {
    ...product,
    quantity: product.quantity - n,
    price: product.price - (product.price / product.quantity)
  }
  if(item.quantity === 0) {
    this.unSubscriber.add(
    this.productsService.deleteProduct(item.id).subscribe(() => {
      this.products = this.products.filter(el => el.id !== item.id);
      this.productsService.total$.next(this.total - product.price); 
    }))
  } else {
    this.unSubscriber.add(
  this.productsService.updateProduct(item).subscribe((res) => {
    this.products.map((el, index) => {
     if(el.id === res.id) {
        this.products[index] = res;
     }
    })
  this.productsService.total$.next(this.total - (product.price - res.price))
  }))
}
}
}
