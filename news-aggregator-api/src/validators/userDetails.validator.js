const { USER_ROLES } = require('../constants');
const usersDetails = require('../db/users.json');

class UserDetailsValidator {
  static validateUserDetailsRequestInfo(userDetails) {
    if (
      userDetails.hasOwnProperty('userName') &&
      userDetails.hasOwnProperty('email') &&
      userDetails.hasOwnProperty('password') &&
      userDetails.hasOwnProperty('role')
    ) {
      let usersData = JSON.parse(JSON.stringify(userDetails));
      let isUserNameExists = usersData.users.findIndex(
        (user) => user.userName === userDetails.userName
      );
      if (isUserNameExists == -1) {
        let isEmailAlreadyExists = usersData.users.findIndex(
          (user) => user.email === userDetails.email
        );
        if (isEmailAlreadyExists == -1) {
          let checkIsValidRole = USER_ROLES.includes(userDetails.role);
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
