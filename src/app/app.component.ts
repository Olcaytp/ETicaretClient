import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';

declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public authService: AuthService,
              private router: Router,
              private toastrService: CustomToastrService
    ) {
    authService.identityCheck();
  }

  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Oturum kapatılmıştır!", "Oturum Kapatıldı", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    });
  }

}
//browser tabanlı olduğu için jquery kullanıldı, javascript üzerinden istek
// $.get("https://localhost:7002/api/products", data => {
//   console.log(data);
// });
