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

        /*Storage.find((err, storages) => {
            if (err) return console.error(err);
            console.log(storages);
        });*/

        // how to update storage item
        /*Storage.findById("58009893f3598b33102c9b5d", (err, item) => {
            if (err) {
                console.error(err);
            }

            // change data
            item.backupToStorageId = "58009172bf76812d01c8604c";  // update the bears info

            item.save((err) => {
                if (err) {
                    console.error(err);
                }
                console.log("!!! UPDATED !!!");
            });

        });*/

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
