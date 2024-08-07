const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/authorization');

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

        res.render('homepage', {posts, logged_in: req.session.logged_in, 

        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// Route for login page
router.get('/login', async (req, res) => {
    try {
        res.render('login', {logged_in: req.session.logged_in,

        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// Route for dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;
        const userData = await Post.findAll({
            where: { author_id: userId },
            include: [{ model: Comment }, { model: User }],
            order: [['updatedAt', 'DESC'],]
        });

        const posts = userData.map(post => post.get({ plain: true }));

        res.render('dashboard', { posts, userId, logged_in: req.session.logged_in, });
    } catch (error) {
        res.status(500).json(error);
    }

});




module.exports = router;