const {Router} = require('express');
const User = require('../models/User');
const {isAuth} = require("../utils/middleware");
const router = Router();

router.get('/read', isAuth, async (req, res) => {
    try {

        const user = await User.findById(req.user.userId, 'character').populate('character').exec();

        res.status(200).json(user.character);
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

module.exports = router;
