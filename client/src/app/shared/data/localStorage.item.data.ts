export const LOCALSTORAGE_ITEMS: LocalStorageItems = {
  user_email: "string",
  user_password: "string",
  user_confirmPassword: "string",
  userName:"userName",
  user_firstName: "string",
  user_lastName: "string",
  access_token: "accessToken",
  refreshToken: "refreshToken",
  accessTokenStoreTime: "accessTokenStoredAt", // should be in milliseconds
  accessTokenPeriod: "accessTokenPeriod",
  refreshTokenStoreTime: "refreshTokenStoredAt", // should be in milliseconds
  refreshTokenPeriod: "refreshTokenPeriod",
  actionTypes: "actionTypes",
  selectedLanguage: "selectedLanguage",
};

export interface LocalStorageItems {
  user_email: string;
  userName:string;
  user_password: string;
  user_confirmPassword: string;
  user_firstName: string;
  user_lastName: string;
  access_token: string;
  refreshToken: string;
  accessTokenStoreTime: string;
  accessTokenPeriod: string;
  refreshTokenStoreTime: string;
  refreshTokenPeriod: string;
  actionTypes: string;
  selectedLanguage: string;
}
