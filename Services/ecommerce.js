var ecommerceHelper = require("../Utils/fileHelper");
var ecommerceConstants = require("../Data/constants");
var logger = require("../Utils/loggers");
var ecommerceResponse = require("../Utils/responseHelper");
const sellerModel = require("../Models/seller");
const productModel = require("../Models/product");
const customerModel = require("../Models/customer");
const cartModel = require("../Models/cart");
const orderModel = require("../Models/orders");
const wishlistModel = require("../Models/wishlist");
/**
View all the sellers
*/
async function listSeller() {
  try {
    logger.info("services:list seller:start");
    var data = await sellerModel.find({ isActive: true });
    logger.info("services:list seller:status" + data);
    logger.info("services:list seller:end");
    var status = ecommerceResponse.responseSuccess(
      true,
      "list of sellers",
      ecommerceConstants.VALID,
      data
    );
    return status;
  } catch (err) {
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      true,
      err,
      ecommerceConstants.VALID
    );
    return status;
    logger.info("services:list seller:end");
  }
}
/**
add a new seller
 */
async function postSeller(sellerDetails) {
  try {
    logger.info("services:postSeller:start");
    var variable = new sellerModel({
      sellerDetails: sellerDetails,
      isActive: true,
    });
    console.log(sellerDetails.sellerProof);
    const check = await sellerModel.find({
      "sellerDetails.sellerProof": sellerDetails.sellerProof,
    });
    console.log(check);
    if (check.length == 0) {
      const data = await variable.save();
      var status = ecommerceResponse.responseSuccess(
        true,
        "post Done",
        ecommerceConstants.VALID,
        data
      );
      logger.info("services:postSeller:status" + status);
      logger.info("services:postSeller:end");
      return status;
    } else {
      var status = ecommerceResponse.responseFailure(
        false,
        "seller already exist",
        ecommerceConstants.VALID
      );
      return status;
      logger.info("services:postSeller:end");
    }
  } catch (err) {
    console.log(err);
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "seller not found",
      ecommerceConstants.VALID
    );
    return status;
    logger.info("services:postSeller:end");
  }
}
/**
Update seller
 */
async function updateSeller(sellerId, sellerAddress) {
  try {
    logger.info("services:updateSeller:start");
    var data1 = await sellerModel.find({ sellerId: sellerId, isActive: true });
    if (data1 == "") {
      var status = ecommerceResponse.responseFailure(
        false,
        "seller not exist",
        ecommerceConstants.VALID
      );
      return status;
    }
    var data = await sellerModel.updateOne(
      { sellerId: sellerId },
      { "sellerDetails.sellerAddress": sellerAddress }
    );
    console.log(data);
    var status = ecommerceResponse.responseSuccess(
      true,
      " seller updated",
      200
    );
    return status;
  } catch (err) {
    logger.error(err);

    var status = ecommerceResponse.responseFailure(
      false,
      "invalid",
      ecommerceConstants.INVALID
    );
    return status;
    logger.info("services:updateSeller:end");
  }
}
/**
delete seller
 */
async function deleteSeller(sellerId) {
  try {
    logger.info("services:deleteSeller:start");
    var data = await sellerModel.find({ sellerId: sellerId, isActive: true });
    console.log(data);
    if (data == "") {
      var status = ecommerceResponse.responseFailure(
        false,
        "seller not found",
        400
      );
      return status;
    } else {
      //var data=await sellerModel.updateOne({sellerId:sellerId},{isActive:false});
      // console.log(data);
      var status = ecommerceResponse.responseSuccess(
        true,
        "delete Done",
        ecommerceConstants.VALID
      );
      logger.info("services:deleteProduct:status");
      logger.info("services:deleteProduct:end");
      return status;
    }
  } catch (err) {
    console.log(err);
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "seller not found",
      ecommerceConstants.VALID
    );
    return status;
    logger.info("services:deleteSeller:end");
  }
}
/**
add new product
 */
