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

  constructor(
    public productsService: ProductsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    
  }
  openDialog() {
    const dialogRef = this.dialog.open(BasketComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}
