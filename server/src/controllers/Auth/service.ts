import {
  ConfirmForgetPass,
  IChangePassword,
  ILoginAttributes,
} from "interfaces/user";
import jwt from "jsonwebtoken";
import ms from "ms";
import {
  changeAccountPasswordByEmail,
  confirmForgetPass,
  createNewUser,
  getUserByPassword,
} from "../../bin/db";
import schemaAuth from "../../controllers/Auth/schema";
import { getUniqueCodev2, getUniqueCodev3 } from "../../helper/Common";
import useValidation from "../../helper/useValidation";
import ResponseError from "../../modules/Response/ResponseError";
import UserService from "../User/service";

const { JWT_SECRET_ACCESS_TOKEN, JWT_SECRET_REFRESH_TOKEN }: any = process.env;
const JWT_ACCESS_TOKEN_EXPIRED = process.env.JWT_ACCESS_TOKEN_EXPIRED || "1d"; // 1 Days
const JWT_REFRESH_TOKEN_EXPIRED =
  process.env.JWT_REFRESH_TOKEN_EXPIRED || "30d"; // 30 Days
const expiresIn = ms(JWT_ACCESS_TOKEN_EXPIRED) / 1000;

class AuthService {
  public static async signUp(formData: any) {
    // check duplicate email
    const currentUser = await UserService.validateUserEmail(
      formData.user_email
    );
    if (currentUser?.user_email) {
      return { message: "the user already exist !", code: 409, currentUser };
    } else {
      const generateToken = {
        code: getUniqueCodev2(),
      };

      const tokenVerify = jwt.sign(
        JSON.parse(JSON.stringify(generateToken)),
        JWT_SECRET_ACCESS_TOKEN,
        {
          expiresIn,
        }
      );
      
      const newFormData = { ...formData, tokenVerify };
      const value = useValidation(schemaAuth.register, newFormData);
      const data = await createNewUser(value);
      return {
        message: "registration is successful",
        data,
      };
    }
  }

  public static async signIn(req: any, formData: ILoginAttributes) {
    const { clientIp, useragent } = req;

    const value = useValidation(schemaAuth.login, formData);

    const userData = await getUserByPassword(value.user_email, value.user_password);

    if (!userData) {
      return {
        isSuccessful: false,
        message: "The email is not exist or has been deleted !",
      };
    }

    /* User active proses login */
    if (userData) {
      // @ts-ignore
      // const comparePassword = await userData.comparePassword(value.password)
      const comparePassword = true;
      if (comparePassword) {
        // modif payload token
        const payloadToken = {
          user_id: userData.user_id,
          user_firstName: userData.user_firstName,
          user_lastName: userData.user_lastName,
          user_email: userData.user_email,
          // active: userData.is,
        };

        // Access Token
        const access_token = jwt.sign(
          JSON.parse(JSON.stringify(payloadToken)),
          JWT_SECRET_ACCESS_TOKEN,
          {
            expiresIn,
          }
        );
        // Refresh Token
        const refresh_token = jwt.sign(
          JSON.parse(JSON.stringify(payloadToken)),
          JWT_SECRET_REFRESH_TOKEN,
          {
            expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
          }
        );

        // create refresh token
        // await RefreshTokenService.create({
        //   UserId: userData.id,
        //   token: refresh_token,
        // });

        // create session
        // await SessionService.create({
        //   UserId: userData.id,
        //   token: access_token,
        //   ipAddress: clientIp?.replace("::ffff:", ""),
        //   device: userAgentHelper.currentDevice(req),
        //   platform: `${useragent?.os} - ${useragent?.platform}`,
        // });

        // create directory
        // await createDirectory(userData.id)
        return {
          user: payloadToken,
          isSuccessful: true,
          message: "Login successfully",
          access_token,
          expiresIn,
          token_type: "Bearer",
          refresh_token,
        };
      }

      throw new ResponseError.BadRequest("incorrect email or password!");
    }

    /* User not active return error confirm email */
    throw new ResponseError.BadRequest(
      "please check your email account to verify your email and continue the registration process."
    );
  }

  // public static async signInWithGoogle(req: any, formData: ILoginAttributes) {
  //   const { clientIp, useragent } = req;
  //   const value = useValidation(schemaAuth.login, formData);
  //   const userData = await getUserByGoogleId(value.password);
  //   if (!userData) {
  //     throw new ResponseError.NotFound("account not found or has been deleted");
  //   }

  //   /* User active proses login */
  //   if (userData.isActive) {
  //     // @ts-ignore
  //     // const comparePassword = await userData.comparePassword(value.password)
  //     const comparePassword = true;
  //     if (comparePassword) {
  //       // modif payload token
  //       const payloadToken = {
  //         id: userData.id,
  //         firstNama: userData.firstName,
  //         lastName: userData.lastName,
  //         email: userData.email,
  //         active: userData.isActive,
  //       };
  //       // Access Token
  //       const ascess_token = jwt.sign(
  //         JSON.parse(JSON.stringify(payloadToken)),
  //         JWT_SECRET_REFRESH_TOKEN,
  //         {
  //           expiresIn,
  //         }
  //       );

  //       // Refresh Token
  //       const refresh_token = jwt.sign(
  //         JSON.parse(JSON.stringify(payloadToken)),
  //         JWT_SECRET_REFRESH_TOKEN,
  //         {
  //           expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
  //         }
  //       );
  //       // create refresh token
  //       //  await RefreshTokenService.create({
  //       //   UserId: userData.id,
  //       //   token: refresh_token,
  //       // })
  //     }
  //   }
  // }

  public static async confirmForgetPasswordToken(formData: ConfirmForgetPass) {
    useValidation(schemaAuth.confirmEmailCode, formData);
    const confirmEmailResult = await confirmForgetPass(formData);
    return confirmEmailResult;
  }

  public static async changeAccountPassword(formData: IChangePassword) {
    useValidation(schemaAuth.changePassword, formData);
    const confirmEmailResult = await changeAccountPasswordByEmail(formData);
    return confirmEmailResult;
  }
}

export default AuthService;
