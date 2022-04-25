import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() closeBasketWindow = new EventEmitter();

  constructor(
    public productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.initProducts(); 
  }

  initProducts() {
    this.productsService.getProducts().subscribe((res) => {
      res ? this.products = res : [];
      res?.map(el => {
        this.total += el.price;
      })
    })
  }

  onDelete(product: Product) {
    this.productsService.deleteProduct(product.id).subscribe(() => {
     this.products = this.products.filter((item) => item.id !== product.id);
     this.productsService.total.next(Math.round(this.total - product.price));
     this.total = this.total - product.price;
    })
  }
  
  hideBasket() {
    this.closeBasketWindow.emit();
  }
}
