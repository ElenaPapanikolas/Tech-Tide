const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/authorization');

// Route to home page
router.get('/', async (req, res) => {
    try { 
        // Gets userId to add comment under correct user
        const userId = req.session.user_id;
        // gets all post data to display on page
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
            ], order: [['updatedAt', 'DESC']],
        })
        const posts = postData.map(post => post.get({ plain: true }));

        res.render('homepage', {posts, userId, logged_in: req.session.logged_in, 

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

// Route to view single post with comments
router.get('/post/:id', withAuth, async (req, res) => {
    const id = req.params.id;
    try {
        const postData = await Post.findByPk(id, {
            include: [{ model: Comment,
                include: [{ model: User,
                    attributes: ['username'],
                 }],
            },
            { model: User }],
        })
        if (!postData) {
            return res.status(404).render('404', {message: 'Post not found' });
        }
        const post = postData.get({ plain: true });
        res.render('post-page', { post, logged_in: req.session.logged_in });
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;