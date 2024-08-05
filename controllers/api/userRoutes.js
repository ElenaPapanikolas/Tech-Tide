const router = require('express').Router();
const { User } = require('../../models');

// Route to login
router.post('/login', async (req, res) => {
    try {
        // Checks for valid username
        const userData = await User.findOne({ where: { username: req.body.username }});
        if (!userData) {
            res.status(404).json({ message: 'Incorrect username or password.' });
            return;
        }
        // Checks password against database
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(404).json({ message: 'Incorrect username or password.' });
            return;
        }

        // Sets logged_in session to true
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.json({ user: userData, message: 'You are now logged in.'});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.  Please try again' });
    }
});

module.exports = router;