// Since all these functions give a promise to the client or they ask the database for the data manipulation we need to use async and await
// And there might be errors so we need to handle them : express-async-handler is used to handle such errors

const asyncHandler = require('express-async-handler');
// importing the mongoose model 
const Contact = require('../models/contactModel');

// @desc Get contact
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {
    // to find a contact by id we need to use findById function
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
}
)
// @desc Get contacts
// @route GET /api/contacts/
// @access private
const getContacts = asyncHandler(async (req, res) => {
    // contact.find will list all the contacts 
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
}
)
// @desc Update contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("User don't have the permission to perform this operation")
    }

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedContact);
}
)
// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    
    // making sure that only the user who added the contact can update and delete it 
    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("User don't have the permission to perform this operation")
    }

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
}
)
// @desc Add contact
// @route POST /api/contacts/
// @access private
const addContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    // Destructuring data
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are manadatory!");
    }
    // creating a new contact and adding it to database
    const contact = await Contact.create({
        // since the parameters attached to the request body are already destructured and have same name as attrubtes in the database =>
        name,
        email,
        phone, 
        user_id: req.user.id
    })

    res.status(201).json(contact);
}
)


module.exports = { getContact, getContacts, updateContact, deleteContact, addContact };