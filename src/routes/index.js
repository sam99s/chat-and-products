const { Router, response } = require("express");
const router = Router();
const fetch = require('node-fetch');
const productsJSON = require('../productos.json')

function productosApi(){
  let allProducts = []
  fetch('http://localhost:8080/api/productos')
    .then(response => response.json())
    .then(data => {
      data.forEach(product => {
        allProducts.push(product)
      });      
    });
  return allProducts
};


const productos = productosApi();

router.get("/", (req, res) => {
  res.render("index", {
    productos,
  });
});

router.post("/", (req, res) => {
  const { title, price, thumbnail } = req.body;

  if (title === "" || price === "" || thumbnail === "") {
    return res.redirect("/");
  }

  const producto = { title, price, thumbnail };
  if (productos.length === 0) {
    producto["id"] = 1;
  } else {
    producto["id"] = productos[productos.length - 1].id + 1;
  }

  productsJSON.push(producto);

  res.redirect("/");
});

module.exports = router;
