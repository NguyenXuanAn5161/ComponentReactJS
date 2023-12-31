import bcrypt from "bcryptjs";
// code theo kieu promise async await
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password);

  try {
    await db.User.create({
      email: email,
      password: hashPass,
      username: username,
    });
  } catch (error) {
    console.log(">>> check error: ", error);
  }
};

const getUserList = async () => {
  // test relationship
  let newUser = await db.User.findOne({
    where: { id: 1 },
    include: { model: db.Group, attributes: ["name", "description"] },
    attributes: ["id", "username", "email"],
    raw: true, // trả về javascript plain object, không phải là đối tượng sequelize.
    nest: true, // lồng dữ liệu liên kết trong đối tượng mẹ
  });

  console.log(">>> check new users: ", newUser);

  let roles = await db.Role.findAll({
    include: { model: db.Group, where: { id: 1 } },
    raw: true,
    nest: true,
  });

  console.log(">>> check new roles: ", roles);

  let users = [];
  users = await db.User.findAll();
  return users;
  // // create the connection, specify bluebird as Promise
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // //   code chay tuwng dong 1
  // try {
  //   const [rows, fields] = await connection.execute("SELECT * FROM user");
  //   return rows;
  // } catch (error) {
  //   console.log(">>> check error: ", error);
  // }
};

const deleteUser = async (userId) => {
  await db.User.destroy({
    where: {
      id: userId,
    },
  });

  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "DELETE FROM user WHERE id=?",
  //     [id]
  //   );
  //   return rows;
  // } catch (error) {
  //   console.log(">>> check error: ", error);
  // }
};

const getUserById = async (userId) => {
  let user = {};
  user = await db.User.findOne({
    where: {
      id: userId,
    },
  });
  return user;
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute(
  //     "SELECT * FROM user WHERE id=?",
  //     [id]
  //   );
  //   return rows;
  // } catch (error) {
  //   console.log(">>> check error: ", error);
  // }
};

const updateUserInfor = async (email, username, userId) => {
  await db.User.update(
    {
      email: email,
      username: username,
    },
    {
      where: {
        id: userId,
      },
    }
  );
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute(
  //     "UPDATE user SET email=?, username=? WHERE id=?",
  //     [email, username, id]
  //   );
  //   return rows;
  // } catch (error) {
  //   console.log(">>> check error: ", error);
  // }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor,
};
