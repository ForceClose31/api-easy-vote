const Event = require('../models/eventModel');

const getEventByCode = async (req, res) => {
    const { code } = req.params;

    try {
        const event = await Event.findOne({
            where: { code },
            attributes: ['name', 'description', 'start_date', 'end_date'], 
        });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const getEventAll = async (req,res) => {
    try {
        const event = await Event.findAll({
            attributes: ['name', 'description', 'code', 'start_date', 'end_date']
        })

        if (!event) {
            return res.status(404).json({ message: 'Event not found' })
        }
        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

module.exports = { getEventByCode, getEventAll };
