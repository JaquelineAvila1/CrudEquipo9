const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    customer_id: String,
    store_id: String,
    first_name: String,
    last_name: String,
    email: String,
    address_id: String,
    active: String,
    create_date: String,
    last_update: String
});

const Customer = mongoose.model('Customer2', customerSchema);

module.exports = Customer;
