const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: String,
    description: String
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;