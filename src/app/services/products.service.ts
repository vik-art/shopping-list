import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mapTo, Observable, pipe, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../common/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public total: Subject<number> = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  getListOfProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(environment.productsUrl)
  }

  addProduct(product: Product):Observable<Product> {
    return this.http.post<Product>(`${environment.firebaseUrl}/products.json`, product)
  }

  getProducts(): Observable<Product[] | null>{
    return this.http.get<Product[]>(`${environment.firebaseUrl}/products.json`)
    .pipe(
      map((key: {[key: string]: any}) => {
        if(key) {
              return Object
              .values(key)
          } else {
              return null;
                    }
                }))
            }

  
  }
