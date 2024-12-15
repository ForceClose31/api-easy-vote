const { castVoteBlockchain } = require("../services/blockchainService");
const Vote = require('../models/voteModel');
const Candidate = require('../models/candidateModel');
const Statistic = require('../models/statisticModel');
const History = require('../models/historyModel');

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

        const txData = await castVoteBlockchain(candidate_id);

        await History.create({
            candidate_id: candidate_id,
            vote_count: candidate.vote_count,  
            transaction_hash: txData.transactionHash,
            block_number: txData.blockNumber,
            timestamp: new Date(),
        });

        res.status(200).json({ message: 'Vote successfully cast!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while casting the vote' });
    }
};

module.exports = { castVoteByEvent };