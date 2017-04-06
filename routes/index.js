var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Storage = mongoose.model("Storage");

/* GET home page. */
router.get("/", (req, res, next) => {

    render(res);
});

let render = (res) => {

    Storage.getHierarchy((assignedStorages, unassignedStorages) => {
        console.log("=======");
        console.log(assignedStorages);
        console.log("---------------------------");
        console.log(unassignedStorages);
        console.log("=======");
        let assignedIds = getAssignedIds(assignedStorages);
        console.log(assignedIds);
        console.log("!!!!!!!");

        Storage.find({}, (err, allStorages) => {

            res.render("index", {
                title: "Express",
                allStorages: allStorages,
                assignedIds: assignedIds,
                assignedStorages: assignedStorages,
                unassignedStorages: unassignedStorages
            });
        });
    });

    // how to update storage item
    /*Storage.findById("58009893f3598b33102c9b5d", (err, item) => {
        if (err) {
            console.error(err);
        }

        if (item !== null) {

            // change data
            item.targetStorageId = "58009172bf76812d01c8604c";  // update the bears info

            item.save((err) => {
                if (err) {
                    console.error(err);
                }
                console.log("!!! UPDATED !!!");
            });
        }
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
};

let getAssignedIds = (hierarchy) => {

    let result = [];
    for (let relation of hierarchy) {
        result.push(relation.id);
        result.push(relation.targetStorage.id);
    }
    return result;
};

module.exports = router;
