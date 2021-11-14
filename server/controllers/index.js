const express = require('express');
const router = express.Router();

//Ruta de inicio. se define una ruta inicial.
router.get('/', (request, response) => {
    console.log('main-view');
});

module.exports = router;