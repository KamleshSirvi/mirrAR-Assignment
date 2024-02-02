const express = require("express");
const {
  addProduct,
  getProducts,
  getoneProduct,
  deleteOneProduct,
  getData,
  updateData,
} = require("../controllers/productControl");

const router = express.Router();

router.post("/addProduct", addProduct);
router.get("/", getProducts);
router.get("/:_id", getoneProduct);
router.delete("/:name", deleteOneProduct);
router.get("/findProduct/:name", getData);
router.put("/updateExistingProduct/:_id", updateData);

module.exports = router;
