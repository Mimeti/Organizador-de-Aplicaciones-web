const express = require('express');
const router = express.Router();

const cont = require('./config/conexion');

router.get('/als', (req, res) => {
    res.send('als');
})

module.exports = router;