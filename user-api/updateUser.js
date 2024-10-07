const User = require('./models/user');

module.exports.handler = async (event) => {
  const userId = event.pathParameters.id; // Get UserId from the request path
  const reqBody = JSON.parse(event.body);
  const { UserName, UserEmail, UserStatus } = reqBody; // Get updated data from request body

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

    // Update the user with new data
    user.UserName = UserName || user.UserName;
    user.UserEmail = UserEmail || user.UserEmail;
    user.UserStatus = UserStatus || user.UserStatus;

    await user.save(); // Save the updated user details

    // Return the updated user details
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'User updated successfully!',
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
        error: `Could not update user: ${err.message}`,
      }),
    };
  }
};
