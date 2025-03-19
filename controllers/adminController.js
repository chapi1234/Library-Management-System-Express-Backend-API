const Admin = require("../models/Admin");
const Librarian = require("../models/Librarian");
const BorrowRecord = require("../models/BorrowRecord");

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    if (admins.length === 0) {
      res.status(400).send("No admins found");
    }
    // Map and organize the admin data
    const organizedAdmins = await Promise.all(
      admins.map(async (admin) => {
        const { password, ...rest } = admin._doc;
        const borrowRecords = await BorrowRecord.find({ adminId: admin._id });
        return {
          ...rest,
          borrowRecords,
        };
      })
    );

    res.status(200).json({
      status: "success",
      message: "All the admins successfully fetched",
      data: organizedAdmins,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getAdminById = async (req, res) => {
  const id = req.params.id;
  try {
    const admin = await Admin.findById(id);

    if (!admin) return res.status(400).send("Admin not found");

    res.status(200).json({
      status: "success",
      message: "Admin fetched successfully",
      data: admin,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.deleteAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(id);
    if (!deletedAdmin)
      return res.status(400).json({
        status: "failed",
        message: "Admin not found",
      });

    res.status(200).json({
      status: "success",
      message: "Admin deleted successfully",
      data: deletedAdmin,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.updateAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedAdmin) return res.status(400).send("Admin not found");

    res.status(200).json({
      status: "success",
      message: "Admin updated successfully",
      data: updatedAdmin,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.approveLibrarian = async (req, res) => {
  try {
    const id = req.params.id;
    const librarian = await Librarian.findByIdAndUpdate(
      id,
      { $set: { status: "active" } },
      { new: true }
    );

    if (!librarian) return res.status(400).send("Librarian not found");
    res.status(200).json({
      status: "success",
      message: "Librarian approved successfully",
      data: librarian,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  const adminId = req.user._id;

  console.log("User ID from token:", adminId); // Debugging log

  try {
    const admin = await Admin.findById(adminId);

    if (!admin) {
      console.log("Admin not found in database"); // Debugging log
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const { password, ...rest } = admin._doc;
    const getBorrowRecord = await BorrowRecord.find({ adminId });

    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: {
        ...rest,
        borrowRecord: getBorrowRecord,
      },
    });
  } catch (err) {
    console.error("Error retrieving admin profile:", err); // Debugging log
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};
