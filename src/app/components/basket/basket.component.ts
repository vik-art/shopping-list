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
  @Output() closeBasketWindow = new EventEmitter();
  unSubscriber = new Subscription();

  constructor(
    public productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.initProducts(); 
    this.productsService.total$.subscribe((res) => {
      this.total = res;
    })
  }

  ngOnDestroy(): void {
    this.unSubscriber.unsubscribe();
  }

  initProducts() {
  this.unSubscriber.add(this.productsService.getProducts().subscribe((res) => {
      res ? this.products = res : [];
    }))
  }

  onDelete(product: Product) {
    this.unSubscriber.add(
    this.productsService.deleteProduct(product.id).subscribe(() => {
     this.products = this.products.filter((item) => item.id !== product.id); 
     this.total = Math.round(this.total - product.price);
     this.productsService.total$.next(this.total); 
    })) 
  }
  
  hideBasket() {
    this.closeBasketWindow.emit();
  }
}
