const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Librarian = require('../models/Librarian');
const { registerValidation, loginValidation } = require('../validation/authValidation');

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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        if (role === 'member'){
            user = new User({
                name,
                email,
                password: hashedPassword,
                role,
                gender,
                phone
            })
        };
        if (role === 'librarian'){
            user = new Librarian({
                name,
                email,
                password: hashedPassword,
                role,
                gender,
                phone
            })
        };
        if (role === 'admin'){
            user = new Admin({
                name,
                email,
                password: hashedPassword,
                role,
                gender,
                phone
            })
        };

        await user.save();
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