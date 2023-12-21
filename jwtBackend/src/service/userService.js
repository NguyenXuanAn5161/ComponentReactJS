import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
// code theo kieu promise async await
import bluebird from "bluebird";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = (email, password, username) => {
  let hashPass = hashUserPassword(password);
  connection.query(
    "INSERT INTO users (email, password, username) VALUES (?,?,?)",
    [email, hashPass, username],
    function (err, results, fields) {
      if (err) {
        console.log(">>> err: ", err);
      }
    }
  );
};

const getUserList = async () => {
  // create the connection, specify bluebird as Promise
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  let users = [];
  //   viet theo kieu callback
  //   connection.query(
  //     "SELECT * FROM users",
  //     function (err, results, fields) {
  //       if (err) {
  //         console.log(">>> err: ", err);
  //         return users;
  //       }
  //       users = results;
  //       console.log(">>> run get user list: ", users);
  //       return users;
  //     }
  //   );

  //   code chay tuwng dong 1
  try {
    const [rows, fields] = await connection.execute("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.log(">>> check error: ", error);
  }
};

module.exports = {
  createNewUser,
  getUserList,
};
