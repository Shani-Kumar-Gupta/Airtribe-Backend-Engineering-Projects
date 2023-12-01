const usersDetails = require('../db/users.json');
const usersPreferences = require('../db/usersPreference.json');

const getUsersNewsPreferencesController = (req, res, next) => {
  const { userId, userName, userEmail, message } = req;
  if (userId) {
    let usersPreferencesData = JSON.parse(JSON.stringify(usersPreferences));
    let filteredUserPreference = usersPreferencesData.userPreferences?.filter(
      (userPreferences) => userPreferences.userId == userId
    );
    if (filteredUserPreference.length) {
      return res.status(200).json({
        status: 200,
        message: `User News Preferences found`,
        data: filteredUserPreference,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: `User News Preferences not found!`,
      });
    }
  } else {
    return res.status(403).json({
      status: 403,
      message: message,
    });
  }
};

const updateUsersNewsPreferencesController = (req, res, next) => {
  const { userId, userName, userEmail, message } = req;
  let usersData = JSON.parse(JSON.stringify(usersDetails));
};

const getNewsBasisPreferencesController = (req, res, next) => {};

module.exports = {
  getUsersNewsPreferencesController,
  updateUsersNewsPreferencesController,
  getNewsBasisPreferencesController,
};
