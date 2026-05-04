const newsService = require('../services/newsService');

const getNews = async (req, res) => {
    try {
        const news = await newsService.getNewsForPreferences(req.user.preferences);

        return res.status(200).json({ news });
    } catch (err) {
        return res.status(502).json({ message: 'Unable to fetch news right now' });
    }
};

module.exports = {
    getNews
};
