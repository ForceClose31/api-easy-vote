const { ethers } = require('ethers');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Candidate = require('../models/candidateModel');
const VoteContract = require('../services/blockchainService'); 

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

        const candidates = [
            {
                id: 1,
                name: 'John Doe',
                profile_picture: 'https://example.com/profile1.jpg',
                visi: 'Menjadi pemimpin yang adil dan bijaksana.',
                misi: 'Membangun infrastruktur yang lebih baik dan meningkatkan pendidikan.',
                nomor_urut: 1,
                position_id: 2,
                event_code: 'EVT2024',
            },
            {
                id: 2,
                name: 'Jane Smith',
                profile_picture: 'https://example.com/profile2.jpg',
                visi: 'Meningkatkan kesejahteraan masyarakat.',
                misi: 'Menjamin keseimbangan ekonomi dan sosial.',
                nomor_urut: 2,
                position_id: 1,
                event_code: 'EVT2024',
            },
        ];

        for (const candidate of candidates) {
            await Candidate.create({
                id: candidate.id,
                name: candidate.name,
                profile_picture: candidate.profile_picture,
                visi: candidate.visi,
                misi: candidate.misi,
                nomor_urut: candidate.nomor_urut,
                vote_count: 0,
                position_id: candidate.position_id,
                event_code: candidate.event_code,
            });

            console.log(`Candidate ${candidate.name} added to database.`);

            await VoteContract.addCandidateToBlockchain(candidate.name, candidate.visi, candidate.misi);
            console.log(`Candidate ${candidate.name} added to blockchain.`);
        }

        console.log('Dummy candidates seeded successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};

seedData();
