import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/common/interfaces/product.interface';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  @Input() product!: Product;
  @Output() closeProductWindow = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.closeProductWindow.emit()
  }

}
