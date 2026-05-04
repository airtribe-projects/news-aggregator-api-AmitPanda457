const fallbackNews = [
    {
        title: 'News aggregator API is running',
        category: 'general'
    }
];

const buildSearchQuery = (preferences = []) => {
    if (!preferences.length) {
        return 'technology';
    }

    return preferences.join(' OR ');
};

const formatNewsApiArticle = (article) => ({
    title: article.title,
    description: article.description,
    url: article.url,
    source: article.source && article.source.name,
    publishedAt: article.publishedAt
});

const fetchFromNewsApi = async (preferences) => {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
        return fallbackNews;
    }

    const url = new URL('https://newsapi.org/v2/everything');
    url.searchParams.set('q', buildSearchQuery(preferences));
    url.searchParams.set('language', 'en');
    url.searchParams.set('pageSize', '10');
    url.searchParams.set('sortBy', 'publishedAt');
    url.searchParams.set('apiKey', apiKey);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Unable to fetch news');
    }

    const data = await response.json();

    return data.articles.map(formatNewsApiArticle);
};

const getNewsForPreferences = async (preferences) => {
    const provider = process.env.NEWS_PROVIDER || 'newsapi';

    if (provider !== 'newsapi') {
        return fallbackNews;
    }

    return fetchFromNewsApi(preferences);
};

module.exports = {
    getNewsForPreferences
};
