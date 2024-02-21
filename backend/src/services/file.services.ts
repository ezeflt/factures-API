import mysql from "mysql";
import { FileSchema } from "../schema/FileSchema";
import { optionDb } from "../..";

const connection = mysql.createConnection(optionDb);
connection.connect();

export const addFile = (fileSchema: FileSchema): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO file (fileData, user_id) VALUES ('${fileSchema.fileBlob}', '${fileSchema.user_id}')`,
      (error, results) => {
        if (error) {
          console.error({error});
          reject(false);
        } else {
          console.log({results});
          resolve(true);
        }
      }
    );
  });
};

export const getUserFiles = (userId: number): Promise<FileSchema[]> => {
  return new Promise((resolve, reject)=>{
    connection.query(
      `SELECT * FROM file WHERE user_id = ${userId}`,
      (error, results) => {
        if (error) {
          console.error({error});
          reject(false);
        } else {
          console.log({results});
          resolve(results);
        }
      }
      )
  })
}