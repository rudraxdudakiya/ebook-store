const bcrypt = require('bcryptjs');
const User = require('../../models/User');

const jwt = require('jsonwebtoken');
const Order = require('../../models/Order');

require('dotenv').config();

console.log("JWT_SECRET:", process.env.JWT_SECRET);

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
}

const createUser = async (userData) => {
        try {
    
            const email =  userData.email
            const password = userData.password
            const firstname = userData.firstname
            const lastname = userData.lastname
    
            const existUser = await User.findOne({ email: email });
                if (existUser) {
                    console.log('User account already exists');
                    throw new Error("User account already exists");
                }
    
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const user = new User({
                    email: email,
                    password: hashedPassword,
                    firstname: firstname,
                    lastname: lastname,
                    role: "CUSTOMER"
            });
    
            await user.save();
            console.log('User account created successfully:', user);

            const order = new Order({
                    amount: 0,
                    address: 'default address',
                    orderStatus: 'PENDING',
                    user: user
            });

            await order.save();
            console.log('Order Pending:', order);

            return user;
        }
        catch (error) {
            console.error('Error creating User account:', error);
            throw error;
        }
}

const loginUser = async (userData) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in the environment variables.");
        }

        const email = userData.email;
        const password = userData.password;

        const existUser = await User.findOne({ email: email });
        if (!existUser) {
            console.log('User account not exists');
            throw new Error("User account not exists");
        }

        const isPasswordValid = await bcrypt.compare(password, existUser.password);
        if (!isPasswordValid) {
            throw new Error("Incorrect Password");
        }

        const token = jwt.sign(
            { id: existUser._id, role: existUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        return token;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};


module.exports = {
    createUser,
    loginUser
}

