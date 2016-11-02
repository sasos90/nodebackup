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

        assignTargets(storages, [], 0, storages.length, callback);
    });
};
var Storage = mongoose.model("Storage", storageSchema);

var assignTargets = (storages, assignedTargets, index, size, callback) => {

    let storage = storages[index];
    // we need to find it and attach it :)
    Storage.findById(storage.targetStorageId, (err, item) => {
        if (err) { console.error(err); }

        console.log("Index = " + index);

        // assign object
        if (item !== null) {
            storage.targetStorage = item;
        }

        // put into array
        assignedTargets.push(storage);

        // whether finish the process or assign next one
        if (index === (size - 1)) {
            console.log("FINISHED");
            callback(assignedTargets);
        } else {
            console.log("ANOTHER ONE");
            assignTargets(storages, assignedTargets, ++index, size, callback);
        }
    });
};

module.exports = Storage;
