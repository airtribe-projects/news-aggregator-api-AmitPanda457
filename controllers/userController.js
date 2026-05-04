const userModel = require('../models/userModel');

const getPreferences = (req, res) => {
    return res.status(200).json({ preferences: req.user.preferences });
};

const updatePreferences = (req, res) => {
    const { preferences } = req.body;

    if (!Array.isArray(preferences)) {
        return res.status(400).json({ message: 'Preferences must be an array' });
    }

    const user = userModel.updateUserPreferences(req.user, preferences);

    return res.status(200).json({
        message: 'Preferences updated successfully',
        preferences: user.preferences
    });
};

module.exports = {
    getPreferences,
    updatePreferences
};
