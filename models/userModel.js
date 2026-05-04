const users = [];

const findUserByEmail = (email) => users.find((user) => user.email === email);

const createUser = ({ name, email, password, preferences = [] }) => {
    const user = {
        id: users.length + 1,
        name,
        email,
        password,
        preferences
    };

    users.push(user);

    return user;
};

const updateUserPreferences = (user, preferences) => {
    user.preferences = preferences;
    return user;
};

module.exports = {
    createUser,
    findUserByEmail,
    updateUserPreferences
};
