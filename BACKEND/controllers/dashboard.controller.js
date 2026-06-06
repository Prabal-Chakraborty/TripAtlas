const User = require('../models/user');

const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Welcome to dashboard',
      data: {
        user
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard',
      error: error.message
    });
  }
};

module.exports = {
  getDashboard
};