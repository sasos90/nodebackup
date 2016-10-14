var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Storage = require('../models/Storage');
var db = mongoose.connection;

/* GET home page. */
router.get("/", (req, res, next) => {

    mongoose.connect("mongodb://localhost:27017/nodebackup");
    db.on("error", () => {
        console.error("connection error:");
    });
    db.once("open", () => {
        // we're connected!
        console.log("DB connection opened now");

        // how to create a storage item
        /*var storageItem = new Storage({
            name: "USB stick 1",
            vendorId: "vendorID_1",
            productId: "productID_1"
        });
        storageItem.save((err, insertedItem) => {
            if (err) {
                console.error("NOT INSERTED");
                return console.error(err);
            }
            console.log("New storage item inserted:", insertedItem);
        });*/
    });

    res.render("index", { title: "Express" });
});

module.exports = router;
