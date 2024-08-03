const sequelize = require('../config/connection.js');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    console.log('--- Users seeded ---');

    const posts = await Post.bulkCreate(postData, {
        individualHooks: true,
        returning: true,
    });
    console.log('--- Posts seeded ---');

    const comments = await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true,
    });
    console.log('--- Comments seeded ---');

    process.exit(0);
};

seedDatabase();