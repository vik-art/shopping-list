import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, map, mapTo, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Product } from '../common/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public total$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(
    private http: HttpClient
  ) { }

  getListOfProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(environment.productsUrl)
  }

  addProduct(product: Product):Observable<Product> {
    const productItem = {
      ...product,
      quantity: 1,
    }
    return this.http.post<Product>(`${environment.firebaseUrl}/products.json`, productItem)
    .pipe(map((response: any) => {
      return {
          ...product,
          id: response.name
      }
}))
  }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.firebaseUrl}/products.json`)
    .pipe(
      map((response: {[key: string]: any}) => {
        if(response) {
              return Object
              .keys(response)
              .map(key => ({
                ...response[key],
                id: key
              }))
          } else {
              return [];
                    }
                }))
            }
    
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.firebaseUrl}/products/${id}.json`)
  }

  updateProduct(product: Product):Observable<Product> {
    return this.http.patch<Product>(`${environment.firebaseUrl}/products/${product.id}.json`, product)
  }
}
