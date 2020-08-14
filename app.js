var express = require("express");
var app = express();
var ecommerceRoutes = require("./Routes/ecommerce");
const bodyparser = require("body-Parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
var ecommerceHelper = require("./Utils/fileHelper");
var Db=require("./Utils/db_connection")

Db.getDbConnection();

app.get("/seller", ecommerceRoutes.listSeller);
app.put("/seller/:sellerId/",ecommerceRoutes.updateSeller);
app.delete("/seller/:sellerId",ecommerceRoutes.deleteSeller);
app.post("/seller",ecommerceRoutes.postSeller);

app.post("/product",ecommerceRoutes.postProduct);
app.delete("/product/:productId",ecommerceRoutes.deleteProduct);
app.put("/product/:productId",ecommerceRoutes.updateProduct);

app.post("/customer",ecommerceRoutes.postCustomer);
app.put("/customer/:customerId",ecommerceRoutes.updateCustomer);
app.delete("/customer/:customerId",ecommerceRoutes.deleteCustomer);

app.post("/cart",ecommerceRoutes.postCart);
app.delete("/cart/:customerId/:productId",ecommerceRoutes.deleteCart);

app.post("/wishlist",ecommerceRoutes.postWishlist);
app.delete("/wishlist/:customerId/:productId",ecommerceRoutes.deleteWishlist);

 
app.post("/cart/order/:customerId",ecommerceRoutes.postCartOrder);
app.post("/order", ecommerceRoutes.postOrder);
app.listen(3000);
