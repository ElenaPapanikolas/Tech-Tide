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
        res.status(500).json({ message: 'Internal server error. Please try again.' });
    }
});

// Route to logout
router.post('/logout', async (req, res) => {
    try {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error. Please try again.' });
    }
});

// Route to signup
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        // checks if username is available
        const checkUsername = await User.findOne({ where: { username }});

        if (checkUsername) {
            return res.status(409).json({ message: 'Username is already taken.' });
        }

        const newUser = await User.create({
            username: username,
            password: password,
        });

        // logs user in after signing up
        req.session.user_id = newUser.id;
        req.session.logged_in = true;

        req.session.save(() => {
            res.status(201).json(newUser);
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
    
});


module.exports = router;