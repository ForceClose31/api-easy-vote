const Vote = require('../models/voteModel');
const Candidate = require('../models/candidateModel');
const Statistic = require('../models/statisticModel');

const castVoteByEvent = async (req, res) => {
    const { eventCode, candidate_id } = req.params;
    const user_id = req.user.id;

    try {
        const candidate = await Candidate.findOne({
            where: { id: candidate_id, event_code: eventCode },
        });
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found for this event' });
        }

        const existingVote = await Vote.findOne({ where: { user_id } });
        if (existingVote) {
            return res.status(400).json({ message: 'User has already voted' });
        }

        await Vote.create({
            user_id,
            code_id: candidate_id,
            timestamp: new Date(),
        });

        await Candidate.update(
            { vote_count: candidate.vote_count + 1 },
            { where: { id: candidate_id } }
        );

        const statistic = await Statistic.findOne();
        if (statistic) {
            await Statistic.update(
                { total_vote: statistic.total_vote + 1 },
                { where: { id: statistic.id } }
            );
        } else {
            await Statistic.create({ total_vote: 1 });
        }

        res.status(200).json({ message: 'Vote successfully cast!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while casting the vote' });
    }
};

module.exports = { castVoteByEvent };