import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner);
  }

  ngOnInit() {
    this.showSpinner(SpinnerType.SquareLoader);
    /** it works */
    // this.httpClientService.get({
    //   baseUrl: "https://jsonplaceholder.typicode.com",
    //   controller:"posts"
    // }).subscribe(data => {
    //   console.log(data);
    // });

    this.httpClientService.get<Product[]>({
      controller: "products",
    }).subscribe(data => {
        console.log(data);
        console.log("products");
      });

      // this.httpClientService.post({
      //   controller: "products",
      // }, {
      //   name: "book",
      //   stock: 200,
      //   price: 30
      // }).subscribe();

      // this.httpClientService.post({
      //   controller: "products",
      // }, {
      //   name: "paper",
      //   stock: 1000,
      //   price: 2
      // }).subscribe();

      // this.httpClientService.post({
      //   controller: "book",
      // }, {
      //   name: "pencil",
      //   stock: 50,
      //   price: 20
      // }).subscribe();

      // this.httpClientService.delete({
      //   controller: "products"
      // }, "8b8bd9d6-95c6-4776-8c30-dd2a7925cdb0").subscribe(data => {
      //   console.log(data);
      //   console.log("products");
      // });

  }

}
