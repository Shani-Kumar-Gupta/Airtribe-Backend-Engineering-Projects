const UserDetailsValidator = require('../validators/userDetails.validator');
const usersDetails = require('../db/users.json');
const bcrypt = require('bcrypt');
const { DATE_TIME } = require('../constants');
const fs = require('fs');

const registerUserController = (req, res, next) => {
  let body = req.body;
  let isUservalidated =
    UserDetailsValidator.validateUserDetailsRequestInfo(body);
  if (isUservalidated.status) {
    let usersData = JSON.parse(JSON.stringify(usersDetails));
    let newUserDetails = {
      userId: 100 + 1 + usersData?.users?.length,
      userName: body.userName,
      email: body.email,
      password: bcrypt.hashSync(body.password, 8),
      role: body.role,
      createdAt: DATE_TIME,
    };
    usersData?.users?.push(newUserDetails);
    try {
      fs.writeFile(
        './src/db/users.json',
        JSON.stringify(usersData),
        {
          encoding: 'utf8',
          flag: 'w',
        },
        (err, data) => {
          if (err) {
            return res.status(500).json({
              status: 500,
              message: `Writing users in memory db failed: ${error}`,
            });
          } else {
            return res.status(500).json({
              status: 201,
              message: `User registered successfully!`,
            });
          }
        }
      );
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: `Writing users in memory db failed: ${error}`,
      });
    }
  } else {
    return res.status(isUservalidated.statusCode).json({
      status: isUservalidated.statusCode,
      message: isUservalidated.message,
    });
  }
};

const loginUserController = (req, res, next) => {};

module.exports = {
  registerUserController,
  loginUserController,
};
