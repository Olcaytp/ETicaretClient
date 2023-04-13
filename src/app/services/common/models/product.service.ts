import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Create_Product } from '../../../contracts/create_product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private HttpClientService: HttpClientService) { }

  createProduct(product: Create_Product, successCallback?: any) {
    this.HttpClientService.post({
      controller: "products"
    }, product).subscribe((response) => {
      successCallback();
    })
  }
}
