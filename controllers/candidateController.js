const Candidate = require("../models/candidateModel");

const getCandidatesByEvent = async (req, res) => {
  const { eventCode } = req.params;

  try {
    const candidates = await Candidate.findAll({
      where: { event_code: eventCode },
      attributes: ["name", "profile_picture", "nomor_urut", "visi", "misi"],
    });

    if (!candidates || candidates.length === 0) {
      return res
        .status(404)
        .json({ message: "No candidates found for this event" });
    }

    res.status(200).json(candidates);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching candidates" });
  }
};

const getVoteCount = async (req, res) => {
  const { eventCode } = req.params;

  try {
    const candidates = await Candidate.findAll({
      where: { event_code: eventCode },
      attributes: ["vote_count", "id", "name"],
    });

    if (!candidates || candidates.length === 0) {
      return res
        .status(404)
        .json({ message: "No candidates found for this event" });
    }

    res.status(200).json(candidates);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching candidates" });
  }
};

module.exports = { getCandidatesByEvent, getVoteCount };
