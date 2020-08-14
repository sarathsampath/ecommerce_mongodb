var ecommerceControllers = require("../Controllers/ecommerce");
var logger = require("../Utils/loggers");
var express = require("express");
var app = express();
/**
 List the present sellers
 */
async function listSeller(req, res) {
  try {
    logger.info("Routes:Listseller:start");
    var status = await ecommerceControllers.listSeller();
    logger.info("Routes:Listseller:status" + status);
    logger.info("Routes:Listseller:end");
    res.send(status);
  } catch (err) {
    logger.error(err);
    logger.info("Routes:Listseller:end");
  }
}
/**
 Add a new seller
 */
async function postSeller(req, res) {
  try {
    var sellerDetails = req.body.sellerDetails;
    logger.info("Routes:postSeller:start");
    var status = await ecommerceControllers.postSeller(sellerDetails);
    logger.info("Routes:postSeller:status" + status);
    logger.info("Routes:postSeller:end");
    res.send(status);
  } catch (err) {
    logger.error(err);
    logger.info("Routes:postSeller:end");
  }
}
/**
 Update existing seller
 */
async function updateSeller(req, res) {
  try {
    var sellerId = req.params.sellerId;
    var sellerAddress = req.body.sellerDetails.sellerAddress;
    logger.info("Routes:Updateseller:start");
    var status = await ecommerceControllers.updateSeller(
      sellerId,
      sellerAddress
    );
    logger.info("Routes:Updateseller:status" + status);
    logger.info("Routes:Updateseller:end");
    res.send(status);
  } catch (err) {
    logger.error(err);
    logger.info("Routes:Updateseller:end");
  }
}
/**
 * delete existing seller
 */
async function deleteSeller(req, res) {
  try {
    var sellerId = req.params.sellerId;
    logger.info("Routes:deleteSeller:start");
    var status = await ecommerceControllers.deleteSeller(sellerId);
    logger.info("Routes:deleteSeller:status" + status);
    logger.info("Routes:deleteSeller:end");
    res.send(status);
  } catch (err) {
    logger.error(err);
    logger.info("Routes:deleteSeller:end");
  }
}
/**
 * Add a new product
 */
async function postProduct(req, res) {
  try {
    var productDetails = req.body.productDetails;
    var sellerId = req.body.sellerId;
    logger.info("Routes:postProduct:start");
    var status = await ecommerceControllers.postProduct(
      productDetails,
      sellerId
    );
    logger.info("Routes:postProduct:status" + status);
    logger.info("Routes:postProduct:end");
    res.send(status);
  } catch (err) {
    logger.error(err);
    logger.info("Routes:postProduct:end");
  }
}
/**
 *Update Existing product
 * */
async function updateProduct(req, res) {
  try {
    var productDetails = req.body.productDetails;
    var productId = req.params.productId;
    logger.info("Routes:updateProduct:start");
    var status = await ecommerceControllers.updateProduct(
      productDetails,
      productId
    );
    logger.info("Routes:updateProduct:status" + status);
    logger.info("Routes:updateProduct:end");
    res.send(status);
  } catch (err) {
    logger.error(err);
    logger.info("Routes:updateProduct:end");
  }
}
/**
 Delete existing product
 */
async function deleteProduct(req, res) {
  try {
    var productId = req.params.productId;
    logger.info("Routes:deleteProduct:start");
    var status = await ecommerceControllers.deleteProduct(productId);
    logger.info("Routes:deleteProduct:status" + status);
    logger.info("Routes:deleteProduct:end");
    res.send(status);
  } catch (err) {
    logger.error(err);
    logger.info("Routes:deleteProduct:end");
  }
}
/*
 *Add new customer
 */

async function postCustomer(req, res) {
  try {
    var customerDetails = req.body.customerDetails;
    logger.info("Routes:postCustomer:start");
    var status = await ecommerceControllers.postCustomer(customerDetails);
    logger.info("Routes:postCustomer:status" + status);
    logger.info("Routes:postCustomer:end");
    res.send(status);
  } catch (err) {
    logger.error(err);
    logger.info("Routes:postCustomer:end");
  }
}
/*
 *update existing customer
 */

