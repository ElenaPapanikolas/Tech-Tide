const router = require('express').Router();
const { Post, User } = require('../../models');

// /api/posts endpoint

// POST request to create a new post
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            author_id: req.body.author_id,
        });

        res.status(200).json(newPost);
    } catch(error) {
        res.status(500).json({ message: 'Internal server error. Error processing request.' });
    }

});

// GET request to gather specific post data to populate edit form
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const postData = await Post.findByPk(id, {

        });

        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.  Error processing request.' });
    }
});

// PUT request to edit post
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const postData = await Post.findByPk(id);
        if (!postData) {
            return res.status(404).json({ message: 'Post not found with that ID!' });
        }

        const updatedPost = await postData.update({
            title: req.body.title,
            content: req.body.content,
            author_id: req.body.author_id,
        });

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.  Error updating post.' });
    }
})


module.exports = router;