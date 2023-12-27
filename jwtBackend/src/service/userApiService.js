import db from "../models/index";

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
      include: { model: db.Group, attributes: ["name", "description"] },
      attributes: ["id", "email", "username", "address", "sex", "phone"],
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

const createNewUser = async (data) => {
  try {
    await db.User.create(data);
    return {
      EM: "create ok",
      EC: 0,
      DT: [],
    };
  } catch (e) {
    console.log(e);
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
