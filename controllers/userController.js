const User = require('../models/User');
const BorrowRecord = require('../models/BorrowRecord');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({
                status: 'failed',
                message: 'No users found'
            });
        }
    
        res.status(200).json({
            status: 'success',
            message: "All users successfully fetched",
            data: users
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                status: 'failed',
                message: 'User not found'
            });
        };

        res.status(200).json({
            status: 'success',
            message : "User data successfully fetched",
            data: user
        })
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}


exports.updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        if (!user) return res.status(404).send('User not found');

        res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            data: user
        });

    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}


exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({
            status: 'failed',
            message: 'User not found'
        });

        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
            data: user
        })

    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}


exports.getUserProfile = async (req, res) => {
    const userId = req.user._id;
  
    console.log('User ID from token:', userId); // Debugging log
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        console.log('User not found in database'); // Debugging log
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const { password, ...rest } = user._doc;
      const getBorrowRecord = await BorrowRecord.find({ userId });
  
      res.status(200).json({
        success: true,
        message: "Profile info is getting",
        data: {
          ...rest,
          borrowRecord: getBorrowRecord,
        },
      });
    } catch (err) {
      console.error('Error retrieving user profile:', err); // Debugging log
      res.status(500).json({ success: false, message: "Something went wrong, cannot get" });
    }
  };