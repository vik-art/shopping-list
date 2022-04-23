import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.initProducts();
  }

  initProducts() {
    this.productService.getProducts().subscribe((res) => {
      res ? this.products = res : [];
    })
  }
}
