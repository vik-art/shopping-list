import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  showBasket: boolean = false;
  total: number = 0;

  unSubscriber = new Subscription();

  constructor(
    public productsService: ProductsService
  ) { }

  ngOnInit() {
    this.getTotal()
  }

  ngOnDestroy(): void {
    this.unSubscriber.unsubscribe()
  }

  getTotal(): any {
   this.unSubscriber.add(this.productsService.getProducts().subscribe((res) => {
      res?.reduce((prev, curr): any => {
        this.total = prev + curr.price;
        return Number(this.total.toFixed(2))
      }, 0)
      this.productsService.total$.next(this.total)
  }))
  }
  
  toggleBasket() {
    this.showBasket = !this.showBasket;
  }
}
