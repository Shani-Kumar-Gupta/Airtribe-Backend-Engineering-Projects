const usersDetails = require('../db/users.json');
const usersPreferences = require('../db/usersPreference.json');
const fs = require('fs');

/* Get User News Preferences API endpoint */
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

/* Update User News Preferences API endpoint */
const updateUsersNewsPreferencesController = (req, res, next) => {
  const { userId, userName, userEmail, message } = req;
  if (userId) {
    let usersData = JSON.parse(JSON.stringify(usersDetails));
    let isUserExist = usersData.users.findIndex(
      (user) => (user.userId = userId)
    );
    if (isUserExist !== -1) {
      let usersPreferencesData = JSON.parse(JSON.stringify(usersPreferences));
      let filteredUserPreferenceIdx =
        usersPreferencesData.userPreferences?.findIndex(
          (userPreferences) => userPreferences.userId == userId
        );
      if (filteredUserPreferenceIdx == -1) {
        let userPreferenceObj = {
          userId: userId,
          preferences: {
            categories: req.body.categories || [],
            sources: req.body.sources || [],
          },
        };
        usersPreferencesData.userPreferences.push(userPreferenceObj);
        let finalUsersPreference = JSON.stringify(usersPreferencesData);
        try {
          fs.writeFile(
            './src/db/usersPreference.json',
            finalUsersPreference,
            { encoding: 'utf8', flag: 'w' },
            (err, data) => {
              if (err) {
                return res.status(500).json({
                  status: 500,
                  message: `Writing users news preferences in memory db failed: ${err}`,
                });
              } else {
                return res.status(500).json({
                  status: 200,
                  message: `User News Preferences updated successfully!`,
                });
              }
            }
          );
        } catch (error) {
          return res.status(500).json({
            status: 500,
            message: `Writing users news preferences in memory db failed: ${err}`,
          });
        }
      } else {
        usersPreferencesData.userPreferences[filteredUserPreferenceIdx] = {
          ...usersPreferencesData.userPreferences[filteredUserPreferenceIdx],
          preferences: {
            categories: req.body.categories || [],
            sources: req.body.sources || [],
          },
        };
        let finalUsersPreference = JSON.stringify(usersPreferencesData);
        try {
          fs.writeFile(
            './src/db/usersPreference.json',
            finalUsersPreference,
            { encoding: 'utf8', flag: 'w' },
            (err, data) => {
              if (err) {
                return res.status(500).json({
                  status: 500,
                  message: `Writing users news preferences in memory db failed: ${err}`,
                });
              } else {
                return res.status(500).json({
                  status: 200,
                  message: `User News Preferences updated successfully!`,
                });
              }
            }
          );
        } catch (error) {
          return res.status(500).json({
            status: 500,
            message: `Writing users news preferences in memory db failed: ${err}`,
          });
        }
      }
    } else {
      return res.status(404).json({
        status: 404,
        message: `User not found with userId: ${userId}`,
      });
    }
  } else {
    return res.status(403).json({
      status: 403,
      message: message,
    });
  }
};

const getNewsBasisPreferencesController = (req, res, next) => {};

module.exports = {
  getUsersNewsPreferencesController,
  updateUsersNewsPreferencesController,
  getNewsBasisPreferencesController,
};
