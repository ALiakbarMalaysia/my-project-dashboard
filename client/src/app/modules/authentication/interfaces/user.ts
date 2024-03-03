export interface UserDTO {
  user_id?: number;
  user_email?: string;
  user_password?: string;
  user_confirmPassword?: string;
  user_firstName?: string;
  user_lastName?: string;
  user_city?: string;
  user_state?: string;
  user_zip?: string;
  user_email_veryfied?: string;
  user_registeration_date?: string;
  user_ip?: string;
  user_phone?: string;
  user_fax?: string;
  user_country?: string;
  user_address?: string;
  user_address2?: string;
  user_allow_change_pas: boolean;
}
export interface LoginResultDTO {
  user: UserDTO;
  userName?: string;
  role: string;
  actionTypes: string[];
  access_token: string;
  refreshToken: string;
  refreshTokenExpiration: 0;
  accessTokenExpiration: 0;
}

export interface LoginDTO {
  user_email: string;
  user_password: string;
}

export interface RefreshTokenResultDTO {
  actionTypes: string[];
  access_token: string;
  refreshToken: string;
  refreshTokenExpiration: 0;
  accessTokenExpiration: 0;
}