async function postProduct(productDetails, sellerId) {
  try {
    logger.info("services:postProduct:start");
    var data = await sellerModel.find({ sellerId: sellerId, isActive: true });
    if (data == "") {
      var status = ecommerceResponse.responseFailure(
        false,
        "seller not found",
        400
      );
      return status;
    } else {
      var variable = new productModel({
        sellerId: sellerId,
        productDetails: productDetails,
        isActive: true,
      });
    }
    var data = await variable.save();
    console.log(data);
    var status = ecommerceResponse.responseSuccess(
      true,
      "product posted",
      ecommerceConstants.VALID,
      data
    );
    logger.info("services:postProduct:status");
    logger.info("services:postProduct:end");
    return status;
  } catch (err) {
    console.log(err);
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "product not found",
      ecommerceConstants.VALID,
      data
    );
    logger.info("services:postProduct:end");
    return status;
  }
}
/**
update existing product
 */
async function updateProduct(productDetails, productId) {
  try {
    logger.info("services:updateProduct:start");
    var data = await productModel.find({
      "productDetails.productId": productId,
      isActive: true,
    });
    if (data == "") {
      var status = ecommerceResponse.responseFailure(
        true,
        "product not found",
        ecommerceConstants.INVALID
      );
      return status;
    } else {
      var data = await productModel.updateOne(
        { "productDetails.productId": productId },
        {
          "productDetails.productDiscount": productDetails.productDiscount,
          "productDetails.productStock": productDetails.productStock,
        }
      );
      console.log(data);
      var status = ecommerceResponse.responseSuccess(
        true,
        "product updated",
        ecommerceConstants.VALID,
        data
      );
      logger.info("services:updateProduct:status" + status);
      logger.info("services:updateProduct:end");
      return status;
    }
  } catch (err) {
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "product not found",
      ecommerceConstants.VALID
    );
    return status;
    logger.info("services:updateProduct:end");
  }
}
/**
delete product
 */
async function deleteProduct(productId) {
  try {
    logger.info("services:deleteProduct:start");
    var data = await productModel.find({
      "productDetails.productId": productId,
      isActive: true,
    });
    if (data == "") {
      var status = ecommerceResponse.responseFailure(
        true,
        "product not found",
        ecommerceConstants.INVALID
      );
      return status;
    } else {
      var data = await productModel.updateOne(
        { "productDetails.productId": productId },
        { isActive: false }
      );
      console.log(data);
      var status = ecommerceResponse.responseSuccess(
        true,
        "product deleted",
        ecommerceConstants.VALID,
        data
      );
      logger.info("services:deleteProduct:status" + status);
      logger.info("services:deleteProduct:end");

      return status;
    }
  } catch (err) {
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "product not found",
      ecommerceConstants.VALID
    );
    logger.info("services:deleteProduct:end");
    return status;
  }
}
/**
add a new customer
 */
async function postCustomer(customerDetails) {
  try {
    logger.info("services:postcustomer:start");
    var variable = new customerModel({
      customerDetails: customerDetails,
      isActive: true,
    });
    const check = await customerModel.find({
      "customerDetails.customerMail": customerDetails.customerMail,
    });
    if (check != "") {
      var status = ecommerceResponse.responseFailure(
        true,
        "Mail id exists",
        ecommerceConstants.INVALID
      );
      return status;
    } else {
      const data = await variable.save();
      var status = ecommerceResponse.responseSuccess(
        true,
        "post Done",
        ecommerceConstants.VALID,
        data
      );

      logger.info("services:postcustomerDetails:status" + status);
      logger.info("services:postcustomerDetails:end");
      return status;
    }
  } catch (err) {
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "server error",
      ecommerceConstants.VALID
    );

    logger.info("services:postcustomerDetails:end");
  }
}
/**
update customer details
 */
