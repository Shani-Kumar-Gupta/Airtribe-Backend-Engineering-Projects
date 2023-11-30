const { USER_ROLES } = require('../constants');
const usersDetails = require('../db/users.json');

class UserDetailsValidator {
  static validateUserDetailsRequestInfo(userDetail) {
    if (
      userDetail.hasOwnProperty('userName') &&
      userDetail.hasOwnProperty('email') &&
      userDetail.hasOwnProperty('password') &&
      userDetail.hasOwnProperty('role')
    ) {
      let usersData = JSON.parse(JSON.stringify(usersDetails));
      let isUserNameExists = usersData.users.findIndex(
        (user) => user.userName === userDetail.userName
      );
      if (isUserNameExists == -1) {
        let isEmailAlreadyExists = usersData.users.findIndex(
          (user) => user.email === userDetail.email
        );
        if (isEmailAlreadyExists == -1) {
          let checkIsValidRole = USER_ROLES.includes(userDetail.role);
          if (checkIsValidRole) {
            return {
              status: true,
              statusCode: 200,
              message: 'User details Validated successfully!',
            };
          } else {
            return {
              status: false,
              statusCode: 400,
              message: 'Invalid user role. Please provide a valid role!',
            };
          }
        } else {
          return {
            status: false,
            statusCode: 403,
            message: 'Email already exists! Please use different email id!',
          };
        }
      } else {
        return {
          status: false,
          statusCode: 403,
          message: 'Username already in use. Please provide unique username!',
        };
      }
    } else {
      return {
        status: false,
        statusCode: 400,
        message: `Invalid used details! Something is missing!`,
      };
    }
  }
}

module.exports = UserDetailsValidator;
