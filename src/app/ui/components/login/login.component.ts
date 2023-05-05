import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../../services/common/auth.service';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {

  constructor(private userService: UserService,
              spinner: NgxSpinnerService,
              private AuthService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router
              ) {
    super(spinner);
  }



  async login(userNameOrEmail: string, password: string,){
    this.showSpinner(SpinnerType.SquareLoader);

    await this.userService.login(userNameOrEmail, password, () => {
      this.AuthService.identityCheck();

      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl = params["returnUrl"];
        if (returnUrl)
          this.router.navigate([returnUrl]);
        });
      this.hideSpinner(SpinnerType.SquareLoader);
    });

  }

}