async function updateCustomer(customerDetails, customerId) {
  try {
    logger.info("services:updateCustomer:start");
    var data1 = await customerModel.find({
      customerId: customerId,
      isActive: true,
    });
    console.log(data);
    if (data1 == "") {
      var status = ecommerceResponse.responseFailure(
        false,
        "customer not exist",
        ecommerceConstants.INVALID
      );
      return status;
    }
    var data = await customerModel.find({
      "customerDetails.customerMail": customerDetails.customerMail,
      "customerDetails.customerPassword": customerDetails.customerPassword,
    });
    if (data == "") {
      var status = ecommerceResponse.responseFailure(
        false,
        "invalid id or pswrd",
        ecommerceConstants.INVALID
      );
      return status;
    }
    var data = await customerModel.updateOne(
      { customerId: customerId },
      { "customerDetails.customerContact": customerDetails.customerContact }
    );
    console.log(data);
    var status = ecommerceResponse.responseSuccess(
      true,
      " customer updated",
      200
    );
    logger.info("services:updatecustomer :status" + status);
    logger.info("services:updatecustomer :end");
    return status;
  } catch (err) {
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "server error",
      ecommerceConstants.INVALID
    );
    logger.info("services:update customer:end");
    return status;
  }
}
/**
delete customer details
 */
async function deleteCustomer(customerId, customerDetails) {
  try {
    logger.info("services:deleteCustomer:start");
    var data1 = await customerModel.find({
      customerId: customerId,
      isActive: true,
    });
    if (data1 == "") {
      var status = ecommerceResponse.responseFailure(
        false,
        "customer not exist",
        ecommerceConstants.INVALID
      );
      return status;
    }
    var data = await customerModel.find({
      "customerDetails.customerMail": customerDetails.customerMail,
      "customerDetails.customerPassword": customerDetails.customerPassword,
    });
    if (data == "") {
      var status = ecommerceResponse.responseFailure(
        false,
        "invalid mail or pswrd",
        ecommerceConstants.INVALID
      );
      return status;
    }
    var data = await customerModel.updateOne(
      { customerId: customerId },
      { isActive: false }
    );
    console.log(data);
    var status = ecommerceResponse.responseSuccess(
      true,
      " customer deleted",
      200
    );
    logger.info("services:deletecustomer:status" + status);
    logger.info("services:deletecustomer:end");

    return status;
  } catch (err) {
    console.log(err);
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "server error",
      ecommerceConstants.VALID
    );
    logger.info("services:deleteProduct:end");
    return status;
  }
}
/**
add item to cart
 */
async function postCart(customerId, productDetails) {
  try {
    logger.info("services:postCart:start");
    var data = await cartModel.find({ customerId: customerId });
    if (data == "") {
      var variable = new cartModel({
        customerId: customerId,
        cartProducts: [productDetails],
        isActive: true,
      });

      const data = await variable.save();
      var status = ecommerceResponse.responseSuccess(
        true,
        "post Done",
        ecommerceConstants.VALID,
        data
      );
      return status;
    } else {
      var data1 = await cartModel.find({
        customerId: customerId,
        "cartProducts.productId": productDetails.productId,
      });
      console.log(data1);
      if (data1 != "") {
        var status = ecommerceResponse.responseSuccess(
          true,
          "Item already added to cart",
          ecommerceConstants.VALID,
          data1
        );
        return status;
      } else {
        var data1 = await cartModel.update(
          { customerId: customerId },
          { $push: { cartProducts: productDetails } }
        );
        var status = ecommerceResponse.responseSuccess(
          true,
          "post Done",
          ecommerceConstants.VALID,
          "product updated"
        );

        logger.info("services:postCart:status" + status);
        logger.info("services:postCart:end");
        return status;
      }
    }
  } catch (err) {
    console.log(err);
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "out of stock",
      ecommerceConstants.VALID
    );
    logger.info("services:postCart:end");
    return status;
  }
}

