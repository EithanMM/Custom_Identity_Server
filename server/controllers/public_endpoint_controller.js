const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    response.status(200).send({ message: 'main-public-endpoint-view' });
});

module.exports = router;