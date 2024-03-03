import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { IRegister } from "../../modules/authentication/interfaces/register.dto";

import { environment } from "../../../environments/environment";
import {
  LoginDTO,
  LoginResultDTO,
  UserDTO,
} from "../../modules/authentication/interfaces/user";
import { StorageService } from "../clinet-service/storage.service";
import { tokenRemainingTime } from "../global-variable/token-time-variable";
import { NumberUtility } from "../utilities/number.utilities";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId!: Pick<UserDTO, "user_id">;
  userName = new BehaviorSubject<string>("");
  setEmailUser = new BehaviorSubject<string>("");
  id!: number;
  getEmail!: string;
  /**
   * Token expiration time management
   */
  accessTokenValue: string | null;
  accessTokenStoreTime: number;
  accessTokenPeriod: number;
  refreshTokenValue: string | null;
  refreshTokenStoreTime: number;
  refreshTokenPeriod: number;

  accessTokenTimeUnsubscriber: Subscription;
  accessTokenTimer$: Observable<number>;
  refreshTokenTimeUnsubscriber: Subscription;
  refreshTokenTimer$: Observable<number>;

  apiAddress: string = "";

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.apiAddress = environment.apiEndPoint + "/account";
  }

  register(model: IRegister): Observable<IRegister> {
    return this.http.post<IRegister>(this.apiAddress + "/register", model);
  }

  login(model: LoginDTO): Observable<LoginResultDTO> {
    return this.http
      .post<LoginResultDTO>(this.apiAddress + "/login", model)
      .pipe(
        tap((result: LoginResultDTO) => {
          this.storageService.storeTokens(result);
          this.initTokenExpireTimeManagement();
        })
      );
  }

  // updateAbilities() {
  //   const { can, rules } = new AbilityBuilder<Ability>(Ability);
  //   let actionTypes = this.storageService.getActionTypes();
  //   if (actionTypes) {
  //     actionTypes.forEach((action: string) => {
  //       can(action, "");
  //     });
  //     can("AllowedTemporarily", "");
  //     this.ability.update(rules);
  //   } else {
  //     this.ability.update([]);
  //   }
  // }

  isLoggedIn(): boolean {
    return this.storageService.getAccessToken() !== null;
  }

  requestReset(user_email: string): Observable<any> {
    return this.http.get(this.apiAddress + `/forget/${user_email}`);
    // let queryParams = new HttpParams();
    // queryParams = queryParams.append("user_email", user_email);
    // return this.http.get<string>(this.apiAddress + "/forget" , {
    //   params: queryParams,
    // });

    // return this.http.get<UserInformation>(url,{params:queryParams});
  }

  confirmForget(code: string): Observable<string> {
    this.setEmailUser.subscribe((res) => {
      this.getEmail = res;
    });

    const body = {
      verify_code: code,
      email: this.getEmail,
    };
    return this.http.post<string>(this.apiAddress + "/forget-confirm", body);
  }

  changePassword(password): Observable<any> {
    this.setEmailUser.subscribe((res) => {
      this.getEmail = res;
    });

    const body = {
      verify_code: password,
      email: this.getEmail,
    };
    return this.http.post(this.apiAddress + "/change-pass", body);
  }

  initTokenExpireTimeManagement(): void {
    this.accessTokenValue = this.storageService.getAccessToken();
    this.accessTokenPeriod = this.storageService.getAccessTokenPeriod();
    this.accessTokenStoreTime = this.storageService.getAccessTokenStoreTime();

    this.refreshTokenValue = this.storageService.getRefreshToken();
    this.refreshTokenPeriod = this.storageService.getRefreshTokenPeriod();
    this.refreshTokenStoreTime = this.storageService.getRefreshTokenStoreTime();

    if (this.hasToken) {
      this.checkAccessTokenExpireTime();
      this.checkRefreshTokenExpireTime();
    } else {
      tokenRemainingTime.reset();
    }
  }

  private hasToken(): boolean {
    return Boolean(
      this.accessTokenValue &&
        this.accessTokenPeriod &&
        this.accessTokenStoreTime &&
        this.refreshTokenValue &&
        this.refreshTokenPeriod &&
        this.refreshTokenStoreTime
    );
  }

  private checkAccessTokenExpireTime(): void {
    if (this.accessTokenStoreTime) {
      let now = new Date().getTime();
      let spentTime = now - this.accessTokenStoreTime;

      if (spentTime < this.accessTokenPeriod) {
        let remainingTime = this.accessTokenPeriod - spentTime;
        this.setTimerForAccessToken(remainingTime);
      } else {
        tokenRemainingTime.resetAccessTokenTime();
      }
    }
  }

  private checkRefreshTokenExpireTime(): void {
    if (this.refreshTokenStoreTime) {
      let now = new Date().getTime();
      let spentTime = now - this.refreshTokenStoreTime;

      if (spentTime < this.refreshTokenPeriod) {
        let remainingTime = this.refreshTokenPeriod - spentTime;
        this.setTimerForRefreshToken(remainingTime);
      } else {
        tokenRemainingTime.resetRefreshTokenTime();
      }
    }
  }

  private setTimerForRefreshToken(time: number): void {
    if (this.refreshTokenTimeUnsubscriber) {
      this.refreshTokenTimeUnsubscriber.unsubscribe();
    }
    // A downCounter for RefreshToken remaining time
    let timeInSecond = Math.floor(time / 1000);
    tokenRemainingTime.data.refreshTokenTime = timeInSecond;
    this.refreshTokenTimer$ = NumberUtility.countDown(timeInSecond);
    this.refreshTokenTimeUnsubscriber = this.refreshTokenTimer$.subscribe(
      (num: number) => {
        tokenRemainingTime.data.refreshTokenTime = num;
      }
    );
  }

  private setTimerForAccessToken(time: number): void {
    if (this.accessTokenTimeUnsubscriber) {
      this.accessTokenTimeUnsubscriber.unsubscribe();
      // A downCounter for AccessToken remaining time
      let timeInSecond = Math.floor(time / 1000);
      tokenRemainingTime.data.accessTokenTime = timeInSecond;
      this.accessTokenTimer$ = NumberUtility.countDown(timeInSecond - 1);
      this.accessTokenTimeUnsubscriber = this.accessTokenTimer$.subscribe(
        (num: number) => {
          tokenRemainingTime.data.accessTokenTime = num;
        }
      );
    }
  }
}
