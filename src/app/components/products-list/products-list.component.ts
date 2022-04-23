import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: Array<Product> = [];
  total: number = 0;

  constructor(
    public productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.initList();
  }

  initList() {
    this.productsService.getListOfProducts().subscribe((res) => {
      this.products = res;
    })
  }

  buyItem(product: Product) {
   this.productsService.addProduct(product).subscribe(() => {
     this.total += product.price
     this.productsService.total.next(Math.round(this.total));
   })
  }
}
