const { Router } = require("express");
const router = Router();
const products = require('../productos.json')

router.get('/', (req, res) => {
    res.json(products)
})

module.exports = router;
