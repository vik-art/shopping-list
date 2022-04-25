import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  showBasket: boolean = false;
  constructor(
    public productsService: ProductsService
  ) { }

  ngOnInit() {
  }
  
  toggleBasket() {
    this.showBasket = !this.showBasket;
  }

  openBasket() {
    
  }
}
