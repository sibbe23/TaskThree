const User = require('./models/user');

module.exports.handler = async (event) => {
  const userId = event.pathParameters.id; // Get UserId from the request path

  try {
    // Find the user by UserId
    const user = await User.findByPk(userId);

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'User not found',
        }),
      };
    }

    // Return the user details
    return {
      statusCode: 200,
      body: JSON.stringify({
        UserId: user.UserId,
        UserName: user.UserName,
        UserEmail: user.UserEmail,
        UserStatus: user.UserStatus,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: `Could not retrieve user: ${err.message}`,
      }),
    };
  }
};
