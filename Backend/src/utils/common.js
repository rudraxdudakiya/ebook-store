const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createAdminAccount = async () => {
    try {

        const email = process.env.ADMIN_EMAIL || '';
        const password = process.env.ADMIN_PASSWORD || '';
        const firstname = process.env.ADMIN_FIRSTNAME || 'Admin';
        const lastname = process.env.ADMIN_LASTNAME || '123';
        const role = 'ADMIN';

        const existAdmin = await User.findOne({ email: email });
            if (existAdmin) {
                console.log('Admin account already exists');
                return;
            }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new User({
                email: email,
                password: hashedPassword,
                firstname: firstname,
                lastname: lastname,
                role: "ADMIN"
            })
        await admin.save();
        console.log('Admin account created successfully:', admin);
    }
    catch (error) {
        console.error('Error creating admin account:', error);
    }
}


module.exports = {
    createAdminAccount
}

