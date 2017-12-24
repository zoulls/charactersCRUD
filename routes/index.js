const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({
        result:true,
        data: 'root path'
    });
});

module.exports = router;
