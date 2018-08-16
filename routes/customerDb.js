const mongose = require('mongoose');
const Customer = mongose.model('Customer', mongose.Schema({
    isGold: Boolean,
    name: String,
    phone: Number
}));

const db = {
    getCusomers: async function() {
        const customers = await Customer.find()
        .sort('name')
        return customers;
    },
    getCusomer: async function(id) {
        const customers = await Customer.findById(id)
        return customers;
    },

    addCustomer: async function(customer) {
        const toAdd = new Customer({... customer});
        toAdd.save();
    },

    updateCustomer: async function(id,customer) {
        const cust = await Customer.findByIdAndUpdate(id, {
            $set:{... customer}
        }, {new: true})
        return cust
    },

    deleteCustomer: async function (id) {
        const cust = await Customer.findByIdAndRemove(id); 
        return cust;
    }
    
}

module.exports = db