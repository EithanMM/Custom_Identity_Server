const express = require('express');
const router = express.Router();

//Ruta de inicio. se define una ruta inicial.
router.get('/', (request, response) => {
    response.status(200).send({ message: 'main-view' });
});

module.exports = router;