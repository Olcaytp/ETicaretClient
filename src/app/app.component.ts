import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';

declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretClient';

  constructor(private toastrService: CustomToastrService) {
    this.toastrService.message("test", "test", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopCenter });

    this.toastrService.message("test", "test", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopCenter });
  }


}