/**
delete item from cart
 */
async function deleteCart(customerId, productId) {
  try {
    logger.info("services:deleteCart:start");
    var data = await cartModel.update(
      { customerId: customerId },
      { $pull: { cartProducts: { productId: productId } } }
    );
    if (data == "") {
      var status = ecommerceResponse.responseFailure(
        false,
        "data not found",
        ecommerceConstants.INVALID
      );
    } else {
      var status = ecommerceResponse.responseSuccess(
        true,
        "delete Done",
        ecommerceConstants.VALID,
        data
      );
      logger.info("services:deletecart:status" + status);
      logger.info("services:deletecart:end");

      return status;
    }
  } catch (err) {
    console.log(err);
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "product not found",
      ecommerceConstants.VALID
    );
    return status;
    logger.info("services:deleteProduct:end");
  }
}
/**
add Item to wishlist
 */
async function postWishlist(customerId, productDetails) {
  try {
    logger.info("services:postWishlist:start");
    var data = await wishlistModel.find({ customerId: customerId });
    console.log();
    for (var i = 0; i < data[0].wishlistProducts.length; i++) {
      var date1 = new Date(data[0].wishlistProducts[i].productWishlistedDate);
      var date2 = new Date();
      diff = Math.abs(date2.getTime() - date1.getTime());
      diff = Math.ceil(diff / (3600 * 1000 * 24));
      console.log(diff);
      if (diff > 30) {
        var data = await wishlistModel.updateOne(
          { customerId: customerId },
          {
            $pull: {
              wishlistProducts: {
                productId: data[0].wishlistProducts[i].productId,
              },
            },
          }
        );
      }
    }
    if (data == "") {
      var variable = new wishlistModel({
        customerId: customerId,
        wishlistProducts: [productDetails],
        isActive: true,
      });

      const data = await variable.save();
      var status = ecommerceResponse.responseSuccess(
        true,
        "Added to wishlist",
        ecommerceConstants.VALID,
        data
      );
      return status;
    } else {
      var data1 = await wishlistModel.find({
        customerId: customerId,
        "wishlistProducts.productId": productDetails.productId,
      });
      console.log(data1);
      if (data1 != "") {
        var status = ecommerceResponse.responseSuccess(
          true,
          "Item already in wishlist",
          ecommerceConstants.VALID,
          data1
        );
        return status;
      } else {
        var data1 = await wishlistModel.update(
          { customerId: customerId },
          { $push: { wishlistProducts: productDetails } }
        );
        var status = ecommerceResponse.responseSuccess(
          true,
          "post Done",
          ecommerceConstants.VALID,
          "product updated"
        );
      }
      logger.info("services:postWishlist:status" + data1);
      logger.info("services:postWishlist:end");
      return status;
    }
  } catch (err) {
    console.log(err);
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      err,
      ecommerceConstants.VALID
    );
    return status;
    logger.info("services:postWishlist:end");
  }
}
/**
delete Item from wishlist
 */
async function deleteWishlist(customerId, productId) {
  try {
    logger.info("services:deleteWishlist:start");
    var data = await wishlistModel.update(
      { customerId: customerId },
      { $pull: { wishlistProducts: { productId: productId } } }
    );
    if (data == "") {
      var status = ecommerceResponse.responseFailure(
        false,
        "data not found",
        ecommerceConstants.INVALID
      );
    } else {
      var status = ecommerceResponse.responseSuccess(
        true,
        "delete Done",
        ecommerceConstants.VALID,
        data
      );
      logger.info("services:deletecart:status" + status);
      logger.info("services:deletecart:end");

      return status;
    }
  } catch (err) {
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "product not found",
      ecommerceConstants.VALID
    );
    return status;
    logger.info("services:deleteProduct:end");
  }
}
/**
Order Item from cart
 */
