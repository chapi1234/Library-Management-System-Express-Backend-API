const Librarian = require('../models/Librarian');
const BorrowRecord = require('../models/BorrowRecord');

exports.getAllLibrarians = async (req, res) => {
    try {
        const librarians = await Librarian.find({status: 'active'});
        if (librarians.length === 0) {
            return res.status(404).json({
                status: 'failed',
                message: 'No librarians found'
            });
        }
    
        res.status(200).json({
            status: 'success',
            message: "All librarians successfully fetched",
            data: librarians
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}


exports.getLibrarianById = async (req, res) => {
    try {
        const librarian = await Librarian.findById(req.params.id)
        if (!librarian) {
            return res.status(404).json({
                status: 'failed',
                message: 'Librarian not found'
            });
        };

        res.status(200).json({
            status: 'success',
            message : "Librarian data successfully fetched",
            data: librarian
        })
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}


exports.updateLibrarian = async (req, res) => {
    const id = req.params.id;
    try {
        const librarian = await Librarian.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        if (!librarian) return res.status(404).json({
            status: 'failed',
            message: 'Librarian not found'
        });

        res.status(200).json({
            status: "success",
            message: "Librarian UPdated successfully",
            data: librarian
        })
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}


exports.deleteLibrarian = async (req, res) => {
    const id = req.params.id;
    try {
        const librarian = await Librarian.findByIdAndDelete(id);
        if (!librarian) return res.status(404).json({
            status: 'failed',
            message: 'Librarian not found'
        });

        res.status(200).json({
            status: 'success',
            message: 'Librarian deleted successfully',
            data: librarian
        });

    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}


exports.getActiveLibrarians = async (req, res) => {
    try {
        const librarians = await Librarian.find({status: 'active'});
        if (librarians.length === 0) {
            return res.status(404).json({
                status: 'failed',
                message: 'No librarians found'
            });
        }
    
        res.status(200).json({
            status: 'success',
            message: "All active librarians successfully fetched",
            data: librarians
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}


exports.getInactiveLibrarians = async (req, res) => {
    try {
        const librarians = await Librarian.find({status: 'inactive'});
        if (librarians.length === 0) {
            return res.status(404).json({
                status: 'failed',
                message: 'No librarians found'
            });
        }
    
        res.status(200).json({
            status: 'success',
            message: "All inactive librarians successfully fetched",
            data: librarians
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
}

exports.getLibrarianProfile = async (req, res) => {
    const librarianId = req.user._id;
  
    console.log('User ID from token:', librarianId); // Debugging log
  
    try {
      const librarian = await Librarian.findById(librarianId);
  
      if (!librarian) {
        console.log('Librarian not found in database'); // Debugging log
        return res.status(404).json({ success: false, message: "Librarian not found" });
      }
  
      const { password, ...rest } = librarian._doc;
      const getBorrowRecord = await BorrowRecord.find({ librarianId });
  
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