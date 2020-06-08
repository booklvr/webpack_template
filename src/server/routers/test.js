const express = require('express');

const router = new express.Router();

router.get('/', (req, res) => {
    res.render("pages/test", {test: 'here is a message from test'});
})

module.exports = router;