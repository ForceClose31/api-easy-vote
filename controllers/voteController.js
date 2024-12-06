const Candidate = require('../models/candidateModel');
const Vote = require('../models/voteModel');
const User = require('../models/userModel');

const castVote = async (req, res) => {
    const { candidateId } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findByPk(userId);
        if (user.isVoted === 'yes') {
            return res.status(400).json({ error: 'User has already voted' });
        }

        const candidate = await Candidate.findByPk(candidateId);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        await Vote.create({ user_id: userId, candidate_id: candidateId });

        candidate.vote_count += 1;
        await candidate.save();

        user.isVoted = 'yes';
        await user.save();

        res.status(200).json({ message: 'Vote cast successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to cast vote' });
    }
};

module.exports = { castVote };
