const User = require('./models/user');

module.exports.handler = async (event) => {
  const reqBody = JSON.parse(event.body);
  const { UserName, UserEmail, UserStatus } = reqBody; // Include Status from the request body

  try {
    // Create a new user with UserName, UserEmail, and Status
    const newUser = await User.create({
      UserName,
      UserEmail,
      UserStatus, // Save the status in the database
    });

    // Return the created user details including the status
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'User created successfully!',
        UserId: newUser.UserId,
        UserName: newUser.UserName,
        UserEmail: newUser.UserEmail,
        UserStatus: newUser.UserStatus, // Include status in the response
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: `Could not create user: ${err.message}`,
      }),
    };
  }
};
