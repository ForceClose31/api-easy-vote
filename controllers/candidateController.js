const Candidate = require('../models/candidateModel');

const getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.findAll({
            attributes: ['name', 'nomor_urut', 'visi', 'misi'],
        });

        if (candidates.length === 0) {
            return res.status(404).json({ message: 'No candidates found' });
        }

        res.status(200).json(candidates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = { getCandidates };
