import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base-url';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Product } from 'src/app/contracts/list_product';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent {
  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private basketService: BasketService,
    spinner: NgxSpinnerService,
    private customToastrService: CustomToastrService
  ) {
    super(spinner);
  }

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 15;
  pageList: number[] = [];
  baseUrl: BaseUrl;

  products: List_Product[];

  async ngOnInit() {

    this.baseUrl = await this.fileService.getBaseStorageUrl();
    console.log("adssad");
    console.log(this.baseUrl);

    this.activatedRoute.queryParams.subscribe(async params => {
      this.currentPageNo = parseInt(params["page"] ?? 1);

      const data: { totalProductCount: number, products: List_Product[] } = await this.productService.read(this.currentPageNo - 1, this.pageSize,
        () => {

        },
        errorMessage => {

        });

      this.products = data.products;
      console.log("data");
      console.log(data.totalProductCount);

      this.products = this.products.map<List_Product>(p => {
        const listProduct: List_Product = {
          id: p.id,
          createdDate: p.createdDate,
          //imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : "",
          //get first image path
          imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.path).path : "",
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
          productImageFiles: p.productImageFiles
        };
        return listProduct;
      });

      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);
      console.log("totalPageCount");
      console.log(this.totalPageCount);

      this.pageList = [];

      if (this.totalPageCount >= 7) {

        if (this.currentPageNo - 3 <= 0) {
          for (let i = 1; i <= 7; i++) {
            this.pageList.push(i);
          }
        }
        else if (this.currentPageNo + 3 >= this.totalPageCount) {
          for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++) {
            this.pageList.push(i);
          }
        }
        else {
          for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++) {
            this.pageList.push(i);
          }
        }

      }
      else {

        for (let i = 1; i <= this.totalPageCount; i++) {
          this.pageList.push(i);
        }
      }

    });
  }

  async addToBasket(product: List_Product) {
    this.showSpinner(SpinnerType.BallSpinFadeRotating);
    let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem);
    this.hideSpinner(SpinnerType.BallSpinFadeRotating);
    this.customToastrService.message("Ürün sepete eklenmiştir.", "Sepete Eklendi", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    });
  }

}
