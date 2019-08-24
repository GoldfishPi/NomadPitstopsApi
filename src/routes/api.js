const express = require('express');
const router = express.Router();
const pitstops = require('./pitstop');
const blog = require('./blog');
const user = require('./user');

const access = require('../middleware/access');

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});
router.use('/pitstops', pitstops);
router.use('/blog', blog);
router.use('/user', user);
// router.use('/static', static);

module.exports = router;
