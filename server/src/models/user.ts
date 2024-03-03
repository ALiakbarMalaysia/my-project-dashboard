import { Model, Optional } from "sequelize";

 
export interface UserAttributes {
  user_id: number;
  user_email: string;
  user_password: string;
  user_confirmPassword: string;
  user_firstName: string;
  user_lastName: string;
  phoneNumber: string;
  isActive?: boolean | null;
  tokenVerify?: string | null;
  newPassword?: string;
  confirmNewPassword?: string;
  registerDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  associate?: any;
  verify_code?:string;
  //
  language_Id?: number;
  country_Id?: number;
}
interface UserCreationAttributes extends Optional<UserAttributes, "user_id"> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  comparePassword(): boolean | void;
}
