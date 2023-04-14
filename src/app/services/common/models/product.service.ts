import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private HttpClientService: HttpClientService) { }

  createProduct(product: Create_Product, successCallback?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.HttpClientService.post({
      controller: "products"
    }, product).subscribe((response) => {
      successCallback();
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v, _index) => {
          message += `${_v}<br>`;
        });
      });
      errorCallBack(message);
    });
  }

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number; products: List_Product[] }> {
    const promiseData: Promise<{ totalCount: number; products: List_Product[] }> =  firstValueFrom(this.HttpClientService.get<{ totalCount: number; products: List_Product[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }));

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async delete(id: string) {
    const deleteObservable: Observable<any> = this.HttpClientService.delete<any>({
      controller: "products"
    }, id);

    await firstValueFrom(deleteObservable);
  }

}
