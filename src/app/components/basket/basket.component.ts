import { Component, OnInit } from '@angular/core';
import { pipe, switchMap } from 'rxjs';
import { Product } from 'src/app/common/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  products: Product[] = [];
  total: number = 0;

  constructor(
    public productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.initProducts();  
  }

  initProducts() {
    this.productsService.getProducts().subscribe((res) => {
      res ? this.products = res : [];
    })
    this.productsService.total.subscribe(res => {
      this.total = res;
    })
  }

  onDelete(product: Product) {
    this.productsService.deleteProduct(product.id).subscribe(() => {
     this.products = this.products.filter((item) => item.id !== product.id);
      this.productsService.total.next(Math.round(this.total - product.price));
    })
  }
}
