export interface ILoginAttributes {
  email: string;
  password: string;
}



export interface IUser {
  user_id?: number;
  user_firstName?: string;
  user_lastName?: string;
  user_email: string ;
  user_password?: string;
  user_confirmPassword?: string;
  user_city?: string;
  user_verification_code?: string;
  user_verified?:string;
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
  user_allow_change_pas?: boolean;
}

export interface CreateUser extends IUser {
  new_user: IUser[];
  newPassword: string;
  user_confirmPassword: string;
  language_Id?: number;
  tokenVerify?: string | null;
  verify_code: string;
}

export interface ConfirmForgetPass {
  email: string;
  verify_code: string;
}

export interface IChangePassword {
  id: string;
  email: string;
  newPassword: string;
  user_confirmPassword: string;
}

export interface IChangePassword {
  id: string;
  email: string;
  newPassword: string;
  user_confirmPassword: string;
}
