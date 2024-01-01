import db from "../models/index";
import {
  checkEmailExist,
  checkPhoneExist,
  hashUserPassword,
} from "../service/loginRegisterService";

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      include: { model: db.Group, attributes: ["name", "description"] },
      attributes: ["id", "email", "username", "address", "sex", "phone"],
    });

    if (users) {
      return {
        EM: "get data success",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "get data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "Something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      include: { model: db.Group, attributes: ["name", "description", "id"] },
      attributes: ["id", "email", "username", "address", "sex", "phone"],
      order: [["id", "DESC"]],
      offset: offset,
      limit: limit,
      // sort: ''
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };

    return {
      EM: "fetch ok",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};

const createNewUser = async (rawUserData) => {
  try {
    // check email/phone are exist
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is already exist!",
        EC: 1,
        DT: "email",
      };
    }

    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist === true) {
      return {
        EM: "The phone is already exist!",
        EC: 1,
        DT: "phone",
      };
    }

    if (rawUserData.password && rawUserData.password.length < 4) {
      return {
        EM: "Your password must have more than 3 letters", // error message
        EC: "1", // error code
        DT: "password", //data
      };
    }

    // hash user password
    let hashPassword = hashUserPassword(rawUserData.password);

    // create new user
    await db.User.create({ ...rawUserData, password: hashPassword });
    return {
      EM: "A user is created successfully!",
      EC: 0,
      DT: [],
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something wrongs in service...",
      EC: -2,
      DT: [],
    };
  }
};

const updateUser = async (data) => {
  try {
    let user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      // update
      user.save({});
    } else {
      // not found
    }
  } catch (e) {
    console.log(e);
  }
};

const deleteUser = async (id) => {
  try {
    const result = await db.User.destroy({
      where: { id: id },
    });

    if (result === 0) {
      return {
        EM: "User not found",
        EC: 2,
        DT: [],
      };
    }

    return {
      EM: "Delete user successed",
      EC: 0,
      DT: [],
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  getUserWithPagination,
};