async function updateCustomer(req, res) {
  try {
    var customerDetails = req.body.customerDetails;
    var customerId = req.params.customerId;
    logger.info("Routes:updateCustomer:start");
    var status = await ecommerceControllers.updateCustomer(
      customerDetails,
      customerId
    );
    logger.info("Routes:updateCustomer:status" + status);
    logger.info("Routes:updateCustomer:end");
    res.send(status);
  } catch (err) {
    logger.error(err);
    logger.info("Routes:updateCustomer:end");
  }
}
/**
Delete existing customer
 */
async function deleteCustomer(req, res) {
  try {
    var customerDetails = req.body.customerDetails;
    var customerId = req.params.customerId;
    logger.info("Routes:deleteCustomer:start");
    var status = await ecommerceControllers.deleteCustomer(
      customerId,
      customerDetails
    );
    logger.info("Routes:deleteCustomer:status" + status);
    logger.info("Routes:deleteCustomer:end");
    res.send(status);
  } catch (err) {
    logger.error(err);
    logger.info("Routes:deleteCustomer:end");
  }
}
/**
Add item to cart
 */

async function postCart(req, res) {
  try {
    var productDetails = req.body.productDetails;
    console.log(productDetails);
    var customerId = req.body.customerId;
    logger.info("Routes:postCart:start");
    var status = await ecommerceControllers.postCart(
      customerId,
      productDetails
    );
    logger.info("Routes:postCart:status" + status);
    logger.info("Routes:postCart:end");
    res.send(status);
  } catch (err) {
    logger.error(err);
    logger.info("Routes:postCart:end");
  }
}
/**
Delete item from cart
 */
async function deleteCart(req, res) {
  try {
    var customerId = req.params.customerId;
    var productId = req.params.productId;
    logger.info("Routes:deleteCart:start");
    var status = await ecommerceControllers.deleteCart(customerId, productId);
    logger.info("Routes:deleteCart:status" + status);
    logger.info("Routes:deleteCart:end");
    res.send(status);
  } catch (err) {
    logger.error(err);
    logger.info("Routes:deleteCart:end");
  }
}

/**
Add product to wishlist
 */
async function postWishlist(req, res) {
  try {
    var productDetails = req.body.productDetails;
    var customerId = req.body.customerId;
    logger.info("Routes:postWishlist:start");
    var status = await ecommerceControllers.postWishlist(
      customerId,
      productDetails
    );
    logger.info("Routes:postWishlist:status" + status);
    logger.info("Routes:postWishlist:end");
    res.send(status);
  } catch (err) {
    logger.error(err);
    logger.info("Routes:postWishlist :end");
  }
}
/**
Delete wishlisted product
 */
async function deleteWishlist(req, res) {
  try {
    var customerId = req.params.customerId;
    var productId = req.params.productId;
    logger.info("Routes:deleteWishlist:start");
    var status = await ecommerceControllers.deleteWishlist(
      customerId,
      productId
    );
    logger.info("Routes:deleteWishlist:status" + status);
    logger.info("Routes:deleteWishlist:end");
    res.send(status);
  } catch (err) {
    logger.error(err);
    logger.info("Routes:deleteWishlist:end");
  }
}
/**
Order Item from cart
 */
async function postOrder(req, res) {
  try {
    var customerId = req.body.customerId;
    var productDetails = req.body.productDetails;
    logger.info("Routes:postOrder:start");
    var status = await ecommerceControllers.postOrder(
      customerId,
      productDetails
    );
    logger.info("Routes:postOrder:status" + status);
    logger.info("Routes:postOrder:end");
    res.send(status);
  } catch (err) {
    logger.error(err);
    logger.info("Routes:postOrder:end");
  }
}
async function postCartOrder(req, res) {
  try {
    var customerId = req.params.customerId;
    logger.info("Routes:postCartOrder:start");
    var status = await ecommerceControllers.postCartOrder(customerId);
    logger.info("Routes:postCartOrder:status" + status);
    logger.info("Routes:postCartOrder:end");
    res.send(status);
  } catch (err) {
    logger.error(err);
    logger.info("Routes:postCartOrder:end");
  }
}

module.exports = {
  listSeller,
  updateSeller,
  deleteSeller,
  postSeller,
  postProduct,
  deleteProduct,
  updateProduct,
  updateCustomer,
  deleteCustomer,
  postCustomer,
  postCart,
  postWishlist,
  deleteCart,
  deleteWishlist,
  postOrder,
  postCartOrder,
};
