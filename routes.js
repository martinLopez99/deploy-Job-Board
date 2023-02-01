const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/postjob', (req, res) => {
    res.render('postjob');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/apply', (req, res) => {
    res.render('apply');
});

router.get('/moreInfo', (req, res) => {
    res.render('moreInfo');
});


module.exports = router;
