const router = require('express').Router();

// Route to home page
router.get('/', async (req, res) => {
    try {
        res.render('homepage', {

        });
    } catch (err) {
        res.status(500).json(err);
    };
});









module.exports = router;