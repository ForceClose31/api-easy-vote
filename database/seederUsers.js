const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const seedUsers = async () => {
    try {
        const hashedPassword = await bcrypt.hash('userpassword', 10);

        await User.create({
            id: 2,
            nim: '123451678',
            password: hashedPassword,
            name: 'Jane Doe',
            isVoted: 'no',
        });

        console.log('Dummy user seeded successfully!');
    } catch (error) {
        console.error('Error seeding user:', error);
    }
};

seedUsers();
