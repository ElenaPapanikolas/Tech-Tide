const router = require('express').Router();
const { Comment } = require('../../models');

// /api/comments

// POST request to create a new comment
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            post_id: req.body.post_id,
            author_id: req.body.author_id,
        });

        res.status(200).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


module.exports = router;