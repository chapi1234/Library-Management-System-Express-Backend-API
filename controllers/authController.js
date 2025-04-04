const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Librarian = require('../models/Librarian');
const { registerValidation, loginValidation } = require('../validation/authValidation');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});


exports.register = async ( req, res) => {

    // validate the data before we make a user
    const { error } = registerValidation(req.body);
    if (error) {
      const errorDetails = error.details.map((detail) => detail.message);
      return res.status(400).send(errorDetails);
    }  

    const { name, email, password, role, gender, phone, membershipID } = req.body;

    try {
        let user = null
        if (role === 'member'){
            user = await User.findOne({ email });
        }
        if (role === 'librarian'){
            user = await Librarian.findOne({ email });
        }
        if (role === 'admin'){
            user = await Admin.findOne({ email })
        }
        // check if the user is already in the database

        if(user) {
            return res.status(400).json({
                status: 'failed',
                message: 'User already exists'
            });
        }

        // if (role === 'admin') return res.status(400).send("you cannot register admin here");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Generate otp
        const otp = crypto.randomBytes(3).toString('hex');
        const otpExpires = Date.now() + 3600000; // 1 hour

        if (role === 'member'){
            user = new User({
                name,
                email,
                password: hashedPassword,
                role,
                gender,
                phone,
                otp,
                otpExpires
            })
        };
        if (role === 'librarian'){
            user = new Librarian({
                name,
                email,
                password: hashedPassword,
                role,
                gender,
                phone,
                otp,
                otpExpires
            })
        };
        if (role === 'admin'){
            user = new Admin({
                name,
                email,
                password: hashedPassword,
                role,
                gender,
                phone,
                otp,
                otpExpires
            })
        };

        await user.save();

        //send OTP email
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Library Management System OTP',
            text: `Your OTP is ${otp}`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log('Error sending email', err);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });


        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: user
        });
    } catch (err) {
        console.log("Error during registration", err);
        res.status(500).json({
            status: 'failed',
            message: 'Internal server error',
        })
    }
}


exports.login = async (req, res) => {
    // validate the data before we login
    const { error } = loginValidation(req.body);
    if (error) {
        const errorDetails = error.details.map((detail) => detail.message);
        return res.status(400).send(errorDetails);
    }

    const { email, password } = req.body;
    try {
        let user = null;
        const member = await User.findOne({ email });
        const librarian = await Librarian.findOne({ email });
        const admin = await Admin.findOne({ email });

        if (member) {
            user = member;
        };
        if (librarian) {
            user = librarian;
        };
        if (admin) {
            user = admin;
        };

        if(!user) return res.status(400).json({ message: 'User not found !'});

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(400).json({ message: 'Invalid password'});

        // create and assign a token
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '10d' });
        console.log("Generated token", token);

        const { password: userPassword, role, ...rest } = user._doc;

        res.header('auth-token', token).json({
            status: 'success',
            message: 'User logged in successfully',
            token,
            data: { ...rest },
            role
        });

    } catch (err) {
        console.log("Error during login", err);
        res.status(500).json({
            status: 'failed',
            message: 'Failed to Login !!!',
        })
    }
}


exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) user = await Librarian.findOne({ email });
        if (!user) user = await Admin.findOne({ email });

        if (!user) {
            return res.status(400).json({ status: 'failed', message: 'User not found' });
        }

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ status: 'failed', message: 'Invalid or expired OTP' });
        }

        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({
            status: 'success',
            message: 'OTP verified successfully',
            data: user
        });
    } catch (err) {
        console.log('Error verifying OTP', err);
        res.status(500).json({
            status: 'failed',
            message: 'Internal server error'
        });
    }
};