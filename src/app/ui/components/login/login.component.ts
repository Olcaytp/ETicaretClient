import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../../services/common/auth.service';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/models/user.service';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {

  constructor(private userAuthService: UserAuthService,
    spinner: NgxSpinnerService,
    private AuthService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    super(spinner)
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      console.log(user);
      this.showSpinner(SpinnerType.SquareLoader);
      switch (user.provider) {
        case "GOOGLE":
          await userAuthService.googleLogin(user, () => {
            this.AuthService.identityCheck();
            this.hideSpinner(SpinnerType.SquareLoader);
          })
          break;
        case "FACEBOOK":
          await userAuthService.facebookLogin(user, () => {
            this.AuthService.identityCheck();
            this.hideSpinner(SpinnerType.SquareLoader);
          })
          break;
        }
      });
  }



  async login(userNameOrEmail: string, password: string,) {
    this.showSpinner(SpinnerType.SquareLoader);

    await this.userAuthService.login(userNameOrEmail, password, () => {
      this.AuthService.identityCheck();

      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl = params["returnUrl"];
        if (returnUrl)
          this.router.navigate([returnUrl]);
      });
      this.hideSpinner(SpinnerType.SquareLoader);
    });
  }

  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

}
