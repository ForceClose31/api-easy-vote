const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Candidate = require('../models/candidateModel'); 

const seedData = async () => {
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

        await Candidate.create({
            id: 1,
            name: 'John Doe',
            profile_picture: 'https://example.com/profile1.jpg',
            visi: 'Menjadi pemimpin yang adil dan bijaksana.',
            misi: 'Membangun infrastruktur yang lebih baik dan meningkatkan pendidikan.',
            nomor_urut: 1,
            vote_count: 0,
            position_id: 1, 
        });

        await Candidate.create({
            id: 2,
            name: 'Jane Smith',
            profile_picture: 'https://example.com/profile2.jpg',
            visi: 'Menciptakan pemerintahan yang bersih dan transparan.',
            misi: 'Meningkatkan layanan publik dan kesejahteraan masyarakat.',
            nomor_urut: 2,
            vote_count: 0,
            position_id: 1, 
        });

        console.log('Dummy candidates seeded successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};

seedData();
