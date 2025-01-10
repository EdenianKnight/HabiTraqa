const pool = require('../db/db');

const getHabits = async (req, res) => {
    try {
        const habits = await pool.query('SELECT * FROM habits WHERE user_id = $1', [req.user.id]);
        res.json(habits.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addHabit = async (req, res) => {
    const { name, frequency } = req.body;

    try {
        const newHabit = await pool.query(
            'INSERT INTO habits (user_id, name, frequency) VALUES ($1, $2, $3) RETURNING *',
            [req.user.id, name, frequency]
        );
        res.status(201).json(newHabit.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateHabit = async (req, res) => {
    const { id } = req.params;
    const { name, frequency } = req.body;

    try {
        const updatedHabit = await pool.query(
            'UPDATE habits SET name = $1, frequency = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
            [name, frequency, id, req.user.id]
        );
        res.json(updatedHabit.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteHabit = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM habits WHERE id = $1 AND user_id = $2', [id, req.user.id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getHabits, addHabit, updateHabit, deleteHabit };