async function postOrder(customerId, productDetails) {
  try {
    logger.info("services:postOrder:start");
    var data = await customerModel.find({
      customerId: customerId,
    });
    var customerDetails = {
      customerName: data[0].customerDetails.customerName,
      customerMail: data[0].customerDetails.customerMail,
      customerContact: data[0].customerDetails.customerContact,
    };
    var data1 = await productModel.find({
      "productDetails.productId": productDetails.productId,
    });
    var currentStock =
      data1[0].productDetails.productStock - productDetails.productQuantity;
    console.log(currentStock);
    if (currentStock < 1) {
      var status = ecommerceResponse.responseSuccess(
        false,
        "Currently unavailable",
        ecommerceConstants.INVALID
      );
      return status;
    }

    var data1 = await productModel.update(
      {
        "productDetails.productId": productDetails.productId,
      },
      {
        "productDetails.productStock": parseInt(currentStock),
      }
    );

    var variable = new orderModel({
      customerId: customerId,
      products: productDetails,
      productTotal: productDetails.productPrice,
      customerDetails: customerDetails,
    });
    const data2 = await variable.save();
    var status = ecommerceResponse.responseSuccess(
      true,
      "product Ordered",
      ecommerceConstants.VALID,
      data2
    );
    logger.info("services:postOrder:status" + data1);
    logger.info("services:postOrder:end");

    return status;
  } catch (err) {
    console.log(err);
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      err,
      ecommerceConstants.VALID
    );
    logger.info("services:postOrder:end");
    return status;
  }
}
async function postCartOrder(customerId) {
  try {
    logger.info("services:postCartOrder:start");
    var data = await cartModel.find({ customerId: customerId });

    if (data == "") {
      var status = ecommerceResponse.responseFailure(
        false,
        "cart is empty",
        ecommerceConstants.INVALID
      );
      return status;
    }
    var data1 = await customerModel.find({
      customerId: customerId,
    });

    var customerDetails = {
      customerName: data1[0].customerDetails.customerName,
      customerMail: data1[0].customerDetails.customerMail,
      customerContact: data1[0].customerDetails.customerContact,
    };
    var price = 0;
    for (var i = 0; i < data[0].cartProducts.length; i++) {
      var currentStock = 0;
      price = price + data[0].cartProducts[0].productPrice;
      var productData = await productModel.find({
        "productDetails.productId": data[0].cartProducts[i].productId,
      });
      console.log("productStock" + productData[0].productDetails.productStock);
      currentStock =
        productData[0].productDetails.productStock -
        data[0].cartProducts[0].productQuantity;
      if (currentStock < 1) {
        var status = ecommerceResponse.responseSuccess(
          false,
          "Currently unavailable",
          ecommerceConstants.INVALID
        );
        return status;
      }

      var data1 = await productModel.update(
        { "productDetails.productId": data[0].cartProducts[i].productId },
        { "productDetails.productStock": parseInt(currentStock) }
      );
    }
    var variable = new orderModel({
      customerId: customerId,
      products: data[0].cartProducts,
      productTotal: price,
      customerDetails: customerDetails,
    });
    const orderData = await variable.save();
    var status = ecommerceResponse.responseSuccess(
      true,
      "product Ordered",
      ecommerceConstants.VALID,
      orderData
    );
    console.log(variable);
    logger.info("services:postCartOrder:status");
    logger.info("services:postCartOrder:end");
    return status;
  } catch (err) {
    console.log(err);
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "out of stock",
      ecommerceConstants.VALID
    );
    logger.info("services:postCart:end");
    return status;
  }
}

module.exports = {
  listSeller,
  updateSeller,
  deleteSeller,
  postSeller,
  postProduct,
  deleteProduct,
  postCustomer,
  updateProduct,
  updateCustomer,
  deleteCustomer,
  postCart,
  postWishlist,
  deleteCart,
  deleteWishlist,
  postOrder,
  postCartOrder,
};
