import { Injectable } from "@angular/core";

import { LOCALSTORAGE_ITEMS } from "../data/localStorage.item.data";
import {
  LoginResultDTO,
  RefreshTokenResultDTO,
} from "../../modules/authentication/interfaces/user";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  storeTokens(result: LoginResultDTO | RefreshTokenResultDTO): void {
    if (result as LoginResultDTO) {
      localStorage.setItem(
        LOCALSTORAGE_ITEMS.user_firstName,
        (result as LoginResultDTO).user.user_firstName
      );
      localStorage.setItem(
        LOCALSTORAGE_ITEMS.user_lastName,
        (result as LoginResultDTO).user.user_lastName
      );
    }
    localStorage.setItem(LOCALSTORAGE_ITEMS.access_token, result.access_token);
    localStorage.setItem(
      LOCALSTORAGE_ITEMS.accessTokenPeriod,
      (result.accessTokenExpiration * 1000).toString()
    );
    localStorage.setItem(
      LOCALSTORAGE_ITEMS.accessTokenStoreTime,
      new Date().getTime().toString()
    );
    localStorage.setItem(LOCALSTORAGE_ITEMS.refreshToken, result.refreshToken);
    localStorage.setItem(
      LOCALSTORAGE_ITEMS.refreshTokenPeriod,
      (result.refreshTokenExpiration * 1000).toString()
    );
    localStorage.setItem(
      LOCALSTORAGE_ITEMS.refreshTokenStoreTime,
      new Date().getTime().toString()
    );
    localStorage.setItem(
      LOCALSTORAGE_ITEMS.actionTypes,
      JSON.stringify(result.actionTypes)
    );
  }

  clearTokens(): void {
    localStorage.removeItem(LOCALSTORAGE_ITEMS.user_firstName);
    localStorage.removeItem(LOCALSTORAGE_ITEMS.access_token);
    localStorage.removeItem(LOCALSTORAGE_ITEMS.accessTokenPeriod);
    localStorage.removeItem(LOCALSTORAGE_ITEMS.accessTokenStoreTime);
    localStorage.removeItem(LOCALSTORAGE_ITEMS.refreshToken);
    localStorage.removeItem(LOCALSTORAGE_ITEMS.refreshTokenPeriod);
    localStorage.removeItem(LOCALSTORAGE_ITEMS.refreshTokenStoreTime);
    localStorage.removeItem(LOCALSTORAGE_ITEMS.actionTypes);
  }

  getUserfirstName(): string | null {
    return localStorage.getItem(LOCALSTORAGE_ITEMS.user_firstName);
  }
  getUserLastName(): string | null {
    return localStorage.getItem(LOCALSTORAGE_ITEMS.user_lastName);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(LOCALSTORAGE_ITEMS.access_token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(LOCALSTORAGE_ITEMS.refreshToken);
  }

  getAccessTokenPeriod(): number {
    return Number(localStorage.getItem(LOCALSTORAGE_ITEMS.accessTokenPeriod));
  }

  getRefreshTokenPeriod(): number {
    return Number(localStorage.getItem(LOCALSTORAGE_ITEMS.refreshTokenPeriod));
  }

  getAccessTokenStoreTime(): number {
    return Number(
      localStorage.getItem(LOCALSTORAGE_ITEMS.accessTokenStoreTime)
    );
  }

  getRefreshTokenStoreTime(): number {
    return Number(
      localStorage.getItem(LOCALSTORAGE_ITEMS.accessTokenStoreTime)
    );
  }

  getActionTypes(): string[] | null {
    let actionTypes = localStorage.getItem(LOCALSTORAGE_ITEMS.actionTypes);
    return actionTypes ? JSON.parse(actionTypes) : null;
  }
}
