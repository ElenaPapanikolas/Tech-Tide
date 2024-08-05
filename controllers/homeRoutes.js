const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// Route to home page
router.get('/', async (req, res) => {
    try { // gets all post data to display on page
        const postData = await Post.findAll({
            include: [
                { model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['username']
                        }],
                },
                {
                    model: User
                },
            ],
        })
        const posts = postData.map(post => post.get({ plain: true }));

        res.render('homepage', {posts,

        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// Route for login page
router.get('/login', async (req, res) => {
    try {
        res.render('login', {

        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// Route for dashboard page
router.get('/dashboard', async (req, res) => {
    try {
        res.render('dashboard', {

        });
    } catch (err) {
        res.status(500).json(err);
    };
});









module.exports = router;