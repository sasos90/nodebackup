/**
 * Created by saso on 10/14/16.
 */
var mongoose = require("mongoose");

// Mongoose schemas
var storageSchema = mongoose.Schema({
    name: String,
    vendorId: String,
    productId: String,
    backupToStorageId: String
});
var Storage = mongoose.model("Storage", storageSchema);

module.exports = Storage;
