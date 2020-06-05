const express = require('express');

const router = new express.Router();

router.get('/', (req, res) => {
    res.render("test", {test: undefined});
})

module.exports = router;