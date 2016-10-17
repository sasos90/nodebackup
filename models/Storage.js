/**
 * Created by saso on 10/14/16.
 */
var mongoose = require("mongoose");

// Mongoose schemas
var storageSchema = mongoose.Schema({
    name: String,
    vendorId: String,
    productId: String,
    targetStorageId: String,
    targetStorage: this
});
storageSchema.statics.getHierarchy = (callback) => {

    Storage.find({
        targetStorageId: { $ne: null }
    }, (err, storages) => {

        assignTargets(storages, [], callback);
    });
};
var Storage = mongoose.model("Storage", storageSchema);

var assignTargets = (hierarchyMap, result, callback) => {

    let allAssigned = true;

    for (let storage of hierarchyMap) {
        if (typeof storage.targetStorage === "undefined") {

            // we need to find it and attach it :)
            Storage.findById(storage.targetStorageId, (err, item) => {
                if (err) {
                    console.error(err);
                }

                // assign object
                storage.targetStorage = item;
                result.push(storage);
                assignTargets(hierarchyMap, result, callback);
            });
            allAssigned = false;
            break;
        }
    }
    if (allAssigned) {
        callback(result);
    }
};

module.exports = Storage;
