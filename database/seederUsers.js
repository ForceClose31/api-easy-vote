const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Candidate = require('../models/candidateModel'); 

const seedData = async () => {
    try {
        const hashedPassword = await bcrypt.hash('userpassword', 10);

        await User.create({
            id: 1,
            nim: '123451678',
            password: hashedPassword,
            name: 'Jane Doe',
        });
        await User.create({
            id: 2,
            nim: '12345121213',
            password: hashedPassword,
            name: 'Jane Doe',
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
            event_code: 'EVT2024', 
        });

        await Candidate.create({
            id: 2,
            name: 'John Doe',
            profile_picture: 'https://example.com/profile1.jpg',
            visi: 'Menjadi pemimpin yang adil dan bijaksana.',
            misi: 'Membangun infrastruktur yang lebih baik dan meningkatkan pendidikan.',
            nomor_urut: 2,
            vote_count: 0,
            position_id: 1,
            event_code: 'EVT2024', 
        });

        await Candidate.create({
            id: 3,
            name: 'John Doe',
            profile_picture: 'https://example.com/profile1.jpg',
            visi: 'Menjadi pemimpin yang adil dan bijaksana.',
            misi: 'Membangun infrastruktur yang lebih baik dan meningkatkan pendidikan.',
            nomor_urut: 3,
            vote_count: 0,
            position_id: 1,
            event_code: 'EVT2024', 
        });

        await Candidate.create({
            id: 4,
            name: 'John Doe',
            profile_picture: 'https://example.com/profile1.jpg',
            visi: 'Menjadi pemimpin yang adil dan bijaksana.',
            misi: 'Membangun infrastruktur yang lebih baik dan meningkatkan pendidikan.',
            nomor_urut: 4,
            vote_count: 0,
            position_id: 1,
            event_code: 'EVT2024', 
        });
        
        console.log('Dummy candidates seeded successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};

seedData();
