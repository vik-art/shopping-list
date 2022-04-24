import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';
import { BasketComponent } from '../basket/basket.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  showBasket: boolean = false;
  constructor(
    public productsService: ProductsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }
  
  
}
