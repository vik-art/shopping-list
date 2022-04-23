import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(
    public productsService: ProductsService
  ) { }

  ngOnInit() {
    
  }

}
