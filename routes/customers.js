const express = require('express');
var router = express.Router();
const Customer = require('../models/customer');

// rutas
router.get('/', (req, res) => {
    res.render('pages/customer/customerAddEdit', {
        viewTitle: "Add customer"
    });
});

router.post('/', (req, res) => {
    if(req.body._id == '')
    insertCustomer(req, res)
    else
    updateCustomer(req, res)
});

//metodos para insertar y actualizar
function insertCustomer(req, res){
    var customer = new Customer();
    customer.customer_id = req.body.customer_id;
    customer.store_id = req.body.store_id;
    customer.first_name = req.body.first_name;
    customer.last_name = req.body.last_name;
    customer.email = req.body.email;
    customer.address_id = req.body.address_id;
    customer.active = req.body.active;
    customer.create_date = req.body.create_date;
    customer.last_update = req.body.last_update;
    customer.save(e => {
        if(!e)
        res.redirect('customer/customerList');
        else
        console.log("Error", e);
    });
}
function updateCustomer(req, res){
    Customer.findOneAndUpdate({_id: req.body._id}, req.body, {new:true}, (err, doc) => {
        if(!err){
            res.render('customer/customerList', {
                viewTitle: "Update Customer",
                customer: req.body
            });
            res.redirect('customer/customerList')
        } else {
            console.log("Error", err);
        }
    });
}

router.get('/customerList', (req, res) => {
    Customer.find((error, docs) => {
        if(!error){
            res.render("pages/customer/customerList", {
                viewTitle: "Customers",
                list: docs
            })
        } else {
            console.log("Error", error);
        }
    });
})

router.get('/:id', (req, res) => {
    Customer.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render('pages/customer/customerAddEdit', {
                viewTitle: "Update Customer",
                customer: doc
            });
        }
    });
});


router.get('/delete/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id, (err) => {
        if(!err){
            res.redirect('/customer/customerList');
        } else {
            console.log("Error", err);
        }
    });
})

module.exports = router;
