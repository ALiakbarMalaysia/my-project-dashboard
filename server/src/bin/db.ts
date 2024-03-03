import bcrypt from "bcryptjs";
import schemaUser from "../controllers/User/schema";
import { ConfirmForgetPass, IChangePassword, IUser } from "../interfaces/user";
import { ResultSetHeader, RowDataPacket, coreSchema, query } from "./mysql";
import { IProducts } from "interfaces/categories";
import { ProductsDTO } from "models/products";


// User
export async function getUserByEmail(user_email: string): Promise<RowDataPacket[]> {
  const user = await query<RowDataPacket[]>(`
  SELECT * FROM  mydb.users
  WHERE user_email=?`, {
    values: [user_email]
  });
  return user;
}


export async function createNewUser(data: any) {
  const user_password = data.user_password;
  const user_confirmPassword = data.user_confirmPassword;
  const fdPassword = { user_password, user_confirmPassword };
  const validPassword = schemaUser.createPassword.validateSyncAt(
    "user_confirmPassword",
    fdPassword
  );
  const saltRounds = 10;
  const hash = bcrypt.hashSync(validPassword, saltRounds);

  const result = await query<ResultSetHeader>(
    "INSERT INTO mydb.users (user_firstName, user_lastName, user_email, user_password, user_verification_code) VALUES (?, ?, ?, ?, ?)",
    {
      values: [
        data.user_firstName,
        data.user_lastName,
        data.user_email,
        hash,
        data.user_verification_code,
      ],
    }
  );
  return result;
}

export async function getUserByPassword(user_email: string, user_password: string) {
  const user = await query<RowDataPacket[]>(
    `
  SELECT * FROM  mydb.users
  WHERE user_email=?`,
    {
      values: [user_email],
    }
  );
  if (user.length < 1) return null;
  else {
    return new Promise((resolve, reject) => {
      bcrypt.compare(user_password, user[0].user_password, function (err, isMatch) {
        if (err) reject(err);
        resolve(isMatch);
      });
    }).then((result) => {
      return user[0] as IUser;
    });
  }
}

export async function getUserByGoogleId(googleid: string) {
  const user = await query<RowDataPacket[]>(
    `
  SELECT * FROM  ${coreSchema}.users
  WHERE google_id=?`,
    {
      values: [googleid],
    }
  );
  if (user.length < 1) return null;
  else return user[0] as IUser;
}

export async function getUserById(id: string) {
  const userId = await query<RowDataPacket[]>(
    `SELECT * FROM ${coreSchema}.users WHERE id`,
    { values: [id] }
  );
  if (userId.length < 1) return null;
  else return userId[0] as IUser;
}

export async function checkUserExist(
  user_email: string
): Promise<RowDataPacket[]> {
  const user = await query<RowDataPacket[]>(
    `
  SELECT * FROM mydb.users
  WHERE user_email=?`,
    {
      values: [user_email],
    }
  );
  return user;
}

export async function updateUserVerifyCode(userId: string, newCode: string) {
  const result = await query<ResultSetHeader>(
    `
    UPDATE ${coreSchema}.users
    SET verify_code=?,updatedAt=?
    WHERE email=?
  `,
    {
      values: [newCode, new Date(), userId],
    }
  );
  const user = await query<RowDataPacket[]>(
    `
  SELECT id,email,verify_code
  FROM  ${coreSchema}.users
  WHERE id=?`,
    {
      values: [userId],
    }
  );
  return user[0] as IUser;
}

export async function confirmForgetPass(data: ConfirmForgetPass) {
  const result = await query<RowDataPacket[]>(
    `
  SELECT *
  FROM  ${coreSchema}.users
  WHERE email=? AND deletedAt IS NULL
  `,
    {
      values: [data.email, data.verify_code],
    }
  );
  if (result.length < 1) return { status: 1, message: "email is not valid" };
  const user = result[0] as IUser;
  if (user.user_email_veryfied !== data.verify_code)
    return { status: 5, message: "the code is not valid !" };
  await query<ResultSetHeader>(
    `
    UPDATE ${coreSchema}.users
    SET allow_change_pass=1,updatedAt=?
    WHERE id=?
  `,
    {
      values: [new Date(), user.user_id],
    }
  );
  return { status: 6, message: "code is correct" };
}

export async function changeAccountPasswordByEmail(data: IChangePassword) {
  const result = await query<RowDataPacket[]>(
    `
  SELECT *
  FROM  ${coreSchema}.users
  WHERE email=? AND deletedAt IS NULL
  `,
    {
      values: [data.email],
    }
  );
  if (result.length < 1)
    return { status: 1, message: "email is not valid !", userId: "" };
  const user = result[0] as IUser;
  if (!user.user_allow_change_pas)
    return { status: 2, message: "password is not changable !", userId: "" };
  const newPassword = data.newPassword;
  const user_confirmPassword = data.user_confirmPassword;
  const fdPassword = { newPassword, user_confirmPassword };
  const validPassword = schemaUser.createPassword.validateSyncAt(
    "user_confirmPassword",
    fdPassword
  );
  const saltRounds = 10;
  const hash = bcrypt.hashSync(validPassword, saltRounds);
  await query<ResultSetHeader>(
    `
    UPDATE ${coreSchema}.users
    SET allow_change_pass=0,password=?,autoLogin=1,updatedAt=?
    WHERE id=?
  `,
    {
      values: [hash, new Date(), user.user_id],
    }
  );
  return {
    status: 3,
    message: "password changed successfully",
    userId: user.user_id,
  };
}

export async function getAllProducts() {
  const getProduct = await query<RowDataPacket[]>(
    `SELECT * FROM mydb.products`
  );
  if (getProduct.length < 1) return null;
  else return getProduct;
}

export async function createProduct(data: ProductsDTO) {
  const result = await query<ResultSetHeader>(
    "INSERT INTO mydb.products (product_name, product_price, product_weight, product_cart_description, product_img,product_long_desc,product_short_desc,product_create_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    {
      values: [
        data.product_name,
        data.product_price,
        data.product_weight,
        data.product_cart_description,
        data.product_img,
        data.product_long_desc,
        data.product_short_desc,
        new Date()
      ],
    }
  );
  return result;
}




