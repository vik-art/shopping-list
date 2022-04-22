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

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.initList();
  }

  initList() {
    this.productsService.getListOfProducts().subscribe((res) => {
      this.products = res;
    })
  }

  showDetails(product: Product) {
    console.log(product)
  }
  buyItem(product: Product) {
    console.log(product)
  }
}
