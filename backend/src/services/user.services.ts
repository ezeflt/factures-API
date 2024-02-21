import mysql from "mysql";
import { UserData, User } from "../schema/UserSchema";
import { optionDb } from "../..";

const connection = mysql.createConnection(optionDb);
connection.connect();

export const register = (userData: UserData): Promise<User> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO user (username, email, password) VALUES ('${userData.username}', '${userData.email}', '${userData.password}')`,
      (error, results) => {
        if (error) {
          console.error(error);
          reject(false);
        } else {
          console.log(results);
          resolve(results);
        }
      }
    );
  });
};

export const login = (userData: UserData): Promise<UserData> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM user WHERE email = '${userData.email}'`,
      (error, user) => {
        if (error) {
          console.error(error);
          reject(undefined);
        } else {
          console.log(user);
          resolve(user);
        }
      }
    );
  });
};
