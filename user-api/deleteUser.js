const User = require('./models/user');

module.exports.handler = async (event) => {
  const reqBody = JSON.parse(event.body);
  const { UserId } = reqBody;

  try {
    // Find and delete user
    const deletedUser = await User.destroy({ where: { UserId } });

    if (!deletedUser) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User data deleted successfully!' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        err: `Could not delete user: ${err.message}`,
      }),
    };
  }
};
