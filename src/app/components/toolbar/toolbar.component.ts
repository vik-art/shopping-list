import { Component, OnInit } from '@angular/core';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  showBasket: boolean = false;
  total: number = 0;

  constructor(
    public productsService: ProductsService
  ) { }

  ngOnInit() {
    this.getTotal()
  }

  getTotal(): any {
    this.productsService.getProducts().subscribe((res) => {
      res?.reduce((prev, curr): any => {
        this.total = prev + curr.price;
        return this.total;
      }, 0)
      this.productsService.total$.next(Math.round(this.total))
  })
  }
  
  toggleBasket() {
    this.showBasket = !this.showBasket;
  }
}
